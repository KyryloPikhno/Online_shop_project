import axios from "axios";

import {baseURL} from "../configs";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history';


let history = createBrowserHistory();

const axiosService = axios.create({baseURL});

let isRefreshing = false

axiosService.interceptors.request.use((config) => {
    let access = authService.getAccessToken()

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
});

axiosService.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        let refresh = authService.getRefreshToken()

        if (error.response?.status === 401 && refresh && !isRefreshing) {
            isRefreshing = true
            try {
                let {data} = await authService.refresh(refresh)

                console.log(data);

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