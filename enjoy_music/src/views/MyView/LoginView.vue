<template>
  <div class="login-view">
    <div class="position-box">
      <div class="input-box">
        <div class="input-mobile-numeber">
          <div class="mobile-icon"></div>
          <input
            type="number"
            v-model.trim="replaceMobileNumber"
            placeholder="请输入手机号码"
          />
        </div>
        <div class="input-password">
          <div class="lock-icon"></div>
          <div
            class="input-verification"
            v-show="toggledPasswordVerification == false"
          >
            <input
              class="password"
              type="number"
              v-model.trim="replaceVerNumber"
              placeholder="请输入验证码"
            /><span
              class="verification"
              :class="{
                gum: (replaceTotalTime < 60) & (replaceTotalTime > 0),
              }"
              @click="getReplaceVerification"
              >{{ replaceContent }}</span
            >
          </div>
          <div
            class="input-verification"
            v-show="toggledPasswordVerification == true"
          >
            <input
              class="password"
              type="password"
              v-model.trim="replaceVerNumber"
              placeholder="请输入密码"
            /><span class="forget-password">忘记密码</span>
          </div>
        </div>
        <button class="btn" @click="replaceVerNumberHandel">
          登&nbsp;录<span class="arrow"
            ><van-icon
              size="24"
              color="rgba(228, 228, 228, 0.841)"
              name="arrow"
          /></span>
        </button>
        <div
          v-show="toggledPasswordVerification == false"
          @click="toggledPasswordVerification = true"
          class="toggled"
        >
          密码登录
        </div>
        <div
          v-show="toggledPasswordVerification == true"
          @click="toggledPasswordVerification = false"
          class="toggled"
        >
          验证码登录
        </div>
      </div>
      <div class="other-login">
        <van-divider :style="{ color: 'rgb(212,202,184),border:2px' }" hairline
          >其他登录方式</van-divider
        >
        <div class="login-icon">
          <div class="qq"></div>
          <div class="wx"></div>
          <div class="wb"></div>
        </div>
        <div class="check-box">
          <input type="checkbox" v-model="ifCheck" /><span class="clause">
            我已阅读并同意<span @click="UserAgreementRouter = true"
              >《用户协议》</span
            >与<span @click="UserPrivacyPolicyRouter = true"
              >《隐私政策》</span
            ></span
          >
        </div>
      </div>
    </div>
    <transition name="setting">
      <UserAgreementView
        v-show="UserAgreementRouter == true"
        @clickRouterUserAgreement="clickRouterUserAgreement"
      />
    </transition>
    <transition name="setting">
      <UserPrivacyPolicy
        v-show="UserPrivacyPolicyRouter == true"
        @clickRouterUserPrivacy="clickRouterUserPrivacy"
      />
    </transition>
    <van-dialog
      v-model="show"
      confirm-button-color="blue"
      :show-confirm-button="false"
    >
      <div class="message-popup">
        【享听音乐】 享听音乐验证码：<span class="numver">{{
          replaceNumVer
        }}</span>
        验证码有效期为60分钟。手机号码将只作为登录账号信息使用，享听音乐保证不对外公开或向第三方提供。
      </div>
      <div class="button" @click="showHidden">确认</div>
    </van-dialog>
    <van-overlay :show="editShow" round z-index="120" @click="editShow = false">
      <div class="wrapper" @click.stop>
        <div class="block"><van-loading vertical size="50px" /></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import UserAgreementView from "./UserAgreementView.vue";
import UserPrivacyPolicy from "./UserPrivacyPolicy.vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      UserAgreementRouter: false,
      UserPrivacyPolicyRouter: false,
      toggledPasswordVerification: false,
      ifCheck: false,
      replaceTotalTime: 60,
      replaceContent: "获取验证码",
      replaceMobileNumber: null,
      replaceVerNumber: null,
      show: false,
      replaceNumVer: null,
      editShow: false,
    };
  },
  methods: {
    clickRouterUserAgreement(val) {
      this.UserAgreementRouter = val;
    },
    clickRouterUserPrivacy(val) {
      this.UserPrivacyPolicyRouter = val;
    },
    // 登录处理
    replaceVerNumberHandel() {
      // 判断是否勾选协议
      if (this.ifCheck == false) {
        Dialog.alert({
          title: "请阅读并勾选用户协议与隐私政策",
          width: "295px",
          confirmButtonColor: "rgb(0, 115, 255)",
          closeOnClickOverlay: "true",
        }).then(() => {
          // on close
        });
        return;
      }
      // 判断手机号
      if (!this.replaceMobileNumber) {
        Dialog.alert({
          title: "请输入手机号！",
          width: "295px",
          confirmButtonColor: "rgb(0, 115, 255)",
          closeOnClickOverlay: "true",
        }).then(() => {
          // on close
        });
        return;
      }
      if (this.replaceMobileNumber.length < 11) {
        Dialog.alert({
          title: "手机号长度为11位！",
          width: "295px",
          confirmButtonColor: "rgb(0, 115, 255)",
          closeOnClickOverlay: "true",
        }).then(() => {
          // on close
        });
        return;
      } else if (this.replaceMobileNumber.length >= 12) {
        Dialog.alert({
          title: "手机号长度为11位！",
          width: "295px",
          confirmButtonColor: "rgb(0, 115, 255)",
          closeOnClickOverlay: "true",
        }).then(() => {
          // on close
        });
        this.replaceMobileNumber = "";
        return;
      }

      let regMobile = /^1[3|4|5|7|8][0-9]{9}$/;
      if (regMobile.test(this.replaceMobileNumber) !== true) {
        Dialog.alert({
          title: "手机号格式不对！",
          width: "295px",
          confirmButtonColor: "rgb(0, 115, 255)",
          closeOnClickOverlay: "true",
        }).then(() => {
          // on close
        });
        return;
      }
      // 判断验证码
      if (this.toggledPasswordVerification == false) {
        if (!this.replaceVerNumber) {
          Dialog.alert({
            title: "请输入验证码！",
            width: "295px",
            confirmButtonColor: "rgb(0, 115, 255)",
            closeOnClickOverlay: "true",
          }).then(() => {
            // on close
          });
          return;
        }

        if (this.replaceVerNumber != this.replaceNumVer) {
          Dialog.alert({
            title: "验证码输入错误，请重新输入",
            width: "295px",
            confirmButtonColor: "rgb(0, 115, 255)",
            closeOnClickOverlay: "true",
          }).then(() => {
            // on close
          });
          this.replaceVerNumber = "";
          return;
        }
      }
      // 判断密码
      if (this.toggledPasswordVerification == true) {
        if (this.replaceVerNumber.indexOf(" ") != -1) {
          Dialog.alert({
            title: "密码不能包含空格",
            width: "295px",
            confirmButtonColor: "rgb(0, 115, 255)",
            closeOnClickOverlay: "true",
          }).then(() => {
            // on close
          });
          this.replaceVerNumber = "";
          return;
        }
      }
      // 判断本地存储数据是否存有账号
      let userAccountPassword = JSON.parse(
        localStorage.getItem("userLoginData")
      );
      if (userAccountPassword && this.toggledPasswordVerification == true) {
        if (
          this.replaceMobileNumber == userAccountPassword.mobileNumber &&
          this.replaceVerNumber == userAccountPassword.password
        ) {
          this.editShow = true;
          this.replaceMobileNumber = "";
          this.replaceVerNumber = "";
          setTimeout(() => {
            this.$router.push("my");
            this.editShow = false;
          }, 1000);
          return;
        }
      }
      // 创建账号
      if (
        userAccountPassword == undefined &&
        this.toggledPasswordVerification == true
      ) {
        Dialog.confirm({
          title: "账号不存在，是否用当前账号创建新账号",
          width: "280px",
          confirmButtonColor: "rgb(0, 115, 255)",
          cancelButtonColor: "rgb(0, 115, 255)",
          className: "dialog-button",
          closeOnClickOverlay: "true",
        })
          .then(() => {
            this.userLoginDataSave({
              num: this.replaceMobileNumber,
              pass: this.replaceVerNumber,
            });
            // 重置个人资料
            localStorage.removeItem("userData");
            this.editShow = true;
            this.replaceMobileNumber = "";
            this.replaceVerNumber = "";
            setTimeout(() => {
              this.$router.push("my");
              this.editShow = false;
            }, 1000);
          })
          .catch(() => {});
        return;
      }

      if (this.toggledPasswordVerification == false && !userAccountPassword) {
        // 账号存储到本地
        this.userLoginDataSave({
          num: this.replaceMobileNumber,
          pass: "123456",
        });
        this.editShow = true;
        this.replaceMobileNumber = "";
        this.replaceVerNumber = "";
        setTimeout(() => {
          this.$router.push("my");
          this.editShow = false;
        }, 1000);
        localStorage.removeItem("userData");
        return;
      } else if (
        userAccountPassword &&
        this.replaceMobileNumber == userAccountPassword.mobileNumber
      ) {
        this.editShow = true;
        this.replaceMobileNumber = "";
        this.replaceVerNumber = "";
        setTimeout(() => {
          this.$router.push("my");
          this.editShow = false;
        }, 1000);
        return;
      }

      Dialog.alert({
        title: "账号或者密码错误！！",
        width: "295px",
        confirmButtonColor: "rgb(0, 115, 255)",
        closeOnClickOverlay: "true",
      }).then(() => {
        this.replaceVerNumber = "";
      });
    },

    // 验证码
    getReplaceVerification() {
      if (this.replaceTotalTime < 60) {
        return;
      }
      let num = "";
      for (let i = 0; i < 6; i++) {
        let numVerifi = Math.floor(Math.random() * 10);
        num += numVerifi;
      }

      this.replaceNumVer = num;
      console.log(this.replaceNumVer);
      this.getReplaceVerificationTime();
      this.showPopup();
    },
    // 获取验证码倒计时
    getReplaceVerificationTime() {
      let getTime = window.setInterval(() => {
        this.replaceContent = this.replaceTotalTime + "s后再次发送";
        this.replaceTotalTime--;
        if (this.replaceTotalTime == 0) {
          this.replaceTotalTime = 60;
          this.replaceContent = "获取验证码";
          window.clearInterval(getTime);
        }
      }, 1000);
    },
    showPopup() {
      this.show = true;
    },
    showHidden() {
      this.replaceVerNumber = this.replaceNumVer;
      this.show = false;
    },
    ...mapMutations(["userLoginDataSave"]),
  },
  components: {
    UserAgreementView,
    UserPrivacyPolicy,
      [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  padding: 0px 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-image: url("@/assets/image/login_page_bg.png");
  background-size: cover;
  background-repeat: no-repeat;

  .position-box {
    position: absolute;
    top: 45%;
    .input-box {
      width: calc(100vw - 120px);
      .input-mobile-numeber,
      .input-password {
        display: flex;
        width: 247px;
        height: 50px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        align-items: center;
        margin-bottom: 18px;
        padding-left: 8px;

        input {
          list-style: none;
          outline-style: none;
          border: none;
          background-color: transparent;
          color: #fff;
          color: rgba(228, 228, 228, 0.841);
          font-size: 16px;
        }

        .mobile-icon,
        .lock-icon {
          width: 24px;
          height: 24px;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .mobile-icon {
          background-image: url("@/assets/image/mobile-icon.png");
        }
        .lock-icon {
          background-image: url("@/assets/image/lock-icon.png");
        }

        .input-verification {
          span {
            font-size: 14px;
          }

          .forget-password {
            color: #777;
          }
        }

        .password {
          width: 135px;
        }

        .verification {
          color: rgb(239, 193, 118);

          &.gum {
            color: #888;
            font-size: 12px;
          }
        }
      }

      .btn {
        position: relative;
        width: 100%;
        height: 50px;
        border-radius: 40px;
        border: none;
        color: #555;
        font-size: 18px;
        font-weight: 700;
        background-image: linear-gradient(
          90deg,
          rgb(247, 226, 173),
          rgb(147, 112, 82)
        );

        .arrow {
          position: absolute;
          right: 10px;
          top: 13px;
          color: #fff;
        }
      }
      .btn,
      .toggled {
        margin: 0px auto 20px;
        text-align: center;
      }

      .toggled {
        margin-bottom: 75px;
        font-size: 13px;
        color: rgb(239, 193, 118);
      }
    }

    .other-login {
      width: calc(100vw - 120px);
      .login-icon {
        display: flex;
        width: 100%;
        justify-content: space-between;

        div {
          width: 50px;
          height: 50px;
          border-radius: 999px;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .qq {
          background-image: url("@/assets/image/login-qq-icon.png");
        }
        .wx {
          background-image: url("@/assets/image/login-wx-icon.png");
        }
        .wb {
          background-image: url("@/assets/image/login-wb-icon.png");
        }
      }

      .check-box {
        margin-top: 20px;
        display: flex;
        align-items: center;
        width: 260px;
        .clause {
          display: inline-block;
          font-size: 12px;
          color: #777;
        }
      }
    }
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, 0.4);
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 90px;
      height: 80px;
      background-color: #000;
      border-radius: 10px;
      padding-top: 15px;
      box-sizing: border-box;
    }
  }

  .message-popup {
    margin: 15px auto;
    padding: 0px 15px;
    line-height: 28px;
    font-size: 18px;
  }
  .numver {
    font-size: 18px;
    color: rgb(0, 218, 251);
  }
  .button {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #ddd;
    color: blue;
  }

  .setting-enter,
  .setting-leave-to {
    transform: translateX(100%);
  }
  .setting-enter-active,
  .setting-leave-active {
    transition: all 0.15s linear;
  }
  .setting-enter-to,
  .setting-leave {
    transform: translateX(0);
  }
}
</style>