import { TCreateRequestEquipment } from "../interfaces/equipment-interface";
import { ApiClient } from "./api-clients";

export const getRequestEquipmentService = async (payload?: number) => {
  const response = await ApiClient.get(`/request/get-all-request`);
  return response.data;
};

export const confirmRequestEquipmentService = async (payload: number) => {
  const response = await ApiClient.post(`/request/confirm-request/${payload}`);
  return response.data;
};

export const createRequestEquipmentService = async (
  payload: TCreateRequestEquipment
) => {
  const response = await ApiClient.post(`/request/create-request`, payload);
  return response.data;
};

export const rejectRequestEquipmentService = async (payload: number) => {
  const response = await ApiClient.post(`/request/reject-request/${payload}`);
  return response.data;
};

export const deleteRequest = async (payload: number[]) => {
  const response = await ApiClient.delete(`/request/delete-request`, {
    data: { ids: payload },
  });

  return response.data;
};
