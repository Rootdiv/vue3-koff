import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import type { IProduct } from '@/stores/types';
import { Status } from '@/stores/types';
import { API_URL } from '@/const';

interface IStateProduct {
  product: IProduct;
  status: Status;
  error: unknown;
}

export const useProductStore = defineStore('product', {
  state: (): IStateProduct => ({
    product: {
      id: 0,
      article: '',
      name: '',
      price: 0,
      characteristics: [],
      images: [],
      category: '',
    },
    status: Status.LOADING,
    error: null,
  }),
  actions: {
    async getProduct(id: string) {
      const auth = useAuthStore();
      const token = auth.accessKey;
      this.status = Status.LOADING;
      try {
        if (isNaN(parseInt(id))) {
          throw new Error('Не удалось загрузить товар!');
        }
        const response = await axios.get<IProduct>(`${API_URL}/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Object.assign(this.product, response.data);
        this.status = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Произошла ошибка запроса:', error.message);
          this.error = error.message;
        } else {
          console.error('Произошла ошибка запроса:', error);
          this.error = error;
        }
        this.status = Status.ERROR;
      }
    },
    clearProduct() {
      this.product = {
        id: 0,
        article: '',
        name: '',
        price: 0,
        characteristics: [],
        images: [],
        category: '',
      };
      this.error = null;
    },
  },
});
