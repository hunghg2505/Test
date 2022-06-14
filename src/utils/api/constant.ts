export const BACKEND_URL = process.env.REACT_APP_API_DOMAIN;

export const API_PATH = {
  // Account
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/sign-up',
  REFRESH_TOKEN: '/auth/refresh-token',

  // Data Subject Management
  FORGOT_ME: (id: string | number) => `/data-subject/forgot-me/${id}`,
  USER_PROFILE_DETAIL: (id: string | number) => `/data-subject/user-profiles/${id}`,
  USER_PROFILES: '/data-subject/user-profiles'
};
