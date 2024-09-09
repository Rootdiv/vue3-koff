import axios from 'axios';
import { defineStore } from 'pinia';
import type { LocationQuery } from 'vue-router';
import type { IProduct } from '@/stores/types';
import { Status } from '@/stores/types';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/const';

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
}

interface IProductWithParams {
  data: IProduct[];
  pagination: IPagination;
}

interface IStateGoods {
  goods: IProduct[];
  pagination: IPagination | null;
  status: Status;
  error: unknown;
}

export const useGoodsStore = defineStore('goods', {
  state: (): IStateGoods => ({
    goods: [],
    pagination: null,
    status: Status.LOADING,
    error: null,
  }),
  actions: {
    async getGoods(params: LocationQuery) {
      this.goods = [];
      this.pagination = null;
      this.status = Status.LOADING;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.get<IProductWithParams>(`${API_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        });
        if (Array.isArray(response.data)) {
          this.goods = response.data;
        } else {
          this.goods = response.data.data;
          this.pagination = response.data.pagination;
        }
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
  },
});
