<template>
  <div class="edit-data-view">
    <div class="nav-bar">
      <span class="left-arrow" @click="editDataReturn"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>编辑资料</span>
    </div>
    <div class="head-portrait">
      <div class="head-text">头像</div>
      <div class="head-right te">
        <input
          type="file"
          accept=".png,.jpeg,.jpg"
          @change="uploadImg($event)"
        />
        <img :src="userImg" /><span class="right-arrow"
          ><van-icon name="arrow"
        /></span>
      </div>
    </div>
    <div class="ped-name" @click="showPedNameView = true">
      <div class="head-text">昵称</div>
      <div class="head-right">
        <span>{{ userPedName }}</span
        ><span class="right-arrow"><van-icon name="arrow" /></span>
      </div>
    </div>
    <div class="personalized-signature" @click="showSignatureView = true">
      <div class="head-text">个性签名</div>
      <div class="head-right">
        <span>{{ signatureContent }}</span
        ><span class="right-arrow"><van-icon name="arrow" /></span>
      </div>
    </div>

    <transition name="ped-name">
      <div class="ped-name-view" v-show="showPedNameView == true">
        <div class="ped-name-nav">
          <span class="left-arrow" @click="showPedNameView = false"
            ><van-icon name="arrow-left"
          /></span>
          <span class="ped-name-text">昵称</span>
          <span class="submit" @click="submitPedNameText">提交</span>
        </div>
        <div class="ped-name-content">
          <input type="text" maxlength="10" v-model="pedNameText" :placeholder="userPedName"/>
          <span>{{ pedNameText.length }}/10</span>
        </div>
      </div>
    </transition>

    <transition name="ped-name">
      <div class="ped-name-view" v-show="showSignatureView == true">
        <div class="ped-name-nav">
          <span class="left-arrow" @click="showSignatureView = false"
            ><van-icon name="arrow-left"
          /></span>
          <span class="ped-name-text">个性签名</span>
          <span class="submit" @click="submitSignatureText">提交</span>
        </div>
        <div class="ped-name-content">
          <input type="text" maxlength="20" v-model="signatureText" :placeholder="signatureContent" />
          <span>{{ signatureText.length }}/20</span>
        </div>
      </div>
    </transition>

    <van-overlay :show="editShow" z-index="120" @click="editShow = false">
      <div class="wrapper" @click.stop>
        <div class="block"><van-loading vertical size="50px" /></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      showPedNameView: false,
      pedNameText:"",
      editShow: false,
      signatureText:"",
      showSignatureView: false,
      userPrice: "",
    };
  },
  computed: {
    ...mapState(["userImg","signatureContent","userPedName"]),
  },
  methods: {
    editDataReturn() {
      this.$emit("editDataReturn", false);
      
    },
    submitPedNameText() {
      this.editShow = true;
      this.reviseUserPedName(this.pedNameText);
      setTimeout(() => {
        this.showPedNameView = false;
        this.editShow = false;
      }, 1000);
    },

    submitSignatureText() {
      this.editShow = true;
      this.reviseSubmitSignatureText(this.signatureText);
      setTimeout(() => {
        this.showSignatureView = false;
        this.editShow = false;
      }, 1000);
    },
    uploadImg(e) {
      let that = this; //改变this指向
      let files = e.target.files[0]; //图片文件名
      if (!e || !window.FileReader) return; // 看是否支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 关键一步，在这里转换的
      reader.onloadend = function () {
        that.userPrice = this.result; //赋值
        that.reviseUserImg(that.userPrice);
      };
    },
    ...mapMutations([
      "reviseUserPedName",
      "reviseSubmitSignatureText",
      "reviseUserImg",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.edit-data-view {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 106;
  overflow: auto;
  .nav-bar {
    width: 100vw;
    height: 55px;
    text-align: center;
    line-height: 55px;
    box-shadow: 0px 0px 10px #eee;
    font-size: 20px;
    background-color: #fff;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }

  .head-portrait,
  .ped-name,
  .personalized-signature {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    height: 40px;
    border-bottom: 1px solid #eee;

    .head-text {
      font-size: 16px;
      font-weight: 600;
    }

    .head-right {
      color: #888;

      img {
        width: 30px;
        min-height: 30px;
        display: block;
        border-radius: 999px;
        background-image: url("@/assets/image/user_avatar_bg.png");
        background-size: cover;
        background-repeat: no-repeat;
      }

      .right-arrow {
        margin-left: 10px;
      }

      &.te {
        position: relative;
        display: flex;
        align-items: center;

        input {
          position: absolute;
          top: 0;
          right: 15px;
          opacity: 0;
        }
      }
    }
  }

  .ped-name-view {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 107;

    .ped-name-nav {
      width: 100vw;
      height: 55px;
      text-align: center;
      line-height: 55px;
      box-shadow: 0px 0px 10px #eee;
      font-size: 18px;
      background-color: #fff;

      .left-arrow {
        position: absolute;
        top: 0;
        left: 20px;
      }

      .ped-name-text {
        font-size: 20px;
        font-weight: 600;
      }

      .submit {
        position: absolute;
        top: 0;
        right: 20px;
        font-size: 14px;
      }
    }

    .ped-name-content {
      position: relative;
      width: 100vw;
      padding-left: 20px;
      margin-top: 30px;
      border-bottom: 1px solid#eee;
      line-height: 40px;
      input {
        width: 100%;
        outline: none;
        border: none;
        height: 40px;
      }

      span {
        position: absolute;
        bottom: -40px;
        right: 21px;
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

  .ped-name-enter,
  .ped-name-leave-to {
    transform: translateX(100%);
  }
  .ped-name-enter-active,
  .ped-name-leave-active {
    transition: all 0.15s linear;
  }
  .ped-name-enter-to,
  .ped-name-leave {
    transform: translateX(0);
  }
}
</style>