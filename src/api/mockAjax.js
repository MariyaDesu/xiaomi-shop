// 对axios 进行二次封装
import axios from "axios";
// 创建axios 实例
let instance = axios.create({
  baseURL: "/mock",
  timeout: 500,
});
//请求拦截器:在发请求之前可以检测到
instance.interceptors.request.use((config) => {
  return config;
});
//响应拦截器：服务器的数据已经返回了
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;