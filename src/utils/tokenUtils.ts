const ACCESS_TOKEN_KEY = "accessToken";
const ACCESS_OAUTH_TOKEN_KEY = "Token";

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const setOAuthToken = (Token: string) => {
  localStorage.setItem(ACCESS_OAUTH_TOKEN_KEY, Token);
};

export const getOAuthToken = (): string | null => {
  return localStorage.getItem(ACCESS_OAUTH_TOKEN_KEY);
};

export const removeOAuthToken = () => {
  localStorage.removeItem(ACCESS_OAUTH_TOKEN_KEY);
};
