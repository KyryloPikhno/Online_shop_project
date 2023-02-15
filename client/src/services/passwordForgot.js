import {axiosService} from "./axios.service";
import {urls} from "../configs";

const passwordForgotService = {
    forgotPassword: (user) => axiosService.post(urls.auth.passwordForgot , user),
    forgotPasswordAfterForgot: (password) => axiosService.put(urls.auth.passwordForgot, password),
};

export {passwordForgotService}