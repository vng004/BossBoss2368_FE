import { Brand } from "../interface/brand";

type State = {
  brands: Brand[];
};

export type Action =
  | { type: "SET_BRANDS"; payload: Brand[] }
  | { type: "ADD_BRAND"; payload: Brand }
  | { type: "EDIT_BRAND"; payload: Brand }
  | { type: "REMOVE_BRAND"; payload: string };

export const brandReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "ADD_BRAND":
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };
    case "EDIT_BRAND":
      return {
        ...state,
        brands: state.brands.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    case "REMOVE_BRAND":
      return {
        ...state,
        brands: state.brands.filter((c) => c._id !== action.payload),
      };

    default:
      return state;
  }
};
