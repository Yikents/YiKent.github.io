<template>
  <div class="revise-mobile-number">
    <div class="nav-bar">
      <span class="left-arrow" @click="reviseClickRetuen"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>安全验证</span>
    </div>
    <div class="body-proof">
      <div class="get-proof-icon"></div>
      <div class="telephone-number">+86 {{ userAccountPassword.mobileNumber }}</div>
      <div class="get-proof-number" @click="verificationClickRouter"></div>
      <div class="proof-text">
        为了你的账号安全，请验证手机号进行下一步操作。
      </div>
    </div>
    <transition name="verification">
      <EnterVerificationCode
        v-show="enterVerification === true"
        @verificationClickRetuen="verificationClickRetuen"
        @returnSettingPage="returnSettingPage"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EnterVerificationCode from "@/components/UserComponents/EnterVerificationCode.vue";
export default {
  props: {
    reviseView: Boolean,
  },
  data() {
    return {
      enterVerification: false,
    };
  },
  computed: {
    ...mapState(["userAccountPassword"]),
  },
  methods: {
    reviseClickRetuen() {
      console.log("hhh");
      this.$emit("reviseClickRetuen", false);
    },
    verificationClickRouter() {
      this.enterVerification = !this.enterVerification;
    },
    verificationClickRetuen(val) {
      this.enterVerification = val;
    },
    returnSettingPage(val) {
      this.enterVerification = val;
      this.returnSetting()
    },
    returnSetting(){
       this.$emit("returnSettingPage", false);
    }
  },
  components: {
    EnterVerificationCode,
  },
};
</script>

<style lang="scss" scoped>
.revise-mobile-number {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 105;
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
  .van-nav-bar {
    box-shadow: 0px 0px 10px #f7f5f5;
  }

  .body-proof {
    margin: 60px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 170px;
    .get-proof-icon {
      width: 92px;
      height: 110px;
      background-image: url("@/assets/image/get-proof-icon.png");
      background-size: cover;
      background-repeat: no-repeat;
      margin-bottom: 15px;
    }

    .telephone-number {
      font-size: 21px;
      font-weight: bold;
    }
    .get-proof-number {
      width: 171px;
      height: 29px;
      background-image: url("@/assets/image/get-proof-number.png");
      background-size: cover;
      background-repeat: no-repeat;
      margin: 25px 0px 12px;
    }

    .proof-text {
      font-size: 14px;
    }
  }
  .verification-enter,
  .verification-leave-to {
    transform: translateX(100%);
  }
  .verification-enter-active,
  .verification-leave-active {
    transition: all 0.15s linear;
  }
  .verification-enter-to,
  .verification-leave {
    transform: translateX(0);
  }
}
</style>