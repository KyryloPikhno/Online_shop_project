import { urls } from "../configs"

import { axiosService } from "./axios.service"

const brandService = {
  getAll: () => axiosService.get(urls.brand),
  create: (brand) => axiosService.post(urls.brand, brand),
  update: (brand) => axiosService.put(urls.brand, brand),
  delete: (brandId) => axiosService.delete(`${urls.brand}/${brandId}`),
}

export { brandService }
