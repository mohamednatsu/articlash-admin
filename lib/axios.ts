// lib/axios.ts
export const API_URL = "https://articlash.runasp.net/api";
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios';

interface RefreshTokenResponse {
       accessToken: string;
       refreshToken?: string; // optional in case your API rotates refresh tokens
}

let isRefreshing = false;
let failedQueue: {
       resolve: (token: string) => void;
       reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
       failedQueue.forEach(prom => {
              if (error) {
                     prom.reject(error);
              } else if (token) {
                     prom.resolve(token);
              }
       });
       failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
       baseURL: API_URL,
});

// Add Authorization header to each request
interface AuthHeaders {
       [key: string]: string;
}


axiosInstance.interceptors.request.use(
       (config: InternalAxiosRequestConfig) => {
              const token: string | null = localStorage.getItem('jwtToken');
              if (token && config.headers) {
                     config.headers['Authorization'] = `Bearer ${token}`;
              }
              return config;
       },
       (error: unknown) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
       (response: AxiosResponse) => response,
       async (error: AxiosError): Promise<AxiosResponse | void> => {
              const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

              // If access token expired and we haven't retried yet
              if (error.response?.status === 401 && !originalRequest._retry) {
                     if (isRefreshing) {
                            return new Promise((resolve, reject) => {
                                   failedQueue.push({ resolve, reject });
                            }).then(token => {
                                   if (originalRequest.headers) {
                                          originalRequest.headers['Authorization'] = `Bearer ${token}`;
                                   }
                                   return axiosInstance(originalRequest);
                            });
                     }

                     originalRequest._retry = true;
                     isRefreshing = true;

                     const refreshToken = localStorage.getItem('refreshToken');
                     if (!refreshToken) {
                            return Promise.reject(error); // logout user or redirect
                     }

                     try {
                            const response = await axios.get<RefreshTokenResponse>(
                                   API_URL + '/auth/refresh',
                            );

                            const newAccessToken = response.data.accessToken;
                            const newRefreshToken = response.data.refreshToken;

                            localStorage.setItem('jwtToken', newAccessToken);
                            if (newRefreshToken) {
                                   localStorage.setItem('refreshToken', newRefreshToken);
                            }

                            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                            if (originalRequest.headers) {
                                   originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            }

                            processQueue(null, newAccessToken);
                            return axiosInstance(originalRequest);
                     } catch (err: unknown) {
                            if (axios.isAxiosError(err)) {
                                   processQueue(err as AxiosError, null);
                            } else {
                                   processQueue({
                                          ...error,
                                          message: 'An unknown error occurred',
                                          isAxiosError: true,
                                          toJSON: () => ({ message: 'An unknown error occurred' }),
                                   } as AxiosError, null);
                            }
                            processQueue(err as AxiosError, null);
                            // optionally clear tokens and redirect to login
                            localStorage.removeItem('jwtToken');

                            return Promise.reject(err);
                     } finally {
                            isRefreshing = false;
                     }
              }

              return Promise.reject(error);
       }
);

export default axiosInstance;
