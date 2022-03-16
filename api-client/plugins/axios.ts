import axios from "axios";

export const initializeAxios = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT!,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY!,
    },
  });
};
