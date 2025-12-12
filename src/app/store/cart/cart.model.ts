import { Product } from '../products/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}
