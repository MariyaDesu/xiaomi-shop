export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    meta: { show: true },
    component: () => import("@/view/Home"),
  },
  {
    path: "/product/:id", // 动态路由
    name: "product",
    meta: { show: true },
    component: () => import("@/view/Product"), // 路由懒加载
  },
  {
    path: "/detail/:id", // 动态路由
    meta: { show: true },
    name: "detail",
    component: () => import("@/view/Detail"), // 路由懒加载
  },
  // 购物车
  {
    path: "/cart",
    meta: { show: false },
    name: "cart",
    component: () => import("@/view/Cart"), // 路由懒加载
  },
  // 登录
  {
    path: "/login",
    name: "login",
    meta: { show: false },

    // component: Login
    component: () => import("@/view/Login"), // 路由懒加载
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/view/Order'), // 路由懒加载
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: () => import('@/view/Order/OrderList') // 路由懒加载
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: () => import('@/view/Order/OrderConfirm') // 路由懒加载
      },
      {
        path: 'pay',
        name: 'order-pay',
        component: () => import('@/view/Order/OrderPay') // 路由懒加载
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: () => import('@/view/Order/Alipay') // 路由懒加载
      }
    ]
  }
];
