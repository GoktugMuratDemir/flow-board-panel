export const setTokenLocalStorage = (value: string, accessToken: string) => {
  if (accessToken) {
    localStorage.setItem(value, accessToken);
    //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
  } else {
    localStorage.removeItem(value);
    //   delete axios.defaults.headers.common.Authorization;
  }
};

export const getLocalStorage = (value: string) => {
  return localStorage.getItem(value) || "";
};
