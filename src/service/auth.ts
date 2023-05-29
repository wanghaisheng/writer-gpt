import {
  LoginResponse,
  ProfileResponse,
  ResetPasswordResponse,
  SignUpResponse,
  VerifyTokenResponse
} from "@interface/service/auth";

import {
  FORGOT_PASSWORD,
  PROFILE,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_UP,
  VERIFY_TOKEN
} from "@constants/api";

import { APIClient } from "./api";

export const register = (payload: {
  email: string;
  password: string;
  name: string;
}) => APIClient.post<SignUpResponse>(SIGN_UP, payload);

export const login = (payload: { email: string; password: string }) =>
  APIClient.post<LoginResponse>(SIGN_IN, {
    ...payload,
    username: payload.email
  });

export const profile = () => APIClient.get<ProfileResponse>(PROFILE);

export const forgotPassword = ({ email }: { email: string }) =>
  APIClient.post(FORGOT_PASSWORD, { email });

export const validateResetToken = ({ token }: { token: string }) =>
  APIClient.get<VerifyTokenResponse>(VERIFY_TOKEN, {
    params: {
      token
    }
  });

export const resetPassword = (payload: {
  token: string;
  newPassword: string;
}) => APIClient.post<ResetPasswordResponse>(RESET_PASSWORD, payload);
