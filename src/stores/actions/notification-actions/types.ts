import { ENotificationActions } from "./constants";

export type TGetNotificationAction = {
  payload: number;
  type: ENotificationActions.GET_NOTIFICATION;
};

export type TReadNotificationAction = {
  cb?: () => void;
  payload?: number;
  type: ENotificationActions.READ_NOTIFICATION;
};

export type TClearAllNotificationAction = {
  cb?: () => void;
  payload: number;
  type: ENotificationActions.CLEAR_ALL_NOTIFICATION;
};

export type TReadAllNotificationAction = {
  cb?: () => void;
  payload: number;
  type: ENotificationActions.READ_ALL_NOTIFICATION;
};
