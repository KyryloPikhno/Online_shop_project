// const baseURL = '/api';
const baseURL = "http://localhost:4200"

const urls = {
  similarDevices: "/similarDevices",
  uploadImage: "/uploadImage",
  removeImage: "removeImage",
  category: "/categories",
  devices: "/devices",
  users: "/users",
  brand: "/brands",
  color: "/colors",
  order: "/order",
  auth: {
    passwordForgot: "/auth/password/forgot",
    registration: "/auth/registration",
    logoutAll: "/auth/logoutAll",
    refresh: "/auth/refresh",
    account: "/auth/account",
    login: "/auth/login",
  },
}

export { baseURL, urls }
