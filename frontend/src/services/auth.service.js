import {axiosService} from "./axios.service";
import {urls} from "../configs";


const _accessTokenKey = 'access';
const _refreshTokenKey = 'refresh';
const _actionTokenKey = 'action';

const authService = {
    register: (user) => axiosService.post(urls.auth.registration, user),

    login: (user) => axiosService.post(urls.auth.login, user),

    refresh: (token) => axiosService.post(urls.auth.refresh, {refresh: token}),

    setTokens: ({accessToken, refreshToken}) => {
        localStorage.setItem(_accessTokenKey, accessToken)
        localStorage.setItem(_refreshTokenKey, refreshToken)
    },

    deleteTokens: () => {
        localStorage.removeItem(_accessTokenKey);
        localStorage.removeItem(_refreshTokenKey);
    },

    getAccessToken: () => localStorage.getItem(_accessTokenKey),

    getRefreshToken: () => localStorage.getItem(_refreshTokenKey),

    getActionToken: () => localStorage.getItem(_actionTokenKey)
};


export {authService};

