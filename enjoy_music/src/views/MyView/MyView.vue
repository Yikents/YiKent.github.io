<template>
  <div class="my-view">
    <div class="my-view-header">
      <div class="my-head">
        <span class="my-title">
          <span class="my">我的</span>
          <span class="profile">&nbsp;/Profile</span>
        </span>
        <span class="setting" @click="settingClickRouter"></span>
      </div>

      <div class="name-card">
        <div class="head-img">
          <div class="img">
            <img :src="userImg" alt="" />
          </div>
          <div>
            <div class="user-name">{{ userPedName }}</div>
            <div class="user-id">ID:1000049534</div>
            <div class="user-sign">
              {{ signatureContent }}
              <span class="uesr-quote"></span>
            </div>
          </div>
          <span class="edit-data" @click="editData = true"></span>
        </div>
        <div class="you-vip">你还不是VIP</div>
      </div>
    </div>
    <div class="my-view-main">
      <div class="interesr-dynamic">
        <div class="interesr-dynamic-title">
          <span class="dynamic-title">关注的动态</span
          ><span class="dynamic-text" @click="interestDynamic = true"
            >MORE</span
          >
        </div>
        <div class="interesr-dynamic-music">
          <swiper class="swiper" :options="swiperOption" @touchMove.stop>
            <swiper-slide
              class="home-new-album-swiper-item"
              @click="clickGetSong(relatedPlaylist[6].id)"
            >
              <img :src="relatedPlaylist[6]?.picUrl" />
              <div
                class="user-play-icon"
                v-show="loadComplete == true"
                @click="clickGetSong(relatedPlaylist[6].id)"
              ></div>
              <div class="load">
                <div class="block">
                  <van-loading vertical size="30px" />
                  <div class="doing-refresh">图片加载中...</div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide
              class="home-new-album-swiper-item"
              @click="clickGetSong(relatedPlaylist[3].id)"
            >
              <img :src="relatedPlaylist[3]?.picUrl" />
              <div
                class="user-play-icon"
                v-show="loadComplete == true"
                @click="clickGetSong(relatedPlaylist[3].id)"
              ></div>

              <div class="load">
                <div class="block">
                  <van-loading vertical size="30px" />
                  <div class="doing-refresh">图片加载中...</div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide
              class="home-new-album-swiper-item"
              @click="clickGetSong(relatedPlaylist[4].id)"
            >
              <img :src="relatedPlaylist[4]?.picUrl" />
              <div
                class="user-play-icon"
                v-show="loadComplete == true"
                @click="clickGetSong(relatedPlaylist[4].id)"
              ></div>
              <div class="load">
                <div class="block">
                  <van-loading vertical size="30px" />
                  <div class="doing-refresh">图片加载中...</div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide
              class="home-new-album-swiper-item"
              @click="clickGetSong(relatedPlaylist[2].id)"
            >
              <img :src="relatedPlaylist[2]?.picUrl" />
              <div
                class="user-play-icon"
                v-show="loadComplete == true"
                @click="clickGetSong(relatedPlaylist[2].id)"
              ></div>
              <div class="load">
                <div class="block">
                  <van-loading vertical size="30px" />
                  <div class="doing-refresh">图片加载中...</div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="my-view-foot">
      <div class="content-service">内容服务</div>
      <div class="user-content" @click="interestView = true">
        <span class="user-interset"></span> 关注
      </div>
      <div class="user-content" @click="browseHistory = true">
        <span class="user-history"></span> 浏览历史
      </div>
      <div class="user-content" @click="cacheManagement = true">
        <span class="user-cache"></span> 缓存管理
      </div>
      <div class="user-content" @click="vipView = true">
        <span class="user-vip"></span> VIP服务
      </div>
    </div>
    <transition name="setting">
      <UserSettingView
        v-if="settingRouter"
        :settingRouter="settingRouter"
        @clickReturnHandel="clickReturnHandel"
      />
    </transition>
    <transition name="setting">
      <EditDataView v-if="editData == true" @editDataReturn="editDataReturn" />
    </transition>

    <transition name="setting">
      <InterestDynamicView
        v-if="interestDynamic == true"
        @interestDynamicReturn="interestDynamicReturn"
      />
    </transition>

    <transition name="setting">
      <VipServeView v-if="vipView == true" @returnVipView="returnVipView" />
    </transition>

    <transition name="setting">
      <InterestView
        v-if="interestView == true"
        @interestViewReturn="interestViewReturn"
      />
    </transition>
    <transition name="setting">
      <BrowseHistoryView
        v-if="browseHistory == true"
        @browseHistoryReturn="browseHistoryReturn"
      />
    </transition>
    <transition name="setting">
      <CacheManagementView
        v-if="cacheManagement == true"
        @cacheManagementReturn="cacheManagementReturn"
      />
    </transition>
    <!-- <transition name="playerMove">
      <HomePlayerView
        v-show="isShowAndHide"
        @ShowOrHidePlayer="ShowOrHidePlayer"
      />
    </transition> -->
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import UserSettingView from "@/views/MyView/UserSettingView.vue";
import EditDataView from "@/components/UserComponents/EditDataView.vue";
import InterestDynamicView from "./InterestDynamicView.vue";
import VipServeView from "./VipServeView.vue";
import InterestView from "./InterestView.vue";
import BrowseHistoryView from "./BrowseHistoryView.vue";
import CacheManagementView from "./CacheManagementView.vue";
// import HomePlayerView from "../Home/HomePlayerView.vue";

export default {
  data() {
    return {
      settingRouter: this.returnSetting,
      editData: false,
      interestDynamic: false,
      vipView: false,
      interestView: false,
      browseHistory: false,
      cacheManagement: false,
      loadComplete: false,
      relatedPlaylist: [],
      /////
      isShow: true,
      audioUrl: "",
      currentStutas: 0,
      isRunMove: false,
      isShowAndHide: false,
      isShowImage: this.singleSongObj?.imageUrl || "",
      currentPlayTime: 0,
      durationPlayTime: "00:00",
      /////
      swiperOption: {
        slidesPerView: 3.15,
        spaceBetween: 12,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  computed: {
    ...mapState([
      "userPedName",
      "signatureContent",
      "userImg",
      "returnSetting",
    ]),
  },
  created() {
    // 获取用户登录数据作判断
    const userData = JSON.parse(localStorage.getItem("userLoginData"));
    const userData1 = JSON.parse(localStorage.getItem("userData"));
    // 判断是否登录
    if (userData != undefined) {
      this.$nextTick(() => {
        this.getRelatedPlaylist();
        this.getLocalStorageData();
      });
      // 判断是否有用户资料，无则用默认资料
      if (userData1 == undefined) {
        let userData2 = {
          userImg: "",
          userName: "用户0001",
          userSignature: "还没有设置个性签名！",
        };
        localStorage.setItem("userData", JSON.stringify(userData2));
      } else {
        localStorage.setItem("userData", JSON.stringify(userData1));
      }

      this.loadComplete = true;
    } else {
      this.$router.push("login");
    }
  },
  methods: {
    // 跳转设置页面
    settingClickRouter() {
      this.settingRouter = true;
    },
    clickReturnHandel(val) {
      this.settingRouter = val;
    },
    // 资料编辑页面
    editDataReturn(val) {
      this.editData = val;
      let userData = {
        userImg: this.userImg,
        userName: this.userPedName,
        userSignature: this.signatureContent,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    // 关注动态页面
    interestDynamicReturn(val) {
      this.interestDynamic = val;
    },
    // vip充值页面
    returnVipView(val) {
      this.vipView = val;
    },
    // 动态页面
    interestViewReturn(val) {
      this.interestView = val;
    },
    // 浏览历史页面
    browseHistoryReturn(val) {
      this.browseHistory = val;
    },
    // 缓存页面
    cacheManagementReturn(val) {
      this.cacheManagement = val;
    },
    // 获取歌单信息
    getRelatedPlaylist() {
      this.$axios
        .get("http://localhost:3000/personalized/newsong")
        .then(({ data }) => {
          this.relatedPlaylist = data.result;
        });
    },
    // 点击获取歌曲信息
    clickGetSong(val) {
      this.isShowAndHide = true;
      this.getdeliveryId(val);
    },

    // ShowOrHidePlayer() {
    //   this.isShowAndHide = !this.isShowAndHide;

    // },

    ...mapMutations(["getLocalStorageData"]),
    ...mapActions(["getdeliveryId"]),
  },

  components: {
    UserSettingView,
    EditDataView,
    InterestDynamicView,
    VipServeView,
    InterestView,
    BrowseHistoryView,
    CacheManagementView,
    // HomePlayerView,
  },
};
</script>


<style lang="scss" scoped>
.my-view {
  position: absolute;
  box-sizing: border-box;
  background: rgb(250, 250, 250);
  width: 100vw;


  .my-view-header {
    background-image: url("@/assets/image/user-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    .my-head {
      display: flex;
      justify-content: space-between;
      height: 55px;
      align-items: center;
      margin: 0px 20px;
      .my-title {
        .my {
          font-weight: bold;
          font-size: 20px;
        }

        .profile {
          font-size: 14px;
          color: rgb(226, 203, 156);
        }
      }

      .setting {
        width: 26px;
        height: 26px;
        background-image: url("@/assets/image/user-setting.png");
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .name-card {
      position: relative;
      margin: 0 20px;
      width: calc(100% - 42px);
      height: 21vh;
      border-radius: 10px 10px 0px 0px;
      background-image: url("@/assets/image/feivip.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;

      .head-img {
        position: relative;
        display: flex;
        margin: 5px 10px;
        padding-top: 15px;
        height: calc(100% - 40px);

        .img {
          width: 70px;
          height: 70px;
          border: 2px solid #fff;
          border-radius: 999px;
          margin-right: 12px;
          overflow: hidden;
          margin-top: 5px;
          background-image: url("@/assets/image/user_avatar_bg.png");
          background-size: cover;
          background-repeat: no-repeat;

          img {
            width: 100%;
            min-height: 70px;
            display: block;
          }
        }
        .user-name {
          width: 215px;
          font-size: 24px;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .user-id {
          color: #777;
          margin-bottom: 16px;
          font-size: 12px;
          transform-origin: left;
          transform: scaleX(0.9);
        }

        .user-sign {
          line-height: 20px;
        }

        .uesr-quote {
          display: inline-block;
          width: 12px;
          height: 10px;
          background-image: url("@/assets/image/uesr-quote.png");
          background-size: cover;
          background-repeat: no-repeat;
          transform: translateY(-5px);
        }

        .edit-data {
          position: absolute;
          top: 15px;
          right: 5px;
          width: 20px;
          height: 20px;
          background-image: url("@/assets/image/user-edit.png");
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      .you-vip {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: right;
        line-height: 30px;
        padding-right: 10px;
        box-sizing: border-box;
      }
    }
  }

  .my-view-main {
    background-color: #fff;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    padding: 40px 20px 25px 20px;
    box-sizing: border-box;

    .interesr-dynamic {
      .interesr-dynamic-title {
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
        align-items: center;

        .dynamic-title {
          font-weight: bolder;
          font-size: 16px;
        }

        .dynamic-text {
          color: #cfb072;
          font-size: 13px;
        }
      }

      .interesr-dynamic-music {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .home-new-album-swiper-item {
          position: relative;
          width: 100px !important;
          height: 100px;
          margin-right: 10px;
          border-radius: 3px;
          overflow: hidden;

          .load {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            .block {
              width: 100px;
              height: 100px;
              border-radius: 8px;
              padding-top: 15px;
              box-sizing: border-box;

              .doing-refresh {
                color: #fff;
                margin: 20px 0px;
                font-size: 12px;
                text-align: center;
              }
            }
          }

          img {
            width: 100%;
            display: block;
          }

          .user-play-icon {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 30px;
            height: 30px;
            background-image: url("@/assets/image/user-play-icon.png");
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }

  .my-view-foot {
    background-color: #fff;
    width: 100%;
    height: calc(100vh - 444px);
    margin-top: 10px;
    padding-left: 20px;
    padding-top: 25px;
    box-sizing: border-box;

    .content-service {
      font-size: 20px;
      font-weight: 500;
    }

    .user-content {
      padding: 13px 0px;
      font-size: 16px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(246, 246, 246);

      span {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      .user-interset {
        background-image: url("@/assets/image/user-interset.png");
        background-size: cover;
        background-repeat: no-repeat;
      }
      .user-history {
        background-image: url("@/assets/image/user-history.png");
        background-size: cover;
        background-repeat: no-repeat;
      }
      .user-cache {
        background-image: url("@/assets/image/user-download-icon.png");
        background-size: cover;
        background-repeat: no-repeat;
      }
      .user-vip {
        background-image: url("@/assets/image/vip-service.png");
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }


  .playerMove-enter,
  .playerMove-leave-to {
    transform: translateX(100%);
  }
  .playerMove-enter-active,
  .playerMove-leave-active {
    transition: all 0.3s linear;
  }
  .playerMove-enter-to,
  .playerMove-leave {
    transform: translateX(0px);
  }

  .setting-enter,
  .setting-leave-to {
    transform: translateX(100%);
  }
  .setting-enter-active,
  .setting-leave-active {
    transition: all 0.15s linear;
  }
  .setting-enter-to,
  .setting-leave {
    transform: translateX(0);
  }
}
</style>

  