import { ECategoryActions } from "./constants";
import {
  TCreateCategoryAction,
  TDeleteCategoryAction,
  TGetCategoryAction,
  TUpdateCategoryAction,
} from "./types";

export const getCategory = (): TGetCategoryAction => ({
  type: ECategoryActions.GET_CATEGORY,
});

export const getCategoryRequestAction = () => ({
  type: ECategoryActions.GET_CATEGORY_REQUEST,
});

export const getCategorySuccessAction = (payload: any) => ({
  type: ECategoryActions.GET_CATEGORY_SUCCESS,
  payload,
});

export const getCategoryFailureAction = (error: any) => ({
  type: ECategoryActions.GET_CATEGORY_FAILURE,
  payload: error,
});

export const createCategoryAction = (
  payload: {
    name: string;
  },
  cb?: () => void
): TCreateCategoryAction => ({
  payload: payload,
  type: ECategoryActions.CREATE_CATEGORY,
  cb,
});

export const createCategoryRequestAction = () => ({
  type: ECategoryActions.CREATE_CATEGORY_REQUEST,
});

export const createCategorySuccessAction = () => ({
  type: ECategoryActions.CREATE_CATEGORY_SUCCESS,
});

export const createCategoryFailureAction = (error: any) => ({
  type: ECategoryActions.CREATE_CATEGORY_FAILURE,
  payload: error,
});

export const updateCategoryAction = (
  payload: { id: number; name: string },
  cb?: () => void
): TUpdateCategoryAction => ({
  type: ECategoryActions.UPDATE_CATEGORY,
  payload,
  cb,
});

export const updateCategoryRequestAction = () => ({
  type: ECategoryActions.UPDATE_CATEGORY_REQUEST,
});

export const updateCategorySuccessAction = () => ({
  type: ECategoryActions.UPDATE_CATEGORY_SUCCESS,
});

export const updateCategoryFailureAction = (error: any) => ({
  type: ECategoryActions.UPDATE_CATEGORY_FAILURE,
  payload: error,
});

export const deleteCategoryAction = (
  payload: number[],
  cb?: () => void
): TDeleteCategoryAction => ({
  type: ECategoryActions.DELETE_CATEGORY,
  payload,
  cb,
});

export const deleteCategoryRequestAction = () => ({
  type: ECategoryActions.DELETE_CATEGORY_REQUEST,
});

export const deleteCategorySuccessAction = () => ({
  type: ECategoryActions.DELETE_CATEGORY_SUCCESS,
});

export const deleteCategoryFailureAction = (error: any) => ({
  type: ECategoryActions.DELETE_CATEGORY_FAILURE,
  payload: error,
});
