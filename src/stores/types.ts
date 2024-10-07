export interface IProduct {
  id: number;
  article: string;
  name: string;
  price: number;
  characteristics: string[][];
  images: string[];
  category: string;
}

export interface IFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  comments: string;
  deliveryType: string;
  paymentType: string;
}

export const enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
