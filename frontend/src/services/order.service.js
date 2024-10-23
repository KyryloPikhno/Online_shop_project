import { urls } from "../configs"

import { axiosService } from "./axios.service"

const orderService = {
  get: () => axiosService.get(urls.order),
  getCount: () => axiosService(`${urls.order}/count`),
  getByOrderId: (orderId) => axiosService(`${urls.order}/${orderId}`),
  getUserOrders: (userId) => axiosService(`${urls.order}/user_orders/${userId}`),
  create: (orderInfo) => axiosService.post(urls.order, { orderInfo }),
  update: (orderId, orderInfo) => axiosService.put(`${urls.order}/${orderId}`, { orderInfo }),
  delete: (orderId) => axiosService.delete(`${urls.order}/${orderId}`),
}

export { orderService }
