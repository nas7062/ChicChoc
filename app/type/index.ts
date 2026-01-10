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
}

export interface ISearchKeyword {
  id: string;
  keyword: string;
  count: number;
  updatedAt: Date;
  createdAt: Date;
}
