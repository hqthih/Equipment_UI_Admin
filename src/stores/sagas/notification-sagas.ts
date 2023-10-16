import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  TClearAllNotificationAction,
  TGetNotificationAction,
  TReadAllNotificationAction,
  TReadNotificationAction,
} from "../actions/notification-actions/types";
import {
  clearAllNotificationFailureAction,
  clearAllNotificationRequestAction,
  clearAllNotificationSuccessAction,
  getNotificationFailureAction,
  getNotificationRequestAction,
  getNotificationSuccessAction,
  readAllNotificationFailureAction,
  readAllNotificationRequestAction,
  readAllNotificationSuccessAction,
  readNotificationFailureAction,
  readNotificationRequestAction,
  readNotificationSuccessAction,
} from "../actions/notification-actions";
import { INotification } from "../../interfaces/user-interfaces";
import { toastError } from "../../utils/notifications-utils";
import { ENotificationActions } from "../actions/notification-actions/constants";
import {
  clearAllNotificationService,
  getNotificationService,
  readAllNotificationService,
  readNotificationService,
} from "../../services/notification-services";

function* getNotificationSaga({ payload }: TGetNotificationAction) {
  try {
    yield put(getNotificationRequestAction());
    const response: INotification[] = yield call(
      getNotificationService,
      payload
    );
    yield put(getNotificationSuccessAction(response));
  } catch (error: any) {
    yield put(getNotificationFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get equipment failure!!");
  }
}

function* readNotificationSaga({ payload, cb }: TReadNotificationAction) {
  try {
    yield put(readNotificationRequestAction());
    yield call(readNotificationService, payload);
    yield put(readNotificationSuccessAction());
    cb?.();
  } catch (error: any) {
    yield put(readNotificationFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get equipment failure!!");
  }
}

function* clearAllNotificationSaga({
  payload,
  cb,
}: TClearAllNotificationAction) {
  try {
    yield put(clearAllNotificationRequestAction());
    yield call(clearAllNotificationService, payload);
    yield put(clearAllNotificationSuccessAction());
    cb?.();
  } catch (error: any) {
    yield put(clearAllNotificationFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get equipment failure!!");
  }
}

function* readAllNotificationSaga({ payload, cb }: TReadAllNotificationAction) {
  try {
    yield put(readAllNotificationRequestAction());
    yield call(readAllNotificationService, payload);
    yield put(readAllNotificationSuccessAction());
    cb?.();
  } catch (error: any) {
    yield put(readAllNotificationFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get equipment failure!!");
  }
}

function* watchOnAuth() {
  yield takeLatest(ENotificationActions.GET_NOTIFICATION, getNotificationSaga);
  yield takeLatest(
    ENotificationActions.READ_ALL_NOTIFICATION,
    readAllNotificationSaga
  );
  yield takeLatest(
    ENotificationActions.READ_NOTIFICATION,
    readNotificationSaga
  );
  yield takeLatest(
    ENotificationActions.CLEAR_ALL_NOTIFICATION,
    clearAllNotificationSaga
  );
}

export default function* notificationSaga() {
  yield all([fork(watchOnAuth)]);
}
