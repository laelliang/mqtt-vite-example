import axios from 'axios'


// 创建 Axios 实例
const instance = axios.create()

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以进行一些处理，例如添加请求头
    // config.headers['Authorization'] = 'Bearer your-access-token';
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.data && response.data.code !== 0) {
      return Promise.reject(new Error(response.data.msg))
    }
    return response.data.data;
  },
  error => {
    // 处理响应错误
    return Promise.reject(error)
  }
);

export default instance;