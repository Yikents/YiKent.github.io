<template>
  <div class="user-setting">
    <div class="nav-bar">
      <span class="left-arrow" @click="clickReturnHandel"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>设置</span>
    </div>
    <div class="setting-bodyer">
      <div class="user-accounts-number">
        <div class="mobile-number">
          <span class="setting-text">手机号</span>
          <span class="num-arrow" @click="clickReviseNumber"
            ><span>{{ userAccountPassword.mobileNumber }}</span
            >&nbsp;<van-icon size="20" name="arrow"
          /></span>
        </div>
        <div class="mobile-number">
          <span class="setting-text">注销账号</span>
          <span class="num-arrow" @click="clickCancelDialog"
            ><van-icon size="20" name="arrow"
          /></span>
        </div>
      </div>

      <div class="user-accounts-number">
        <div class="mobile-number">
          <span class="setting-text">仅在WI-FI下播放</span>
          <span
            class="num-button"
            :class="{ active: btn === true }"
            @click="btnClickHandel"
          ></span>
        </div>
        <div class="mobile-number">
          <span class="setting-text">清除缓存</span>
          <span class="num-arrow" @click="clickConfirmHandel"
            ><span>{{
              falseCacheNumber >= 1024
                ? falseCacheNumber + "KB"  
                : falseCacheNumber + "B"
            }}</span
            ><span><van-icon size="20" name="arrow" /></span
          ></span>
        </div>
      </div>

      <div class="user-accounts-number">
        <div class="mobile-number">
          <span class="setting-text">用户协议</span>
          <span class="num-arrow" @click="userAgreement = true"
            ><van-icon size="20" name="arrow"
          /></span>
        </div>
        <div class="mobile-number">
          <span class="setting-text">隐私政策</span>
          <span class="num-arrow" @click="userPrivacy = true"
            ><van-icon size="20" name="arrow"
          /></span>
        </div>
        <div class="mobile-number">
          <span class="setting-text">会员服务协议</span>
          <span class="num-arrow" @click="userVipServeView = true"
            ><van-icon size="20" name="arrow"
          /></span>
        </div>
        <div class="mobile-number">
          <span class="setting-text">连接硬件设备</span>
          <span class="num-arrow" @click="connectingHardwareDevicesView = true"
            ><van-icon size="20" name="arrow"
          /></span>
        </div>
        <div class="mobile-number">
          <span class="setting-text">关于享听</span>
          <span class="num-arrow" @click="aboutEnjoyView = true"
            ><span>2.0.8&nbsp;</span><van-icon size="20" name="arrow"
          /></span>
        </div>
      </div>
      <div class="log-off" @click="logOut">退出登录</div>
      <div class="white-bottom"></div>
    </div>

    <transition name="revise">
      <ReviseMobileNum
        v-if="reviseView == true"
        @reviseClickRetuen="reviseClickRetuen"
        @returnSettingPage="returnSettingPage"
      />
    </transition>

    <transition name="revise">
      <UserAgreementView
        v-if="userAgreement == true"
        @clickRouterUserAgreement="clickRouterUserAgreement"
      />
    </transition>

    <transition name="revise">
      <UserPrivacyPolicy
        v-if="userPrivacy == true"
        @clickRouterUserPrivacy="clickRouterUserPrivacy"
      />
    </transition>

    <transition name="revise">
      <UserVipServeView
        v-if="userVipServeView == true"
        @clickRouterUserVipServe="clickRouterUserVipServe"
      />
    </transition>

    <transition name="revise">
      <ConnectingHardwareDevicesView
        v-if="connectingHardwareDevicesView == true"
        @connectingHardwareDevicesRouter="connectingHardwareDevicesRouter"
      />
    </transition>

    <transition name="revise">
      <AboutEnjoyView
        v-if="aboutEnjoyView == true"
        @aboutEnjoyRouter="aboutEnjoyRouter"
      />
    </transition>

    <van-overlay :show="editShow" round z-index="29" @click="editShow = false">
      <div class="wrapper" @click.stop>
        <div class="block"><van-loading vertical size="50px" /></div>
      </div>
    </van-overlay>

    <div class="clear-cache-success" v-show="clearCacheSuccess == true">缓存已清空</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog } from "vant";
import ReviseMobileNum from "@/components/UserComponents/ReviseMobileNum.vue";
import UserAgreementView from "./UserAgreementView.vue";
import UserPrivacyPolicy from "./UserPrivacyPolicy.vue";
import UserVipServeView from "./UserVipServeView.vue";
import ConnectingHardwareDevicesView from "./ConnectingHardwareDevicesView.vue";
import AboutEnjoyView from "./AboutEnjoyView.vue";

export default {
  props: {
    settingRouter: Boolean,
  },
  computed: {
    ...mapState(["userAccountPassword"]),
  },
  data() {
    return {
      btn: false,
      reviseView: false,
      userAgreement: false,
      userPrivacy: false,
      userVipServeView: false,
      editShow: false,
      connectingHardwareDevicesView: false,
      aboutEnjoyView: false,
      falseCacheNumber: 0,
      clearCacheSuccess:false
    };
  },
  created() {
    this.falseCache();
  },
  methods: {
    clickReturnHandel() {
      this.$emit("clickReturnHandel", false);
    },

    btnClickHandel() {
      this.btn = !this.btn;
    },
// 缓存点击
    clickConfirmHandel() {
      Dialog.confirm({
        title: "是否删除缓存？",
        width: "280px",
        confirmButtonColor: "rgb(0, 115, 255)",
        cancelButtonColor: "rgb(0, 115, 255)",
        className: "dialog-button",
        closeOnClickOverlay: "true",
      })
        .then(() => {
          this.clearCache();
          this.clearCacheSuccess = true
          setTimeout(() => {
             this.clearCacheSuccess = false
          }, 1000);
        })
        .catch(() => {
          // on cancel
        });
    },
// 注销账号
    clickReviseNumber() {
      Dialog.confirm({
        title: "是否删除要修改手机号？",
        width: "280px",
        confirmButtonColor: "rgb(0, 115, 255)",
        cancelButtonColor: "rgb(0, 115, 255)",
        className: "dialog-button",
        closeOnClickOverlay: "true",
      })
        .then(() => {
          this.reviseView = !this.reviseView;
        })
        .catch(() => {
          // on cancel
        });
    },

    clickCancelDialog() {
      Dialog.alert({
        title: "注销账号",
        message:
          "注销账号之后无法恢复，请谨慎操作喔~\n如确认注销，请联系官方客服：\nQQ群：250837076",
        width: "295px",
        confirmButtonColor: "rgb(0, 115, 255)",
        closeOnClickOverlay: "true",
      }).then(() => {
         localStorage.removeItem("userLoginData");
         this.$router.push("login");
      });
    },
    // 退出登录
    logOut() {
      Dialog.confirm({
        title: "确认退出登录？",
        width: "280px",
        confirmButtonColor: "rgb(0, 115, 255)",
        cancelButtonColor: "rgb(0, 115, 255)",
        className: "dialog-button",
        closeOnClickOverlay: "true",
      })
        .then(() => {
          this.editShow = true;
          setTimeout(() => {
            this.$router.push("login");
            this.editShow = false;
          }, 1000);
        })
        .catch(() => {
          // on cancel
        });
    },

    // 子
    reviseClickRetuen(val) {
      this.reviseView = val;
    },
    clickRouterUserAgreement(val) {
      this.userAgreement = val;
    },
    returnSettingPage(val) {
      this.reviseView = val;
    },
    clickRouterUserPrivacy(val) {
      this.userPrivacy = val;
    },
    clickRouterUserVipServe(val) {
      this.userVipServeView = val;
    },
    connectingHardwareDevicesRouter(val) {
      this.connectingHardwareDevicesView = val;
    },
    aboutEnjoyRouter(val) {
      this.aboutEnjoyView = val;
    },

    //假缓存
    falseCache() {
      this.$nextTick(() => {
        setInterval(() => {
          let random = Math.floor(Math.random() * 50);
          this.falseCacheNumber = this.falseCacheNumber + random;
        }, 10000);
      });
    },

    clearCache() {
      this.falseCacheNumber = 0;
    },
  },
  components: {
    ReviseMobileNum,
    UserAgreementView,
    UserPrivacyPolicy,
    UserVipServeView,
    ConnectingHardwareDevicesView,
    AboutEnjoyView,
  },
};
</script>

<style lang="scss" scoped>
.user-setting {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(240, 240, 240);
  z-index: 19;

  .nav-bar {
    position: relative;
    width: 100vw;
    height: 55px;
    text-align: center;
    line-height: 55px;
    box-shadow: 0px 0px 10px #f7f5f5;
    font-size: 20px;
    background-color: #fff;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }

  .setting-bodyer {
    .user-accounts-number {
      background-color: #fff;
      margin-bottom: 10px;

      .mobile-number {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 0px 15px;
        height: 50px;
        .setting-text {
          color: #000;
        }

        .num-button {
          width: 40px;
          height: 25px;
          background-image: url("@/assets/image/user-btn1.png");
          background-size: cover;
          background-repeat: no-repeat;

          &.active {
            background-image: url("@/assets/image/user-btn2.png");
          }
        }

        .num-arrow {
          color: #bbb;
          span {
            display: inline-block;
            font-size: 24px;
            transform-origin: right;
            transform: scale(0.7, 0.7);
          }
        }
      }
    }
    .log-off {
      margin-top: 10px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 2px solid #ddd;
      background-color: #fff;
    }
    .white-bottom {
      height: calc(100vh - 541px);
      width: 100vw;
      background-color: #fff;
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

  .clear-cache-success{
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100px;
    border-radius: 999px;
    padding: 15px 10px;
    background-color: #000;
    color: #fff;
    text-align: center;
  }

  .revise-enter,
  .revise-leave-to {
    transform: translateX(100%);
  }
  .revise-enter-active,
  .revise-leave-active {
    transition: all 0.15s linear;
  }
  .revise-enter-to,
  .revise-leave {
    transform: translateX(0);
  }
}
</style>