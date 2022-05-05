// 对axios 进行二次封装
import axios from "axios";

import router from "../router";
//  import store from '../store/index';
import { Message } from "element-ui";

/**
 * 提示信息
 */
const tip = (msg) => {
  Message({
    message: msg,
    duration: 1000,
  });
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */

const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};
// 创建axios 实例
let instance = axios.create({
  baseURL: "/api",
  timeout: 500,
});
//请求拦截器:在发请求之前可以检测到
instance.interceptors.request.use((config) => {
  return config;
});
//响应拦截器：服务器的数据已经返回了
instance.interceptors.response.use(
  (response) => {
    let res = response.data; // 接口返回值
    let path = location.hash; // 获取当前路由hash
    if (res.status == 0) {
      return Promise.resolve(res.data);
    } else if (res.status == 10) {
      //没有登录
      // 非首页访问，需要登录
      if (path !== "#/index") {
        toLogin(); // 跳转登录
      }
      return Promise.reject(res.data);
    } else {
      tip(res.msg); // 提示信息
      return Promise.reject(res.data);
    }

    // return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
