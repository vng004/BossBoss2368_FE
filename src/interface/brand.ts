import { Category } from "./category";
import { Product } from "./products";

export interface Brand {
  _id?: string;
  title: string;
  category: Category;
  products?: Product[];
  slug: string;
  createdAt: Date;
}
