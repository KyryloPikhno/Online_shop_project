const baseURL = '/api';

const urls = {
    similarDevices: '/similarDevices',
    uploadImage: '/uploadImage',
    removeImage: 'removeImage',
    category: '/category',
    devices: '/devices',
    users: '/users',
    brand: '/brand',
    color: '/color',
    order: '/order',
    auth: {
        passwordForgot: '/auth/password/forgot',
        registration: '/auth/registration',
        logoutAll: '/auth/logoutAll',
        refresh: '/auth/refresh',
        account: '/auth/account',
        login: '/auth/login',
    }
};

export {baseURL, urls};