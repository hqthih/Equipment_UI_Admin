import { ENotificationActions } from "./constants";
import {
  TClearAllNotificationAction,
  TGetNotificationAction,
  TReadAllNotificationAction,
  TReadNotificationAction,
} from "./types";

export const getNotificationAction = (
  payload: number
): TGetNotificationAction => ({
  payload,
  type: ENotificationActions.GET_NOTIFICATION,
});

export const getNotificationRequestAction = () => ({
  type: ENotificationActions.GET_NOTIFICATION_REQUEST,
});

export const getNotificationSuccessAction = (payload: any) => ({
  type: ENotificationActions.GET_NOTIFICATION_SUCCESS,
  payload,
});

export const getNotificationFailureAction = (error: any) => ({
  type: ENotificationActions.GET_NOTIFICATION_FAILURE,
  payload: error,
});

export const readNotificationAction = (
  payload?: number,
  cb?: () => void
): TReadNotificationAction => ({
  cb,
  payload,
  type: ENotificationActions.READ_NOTIFICATION,
});

export const readNotificationRequestAction = () => ({
  type: ENotificationActions.READ_NOTIFICATION_REQUEST,
});

export const readNotificationSuccessAction = () => ({
  type: ENotificationActions.READ_NOTIFICATION_SUCCESS,
});

export const readNotificationFailureAction = (error: any) => ({
  type: ENotificationActions.READ_NOTIFICATION_FAILURE,
  payload: error,
});

export const clearAllNotificationAction = (
  payload: number,
  cb?: () => void
): TClearAllNotificationAction => ({
  cb,
  payload,
  type: ENotificationActions.CLEAR_ALL_NOTIFICATION,
});

export const clearAllNotificationRequestAction = () => ({
  type: ENotificationActions.CLEAR_ALL_NOTIFICATION_REQUEST,
});

export const clearAllNotificationSuccessAction = () => ({
  type: ENotificationActions.CLEAR_ALL_NOTIFICATION_SUCCESS,
});

export const clearAllNotificationFailureAction = (error: any) => ({
  type: ENotificationActions.CLEAR_ALL_NOTIFICATION_FAILURE,
  payload: error,
});

export const readAllNotificationAction = (
  payload: number,
  cb?: () => void
): TReadAllNotificationAction => ({
  cb,
  payload,
  type: ENotificationActions.READ_ALL_NOTIFICATION,
});

export const readAllNotificationRequestAction = () => ({
  type: ENotificationActions.READ_ALL_NOTIFICATION_REQUEST,
});

export const readAllNotificationSuccessAction = () => ({
  type: ENotificationActions.READ_ALL_NOTIFICATION_SUCCESS,
});

export const readAllNotificationFailureAction = (error: any) => ({
  type: ENotificationActions.READ_ALL_NOTIFICATION_FAILURE,
  payload: error,
});
