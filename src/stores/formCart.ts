import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/const';
import { Status } from '@/stores/types';

export interface IFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  comments: string;
  deliveryType: string;
  paymentType: string;
}

interface IStateCart {
  orderId: number;
  status: Status;
  error: unknown;
}

export const useFormCartStore = defineStore('formCart', {
  state: (): IStateCart => ({
    orderId: 0,
    status: Status.IDLE,
    error: null,
  }),

  actions: {
    async submitCartForm(formData: IFormData) {
      this.orderId = 0;
      this.status = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.post<IFormData, { data: { orderId: number } }>(
          `${API_URL}/api/orders`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        this.orderId = response.data.orderId;
        this.status = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.error = error.message;
          console.error('Ошибка отправки формы заказа:', error.message);
        } else {
          console.error('Ошибка отправки формы заказа:', error);
          this.error = error;
        }
        this.status = Status.ERROR;
      }
    },
  },
});
