import axios from 'axios';
import { defineStore } from 'pinia';
import type { LocationQuery } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { API_URL } from '@/const';

export interface Product {
  id: number;
  article: string;
  name: string;
  price: number;
  characteristics: string[][];
  images: string[];
  category: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
}

interface ProductWithParams {
  data: Product[];
  pagination: Pagination;
}

interface State {
  goods: Product[];
  pagination: Pagination | null;
  loading: boolean;
  error: unknown;
}

export const useGoodsStore = defineStore('goods', {
  state: (): State => ({
    goods: [],
    pagination: null,
    loading: false,
    error: null,
  }),
  actions: {
    async getGoods(params: LocationQuery) {
      this.goods = [];
      this.pagination = null;
      this.loading = true;
      const auth = useAuthStore();
      const token = auth.accessKey;
      try {
        const response = await axios.get<ProductWithParams>(`${API_URL}/api/products`, {
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
