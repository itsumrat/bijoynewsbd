import axios, {AxiosRequestConfig} from 'axios';

const httpClient = axios.create({});

httpClient.interceptors.request.use(
    ( config): AxiosRequestConfig =>{
        const originalConfig = config;
        // originalConfig.baseURL = process.env.BACKEND_BASE_URL
        const access_token = localStorage.getItem('access_token');
        originalConfig.headers.authorization = `Bearer ${access_token}`
        return originalConfig;
    }
)
export default httpClient;
