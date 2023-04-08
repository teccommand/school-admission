import axios from 'axios';
import Cookies from 'js-cookie';

// Environment
const API = import.meta.env.VITE_API;
const SANCTUM = import.meta.env.VITE_SANCTUM;

const axiosInstance = axios.create({
    baseURL: API,
    timeout: 1000,
    withCredentials: true,
});

const onRequest = (config: any) => {
    if (
        (config.method == 'post' ||
            config.method == 'put' ||
            config.method == 'delete') &&
        !Cookies.get('XSRF-TOKEN')
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return setCSRFToken().then((response) => config);
    }
    return config;
};

const onResponseError = (error: any) => {
    if (error.response.status === 419) {
        setCSRFToken();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (window.location = '/');
    }
    if (error.response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (window.location = '/');
    }
    return Promise.reject(error);
};

const setCSRFToken = () => {
    return axiosInstance.get(SANCTUM + '/sanctum/csrf-cookie');
};

axiosInstance.interceptors.request.use(onRequest, null);
axiosInstance.interceptors.response.use(null, onResponseError);

export default axiosInstance;
