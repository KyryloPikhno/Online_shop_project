import {axiosService} from "./axios.service";
import {urls} from "../configs";


const brandService = {
    getAll: () => axiosService.get(urls.brand),
    create: (brand) => axiosService.post(urls.brand, brand),
};

export {brandService}