import { ApiClient } from "./api-clients";

export const getCategoryService = async () => {
  const response = await ApiClient.get(`/category/get-category`);
  return response.data;
};

export const createCategoryService = async (payload: { name: string }) => {
  const response = await ApiClient.post(`/category/create`, payload);
  return response.data;
};

export const updateCategoryService = async (payload: {
  id: number;
  name: string;
}) => {
  const response = await ApiClient.put(`/category/update-category`, payload);
  return response.data;
};

export const deleteCategory = async (payload: number[]) => {
  const response = await ApiClient.delete(`/category/delete-category`, {
    data: { ids: payload },
  });

  return response.data;
};
