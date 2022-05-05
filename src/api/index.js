import request from "./ajax";
import mockRequest from "./mockAjax";

// 商品列表
export const reqList = () => mockRequest({ url: "/List", method: "get", });

export const reqTypeNav = () => mockRequest({ url: "/typeNav", method: "get", });

export const reqProductInfo = (id) => request({ url: `/products/${id}`, method: 'get' });

export const reqAddCart = (params) => request({ url: '/carts', method: 'post', data: params });

export const reqCart = () => request({ url: '/carts', method: 'get' });



export const reqUserInfo = () => request({ url: '/user', method: 'get' });

export const getCartSum = () => request({ url: '/carts/products/sum', method: 'get' })

export const updateCart = (id, params) => request({ url: `/carts/${id}`, method: 'put', data: params })

export const deleteCart = (id) => request({ url: `/carts/${id}`, method: 'delete' })

export const allCheckCart = (url) => request({ url: `/${url}`, method: 'put' })




// 登录
export const login = (params) => request({ url: '/user/login', method: 'post', data: params })

export const logout = (params) => request({ url: '/user/logout', method: 'post', data: params })

export const register = (params) => request({ url: '/user/register', method: 'post', data: params })

// 订单
export const getAddress = () => request({ url: '/shippings', method: 'get' })

export const handleAddress = (method, url, params) => request({ url: url, method: method, data: params })


export const submitOrder = (params) => request({ url: '/orders', method: 'post', data: params })


export const getOrder = (id) => request({ url: `/orders/${id}`, method: 'get' })

export const getOrderList = (params) => request({ url: '/orders', method: 'get', params: params })

export const submitPay = (params) => request({ url: '/pay', method: 'post', data: params })












