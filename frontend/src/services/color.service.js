import { urls } from "../configs"

import { axiosService } from "./axios.service"

const colorService = {
  getAll: () => axiosService.get(urls.color),
  create: (color) => axiosService.post(urls.color, color),
  update: (color) => axiosService.put(urls.color, color),
  delete: (colorId) => axiosService.delete(`${urls.color}/${colorId}`),
}

export { colorService }
