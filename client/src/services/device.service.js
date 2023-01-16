import {axiosService} from "./axios.service";
import {urls} from "../configs";


const deviceService = {
    getAll: () => axiosService.get(urls.devices)
};

export {deviceService}