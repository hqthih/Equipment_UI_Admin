import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { ECategoryActions } from "../actions/category-actions/constants";
import {
  getCategoryFailureAction,
  getCategoryRequestAction,
  getCategorySuccessAction,
} from "../actions/category-actions";
import { ICategory } from "../../interfaces/category-interface";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import { getCategoryService } from "../../services/category-services";
import {
  confirmRequestEquipmentFailureAction,
  confirmRequestEquipmentRequestAction,
  confirmRequestEquipmentSuccessAction,
  createRequestEquipmentAction,
  createRequestEquipmentFailureAction,
  createRequestEquipmentRequestAction,
  createRequestEquipmentSuccessAction,
  deleteRequestEquipmentFailureAction,
  deleteRequestEquipmentRequestAction,
  deleteRequestEquipmentSuccessAction,
  getRequestEquipmentFailureAction,
  getRequestEquipmentRequestAction,
  getRequestEquipmentSuccessAction,
  rejectRequestEquipmentFailureAction,
  rejectRequestEquipmentRequestAction,
  rejectRequestEquipmentSuccessAction,
} from "../actions/request-actions";
import { TRequestEquipment } from "../../interfaces/equipment-interface";
import { ERequestActions } from "../actions/request-actions/constants";
import {
  TConfirmRequestAction,
  TCreateRequestAction,
  TDeleteRequestAction,
  TGetRequestAction,
  TRejectRequestAction,
} from "../actions/request-actions/types";
import {
  confirmRequestEquipmentService,
  createRequestEquipmentService,
  deleteRequest,
  getRequestEquipmentService,
  rejectRequestEquipmentService,
} from "../../services/request-services";

function* createRequestEquipment({ payload, cb }: TCreateRequestAction) {
  try {
    yield put(createRequestEquipmentRequestAction());
    const response: TRequestEquipment = yield call(
      createRequestEquipmentService,
      payload
    );
    yield put(createRequestEquipmentSuccessAction());
    toastSuccess("Create request equipment success!!");
    cb?.();
  } catch (error: any) {
    yield put(createRequestEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get request equipment failure!!");
  }
}

function* getRequestEquipment({ payload }: TGetRequestAction) {
  try {
    yield put(getRequestEquipmentRequestAction());
    const response: TRequestEquipment[] = yield call(
      getRequestEquipmentService,
      payload
    );
    yield put(getRequestEquipmentSuccessAction(response));
  } catch (error: any) {
    yield put(getRequestEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get request equipment failure!!");
  }
}

function* confirmRequestEquipment({ payload, cb }: TConfirmRequestAction) {
  try {
    yield put(confirmRequestEquipmentRequestAction());
    yield call(confirmRequestEquipmentService, payload);
    yield put(confirmRequestEquipmentSuccessAction());
    cb?.();
  } catch (error: any) {
    yield put(confirmRequestEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Confirm request equipment failure!!");
  }
}

function* rejectRequestEquipment({ payload, cb }: TRejectRequestAction) {
  try {
    yield put(rejectRequestEquipmentRequestAction());
    yield call(rejectRequestEquipmentService, payload);
    yield put(rejectRequestEquipmentSuccessAction());
    cb?.();
    toastSuccess("Reject request equipment success!!");
  } catch (error: any) {
    yield put(rejectRequestEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Reject request equipment failure!!");
  }
}

function* deleteRequestSaga({ payload, cb }: TDeleteRequestAction) {
  try {
    yield put(deleteRequestEquipmentRequestAction());
    yield call(deleteRequest, payload);
    yield put(deleteRequestEquipmentSuccessAction());
    cb?.();
    toastSuccess("Delete Request success!!");
  } catch (error: any) {
    yield put(deleteRequestEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Delete Request failure!!");
  }
}

function* watchOnAuth() {
  yield takeLatest(ERequestActions.GET_REQUEST_EQUIPMENT, getRequestEquipment);
  yield takeLatest(
    ERequestActions.CREATE_REQUEST_EQUIPMENT,
    createRequestEquipment
  );
  yield takeLatest(
    ERequestActions.CONFIRM_REQUEST_EQUIPMENT,
    confirmRequestEquipment
  );
  yield takeLatest(
    ERequestActions.REJECT_REQUEST_EQUIPMENT,
    rejectRequestEquipment
  );
  yield takeLatest(ERequestActions.DELETE_REQUEST_EQUIPMENT, deleteRequestSaga);
}

export default function* requestEquipmentSaga() {
  yield all([fork(watchOnAuth)]);
}
