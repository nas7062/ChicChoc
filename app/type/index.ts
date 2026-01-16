export interface Product {
  id: number;
  brand: string;
  title: string;
  imageUrl: string;
  price: number;
  discountRate: number;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
  liked?: boolean;
}

export interface ISearchKeyword {
  id: string;
  keyword: string;
  count: number;
  updatedAt: Date;
  createdAt: Date;
}

export type CartItem = {
  cartItemId: string;
  productId: number;
  size: string;
  color: string;
  quantity: number;
};

export type ProductInCart = {
  cartItemId: string;
  productId: number;
  title: string;
  imageUrl: string;
  price: number;
  discountRate: number;
  brand: string;
  size: string;
  color: string;
  quantity: number;
};
