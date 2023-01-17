import {axiosService} from "./axios.service";
import {urls} from "../configs";


const deviceService = {
    getAll: () => axiosService.get(urls.devices),
    create: (info) => axiosService.post(urls.devices, info,{
        headers:{
            'content-type':'multipart/form-data'
        }
    })
};

export {deviceService}