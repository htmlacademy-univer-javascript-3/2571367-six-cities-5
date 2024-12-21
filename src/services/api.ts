import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {toast} from 'react-toastify';
import { AxiosError} from 'axios';
import {getToken} from './token';
import { StatusCodes } from 'http-status-codes';
import { APIRoute } from '../mocks/apiRoutes';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
  [StatusCodes.FORBIDDEN]: true,
};

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        if (shouldDisplayError(error.response)) {
          const detailMessage = error.response.data;

          if (error.config?.url?.includes(APIRoute.Login)) {
            toast.error(`Ошибка авторизации:  ${detailMessage.message}`);
          } else if (error.config?.url?.includes(APIRoute.FavouriteList)) {
            toast.warn(`Ошибка загрузки избранного:  ${detailMessage.message}`);
          } else if (error.config?.url?.includes(APIRoute.OfferList)) {
            toast.warn(`Ошибка загрузки предложений:   ${detailMessage.message}`);
          } else {
            toast.error(`Произошла ошибка:  ${detailMessage.message}`);
          }
        }
      } else if (error.request) {
        toast.error('Ошибка сети. Проверьте подключение.');
      } else {
        toast.error(`Произошла неизвестная ошибка: ${error.message}`);
      }

      throw error;
    }
  );

  return api;
};
