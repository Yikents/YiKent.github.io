<template>
  <div class="register-page">
    <div class="register-header">
      <div class="register-header-arrow" @click="backEvent">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="register-header-text">注册 (1/2)</div>
      <div class="register-header-next" @click="RegisterEvent">下一步</div>
    </div>
    <div class="register-body">
      <div class="register-telephone">
        <label for="tel">手机号 :</label>
        <input type="number" id="tel" ref="telephone" @input="limitEvent" />
      </div>
      <div class="register-password">
        <label for="password">密码 :</label>
        <input
          type="password"
          id="password"
          ref="password"
          @change="vailPassword"
        />
        <div class="valid-password" v-show="isVaild">
          *要包含字母和数字且长度为6-16位之间*
        </div>
      </div>
    </div>
    <transition name="move">
      <FinishRegisterView
        v-show="isShowFinish"
        @backRegister="backRegister"
        @finishRegister="finishRegister"
        :userData="userData"
      />
    </transition>
  </div>
</template>

<script>
import FinishRegisterView from "./FinishRegisterView.vue";

export default {
  data() {
    return {
      isVaild: false,
      isShowFinish: false,
      isRun: false,
      userData: {},
    };
  },
  methods: {
    vailPassword() {
      // 密码中只能包含字母和数字的其中(?![0-9]+$)表示排除掉只有数字的组合，(?![a-zA-Z]+$)表示排除掉只有字母的组合，[0-9A-Za-z]表示必须有字母或数字
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      let result = reg.test(this.$refs.password.value);
      if (!result) {
        this.isVaild = true;
        this.isRun = false;
      } else {
        this.isVaild = false;
        this.isRun = true;
      }
    },
    RegisterEvent() {
      let leng = this.$refs.telephone.value.length;
      if (this.isRun && leng == 11) {
        let telephone = this.$refs.telephone.value;
        let passwords = this.$refs.password.value;
        if (localStorage[telephone]) {
          let currentUser = JSON.parse(localStorage[telephone]);
          if (currentUser.telephone != telephone) {
            this.isShowFinish = !this.isShowFinish;
            this.userData = {
              telephone,
              passwords,
            };
          } else {
            this.$toast.warning("此账号已存在");
          }
        } else {
          this.isShowFinish = !this.isShowFinish;
          this.userData = {
            telephone,
            passwords,
          };
        }
      }else{
        if(leng < 11&&this.isRun){
          this.$toast.error("手机号要为11位");
        }else{
          if(leng<11&&!this.isRun){

            this.$toast.error("手机号要为11位且密码不能为空");
          }else{
            this.$toast.error("密码不能为空")
          }
        }
      }
    },
    limitEvent() {
      let len = this.$refs.telephone.value.length;
      if (len > 11) {
        this.$refs.telephone.value = this.$refs.telephone.value.slice(0, 11);
      }
    },
    backEvent() {
      this.$emit("backData", false);
    },
    backRegister() {
      this.isShowFinish = !this.isShowFinish;
    },
    finishRegister() {
      this.isShowFinish = !this.isShowFinish;
      this.$emit("backData", false);
    },
  },
  components: {
    FinishRegisterView,
  },
};
</script>

<style lang="scss" scoped>
.register-page {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #eee;
  .register-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background: #f6f6f6;

    .register-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 20px;
        color: #666;
      }
    }

    .register-header-text {
      font-size: 14px;
      color: orange;
    }

    .register-header-next {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: orange;
      margin-right: 10px;
    }
  }

  .register-body {
    width: 100%;

    label {
      color: #777;
      font-size: 14px;
    }

    .register-telephone {
      padding: 0px 15px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      height: 40px;
      background: #fff;

      #tel {
        display: inline-block;
        height: 40px;
        padding: 0px 0px 0px 10px;
        background: none;
        border: none;
        outline: none;
        flex: 1;
        margin: 0px;
        caret-color: orange;
      }
    }
    .register-password {
      position: relative;
      padding: 0px 15px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      height: 40px;
      background: #fff;

      #password {
        display: inline-block;
        height: 40px;
        padding: 0px 0px 0px 10px;
        background: none;
        border: none;
        outline: none;
        flex: 1;
        margin: 0px;
        caret-color: orange;
      }
      .valid-password {
        position: absolute;
        top: 0px;
        line-height: 40px;
        margin: auto 0px;
        right: 0px;
        color: #e4393c;
        font-size: 12px;
      }
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
}
</style>