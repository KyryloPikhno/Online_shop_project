import {axiosService} from "./axios.service";
import {urls} from "../configs";


const brandService = {
    getAll: () => axiosService.get(urls.brand),
    create: (brand) => axiosService.post(urls.brand, brand),
    update: (brand) => axiosService.put(urls.brand, brand),
    delete: (brandId) => axiosService.delete(`${urls.brand}/${brandId}`)
};

export {brandService};