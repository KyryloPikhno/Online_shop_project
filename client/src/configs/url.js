const baseURL ='http://localhost:5400'

const urls = {
    devices: '/devices',
    users:'/users',
    auth:{
        registration:'/auth/registration',
        login:'/auth/login',
        refresh:'/auth/refresh'
    }
}

export {baseURL,urls}