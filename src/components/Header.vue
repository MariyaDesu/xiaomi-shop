<template>
  <!-- 顶部导航 -->
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="goLogin()">登录</a>
          <a href="javascript:;" v-if="username" @click="goLogout()">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a class="my-cart" href="javascript:;" @click="goToCart()"
            ><span class="icon-cart"></span>购物车({{cartCount}})</a
          >
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <!-- <a href="/#/home"></a> -->
          <router-link to="/home"></router-link>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, i) in List.phoneList"
                  :key="i"
                  @click="goDetail(item.id)"
                >
                  <a>
                    <div class="pro-img">
                      <img :src="item.img" alt="" />
                    </div>
                    <div class="pro-name">{{ item.title }}</div>
                    <div class="pro-price">{{ item.price }}元起</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, i) in List.redmiList"
                  :key="i"
                  @click="goDetail(item.id)"
                >
                  <a>
                    <div class="pro-img">
                      <img :src="item.img" alt="" />
                    </div>
                    <div class="pro-name">{{ item.title }}</div>
                    <div class="pro-price">{{ item.price }}元起</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, i) in List.tvList"
                  :key="i"
                  @click="goDetail(item.id)"
                >
                  <a>
                    <div class="pro-img">
                      <img :src="item.img" alt="" />
                    </div>
                    <div class="pro-name">{{ item.title }}</div>
                    <div class="pro-price">{{ item.price }}元起</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input
              type="text"
              name="keyword"
              v-model="keywords"
              autocomplete="off"
            /><a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      // username: "",
      keywords: "",
    };
  },
  methods: {
    // 登录
    goLogin() {
      this.$router.push('/login');
    },
    // 退出
    goLogout() {
      this.$API.logout().then(() => {
        this.$message.success('退出成功');
        // 清除用户ID
        this.$cookie.set('userId', '', { expires: '-1' });
        // 清除用户名
        this.$store.dispatch('saveUserName', '');
        // 清空购物车数量
        this.$store.dispatch('saveCartCount', 0);
      });
    },
    getCartSum() {
      this.$API.getCartSum({}).then((res = 0) => {
        // 保存到vuex里面
        this.$store.dispatch('saveCartCount', res);
      });
    },
    goDetail(data) {
      console.log(data);
      this.$router.push({ name: "product", params: { id: data } });
    },
    goToCart() {
      this.$router.push('/cart');
    }
  },
  mounted() {
    this.$store.dispatch("getList");
    let params = this.$route.params;
    if (params && params.from == 'login') {
      this.getCartSum();
    }
  },
  computed: {
    ...mapState({
      List: (state) => state.home.List,
      username:(state) => state.user.username,
      cartCount:(state) => state.user.cartCount
    }),
  },
};
</script>

<style lang="scss" scoped>
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: $colorA;
        text-align: center;
        color: #fff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      height: 112px;
      @include flex();
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid $colorH;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: height 0.5s;
            background-color: #fff;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &::before {
                content: "";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child::before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          @include flex();
          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: auto;
            margin-right: auto;
          }
        }
      }
    }
  }
}
</style>