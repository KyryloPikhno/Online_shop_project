import {axiosService} from "./axios.service";
import {urls} from "../configs";


const colorService = {
    getAll: () => axiosService.get(urls.color),
    create: (color) => axiosService.post(urls.color, color),
};

export {colorService}