import {axiosService} from "./axios.service";
import {urls} from "../configs";


const deviceService = {
    getAll: () => axiosService.get(urls.devices),
    create: (device) => axiosService.post(urls.devices, device),
    uploadImage: (id, formData) => axiosService.put(`${urls.devices}/${urls.uploadImage}/${id}`, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }),
    removeImage: (id, fileName) => axiosService.put(`${urls.removeImage}/${id}`, {fileName})
};

export {deviceService}