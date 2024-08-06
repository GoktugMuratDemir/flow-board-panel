import { serviceAxios } from "./axios";

export interface AuthorizationResponse {
  userToken: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginRequest = async (data: LoginFormValues) => {
  const response = await serviceAxios.post("/auth/login", data);
  return response.data.data;
};
