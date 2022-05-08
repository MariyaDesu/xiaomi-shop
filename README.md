[TOC]

# 1. 项目说明
1. 仿PC端小米商城，采用vue.js(2.x)+elementUI开发。
2. 主要包含页面：商城首页、商品详情页、购物车页、下单页、登录页。
3. 代码分支：master分支为：静态页面+接口交互
4. 前端框架：vue2.x。
5. UI框架：elementUI。
5. 测试用户：  
   * admin1/admin1 
7. 效果图



# 2. 目录说明
```
xiaomi-shop
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
   ├─ json // 模拟数据
   └─ imgs // 图片资源(建议：大图片放public/imgs，小图片放src/assets)
├── src
│   ├── App.vue
│   ├── api
│   │   ├── ajax.js // api接口管理
│   │   ├── index.js //axiaos封装
│   │   └── mockAjax.js //模拟数据接口
│   ├── assets
│   ├── components // 组件库
│   ├── config
│   ├── main.js
│   ├── mock //模拟数据
│   ├── router // 路由
│   │   ├── index.js
│   │   └── routes.js
│   ├── store // vuex
│   │   ├── cart.js
│   │   ├── detail.js
│   │   ├── home.js
│   │   ├── index.js
│   │   └── user.js
│   └── view // 页面
└── vue.config.js
```

# 3. 插件依赖
```
cnpm i vue-lazyload  sass swiper vue-awesome-swiper vue-axios  vue-cookie mockjs --save-dev
cnpm install sass-loader@8.0.2 --save-dev
cnpm install qs --save-dev
cnpm install element-ui babel-plugin-component --save-dev
cnpm install qrcode --save # 二维码插件
cnpm install vue-infinite-scroll --save # 页面滚动插件
```

