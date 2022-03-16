import axios, { AxiosError } from "axios";

export const handleApiError = async (error: Error | AxiosError | unknown) => {
  if (axios.isAxiosError(error)) {
    return error;
  }
  if (error instanceof Error) {
    return error;
  }
  return Promise.reject(error);
};
