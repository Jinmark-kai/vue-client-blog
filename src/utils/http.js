import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_APIURL,
    timeout: 1000 * 60 // 超时时间为 1 分钟
})

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        if (config.url === '/comment/add') {
            // 检查本地是否存在用户登录信息
            const token = localStorage.getItem('token');

            if (!token) {
                // 如果不存在登录信息，则取消当前请求并跳转到登录页面
                window.location.href = '/login';
                return Promise.reject('未登录');
            }

            // 如果存在登录信息，则添加 token 到请求头中
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        return Promise.reject(err)
    }
)

export default instance