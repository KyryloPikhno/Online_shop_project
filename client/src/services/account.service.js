import {axiosService} from "./axios.service";
import {urls} from "../configs";


const accountService = {
    getByAccess: () => axiosService.get(urls.auth.account),
    logoutAll: (_id) => axiosService.post(urls.auth.logoutAll, {tokenInfo: _id}),
};

export {accountService};