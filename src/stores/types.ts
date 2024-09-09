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
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
