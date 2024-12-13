import { Accessory } from "../interface/accessory";

type State = {
  accessories: Accessory[];
};

export type Action =
  | { type: "SET_ACCESSORIES"; payload: Accessory[] }
  | { type: "ADD_ACCESSORY"; payload: Accessory }
  | { type: "EDIT_ACCESSORY"; payload: Accessory }
  | { type: "REMOVE_ACCESSORY"; payload: string };

export const accessoryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ACCESSORIES":
      return {
        ...state,
        accessories: action.payload,
      };
    case "ADD_ACCESSORY":
      return {
        ...state,
        accessories: [...state.accessories, action.payload],
      };
    case "EDIT_ACCESSORY":
      return {
        ...state,
        accessories: state.accessories.map((a) =>
          a._id === action.payload._id ? action.payload : a
        ),
      };
    case "REMOVE_ACCESSORY":
      return {
        ...state,
        accessories: state.accessories.filter((a) => a._id !== action.payload),
      };

    default:
      return state;
  }
};
