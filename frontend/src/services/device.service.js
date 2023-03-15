import {axiosService} from "./axios.service";
import {urls} from "../configs";


const deviceService = {
    getAll: (limit , page = 1, name, price_lte, category, price_gte, color, brand) => axiosService.get(urls.devices, {
        params: {
            limit, page, name, price_lte, category, price_gte, color, brand
        }
    }),
    getById: (id) => axiosService.get(`${urls.devices}/${id}`),
    create: (device) => axiosService.post(urls.devices, device),
    delete: (id) => axiosService.delete(`${urls.devices}/${id}`),
    removeImage: (id, fileName) => axiosService.put(`${urls.removeImage}/${id}`, {fileName}),
    uploadImage: (id, formData) => axiosService.put(`${urls.devices}/${urls.uploadImage}/${id}`, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }),
};

export {deviceService};