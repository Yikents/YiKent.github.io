<template>
  <div class="my">
    <div class="my-header">
      <div class="my-header-user" @click="loginEvent">
        <div class="my-header-icon">
          <span class="iconfont icon-yonghu"></span>
        </div>
        <label>
          <div class="my-hd-layer" ref="img" v-if="userN">
            <input type="file" id="file-img" @change="upLoadImage" ref="file" />
          </div>
        </label>
      </div>
      <div class="my-header-text" @click="loginEvent">
        {{ userN ? userN : "请登录" }}
      </div>
    </div>
    <div class="my-body">
      <div class="my-body-myMessage">
        <div class="my-body-items" @click="showDynamic">
          <div class="body-item-left">
            <div class="body-items-img">
              <img src="../../assets/image/user-icon/user_icon_feed.png" />
            </div>
            <div class="body-items-text">我的动态</div>
          </div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
          <div class="bottom-thread"></div>
        </div>

        <div class="my-body-items" @click="showCollect">
          <div class="body-item-left">
            <div class="body-items-img">
              <img src="../../assets/image/user-icon/user_icon_collect.png" />
            </div>
            <div class="body-items-text">我的收藏</div>
          </div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
          <div class="bottom-thread"></div>
        </div>

        <div class="my-body-items" @click="showMessage">
          <div class="body-item-left">
            <div class="body-items-img">
              <img src="../../assets/image/user-icon/user_icon_message.png" />
            </div>
            <div class="body-items-text">我的留言</div>
          </div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
        </div>
      </div>

      <div class="my-body-appMessage">
        <div class="my-body-items" @click="showProtocol">
          <div class="body-item-left">
            <div class="body-items-img">
              <img src="../../assets/image/user-icon/user_icon_feedback.png" />
            </div>
            <div class="body-items-text">用户协议</div>
          </div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
          <div class="bottom-thread"></div>
        </div>
        <div class="my-body-items" @click="showPrivacy">
          <div class="body-item-left">
            <div class="body-items-img">
              <img src="../../assets/image/user-icon/user_icon_message.png" />
            </div>
            <div class="body-items-text">隐私政策</div>
          </div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
          <div class="bottom-thread"></div>
        </div>
        <div class="my-body-items" @click="showCopyright">
          <div class="body-item-left">
            <div class="body-items-img">
              <img src="../../assets/image/user-icon/user_icon_contact.png" />
            </div>
            <div class="body-items-text">版权声明</div>
          </div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
        </div>
      </div>

      <div class="my-body-setting" @click="showSetting">
        <div class="my-body-items">
          <div class="body-item-left">
            <div class="body-items-img">
              <img src="../../assets/image/user-icon/user_icon_setting.png" />
            </div>
            <div class="body-items-text">设置</div>
          </div>
          <div class="body-items-arrow">
            <span class="iconfont icon-arrowright"></span>
          </div>
        </div>
      </div>

      <transition name="move">
        <MyProtocolView
          v-show="isProtocol"
          @protocolStatus="protocolStatus"
          :isLazy="isStatus"
          :itemsArr="itemsArr"
        />
      </transition>

      <transition name="move">
        <MyPrivacyView
          v-show="isPrivacy"
          @privacyStatus="privacyStatus"
          :privacyString="privacyString"
          :isLazying="isLazying"
        />
      </transition>

      <transition name="move">
        <MyCopyrightView
          v-show="isCopyright"
          @copyrightStatus="copyrightStatus"
        />
      </transition>

      <transition name="move">
        <MySettingView
          v-show="isSetting"
          @settingStatus="settingStatus"
          :isShowButtom="isShowButtom"
          @logoutEvent="logoutEvent"
          :phoneValue="phoneValue"
        />
      </transition>

      <transition name="move">
        <MyDynamicView
          v-show="isDynamic"
          @DynamicStatus="DynamicStatus"
          :isloadDy="isloadDy"
          :DynamicArr="DynamicArr"
        />
      </transition>

      <transition name="move">
        <MyCollectView
          v-show="isCollect"
          @CollectStatus="CollectStatus"
          :isloadCo="isloadCo"
          :CollectArr="CollectArr"
        />
      </transition>

      <transition name="move">
        <MyMessageView
          v-show="isMessage"
          @MessageStatus="MessageStatus"
          :isloadMe="isloadMe"
          :MessageArr="MessageArr"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import MyProtocolView from "./MyProtocolView.vue";
import MyPrivacyView from "./MyPrivacyView.vue";
import MyCopyrightView from "./MyCopyrightView.vue";
import MySettingView from "./MySettingView.vue";
import MyDynamicView from "./MyDynamicView.vue";
import MyCollectView from "./MyCollectView.vue";
import MyMessageView from "./MyMessageView.vue";
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      isProtocol: false,
      isPrivacy: false,
      isCopyright: false,
      isSetting: false,
      isDynamic: false,
      isCollect: false,
      isMessage: false,
      itemsArr: [],
      privacyString: "",
      isStatus: false,
      isLazying: false,
      isloadDy: false,
      isloadCo: false,
      isloadMe: false,
      DynamicArr: [],
      CollectArr: [],
      MessageArr: [],
      userN: null,
      islogin: true,
      isShowButtom: false,
      phoneValue: null,
      logoUrl: null,
      isloginRun:null
    };
  },
  created() {
    this.loginDataEvent();
  },
  methods: {
    dealProtocolData() {
      this.$axios.get("/zdxy.html").then(({ data }) => {
        let res1 = data.split(/<body>/);
        let res2 = res1[1]
          .split(/<div class="top-content">/)[1]
          .split(/<\/p>/g);
        let res3 = [];

        res2.forEach((it) => {
          if (it) {
            let temper = it.split(/<p>/g);
            res3.push(temper[1]);
          }
        });
        res3 = res3
          .join("ket")
          .replace(/&nbsp;/g, "")
          .replace(/<strong>/g, "")
          .replace(/<\/strong>/g, "")
          .split("ket");
        res3 = res3.filter((it) => {
          return it;
        });
        this.itemsArr = [...res3];
      });
      this.$nextTick(() => {
        this.isStatus = true;
      });
    },

    dealPrivacyData() {
      this.$axios.get("/zdwananzc.html").then(({ data }) => {
        let res1 = data.split(/<body>/);
        this.privacyString = res1[1];
      });
      this.$nextTick(() => {
        this.isLazying = true;
      });
    },

    showProtocol() {
      this.isProtocol = true;
      this.dealProtocolData = debounce(this.dealProtocolData, 2000);
      this.dealProtocolData();
    },

    showPrivacy() {
      this.isPrivacy = true;
      this.dealPrivacyData = debounce(this.dealPrivacyData, 2000);
      this.dealPrivacyData();
    },

    showCopyright() {
      this.isCopyright = true;
    },

    showSetting() {
      this.isSetting = true;
    },

    showDynamic() {
      if (this.phoneValue) {
        this.isDynamic = true;
        this.judgeDyStatus = debounce(this.judgeDyStatus, 1000);
        this.judgeDyStatus();
      } else {
        this.$router.push({
          path: "/login",
        });
      }
    },

    judgeDyStatus() {
      this.isloadDy = true;
    },

    showCollect() {
      if (this.phoneValue) {
        this.isCollect = true;
        this.judgeCoStatus = debounce(this.judgeCoStatus, 1000);
        this.judgeCoStatus();
      } else {
        this.$router.push({
          path: "/login",
        });
      }
    },

    judgeCoStatus() {
      this.isloadCo = true;
    },

    showMessage() {
      if (this.phoneValue) {
        this.isMessage = true;
        this.judgeMeStatus = debounce(this.judgeMeStatus, 1000);
        this.judgeMeStatus();
      } else {
        this.$router.push({
          path: "/login",
        });
      }
    },

    judgeMeStatus() {
      this.isloadMe = true;
    },

    protocolStatus(val) {
      this.isProtocol = val;
    },

    privacyStatus(val) {
      this.isPrivacy = val;
    },

    copyrightStatus(val) {
      this.isCopyright = val;
    },

    settingStatus(val) {
      this.isSetting = val;
    },

    DynamicStatus(val) {
      this.isDynamic = val;
    },

    CollectStatus(val) {
      this.isCollect = val;
    },

    MessageStatus(val) {
      this.isMessage = val;
    },

    loginEvent() {
      if (this.islogin) {
        this.$router.push({
          path: "/login",
        });
      }
    },
    logoutEvent() {
      this.userN = null;
      this.phoneValue = null;
      this.islogin = true;
      this.isShowButtom = false;
    },

    upLoadImage() {
      let fram = new FileReader();
      let fr = this.$refs.file.files[0];
      fram.readAsDataURL(fr);
      const self = this;
      let cur=JSON.parse(localStorage[this.phoneValue]);
      fram.onload = function () {
        self.$refs.img.style.backgroundImage = `url(${this.result})`;
         localStorage[self.phoneValue] = JSON.stringify({...cur,logoUrl:this.result});
      };

      
    },

    loginDataEvent() {
      for (let key in localStorage) {
        let reg = /[0-9]{11}/;
        let res = reg.test(key);
        if (res) {
          let ct = JSON.parse(localStorage[key]);
          if (ct.loginRun) {
            this.userN = ct.uName;
            this.phoneValue = ct.telephone;
            this.logoUrl = ct.logoUrl;
            break;
          }
        }
      }

      if (this.userN) {
        this.islogin = false;
        this.isShowButtom = true;
        this.$nextTick(()=>{
          this.$refs.img.style.backgroundImage=`url(${this.logoUrl})`;
        })
      } else {
        this.islogin = true;
        this.isShowButtom = false;
      }
    },
  },

  components: {
    MyProtocolView,
    MyPrivacyView,
    MyCopyrightView,
    MySettingView,
    MyDynamicView,
    MyCollectView,
    MyMessageView,
  },
};
</script>

<style lang="scss" scoped>
.my {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background: #eee;
  padding-bottom: 55px;
  &::-webkit-scrollbar {
    width: 0px;
  }

  .my-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    background: url("../../assets/image/headPortrait/headerlogo.jpg") no-repeat;
    background-size: cover;
    background-position: center center;

    .my-header-user {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 999px;
      background: #fff;
      margin-bottom: 15px;
      overflow: hidden;

      .my-header-icon {
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

      .my-hd-layer {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 60px;
        height: 60px;
        border-radius: 999px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        overflow: hidden;

        #file-img {
          display: none;
        }
      }
    }

    .my-header-text {
      padding: 7px 40px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .my-body {
    width: 100%;

    .my-body-myMessage,
    .my-body-appMessage,
    .my-body-setting {
      margin-top: 10px;
      background: #fff;

      .my-body-items {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        height: 46px;

        .body-item-left {
          display: flex;
          align-items: center;

          .body-items-img {
            width: 22px;
            height: 22px;
            margin-right: 5px;

            img {
              display: block;
              width: 100%;
            }
          }
          .body-items-text {
            font-size: 13px;
            color: #555;
          }
        }

        .body-items-arrow {
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;

          .icon-arrowright {
            font-size: 18px;
            color: #555;
          }
        }

        .bottom-thread {
          position: absolute;
          left: 0px;
          right: 0px;
          bottom: 0px;
          height: 1px;
          background-color: black;
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