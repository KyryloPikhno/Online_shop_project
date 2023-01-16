import {createBrowserHistory} from 'history';
import axios from "axios";

import {authService} from "./auth.service";
import {baseURL} from "../configs";


let history = createBrowserHistory();

const axiosService = axios.create({baseURL});

let isRefreshing = false

axiosService.interceptors.request.use((config) => {
    let access = authService.getAccessToken()

    if (access) {
        config.headers.Authorization = access

        config.headers.Authorization = `Bearer ${access}`
    }
    return config
});

axiosService.interceptors.response.use((config) => {
        return config
    },
    async (error) => {

        console.log(error);
        let refresh = authService.getRefreshToken()

        if (error.response?.status === 401 && refresh && !isRefreshing) {
            console.log(error.response);

            isRefreshing = true
            try {
                let {data} = await authService.refresh(refresh)

                authService.setTokens(data)
            } catch (e) {
                authService.deleteTokens()

                history.replace('/login?expSession=true')
            }

            isRefreshing = false
            return axiosService(error.config)
        }

        return Promise.reject(error)
    }
);

export {axiosService, history}