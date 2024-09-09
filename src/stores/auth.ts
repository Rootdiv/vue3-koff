import { API_URL } from '@/const';
import { Status } from '@/stores/types';
import axios from 'axios';
import { defineStore } from 'pinia';

interface IToken {
  accessKey: string;
}

interface IStateAuth extends IToken {
  status: Status;
  error: unknown;
}

export const useAuthStore = defineStore('auth', {
  state: (): IStateAuth => ({
    accessKey: localStorage.getItem('koff-vue-accessKey') || '',
    status: Status.LOADING,
    error: null,
  }),
  actions: {
    async fetchAccessKey() {
      this.status = Status.LOADING;
      try {
        const response = await axios.get<IToken>(`${API_URL}/api/users/accessKey`);
        localStorage.setItem('koff-vue-accessKey', response.data.accessKey);
        this.accessKey = response.data.accessKey;
        this.status = Status.SUCCESS;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Произошла ошибка запроса токена:', error.message);
          this.error = error.message;
        } else {
          console.error('Произошла ошибка запроса токена:', error);
          this.error = error;
        }
        this.status = Status.ERROR;
      }
    },
  },
});
