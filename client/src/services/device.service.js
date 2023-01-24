import {axiosService} from "./axios.service";
import {urls} from "../configs";


const deviceService = {
    getAll: () => axiosService.get(urls.devices),
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

export {deviceService}