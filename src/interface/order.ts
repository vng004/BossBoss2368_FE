import { CartItem } from "../reducers/cartReducers";
import { ShippingDetails } from "./shippingDetails";

export interface Order {
  _id?: string;
  code?: string;
  sessionId: string,
  products: CartItem[];
  totalPrice: number;
  shippingDetails: ShippingDetails;
  isTransferConfirmed?: boolean;
  orderStatus: 0 | 1 | 2;
  createdAt: Date;
  description: string
}
