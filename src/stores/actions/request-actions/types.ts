import { TCreateRequestEquipment } from "../../../interfaces/equipment-interface";
import { ERequestActions } from "./constants";

export type TCreateRequestAction = {
  payload: TCreateRequestEquipment;
  type: ERequestActions.CREATE_REQUEST_EQUIPMENT;
  cb?: () => void;
};

export type TGetRequestAction = {
  payload?: number;
  type: ERequestActions.GET_REQUEST_EQUIPMENT;
};

export type TConfirmRequestAction = {
  payload: number;
  type: ERequestActions.CONFIRM_REQUEST_EQUIPMENT;
  cb?: () => void;
};

export type TRejectRequestAction = {
  payload: number;
  type: ERequestActions.REJECT_REQUEST_EQUIPMENT;
  cb?: () => void;
};

export type TDeleteRequestAction = {
  type: ERequestActions.DELETE_REQUEST_EQUIPMENT;
  payload: number[];
  cb?: () => void;
};
