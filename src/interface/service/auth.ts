export type SignUpResponse = {
  token: string;
  name: string;
  email: string;
};

export type LoginResponse = {
  token: string;
  name: string;
  email: string;
};

export type ProfileResponse = {
  id: string;
  email: string;
  name: string;
};

export type VerifyTokenResponse = {
  validToken: boolean;
};

export type ResetPasswordResponse = LoginResponse;
