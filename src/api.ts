import axios, { AxiosRequestConfig } from "axios";
axios.defaults.baseURL = process.env.BASE_URL;
export const getEmployeeList = async (
  params?: AxiosRequestConfig["params"]
) => {
  const res = await axios.get(`/users/`, { params });
  return res.data;
};
export const deleteEmployee = async (id: string) => {
  await axios.delete(`/users/${id}`);
};

export const getEmployeeDetail = async (id: string) => {
  return (await axios.get(`/users/${id}`)).data;
};

