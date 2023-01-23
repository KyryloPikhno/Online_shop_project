const baseURL = 'http://localhost:5400';

const urls = {
    devices: '/devices',
    users: '/users',
    uploadImage: '/uploadImage',
    removeImage: 'removeImage',
    auth: {
        registration: '/auth/registration',
        login: '/auth/login',
        refresh: '/auth/refresh',
        account: '/auth/account',
        logoutAll: '/auth/logoutAll'
    }
};

export {baseURL, urls};