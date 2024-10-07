import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/const';
import { Status, type IFormData } from '@/stores/types';

interface IOrder extends IFormData {
  id: number;
  totalPrice: string;
}

interface IStateOrder {
  orderData: IOrder;
  status: Status;
  error: unknown;
}

export const useOrderStore = defineStore('order', {
  state: (): IStateOrder => ({
    orderData: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      address: '',
      comments: '',
      deliveryType: '',
      paymentType: '',
      totalPrice: '',
    },
    status: Status.IDLE,
    error: null,
  }),
  actions: {
    async getOrder(orderId: string) {
      this.orderData = {
        id: 0,
        name: '',
        phone: '',
        email: '',
        address: '',
        comments: '',
        deliveryType: '',
        paymentType: '',
        totalPrice: '',
      };
      this.status = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.get<IOrder>(`${API_URL}/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.orderData = response.data;
        this.status = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 401) {
            auth.fetchAccessKey();
            auth.$subscribe(() => {
              this.getOrder(orderId);
            });
            return;
          }
          console.error('Ошибка запроса данных о заказе:', error.message);
          this.error = error.message;
        } else {
          console.error('Ошибка запроса данных о заказе:', error);
          this.error = error;
        }
        this.status = Status.ERROR;
      }
    },
  },
});
