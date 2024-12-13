import { Accessory } from "./accessory";
import { Brand } from "./brand";

export interface Category {
  _id?: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  brands: Brand[];
  accessories?: Accessory[];
}
