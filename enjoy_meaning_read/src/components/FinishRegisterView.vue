<template>
  <div class="finish-register">
    <div class="finish-header">
      <div class="finish-header-arrow" @click="backRegister">
        <span class="iconfont icon-arrowleft"></span>
      </div>
      <div class="finish-header-text">注册 (2/2)</div>
      <div class="finish-header-next" @click="finishRegister">完成</div>
    </div>
    <div class="finish-body">
      <div class="finish-body-logo">
        <!-- 账号头像 -->
        <label>
          <div class="finish-header-user">
            <div class="finish-header-icon">
              <span class="iconfont icon-yonghu"></span>
            </div>
            <div class="finish-layer" ref="img">
              <input type="file" accept="image/png, image/jpeg, image/jpg" id="file-img" @change="uploadData"  ref='file'/>
            </div>
          </div>
        </label>
      </div>
      <div class="finish-user-name">
        <label for="userName">昵称 : </label><input type="text" v-model="user" id="userName" />
        <div class="tips-text" v-show="isEmpty">*不能为空*</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Notify, Toast } from 'vant';
import { ref, defineProps } from 'vue';
const props = defineProps({
  userData: Object,

})

const user = ref();
const file = ref();
const img = ref();
const isEmpty = ref(false);
const igurl = ref();

const $emit = defineEmits(['backRegister', 'finishRegister'])
const backRegister = () => {
  $emit("backRegister");
}
const finishRegister = () => {
  let uName = user.value;
  if (uName) {
    let tempName = [];
    for (let key in localStorage) {
      let reg = /[0-9]{11}/;
      let res = reg.test(key);
      if (res) {
        let ct = JSON.parse(localStorage[key]);
        tempName.push(ct.uName);
      }
    }
    let findName = tempName.find((it) => it == uName);
    if (!findName) {
      let logoUrl = igurl.value;
      if (logoUrl) {
        $emit("finishRegister");
        let t:any = props.userData;
        localStorage[t.telephone] = JSON.stringify({ uName, logoUrl, ...t });
        Toast.success("注册成功");
        isEmpty.value = false;
      } else {
        Toast.fail("请上传头像照片");
      }
    } else {
      Toast.fail( "该昵称已被占用!")
    }
  } else {
    isEmpty.value = true;
  }
}
const uploadData = () => {
  let fram = new FileReader();
  let fr = file.value.files[0];
  fram.readAsDataURL(fr);
  fram.onload = function () {
    img.value.style.backgroundImage = `url(${this.result})`;
    igurl.value = this.result;
  };
}


</script>

<style lang="scss" scoped>
.finish-register {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #eee;
  z-index: 999;

  .finish-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background: #f6f6f6;

    .finish-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 20px;
        color: #666;
      }
    }

    .finish-header-text {
      font-size: 14px;
      color: orange;
    }

    .finish-header-next {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: orange;
      margin-right: 10px;
    }
  }

  .finish-body {
    width: 100%;

    .finish-body-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90px;
      margin-top: 20px;

      .finish-header-user {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 999px;
        background: #fff;
        overflow: hidden;

        .finish-header-icon {
          display: flex;
          justify-content: center;
          width: 50px;
          height: 50px;
          padding-top: 5px;
          background: orange;
          border-radius: 999px;

          .icon-yonghu {
            font-size: 50px;
            color: #fff;
          }
        }

        .finish-layer {
          position: absolute;
          left: 0;
          top: 0;
          width: 60px;
          height: 60px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          border-radius: 999px;
          overflow: hidden;

          #file-img {
            display: none;
          }
        }
      }
    }

    .finish-user-name {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0px 15px;
      height: 40px;
      background: #fff;

      label {
        color: #777;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
      }

      #userName {
        flex: 1;
        display: inline-block;
        height: 40px;
        margin: 0px;
        padding: 0px 0px 0px 5px;
        outline: none;
        background: none;
        border: none;
        caret-color: orange;
      }

      .tips-text {
        position: absolute;
        line-height: 40px;
        top: 0px;
        right: 10px;
        font-size: 13px;
        color: #e4393c;
      }
    }
  }
}
</style>
