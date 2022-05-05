<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template #tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <!-- 订单信息 -->
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" />{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType==1}" @click="payType = 1"></div>
            <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="payType = 2"></div>
          </div>
          <div class="go-pay">
            <el-button type="primary" size="default" @click="submitPay(payType)">去支付</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 微信支付二维码弹窗 -->
    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
    <!-- 支付确认弹窗 -->
    <modal title="支付确认" btnType="3" :showModal="showPayModal" sureText="查看订单" cancelText="未支付" @cancel="showPayModal=false" @submit="goOrderList">
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import QRCode from 'qrcode';
import OrderHeader from '@/components/OrderHeader';
import ScanPayCode from '@/components/ScanPayCode';
import Modal from '@/components/Modal';
export default {
  name: 'order-pay',
  data() {
    return {
      orderId: this.$route.query.orderNo,
      addressInfo: '', //收货人地址
      orderDetail: [], //订单详情，包含商品列表
      showDetail: false, //是否显示订单详情
      payType: 1, //支付类型
      showPay: false, //是否显示微信支付弹框
      payImg: '', //微信支付的二维码地址
      showPayModal: false, //是否显示二次支付确认弹框
      payment: 0, //订单总金额
      T: '' //定时器ID
    };
  },
  components: {
    OrderHeader,
    ScanPayCode,
    Modal
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
      this.$API.getOrder(this.orderId).then((res) => {
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
        this.orderDetail = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    // 提交支付
    // 微信支付：content内容是支付表单html源码，通过v-html解析后，js触发支付表单的submit事件，跳转支付宝扫码支付页面
    // 支付宝支付：content是html源码，渲染到页面后自动跳转到支付页面
    submitPay(payType) {
      if (payType == 1) {
        // 支付宝（新窗口打开）
        window.open('/#/order/alipay?orderId=' + this.orderId, '_blank');
      } else {
        // 微信
        this.$API.submitPay({
            orderId: this.orderId,
            orderName: '小米商城',
            amount: 0.01, //单位元
            payType: 2 //1支付宝，2微信
          })
          .then((res) => {
            QRCode.toDataURL(res.content)
              .then(() => {
                this.showPay = true;
                this.payImg = "data:image/png;base64,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"; // base64二维码
                this.loopOrderState();
              })
              .catch(() => {
                this.$message.error('微信二维码生成失败，请稍后重试');
              });
          });
      }
    },
    // 关闭微信扫码弹框
    closePayModal() {
      this.showPay = false;
      // 支付确认弹窗
      this.showPayModal = true;
      clearInterval(this.T);
    },
    // 轮询当前订单支付状态
    loopOrderState() {
      this.T = setInterval(() => {
        // 查询订单状态
        this.$API.getOrder(this.orderId).then((res) => {
          // 如果支付成功，自动跳转到订单列表
          if (res.status == 20) {
            clearInterval(this.T);
            this.goOrderList();
          }
          
        });
      }, 1000);
    },
    // 跳转订单列表
    goOrderList() {
      this.$router.push('/order/list');
    }
  }
};
</script>
<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 35px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url('/imgs/icon-down.png') no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            // 旋转180度
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size: 103px 38px;
        }
      }
      .go-pay {
        text-align: center;
      }
    }
  }
}
</style>