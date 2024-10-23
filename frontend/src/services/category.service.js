import { urls } from "../configs"

import { axiosService } from "./axios.service"

const categoryService = {
  getAll: () => axiosService.get(urls.category),
  create: (category) => axiosService.post(urls.category, category),
  update: (category) => axiosService.put(urls.category, category),
  delete: (categoryId) => axiosService.delete(`${urls.category}/${categoryId}`),
}

export { categoryService }
