import axiosInstance from './axiosinstance';

export const loginapi = (data: { username: string; password: string }) => {
  return axiosInstance.post('/auth/login', data);
};

export const registerapi = (data: { email: string; username: string; password: string }) => {
  return axiosInstance.post('/auth/register', data);
};