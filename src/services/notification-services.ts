import { ApiClient } from "./api-clients";

export const getNotificationService = async (payload?: number) => {
  const response = await ApiClient.post(
    `/notification/get-notification/${payload}`
  );
  return response.data;
};

export const readNotificationService = async (payload?: number) => {
  const response = await ApiClient.post(
    `/notification/read-notification/${payload}`
  );
  return response.data;
};

export const clearAllNotificationService = async (payload: number) => {
  const response = await ApiClient.delete(
    `/notification/clear-all-notification/${payload}`
  );
  return response.data;
};

export const readAllNotificationService = async (payload: number) => {
  const response = await ApiClient.post(
    `/notification/read-all-notification/${payload}`
  );
  return response.data;
};
