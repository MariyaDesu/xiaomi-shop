<template>
  <div class="login">
    <div class="container">
      <a href="/#/home">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">立即注册</div>
            <div class="reg">
              手机短信登录/注册
              <span>|</span>忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- <Footer /> -->
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
import {mapActions} from "vuex";
export default {
  name: 'login',
  components: { Footer },
  data() {
    return {
      username: '', // admin1/admin1 和 jack/jack
      password: '',
      userId: ''
    };
  },
  methods: {
    ...mapActions(['saveUserName']),
    login() {
      if(this.username.length==0||this.password.length==0){
        return 
      }
      let { username, password } = this;
      this.$API
        .login({
          username,
          password
        })
        .then((res) => {
          // vue-cookie插件：用户id保存7天
          this.$cookie.set('userId', res.id, { expires: 'Session' });
          // vuex：保存用户名
          // this.$store.dispatch('saveUserName', res.username);
          this.saveUserName(res.username);
          this.$router.push({
            name: 'home',
            params: {
              from: 'login'
            }
          });
        });
    },
    register() {
      this.$API.register({
          // username: 'admin1',
          // password: 'admin1',
          // email: 'admin1@qq.com'
          username: this.username,
          password: this.password,
          email: 'admin1@qq.com'

        })
        .then(() => {
          this.$message.success('恭喜您，注册成功！');
        })
    }
  }
};
</script>
<style lang="scss">
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 13px;
        right: 0px;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
        .btn-box {
          border-radius: 5px;
          line-height: 60px;
          text-align: center;
          background-color: $colorA;
          a {
            color: #fff;
          }
        }
      }
    }
  }
  .footer {
    background: #fff;
  }
}
</style>