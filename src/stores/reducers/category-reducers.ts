import { ICategory } from "../../interfaces/category-interface";
import { ECategoryActions } from "../actions/category-actions/constants";

type TCategoryState = {
  categories: ICategory[];
};

const initialState: TCategoryState = {
  categories: [],
};

const categoryReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TCategoryState => {
  switch (action.type) {
    case ECategoryActions.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
