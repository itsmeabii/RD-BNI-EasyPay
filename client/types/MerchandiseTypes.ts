export type MerchandiseCategory = string;

export type Merchandise = {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  category: MerchandiseCategory;
  inStock: boolean;
  stock: number;
  images: string[];
  colors: string[];
};

export type MerchandiseReview = {
  id: number;
  merchandiseId: number;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
};