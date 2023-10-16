import { ECategoryActions } from "./constants";

export type TGetCategoryAction = {
  type: ECategoryActions.GET_CATEGORY;
};

export type TCreateCategoryAction = {
  payload: { name: string };
  type: ECategoryActions.CREATE_CATEGORY;
  cb?: () => void;
};

export type TUpdateCategoryAction = {
  type: ECategoryActions.UPDATE_CATEGORY;
  payload: { id: number; name: string };
  cb?: () => void;
};

export type TDeleteCategoryAction = {
  type: ECategoryActions.DELETE_CATEGORY;
  payload: number[];
  cb?: () => void;
};
