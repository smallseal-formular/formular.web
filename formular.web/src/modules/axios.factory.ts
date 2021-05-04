import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { publicConfigs } from '@/configGetter';

axios.interceptors.request.use( 
    function (config: AxiosRequestConfig) {
        // config BaseURL from configGetter.publicConfigs
        config.baseURL = publicConfigs.BACKEND_URL;
        return config
    },
    function (error: any) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response: AxiosResponse<any>) {
        return response;
    },
    async function (error: any){
        if (error.response) {
            switch (error.response.statuse) {
                case 404 :
                    console.log("Error 404");
                    break;
                case 500:
                    console.log("Error 500");
                    break
                default:
                    console.log(error.message)
            }
        }
    }
);

export default axios;