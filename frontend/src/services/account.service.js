import { urls } from "../configs"

import { axiosService } from "./axios.service"

const accountService = {
  getByAccess: () => axiosService.get(urls.auth.account),
  logoutAll: (_id) => axiosService.post(urls.auth.logoutAll, { tokenInfo: _id }),
}

export { accountService }
