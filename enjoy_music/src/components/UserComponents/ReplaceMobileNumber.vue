<template>
  <div class="replace-mobile-number">
    <div class="nav-bar">
      <span class="left-arrow" @click="replaceViewReturn"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>更换手机号</span>
    </div>
    <div class="enter-mob-number">
      <div class="enter-text">输入手机号</div>
      <div class="input-mob-number">
        <span class="add86">+86</span
        ><input
          type="number"
          v-model.trim="replaceMobileNumber"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="enter-text">输入验证码</div>
      <div class="input-ver-number">
        <input
          type="number"
          maxlength="6"
          v-model.trim="replaceVerNumber"
          placeholder="请输入验证码"
        />
        <span
          class="get-num"
          :class="{ gmn: (replaceTotalTime < 60) & (replaceTotalTime > 0) }"
          @click="getReplaceVerification"
          >{{ replaceContent }}</span
        >
      </div>
    </div>
    <div class="replace-bottom-bar" @click="replaceVerNumberHandel">确认</div>
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
import { Dialog } from "vant";
export default {
  data() {
    return {
      replaceMobileNumber: null,
      replaceVerNumber: null,
      replaceTotalTime: 60,
      replaceContent: "获取验证码",
      replaceNumVer: null,
      show: false,
      editShow: false,
    };
  },
  methods: {
    replaceViewReturn() {
      this.$emit("replaceViewReturn", false);
    },
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
    replaceVerNumberHandel() {
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
      this.reviseMobileNumber(this.replaceMobileNumber);
      this.editShow = true;
      this.replaceMobileNumber = "";
      this.replaceVerNumber = "";
      setTimeout(() => {
        this.returnSettingPage();
        this.editShow = false;
      }, 1000);
    },
    returnSettingPage() {
      this.$emit("returnSettingPage", false);
    },
    clickCopy() {
      this.replaceVerNumber = this.replaceNumVer;
    },

    ...mapMutations(["reviseMobileNumber"]),
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style lang="scss" scoped>
.replace-mobile-number {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 109;
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

  .enter-mob-number {
    width: 250px;
    margin: 50px auto;

    .enter-text {
      font-size: 12px;
      margin-bottom: 20px;
    }

    .input-mob-number,
    .input-ver-number {
      border-bottom: 1px solid #eee;
      margin-bottom: 50px;
      line-height: 40px;

      input {
        width: 150px;
        list-style: none;
        outline: none;
        border: none;
        font-size: 18px;
        height: 40px;
      }

      .add86 {
        color: #333;
        border-right: 1px solid #eee;
        margin-right: 5px;
        padding-right: 5px;
      }
    }
    .input-ver-number {
      .get-num {
        font-size: 14px;
        color: rgb(239, 193, 118);

        &.gmn {
          color: #888;
        }
      }
    }
  }
  .replace-bottom-bar {
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

  .van-popup {
    font-size: 20px;
    line-height: 10px;
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
}
</style>