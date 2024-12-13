import { Product } from "../interface/products";
import { Accessory } from "../interface/accessory";

export type CartItem = {
  product?: Product; 
  accessory?: Accessory;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
};

export type stateart = {
  products: CartItem[];
  totalPrice: number;
  cartId: string;
};

export type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: {
        product?: Product;
        accessory?: Accessory;
        quantity: number;
        size?: string;
        color?: string;
        isAccessory: boolean;
      };
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: string;
        size?: string;
        color?: string;
        quantity: number;
        isAccessory: boolean; 
      };
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: {
        productId: string;
        size?: string;
        color?: string;
        isAccessory: boolean;
      };
    }
  | {
      type: "GET_CART";
      payload: { products: CartItem[]; totalPrice: number; cartId: string };
    }
  | { type: "CHECKOUT" };

const cartReducers = (state: stateart, action: CartAction): stateart => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, accessory, quantity, size, color, isAccessory } =
        action.payload;

      let existingItemIndex;

      if (isAccessory) {
        existingItemIndex = state.products.findIndex(
          (item) => item.accessory?._id === accessory?._id
        );
      } else {
        existingItemIndex = state.products.findIndex(
          (item) =>
            item.product?._id === product?._id &&
            item.color === color &&
            item.size === size
        );
      }

      let updatedProducts;

      if (existingItemIndex !== -1) {
        updatedProducts = [...state.products];
        updatedProducts[existingItemIndex].quantity += quantity;
      } else {
        updatedProducts = [
          ...state.products,
          isAccessory
            ? { accessory, quantity } 
            : { product, quantity, size, color }, 
        ];
      }

      const newTotalPrice = updatedProducts.reduce((total, item) => {
        if (item.accessory) {
          return (
            total +
            item.quantity *
              (item.accessory.discountPrice || item.accessory.price || 0)
          );
        } else if (item.product) {
          const colorDetails = item.product.colors.find(
            (c) => c.color === item.color
          );
          return (
            total +
            item.quantity *
              (colorDetails?.discountPrice ?? colorDetails?.price ?? 0)
          );
        }
        return total;
      }, 0);

      return {
        ...state,
        products: updatedProducts,
        totalPrice: newTotalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, size, color, quantity, isAccessory } = action.payload;

      let updatedProductsList = [...state.products];

      if (quantity < 1) {
        updatedProductsList = state.products.filter((item) =>
          isAccessory
            ? item.accessory?._id !== productId
            : item.product?._id !== productId ||
              item.color !== color ||
              item.size !== size
        );
      } else {
        updatedProductsList = state.products.map((item) =>
          isAccessory
            ? item.accessory?._id === productId
              ? { ...item, quantity }
              : item
            : item.product?._id === productId &&
              item.color === color &&
              item.size === size
            ? { ...item, quantity }
            : item
        );
      }

      const updatedTotalPrice = updatedProductsList.reduce(
        (total, item) =>
          total +
          (item.accessory
            ? item.accessory.discountPrice || item.accessory.price || 0
            : item.product?.colors.find(
                (colorItem) => colorItem.color === item.color
              )?.discountPrice ?? 0) *
            item.quantity,
        0
      );

      return {
        ...state,
        products: updatedProductsList,
        totalPrice: updatedTotalPrice,
      };
    }

    case "REMOVE_FROM_CART": {
      const { productId, size, color, isAccessory } = action.payload;

      return {
        ...state,
        products: state.products.filter((item) => {
          if (isAccessory) {
            return item.accessory?._id !== productId;
          } else {
            return (
              item.product?._id !== productId ||
              item.color !== color ||
              item.size !== size
            );
          }
        }),
      };
    }

    case "GET_CART":
      return {
        ...state,
        products: action.payload.products,
        totalPrice: action.payload.totalPrice,
        cartId: action.payload.cartId,
      };

    case "CHECKOUT":
      return {
        cartId: "",
        products: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};
export default cartReducers;
