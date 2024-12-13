export interface Accessory {
  _id?: string;
  title: string;
  description?: string;
  category: string;
  image: string | File;
  slug?: string;
  price: number;
  discountPrice?: number;
  discountPercentage: number;
  salesCount?: number;
  createdAt: Date;
}
