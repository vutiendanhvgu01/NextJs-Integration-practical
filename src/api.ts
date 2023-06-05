import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CreateEmployee } from "./common/add-employee-modal";
import { Employee } from "./pages/employees";
axios.defaults.baseURL = process.env.BASE_URL;

export const getEmployeeList = (
  params?: AxiosRequestConfig["params"]
): Promise<AxiosResponse<Employee>> => {
  const res = axios.get(`/users/`, { params });
  return res;
};
export const deleteEmployee = (id: string): Promise<AxiosResponse> => {
  return axios.delete(`/users/${id}`);
};

export const getEmployeeDetail = (
  id: string
): Promise<AxiosResponse<Employee>> => {
  return axios.get(`/users/${id}`);
};
export const createEmployee = (
  values: CreateEmployee
): Promise<AxiosResponse> => {
  return axios.post(`/users`, values);
};
