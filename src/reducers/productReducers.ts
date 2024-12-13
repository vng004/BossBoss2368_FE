import { Product } from "../interface/products";

type State = {
  products: Product[];
};

export type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "EDIT_PRODUCT"; payload: Product }
  | { type: "REMOVE_PRODUCT"; payload: string }
  | {
      type: "UPDATE_PRODUCT_HOT";
      payload: { productId: string; hotStatus: boolean };
    };

export const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload),
      };
    case "UPDATE_PRODUCT_HOT":
      return {
        ...state,
        products: state.products.map((p) =>
          p._id === action.payload.productId
            ? { ...p, hot: action.payload.hotStatus }
            : p
        ),
      };

    default:
      return state;
  }
};
