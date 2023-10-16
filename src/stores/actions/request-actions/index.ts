import { TGetCategoryAction } from "../category-actions/types";
import {
  TCreateRequestEquipment,
  TRequestEquipment,
} from "./../../../interfaces/equipment-interface";
import { ERequestActions } from "./constants";
import {
  TConfirmRequestAction,
  TCreateRequestAction,
  TDeleteRequestAction,
  TGetRequestAction,
  TRejectRequestAction,
} from "./types";

export const createRequestEquipmentAction = (
  payload: TCreateRequestEquipment,
  cb?: () => void
): TCreateRequestAction => ({
  payload,
  type: ERequestActions.CREATE_REQUEST_EQUIPMENT,
  cb,
});

export const createRequestEquipmentRequestAction = () => ({
  type: ERequestActions.CREATE_REQUEST_EQUIPMENT_REQUEST,
});

export const createRequestEquipmentSuccessAction = () => ({
  type: ERequestActions.CREATE_REQUEST_EQUIPMENT_SUCCESS,
});

export const createRequestEquipmentFailureAction = (error: any) => ({
  type: ERequestActions.CREATE_REQUEST_EQUIPMENT_FAILURE,
  payload: error,
});

export const getRequestEquipmentAction = (
  payload?: number
): TGetRequestAction => ({
  payload,
  type: ERequestActions.GET_REQUEST_EQUIPMENT,
});

export const getRequestEquipmentRequestAction = () => ({
  type: ERequestActions.GET_REQUEST_EQUIPMENT_REQUEST,
});

export const getRequestEquipmentSuccessAction = (
  payload: TRequestEquipment[]
) => ({
  type: ERequestActions.GET_REQUEST_EQUIPMENT_SUCCESS,
  payload,
});

export const getRequestEquipmentFailureAction = (error: any) => ({
  type: ERequestActions.GET_REQUEST_EQUIPMENT_FAILURE,
  payload: error,
});

export const confirmRequestEquipmentAction = (
  payload: number,
  cb?: () => void
): TConfirmRequestAction => ({
  payload,
  type: ERequestActions.CONFIRM_REQUEST_EQUIPMENT,
  cb,
});

export const confirmRequestEquipmentRequestAction = () => ({
  type: ERequestActions.CONFIRM_REQUEST_EQUIPMENT_REQUEST,
});

export const confirmRequestEquipmentSuccessAction = () => ({
  type: ERequestActions.CONFIRM_REQUEST_EQUIPMENT_SUCCESS,
});

export const confirmRequestEquipmentFailureAction = (error: any) => ({
  type: ERequestActions.CONFIRM_REQUEST_EQUIPMENT_FAILURE,
  payload: error,
});

export const rejectRequestEquipmentAction = (
  payload: number,
  cb?: () => void
): TRejectRequestAction => ({
  payload,
  type: ERequestActions.REJECT_REQUEST_EQUIPMENT,
  cb,
});

export const rejectRequestEquipmentRequestAction = () => ({
  type: ERequestActions.REJECT_REQUEST_EQUIPMENT_REQUEST,
});

export const rejectRequestEquipmentSuccessAction = () => ({
  type: ERequestActions.REJECT_REQUEST_EQUIPMENT_SUCCESS,
});

export const rejectRequestEquipmentFailureAction = (error: any) => ({
  type: ERequestActions.REJECT_REQUEST_EQUIPMENT_FAILURE,
  payload: error,
});

export const deleteRequestEquipmentAction = (
  payload: number[],
  cb?: () => void
): TDeleteRequestAction => ({
  type: ERequestActions.DELETE_REQUEST_EQUIPMENT,
  payload,
  cb,
});

export const deleteRequestEquipmentRequestAction = () => ({
  type: ERequestActions.DELETE_REQUEST_EQUIPMENT_REQUEST,
});

export const deleteRequestEquipmentSuccessAction = () => ({
  type: ERequestActions.DELETE_REQUEST_EQUIPMENT_SUCCESS,
});

export const deleteRequestEquipmentFailureAction = (error: any) => ({
  type: ERequestActions.DELETE_REQUEST_EQUIPMENT_FAILURE,
  payload: error,
});
