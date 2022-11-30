<template>
  <div class="login-box">
    <div class="login-close">
      <div class="close-button" @click="backEvent"></div>
    </div>
    <div class="login-body">
      <div class="login-title">请登录</div>
      <div class="login-form">
        <input
          type="number"
          placeholder="手机号"
          ref="telephone"
          @input="limitEvent"
        />
        <div class="login-password">
          <input type="password" placeholder="密码" ref="password" />
          <div class="valid-error" v-show="isVaild">*密码或账号不正确*</div>
        </div>
        <div class="login-button" @click="loginMessage">登录</div>
      </div>
      <div class="register-button" @click="isShowRegister = !isShowRegister">
        注册
      </div>
    </div>

    <transition name="move">
      <RegisterPageView v-if="isShowRegister" @backData="backData" />
    </transition>
  </div>
</template>

<script>
import RegisterPageView from "../components/RegisterPageView.vue";

export default {
  data() {
    return {
      isVaild: false,
      isShowRegister: false,
    };
  },
  methods: {
    backEvent() {
      this.$router.go(-1);
    },
    loginMessage() {
        let tel=this.$refs.telephone.value;
        let pass=this.$refs.password.value;
        if(localStorage[tel]){
            let currentUser=JSON.parse(localStorage[tel]);
            if(tel==currentUser.telephone&&pass==currentUser.passwords){
              // this.$router.push({
                //     path:'/my',
                //     // query:{
                  //     //     'user':currentUser.uName,
                //     //     'phone':currentUser.telephone
                //     // }
                // });
                this.$router.go(-1);
                this.$toast.success('登录成功')
                localStorage[tel]=JSON.stringify({...currentUser,loginRun:true})
                this.isVaild=false;
            }else{
                this.isVaild=true;
            }
        }else{
            this.isVaild=true;
        }
    },

    limitEvent() {
      let len = this.$refs.telephone.value.length;
      if (len > 11) {
        this.$refs.telephone.value = this.$refs.telephone.value.slice(0, 11);
      }
    },
    backData(val) {
      this.isShowRegister = val;
    },
  },

  components: {
    RegisterPageView,
  },
};
</script>


<style lang="scss" scoped>
.login-box {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 3;
  background-image: url("../assets/image/goodNight/bg_login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  .login-close {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 40px;

    .close-button {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      background-image: url("../assets/image/user-icon/login.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }

  .login-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 65%;

    .login-title {
      height: 30px;
      font-size: 15px;
      color: #efefef;
    }

    .login-form {
      width: 100%;
      padding: 20px 47px 0px 47px;
      display: flex;
      flex-direction: column;
      input {
        display: inline-block;
        width: 100%;
        height: 20px;
        background: none;
        margin-bottom: 20px;
        outline: none;
        border: 0px;
        color: #fff;
        border-bottom: 2px solid #fff;
      }

      .login-password {
        position: relative;
        width: 100%;
        height: 30px;
        margin-bottom: 30px;

        .valid-error {
          position: absolute;
          bottom: -20px;
          right: 0px;
          margin: auto 0px;
          height: 20px;
          line-height: 20px;
          color: #e4393c;
          font-size: 12px;
        }
      }

      .login-button {
        width: 100%;
        height: 36px;
        line-height: 36px;
        border-radius: 36px;
        text-align: center;
        font-size: 14px;
        background: rgba(255, 255, 255, 0.95);
      }
    }
  }

  .register-button {
    padding: 10px 30px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 68, 0, 0.3);
  }
}

.move-enter,
.move-leave-to {
  transform: translateX(100%);
}
.move-enter-active,
.move-leave-active {
  transition: all 0.2s linear;
}
.move-enter-to,
.move-leave {
  transform: translateX(0px);
}
</style>