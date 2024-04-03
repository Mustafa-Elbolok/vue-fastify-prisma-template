import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../store/auth';

const restResInterceptor = (res: AxiosResponse) => res;

const http = (
    baseURL: string,
    resInterceptor: (res: AxiosResponse) => AxiosResponse
) => {
    const instance = axios.create({
        baseURL,
        timeout: 30000,
        withCredentials: true,
        headers: {
            Accept: 'application/json'
        }
    });

    instance.interceptors.response.use(resInterceptor, ({ response }) => {
        const { error } = response.data;
        if (response.status == 401 || response.status == 403) {
            useAuth().logout();
            return;
        }

        return Promise.reject(error);
    });

    return instance;
};

export default http(import.meta.env.VITE_SERVER_URL ?? '/', restResInterceptor);
