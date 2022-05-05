<template>
  <div>
    <Header v-show="$route.meta.show"></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,Footer
  },
  mounted(){
    if (this.$cookie.get('userId')) {
      this.getUserInfo();
      this.getCartSum();
    }
  },
  methods:{
    getUserInfo() {
      this.$API.reqUserInfo({}).then((res = {}) => {
        // 保存到vuex里面
        this.$store.dispatch('saveUserName', res.username);
      });
    },
    // 获取购物车商品数量
    getCartSum() {
      this.$API.getCartSum({}).then((res = 0) => {
        // 保存到vuex里面
        this.$store.dispatch('saveCartCount', res);
      });
    }
  }
}
</script>
<style lang="scss">
 

</style>
