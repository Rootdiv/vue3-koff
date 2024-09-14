export interface IProduct {
  id: number;
  article: string;
  name: string;
  price: number;
  characteristics: string[][];
  images: string[];
  category: string;
}

export const enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
