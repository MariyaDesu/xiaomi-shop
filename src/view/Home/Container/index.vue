<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <!-- 导航类目 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li
              class="menu-item"
              v-for="(lists, index) in typeNav.menuList"
              :key="index"
            >
              <a href="javascript:;">{{ lists.title }}</a>
              <div class="children">
                <ul v-for="sub in lists.list" :key="sub.id">
                  <li v-for="(item, index) in sub" :key="index">
                    <a @click="goDetail(item.id)">
                      <img v-lazy="item.img" />
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <Carousel :bannerList="typeNav.slideList" />
      </div>
      <!-- 广告位 -->
      <div class="ads-box">
        <a v-for="(item, i) in typeNav.adsList" :key="i">
          <img :src="item.img" alt="" />
        </a>
      </div>
      <div class="banner">
        <a>
          <img v-lazy="'/imgs/banner-1.png'" alt="" />
        </a>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt="" />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(lists, i) in typeNav.phoneList" :key="i">
              <div class="item" v-for="(list, j) in lists" :key="j">
                <span v-if="j % 2 == 0" class="new-pro">新品</span>
                <span v-if="j % 2 != 0" class="kill-pro">秒杀</span>
                <div class="item-img">
                  <img v-lazy="list.img" />
                </div>
                <div class="item-info">
                  <h3>{{ list.title }}</h3>
                  <p>{{ list.subtitle }}</p>
                  <p class="price" @click="addCart(list.id)">
                    {{ list.price }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
// import ServiceBar from '@/components/ServiceBar.vue';
// import Modal from '@/components/Modal.vue';
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { mapState } from "vuex";
import ServiceBar from "@/components/ServiceBar.vue";

export default {
  name: "container",
  // components: { ServiceBar, Modal, Swiper, SwiperSlide },
  components: { ServiceBar },

  data() {
    return {
      showModal: false,
    };
  },

  mounted() {
    this.$store.dispatch("getTypeNav");
  },
  methods: {
    addCart(id) {
      // let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
    },
    goDetail(data) {
      this.$router.push({ name: "product", params: { id: data } });
    },
  },

  computed: {
    ...mapState({
      typeNav: (state) => state.home.typeNav,
    }),
  },
};
</script>

<style lang='scss' scope>
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: #fff;
            padding-left: 30px;
            &::after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: "";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;

                a {
                  color: $colorB;
                  font-size: 14px;
                  &:hover {
                    color: $colorA;
                  }
                }

                img {
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-top: 20px;
    margin-bottom:20px;
  }
  .product-box {
    background: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: 22px;
      height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          display: flex;
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              line-height: 24px;
              color: $colorG;
              border-radius: 5px;
              margin-top: 5px;
              &.new-pro {
                background: #7ecf68;
              }
              &.kill-pro {
                background: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: 14px;
                color: $colorB;
                line-height: 14px;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                &::after {
                  content: "";
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>