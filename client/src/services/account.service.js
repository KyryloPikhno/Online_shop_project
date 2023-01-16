import {axiosService} from "./axios.service";
import {urls} from "../configs";


const accountService = {
    getByAccess: () => axiosService.get(urls.auth.account)
};

export {accountService};