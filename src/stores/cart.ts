import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/const';
import { Status, type IProduct } from '@/stores/types';

interface IProductUpdateCart {
  message: string;
  totalCount: number;
  productCart: {
    productId: number;
    quantity: number;
  };
}

interface IProductAddCart extends IProductUpdateCart {
  product: IProduct;
}

interface IProductRemoveCart {
  id: number;
  message: string;
  totalCount: number;
}

export interface IProductCart extends IProduct {
  productId: number;
  quantity: number;
}

interface ICart {
  products: IProductCart[];
  totalPrice: number;
  totalCount: number;
}

interface IStateCart extends ICart {
  deliveryPrice: number;
  status: Status;
  statusAddRemove: Status;
  statusUpdate: Status;
  error: unknown;
}

export const useCartStore = defineStore('cart', {
  state: (): IStateCart => ({
    products: [],
    totalPrice: 0,
    totalCount: 0,
    deliveryPrice: 500,
    status: Status.IDLE,
    statusAddRemove: Status.IDLE,
    statusUpdate: Status.IDLE,
    error: null,
  }),
  getters: {
    inCart() {
      return (id: number) => !!this.products.find((item) => item.id === id);
    },
    getTotalPrice(state) {
      return state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
  actions: {
    async getCartGoods() {
      this.products = [];
      this.totalPrice = 0;
      this.totalCount = 0;
      this.status = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.get<ICart>(`${API_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.products = response.data.products;
        this.totalPrice = response.data.totalPrice;
        this.totalCount = response.data.totalCount;
        this.status = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 401) {
            auth.$subscribe(this.getCartGoods);
            return;
          }
          console.error('Ошибка запроса корзины:', error.message);
          this.error = error.message;
        } else {
          console.error('Ошибка запроса корзины:', error);
          this.error = error;
        }
        this.status = Status.ERROR;
      }
    },
    async addProductToCard(productData: { productId: number; quantity: number }) {
      this.statusAddRemove = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.post<IProductAddCart>(
          `${API_URL}/api/cart/products`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        this.products.push({ ...response.data.product, ...response.data.productCart });
        this.totalCount = response.data.totalCount;
        this.totalPrice = this.getTotalPrice;
        this.statusAddRemove = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.error = error.message;
          console.error('Ошибка добавления товара в корзину:', error.message);
        } else {
          console.error('Ошибка добавления товара в корзину:', error);
          this.error = error;
        }
        this.statusAddRemove = Status.ERROR;
      }
    },
    async updateProductInCard(productData: { productId: number; quantity: number }) {
      this.statusUpdate = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.put<IProductUpdateCart>(
          `${API_URL}/api/cart/products`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        this.products = this.products.map((item) => {
          if (item.id === response.data.productCart.productId) {
            item.quantity = response.data.productCart.quantity;
          }
          return item;
        });
        this.totalCount = response.data.totalCount;
        this.totalPrice = this.getTotalPrice;
        this.statusUpdate = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.error = error.message;
          console.error('Ошибка обновления товара в корзине:', error.message);
        } else {
          console.error('Ошибка обновления товара в корзине:', error);
          this.error = error;
        }
        this.statusUpdate = Status.ERROR;
      }
    },

    async removeProductFromCard(id: number) {
      this.statusAddRemove = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.delete<IProductRemoveCart>(
          `${API_URL}/api/cart/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        this.products = this.products.filter((item) => item.id !== response.data.id);
        this.totalCount = response.data.totalCount;
        this.totalPrice = this.getTotalPrice;
        this.statusAddRemove = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.error = error.message;
          console.error('Ошибка удаления товара из корзины:', error.message);
        } else {
          console.error('Ошибка удаления товара из корзины:', error);
          this.error = error;
        }
        this.statusAddRemove = Status.ERROR;
      }
    },
    changeDeliveryPrice(price: number) {
      this.deliveryPrice = price;
    },
  },
});
