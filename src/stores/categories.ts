import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/const';
import { Status } from '@/stores/types';

interface IStateCategory {
  categories: string[];
  status: Status;
  error: unknown;
}

export const useCategoriesStore = defineStore('categories', {
  state: (): IStateCategory => ({
    categories: [],
    status: Status.IDLE,
    error: null,
  }),
  actions: {
    async getCategories() {
      this.categories = [];
      this.status = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.get<string[]>(`${API_URL}/api/productCategories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.categories = response.data;
        this.status = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 401) {
            auth.fetchAccessKey();
            auth.$subscribe(this.getCategories);
            return;
          }
          console.error('Ошибка запроса категорий:', error.message);
          this.error = error.message;
        } else {
          console.error('Ошибка запроса категорий:', error);
          this.error = error;
        }
        this.status = Status.ERROR;
      }
    },
  },
});
