import axios from 'axios';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/const';

interface State {
  categories: string[];
  loading: boolean;
  error: unknown;
}

export const useCategoriesStore = defineStore('categories', {
  state: (): State => ({
    categories: [],
    loading: false,
    error: null,
  }),
  actions: {
    async getCategories() {
      this.categories = [];
      this.loading = true;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.get<string[]>(`${API_URL}/api/productCategories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.categories = response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Произошла ошибка запроса категорий:', error.message);
          this.error = error.message;
        } else {
          console.error('Произошла ошибка запроса категорий:', error);
          this.error = error;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
