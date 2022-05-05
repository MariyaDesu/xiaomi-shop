import Vue from "vue";
import App from "./App.vue";
import {Message,Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router";

import store from '@/store';


import "@/mock/serve";
import * as API from "@/api";

import "swiper/css/swiper.css";

import Carousel from '@/components/Carousel.vue';
Vue.component(Carousel.name, Carousel);

import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie' // 引入cookie
Vue.use(VueCookie)

Vue.use(VueLazyload, {
  //设置图片懒加载默认图片
  loading: '/imgs/loading-svg/loading-bars.svg',
});

Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取
    //请求函数只需要注册一次，可以在组件当中使用。
    Vue.prototype.$API = API;
    //注册路由,给组件的身上添加了$router与$route两个属性
    Vue.prototype.$message = Message;
  },
  router,
  //注册仓库，给每一个组件的身上添加$store属性
  store,
}).$mount("#app");
