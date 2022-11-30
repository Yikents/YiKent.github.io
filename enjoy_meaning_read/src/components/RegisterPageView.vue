<template>
  <div class="register-page" >
    <div class="register-header">
      <div class="register-header-arrow" @click="backEvent">
        <span class="iconfont icon-arrowleft"></span>
      </div>
      <div class="register-header-text">注册 (1/2)</div>
      <div class="register-header-next" @click="RegisterEvent">下一步</div>
    </div>
    <div class="register-body">
      <div class="register-telephone">
        <label for="tel">手机号 :</label>
        <input type="number" id="tel" v-model="TepValue" @input="limitEvent" />
      </div>
      <div class="register-password">
        <label for="password">密码 :</label>
        <input type="password" id="password" v-model="passwordValue" @change="vailPassword" />
        <div class="valid-password" v-show="isVaild">
          *要包含字母和数字且长度为6-16位之间*
        </div>
      </div>
    </div>
    <transition name="move">
      <FinishRegisterView
        v-if="isShowFinish"
        @backRegister="backRegister"
        @finishRegister="finishRegister"
        :userData="userData"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import FinishRegisterView from "./FinishRegisterView.vue";
import { Notify, Toast } from 'vant';
import { ref, type Ref } from 'vue'
import 'vant/es/toast/style'

const isVaild = ref(false)
const isShowFinish = ref(false)
const isRun = ref(false)
const userData: Ref<Object> = ref({})
const TepValue = ref();
const passwordValue = ref();
const $emit=defineEmits(['backData'])

const vailPassword = () => {
  // 密码中只能包含字母和数字的其中(?![0-9]+$)表示排除掉只有数字的组合，(?![a-zA-Z]+$)表示排除掉只有字母的组合，[0-9A-Za-z]表示必须有字母或数字
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  let result = reg.test(passwordValue.value);
  if (!result) {
    isVaild.value = true;
    isRun.value = false;
  } else {
    isVaild.value = false;
    isRun.value = true;
  }
}
const RegisterEvent = () => {
  let leng = String(TepValue.value).length;
  if (isRun.value && leng == 11) {
    let telephone = TepValue.value;
    let passwords = passwordValue.value;
    if (localStorage[telephone]) {
      let currentUser = JSON.parse(localStorage[telephone]);
      if (currentUser.telephone != telephone) {
        isShowFinish.value = !isShowFinish.value;
        userData.value = {
          telephone,
          passwords,
        };
      } else {
        // Notify({ type: 'warning', message:"此账号已存在"})
        Toast.fail("此账号已存在");
      }
    } else {
      isShowFinish.value = !isShowFinish.value;
      userData.value = {
        telephone,
        passwords,
      };
    }
  } else {
    if (leng < 11 && isRun.value) {
      Toast.fail("手机号要为11位");
    } else {
      if (leng < 11 && !isRun.value) {
        Toast.fail("手机号要为11位且密码不能为空");
      } else {
        Toast.fail("密码格式有误!")
      }
    }
  }
}
const limitEvent = () => {
  let len = String(TepValue.value);
  if (len.length > 11) {
    TepValue.value = Number(len.slice(0, 11));
  }
}
const backEvent = () => {
  $emit("backData", false);
}
const backRegister = () => {
  isShowFinish.value = !isShowFinish.value;
}
const finishRegister = () => {
  isShowFinish.value = !isShowFinish.value;
 $emit("backData", false);
}

</script>

<style lang="scss" scoped>
.register-page {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 99;
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