import { urls } from "../configs"

import { axiosService } from "./axios.service"

const passwordForgotService = {
  forgotPassword: (user) => axiosService.post(urls.auth.passwordForgot, user),
  forgotPasswordAfterForgot: (password) => axiosService.put(urls.auth.passwordForgot, password),
}

export { passwordForgotService }
