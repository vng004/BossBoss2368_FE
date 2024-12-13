import { Category } from "../interface/category";

type State = {
  categories: Category[];
};

export type Action =
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "EDIT_CATEGORY"; payload: Category }
  | { type: "REMOVE_CATEGORY"; payload: string };

export const categoryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c._id !== action.payload),
      };

    default:
      return state;
  }
};
