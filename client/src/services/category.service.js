import {axiosService} from "./axios.service";
import {urls} from "../configs";


const categoryService = {
    getAll: () => axiosService.get(urls.category),
    create: (category) => axiosService.post(urls.category, category),
};

export {categoryService}