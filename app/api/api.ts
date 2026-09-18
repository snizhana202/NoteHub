import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: "https://notehub-vnly.onrender.com",
  withCredentials: true,
});
