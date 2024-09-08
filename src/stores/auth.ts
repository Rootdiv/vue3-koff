import { API_URL } from '@/const';
import axios from 'axios';
import { defineStore } from 'pinia';

interface Token {
  accessKey: string;
}

interface State extends Token {
  loading: boolean;
  error: unknown;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    accessKey: localStorage.getItem('koff-vue-accessKey') || '',
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAccessKey() {
      this.loading = true;
      try {
        const response = await axios.get<Token>(`${API_URL}/api/users/accessKey`);
        localStorage.setItem('koff-vue-accessKey', response.data.accessKey);
        this.accessKey = response.data.accessKey;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Произошла ошибка запроса токена:', error.message);
          this.error = error.message;
        } else {
          console.error('Произошла ошибка запроса токена:', error);
          this.error = error;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
