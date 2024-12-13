export interface Color {
  color: string;
  price: number;
  image: string | File;
  discountPrice?: number;
  discountPercentage: number;
}

export interface Product {
  _id?: string;
  title: string;
  description?: string;
  brand: string;
  colors: Color[];
  images?: string[];
  salesCount?: number;
  slug: string;
  hot: boolean;
  sizes: string[];
  createdAt: Date;
  brandId?: string;
}
