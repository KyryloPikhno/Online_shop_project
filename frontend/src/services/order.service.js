import {axiosService} from "./axios.service";
import {urls} from "../configs";


const orderService = {
    get: () => axiosService.get(urls.order),
    getCount: () => axiosService(`${urls.order}/count`),
    getByOrderId: (orderId) => axiosService(`${urls.order}/${orderId}`),
    getUserOrders: (userId) => axiosService(`${urls.order}/user_orders/${userId}`),
    create: (order) => axiosService.post(urls.order, order),
    update: (order, orderId) => axiosService.put(`${urls.order}/${orderId}`, order),
    delete: (orderId) => axiosService.delete(`${urls.order}/${orderId}`)
};

export {orderService};