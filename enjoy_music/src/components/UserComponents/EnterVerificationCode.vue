<template>
  <div class="enter-verification">
    <div class="nav-bar">
      <span class="left-arrow" @click="verificationClickRetuen"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>输入验证码</span>
    </div>
    <div class="main">
      <div class="send">短信验证码已发送至</div>
      <div class="mobile-number">
        +86 {{ userAccountPassword.mobileNumber }}
      </div>

      <div class="enter-verification-number">输入验证码</div>
      <div class="input-verification">
        <input
          type="number"
          maxlength="6"
          v-model.trim="verNumber"
          placeholder="请输入验证码"
        />
        <span
          :class="{ ver: (totalTime < 60) & (totalTime > 0) }"
          @click="getVerification"
          >{{ contentVer }}</span
        >
      </div>
    </div>
    <div class="bottom-bar" @click="verNumberHandel">确认</div>

    <van-dialog
      v-model="show"
      confirm-button-color="blue"
      :show-confirm-button="false"
    >
      <div class="message-popup">
        【享听音乐】 享听音乐验证码：<span class="numver">{{ numVer }}</span>
        验证码有效期为60分钟。手机号码将只作为登录账号信息使用，享听音乐保证不对外公开或向第三方提供。
      </div>
      <div class="button" @click="showHidden">确认</div>
    </van-dialog>

    <transition name="replace-view">
      <ReplaceMobileNumber
        v-show="replaceReturn === true"
        @replaceViewReturn="replaceViewReturn"
        @returnSettingPage="returnSettingPage"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog } from "vant";
import ReplaceMobileNumber from "@/components/UserComponents/ReplaceMobileNumber.vue";
export default {
  data() {
    return {
      verNumber: null,
      numVer: null,
      totalTime: 60,
      contentVer: "获取验证码",
      show: false,
      replaceReturn: false,
    };
  },
  computed: {
    ...mapState(["userAccountPassword"]),
  },
  methods: {
    verificationClickRetuen() {
      this.$emit("verificationClickRetuen", false);
    },

    verNumberHandel() {
      if (!this.verNumber) {
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

      if (this.verNumber == this.numVer) {
        this.replaceReturn = true;
      } else {
        Dialog.alert({
          title: "验证码输入错误，请重新输入",
          width: "295px",
          confirmButtonColor: "rgb(0, 115, 255)",
          closeOnClickOverlay: "true",
        }).then(() => {
          // on close
        });
        this.verNumber = "";
        return;
      }
      this.verNumber = "";
    },

    getVerification() {
      if (this.totalTime < 60) {
        return;
      }
      let num = "";
      for (let i = 0; i < 6; i++) {
        let numVerifi = Math.floor(Math.random() * 10);
        num += numVerifi;
      }

      this.numVer = num;
      console.log(this.numVer);
      this.getVerificationTime();
      this.showPopup();
    },

    getVerificationTime() {
      let getTime = window.setInterval(() => {
        this.contentVer = this.totalTime + "s后再次发送";
        this.totalTime--;
        if (this.totalTime == 0) {
          this.totalTime = 60;
          this.contentVer = "获取验证码";
          window.clearInterval(getTime);
        }
      }, 1000);
    },

    showPopup() {
      this.show = true;
    },
    showHidden() {
      this.verNumber = this.numVer;
      this.show = false;
    },

    replaceViewReturn(val) {
      this.replaceReturn = val;
    },
    returnSettingPage(val) {
      this.replaceReturn = val;
      this.returnSettingPages();
    },
    returnSettingPages() {
      this.$emit("returnSettingPage", false);
    },
  },
  components: {
    ReplaceMobileNumber,
    [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style lang="scss" scoped>
.enter-verification {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 107;
  background-color: #fff;
  .nav-bar {
    position: relative;
    width: 100vw;
    height: 55px;
    text-align: center;
    line-height: 55px;
    box-shadow: 0px 0px 10px #f7f5f5;
    font-size: 20px;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }

  .main {
    width: 250px;
    margin: 60px auto;
    text-align: left;

    .send {
      font-size: 12px;
      color: #555;
      margin-bottom: 15px;
    }

    .mobile-number {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 50px;
    }
    .enter-verification-number {
      font-size: 12px;
      color: #333;
      margin-bottom: 16px;
    }

    .input-verification {
      border-bottom: 1px solid #f7f5f5f6;

      input {
        width: 150px;
        height: 40px;
        list-style: none;
        outline: none;
        border: none;
        font-size: 18px;
      }

      span {
        font-size: 14px;
        color: rgb(239, 193, 118);

        &.ver {
          color: #888;
        }
      }
    }
  }

  .bottom-bar {
    width: 100vw;
    height: 50px;
    border-radius: 4px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgb(239, 193, 118);
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 13px;
  }

  .numver {
    font-size: 18px;
    color: rgb(0, 218, 251);
  }

  .replace-view-enter,
  .replace-view-leave-to {
    transform: translateX(100%);
  }
  .replace-view-enter-active,
  .replace-view-leave-active {
    transition: all 0.15s linear;
  }
  .replace-view-enter-to,
  .replace-view-leave {
    transform: translateX(0);
  }

  .message-popup {
    margin: 15px auto;
    padding: 0px 15px;
    line-height: 28px;
    font-size: 18px;
  }

  .button {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #ddd;
    color: blue;
  }
}
</style>