import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { ECategoryActions } from "../actions/category-actions/constants";
import {
  createCategoryAction,
  createCategoryFailureAction,
  createCategoryRequestAction,
  createCategorySuccessAction,
  deleteCategoryFailureAction,
  deleteCategoryRequestAction,
  deleteCategorySuccessAction,
  getCategoryFailureAction,
  getCategoryRequestAction,
  getCategorySuccessAction,
  updateCategoryFailureAction,
  updateCategoryRequestAction,
  updateCategorySuccessAction,
} from "../actions/category-actions";
import { ICategory } from "../../interfaces/category-interface";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import {
  createCategoryService,
  deleteCategory,
  getCategoryService,
  updateCategoryService,
} from "../../services/category-services";
import {
  TCreateCategoryAction,
  TDeleteCategoryAction,
  TUpdateCategoryAction,
} from "../actions/category-actions/types";

function* getCategorySaga() {
  try {
    yield put(getCategoryRequestAction());
    const response: ICategory[] = yield call(getCategoryService);
    yield put(getCategorySuccessAction(response));
  } catch (error: any) {
    yield put(getCategoryFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get category failure!!");
  }
}

function* createCategorySaga({ payload, cb }: TCreateCategoryAction) {
  try {
    yield put(createCategoryRequestAction());
    yield call(createCategoryService, payload);
    yield put(createCategorySuccessAction());
    cb?.();
  } catch (error: any) {
    yield put(createCategoryFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Create category failure!!");
  }
}

function* updateCategorySaga({ payload, cb }: TUpdateCategoryAction) {
  try {
    yield put(updateCategoryRequestAction());
    yield call(updateCategoryService, payload);
    yield put(updateCategorySuccessAction());
    cb?.();
    toastSuccess("Update Category success!!");
  } catch (error: any) {
    yield put(updateCategoryFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Update Category failure!!");
  }
}

function* deleteCategorySaga({ payload, cb }: TDeleteCategoryAction) {
  try {
    yield put(deleteCategoryRequestAction());
    yield call(deleteCategory, payload);
    yield put(deleteCategorySuccessAction());
    cb?.();
    toastSuccess("Delete Category success!!");
  } catch (error: any) {
    yield put(deleteCategoryFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Delete Category failure!!");
  }
}

function* watchOnAuth() {
  yield takeLatest(ECategoryActions.GET_CATEGORY, getCategorySaga);
  yield takeLatest(ECategoryActions.CREATE_CATEGORY, createCategorySaga);
  yield takeLatest(ECategoryActions.DELETE_CATEGORY, deleteCategorySaga);
  yield takeLatest(ECategoryActions.UPDATE_CATEGORY, updateCategorySaga);
}

export default function* categorySaga() {
  yield all([fork(watchOnAuth)]);
}
