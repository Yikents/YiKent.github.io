<template>
  <div class="mysetting">
    <div class="mysetting-header">
      <div class="mysetting-header-arrow" @click="settingStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="mysetting-header-text">设置</div>
    </div>

    <div class="mysetting-body">
      <div class="mysetting-body-content">
        <div class="mysetting-body-items" @click="JumpModify">
          <div class="body-items-text">修改密码</div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
          <div class="bottom-thread"></div>
        </div>

        <div class="mysetting-body-items" @click="toastEvent">
          <div class="body-items-text">检查更新</div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
        </div>
      </div>

      <div class="mysetting-body-content">
        <div class="mysetting-body-items" @click="aboutStatus">
          <div class="body-items-text">关于</div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
        </div>
      </div>

      <div class="mysetting-body-buttom" v-if="isShowButtom">
        <div class="mysetting-body-logout mysetting-btn" @click="logoutEvent">
          退出登录
        </div>
        <div
          class="mysetting-body-destroyUser mysetting-btn"
          @click="destroyUserEvent"
        >
          注销账号
        </div>
      </div>
    </div>

    <transition name="move">
      <ModifyPasswordView @ModifyStatus="ModifyStatus" v-if="isModify" :phoneNumber="phoneValue"/>
    </transition>

    <transition name="move">
      <MyAbout v-show="isAbout" @aboutStatus="aboutStatus" />
    </transition>

  </div>
</template>

<script>
import ModifyPasswordView from "@/components/ModifyPasswordView.vue";
import MyAbout from '@/components/MyAbout.vue'

export default {
  props: {
    isShowButtom: Boolean,
    phoneValue: String,
  },
  data() {
    return {
      isModify: false,
      isAbout:false
    };
  },
  methods: {
    settingStatus() {
      this.$emit("settingStatus", false);
    },
    toastEvent() {
      this.$toast({
        position: "bottom",
        msg: "晚安语录 : 已是最新版",
      });
    },
    logoutEvent() {
      this.$emit("logoutEvent");
      this.settingStatus();
      let curUser=JSON.parse(localStorage[this.phoneValue]);
      localStorage[this.phoneValue]=JSON.stringify({...curUser,loginRun:false});
    },
    destroyUserEvent() {
      this.logoutEvent();
      localStorage.removeItem(this.phoneValue);
    },
    ModifyStatus() {
      this.isModify = !this.isModify;
    },
    JumpModify(){
      if(this.phoneValue){
        this.isModify = !this.isModify;
      }else{
        this.$router.push({
          path:'/login'
        })
      }
    }
    ,
     aboutStatus(val) {
      this.isAbout = val
    }
  },
  components: {
    ModifyPasswordView,
    MyAbout
  },
};
</script>
<style lang="scss" scoped>
.mysetting {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: rgb(242, 242, 242);
  z-index: 3;

  .mysetting-header {
    display: flex;
    align-items: center;
    height: 50px;
    background: #fff;

    .mysetting-header-arrow {
      width: 30px;
      height: 50px;
      line-height: 50px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .mysetting-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

  .mysetting-body {
    width: 100%;
    .mysetting-body-content {
      margin-top: 10px;
      background: #fff;
      .mysetting-body-items {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        height: 50px;

        .body-items-text {
          color: #555;
        }

        .body-items-arrow {
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;

          .icon-arrowright {
            font-size: 20px;
            color: #555;
          }
        }

        .bottom-thread {
          position: absolute;
          left: 0px;
          right: 0px;
          bottom: 0px;
          height: 1px;
          background-color: rgba(0, 0, 0, 0.59);
          @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
            transform: scaleY(0.75);
          }

          @media screen and (-webkit-min-device-pixel-ratio: 2) {
            transform: scaleY(0.5);
          }

          @media screen and (-webkit-min-device-pixel-ratio: 3) {
            transform: scaleY(0.33);
          }
        }
      }
    }

    .mysetting-body-buttom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mysetting-btn {
        background: orange;
        color: #fff;
        font-size: 13px;
        margin-top: 30px;
        padding: 15px 60px;
        border-radius: 5px;
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