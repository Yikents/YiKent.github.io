<template>
  <div id="app">
    <router-view />
    <div class="app-tab">
      <div class="app-tab-left">
        <router-link tag="div" class="app-items" to="/">
          <div class="app-tab-home"></div>
          <div class="app-tab-text">首页</div>
        </router-link>
        <router-link tag="div" class="app-items" to="/album-library">
          <div class="app-tab-album"></div>
          <div class="app-tab-text">唱片库</div>
        </router-link>
      </div>
      <div class="app-tab-right">
        <router-link tag="div" class="app-items" to="/collection">
          <div class="app-tab-collection"></div>
          <div class="app-tab-text">收藏</div>
        </router-link>
        <router-link tag="div" class="app-items" to="/my">
          <div class="app-tab-my"></div>
          <div class="app-tab-text">我的</div>
        </router-link>
      </div>
      <div class="app-tab-player" @click="ShowOrHidePlayer">
        <div class="app-tab-cricle">
          <div
            class="app-tab-cricle-img"
            :class="{ 'cricle-dark': isShowImage }"
            :style="{ backgroundImage: `url(${isShowImage})` }"
            v-if="singleSongObj.imageUrl"
            ref="tabCricle"
          ></div>
        </div>
      </div>
    </div>
    <transition name="barMove">
      <div class="home-scroll-bar" ref="moveBar" v-show="hideplayer">
        <div class="home-scroll-cricle">
          <div
            class="home-scroll-small-cricle"
            ref="playAnimation"
            :style="{ backgroundImage: `url(${singleSongObj.imageUrl || ''})` }"
            lazy-load
          ></div>
        </div>
        <div class="scroll-player-play" @click.stop="playerEvent">
          <span class="iconfont icon-play_fill" v-show="isShow"></span>
          <span class="iconfont icon-pause1" v-show="!isShow"></span>
          <audio
            ref="playerMusic"
            @timeupdate="ListenThroughEvent"
            @ended="ListenEndedEvent"
          >
            <source :src="audioUrl || singleSongObj.audioUrl" />
          </audio>
        </div>
        <div
          class="layer-move"
          @touchstart.stop="StartEvent($event)"
          @touchmove.stop="MoveEvent($event)"
          @touchend.stop="EndEvent()"
        ></div>
      </div>
    </transition>
    <transition name="playerMove">
      <HomePlayerView
        v-show="isShowAndHide"
        @ShowOrHidePlayer="ShowOrHidePlayer"
        @playerAndPause="playerAndPauseEvent"
        @modifyMusicProgress="modifyMusicProgress"
        :getPlayerState="isShow"
        :currentPlayTime="currentPlayTime"
        :durationPlayTime="durationPlayTime"
        :temperListen="isShowAndHide"
      />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HomePlayerView from "./views/Home/HomePlayerView.vue";
export default {
  data() {
    return {
      isShow: true,
      audioUrl: "",
      currentStutas: 0,
      isRunMove: false,
      isShowAndHide: false,
      isShowImage: this.singleSongObj?.imageUrl || "",
      currentPlayTime: 0,
      durationPlayTime: "00:00",
    };
  },
  created() {
    this.initRendData();
  },
  methods: {
    listenPlayerState(jugbe) {
      if (jugbe) {
        if (!this.playerState) {
          this.$refs.playAudio.play();
        } else {
          this.$refs.playAudio.pause();
        }
      } else {
        this.$refs.playAudio.pause();
        this.$refs.tabCricle.style.animationPlayState = "paused";
      }
    },

    // 触发touchstart事件
    StartEvent(e) {
      this.initPositionY = e.touches[0].clientY;
      this.isTouchEvent = true;
      // console.log("触发...");
    },

    // 触发touchmove事件
    MoveEvent(e1) {
      if (this.isTouchEvent) {
        this.currentStutas = e1.touches[0].clientY;
        this.$refs.moveBar.style.top =
          e1.touches[0].clientY - e1.target.offsetHeight / 2 + "px";
        this.isRunMove = true;
        // console.log("触发中...");
      }
    },
    // 触发touchend事件
    EndEvent() {
      if (this.isRunMove) {
        if (this.currentStutas > window.innerHeight - 130) {
          this.$refs.moveBar.style.top = window.innerHeight - 130 + "px";
        }
        if (this.currentStutas < 50) {
          this.$refs.moveBar.style.top = 50 + "px";
        }
        this.isRunMove = false;
      }
      this.isTouchEvent = false;
    },
    //播放按鍵
    playerEvent() {
      this.StartPlayStateEvent(true);
      this.modifyPlayerState(this.isShow);
      if (this.isShow) {
        this.isShow = false;
        this.changeBgUrlState(0);
        this.$refs.playAnimation.style.animationPlayState = "running";
        this.$refs.playerMusic.play();
        //主页中的播放器部分
        this.$refs.tabCricle.style.animationPlayState = "running";
        this.changeAudioStation(true);
      } else {
        this.isShow = true;
        this.changeBgUrlState(1);
        this.$refs.playAnimation.style.animationPlayState = "paused";
        this.$refs.playerMusic.pause();
        //主页中的播放器部分
        this.$refs.tabCricle.style.animationPlayState = "paused";
        this.changeAudioStation(false);
      }

      this.isShowImage = this.singleSongObj.imageUrl;

      if (localStorage?.singleSongMessage) {
        let curS = JSON.parse(localStorage?.singleSongMessage);
        let findExistId = this.allSongList.find(
          (it) => it.audioId == curS.audioId
        );
        if (!findExistId) {
          this.changeBgUrlState(1);
        }
      } else {
        if (this.isEmptyValue && !this.isShow) {
          localStorage.singleSongMessage = JSON.stringify(this.singleSongObj);
          this.isShowImage = this.singleSongObj.imageUrl;
        } else {
          this.isShowImage = null;
        }
      }
    },
    ...mapMutations([
      "mapMutations",
      "modifyPlayerState",
      "changeBgUrlState",
      "changeCurrentState",
      "getSingleSongMessage",
      "StartPlayStateEvent",
      "controlStationMusic",
      "changeAudioStation",
      "modifySingleSongObj"
    ]),
    // 监听音乐播放过程
    ListenThroughEvent() {
      let curT = this.$refs.playerMusic.currentTime;
      let allDuration = this.$refs.playerMusic.duration;
      if (curT && allDuration) {
        this.currentPlayTime = parseInt((curT / allDuration) * 100);
        this.durationPlayTime = allDuration;
      }
      // console.log(this.SongSrcObj)
    },

    //修改音乐进度
    modifyMusicProgress(value) {
      this.$refs.playerMusic.currentTime = value;
    },

    //监听音乐是否结束
    async ListenEndedEvent() {
      this.changeBgUrlState(1);
      this.$refs.playAnimation.style.animationPlayState = "paused";
      this.isShow = true;
      //主页的播放器
      this.$refs.tabCricle.style.animationPlayState = "paused";
      // this.curbgUrl = bgUrl[1];
      this.modifyPlayerState(false);

      // if (this.isPlayAllSong) {
      //   let currentS = JSON.parse(localStorage.allSongList).length;
      //   let num = this.currentSongCount + 1;
      //   if (num > currentS) {
      //     num = 0;
      //   }
        // let o=this.allSongList[num];
        // let t=o.audioId
        // o={
        //   ...o,
        //   audioUrl:this.SongSrcObj[t]
          
        // }
        //   console.log("object=>",o);
        // this.modifySingleSongObj(o);
        // this.$store.commit("getCurrentSongCount", num);
        // this.playerEvent();
      // }
    },

    initRendData() {
      if (localStorage?.singleSongMessage) {
        let currentLocalStorage = JSON.parse(localStorage?.singleSongMessage);
        this.getSingleSongMessage(currentLocalStorage);
        // console.log(currentLocalStorage);
      }
    },
    //跳转到HomePlayerView组件
    ShowOrHidePlayer() {
      if (this.isStartPlayState) {
        this.isShowAndHide = !this.isShowAndHide;
      }
    },
    //HomePlayerView组件那边传过来的播放器的播放状态
    playerAndPauseEvent() {
      this.playerEvent();
    },
    //主页播放器的动画初始渲染
    initRendAnimate() {
      this.$refs.tabCricle.style.animationPlayState = "running";
      this.$refs.playAnimation.style.animationPlayState = "running";
    },
  },
  computed: {
    ...mapState([
      "singleSongObj",
      "playerState",
      "SongSrcObj",
      "singleId",
      "isChangeState",
      "allSongList",
      "hideplayer",
      "isEmptyValue",
      "isStartPlayState",
      "isRunPlayStation",
      "isPlayAllSong",
      "currentSongCount",
    ]),
  },
  watch: {
    singleSongObj(newValue, oldValue) {
      this.$refs.playerMusic.load();
      if (newValue != oldValue && this.isChangeState) {
        this.isShow = !this.playerState;
        this.$refs.playerMusic.play();
        this.changeBgUrlState(0);
        this.changeCurrentState(false);
        this.isShowImage = this.singleSongObj.imageUrl;
        setTimeout(() => {
          this.initRendAnimate();
        }, 300);
      }
    },
    isRunPlayStation() {
      if (!this.isRunPlayStation) {
        if (this.playerState) {
          // console.log('播放')
          this.isShow = false;
          this.playerEvent();
        }
      }
    },
    // isPlayAllSong() {
    //   this.playerEvent();
    // },
  },
  components: {
    HomePlayerView,
  },
};
</script>

<style lang="scss" scoped>
.app-tab {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 70px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #fff;

  .app-tab-left {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 100%;
    box-shadow: 0px -1px 2px #eee;
    border-top-right-radius: 10px;
    .app-items {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;
      color: #888;

      .app-tab-home,
      .app-tab-album {
        width: 30px;
        height: 30px;
        margin-bottom: 6px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .app-tab-home {
        background-image: url("./assets/picture/music-dark.png");
      }
      .app-tab-album {
        background-image: url("./assets/picture/album-dark.png");
      }
    }

    & .router-link-exact-active {
      .app-tab-home {
        background-image: url("./assets/picture/music-light.png");
      }
      .app-tab-album {
        background-image: url("./assets/picture/album-light.png");
      }
      .app-tab-text {
        color: #d1b27c;
      }
    }
  }
  .app-tab-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 100%;
    box-shadow: 0px -1px 2px #eee;
    border-top-left-radius: 10px;

    .app-items {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;
      color: #888;

      .app-tab-collection,
      .app-tab-my {
        width: 30px;
        height: 30px;
        margin-bottom: 6px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .app-tab-collection {
        background-image: url("./assets/picture/collect-dark.png");
      }
      .app-tab-my {
        background-image: url("./assets/picture/user-dark.png");
      }
    }

    & .router-link-exact-active {
      .app-tab-collection {
        background-image: url("./assets/picture/collect-light.png");
      }
      .app-tab-my {
        background-image: url("./assets/picture/user-light.png");
      }
      .app-tab-text {
        color: #d1b27c;
      }
    }
  }
  .app-tab-player {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 70px;
    border-radius: 999px;
    left: 0px;
    right: 0px;
    top: -35px;
    margin: 0px auto;
    box-shadow: 0px 1px 2px #eee;

    .app-tab-cricle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 65px;
      height: 65px;
      border-radius: 999px;
      background-image: url("./assets/picture/player-cricle.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;

      .app-tab-cricle-img {
        width: 50px;
        height: 50px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 999px;
        overflow: hidden;
        animation: rotateEvent 6s infinite linear paused;
      }
      .cricle-dark {
        box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.6);
      }

      @keyframes rotateEvent {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}

//播放条的样式
.home-scroll-bar {
  position: fixed;
  right: 0px;
  bottom: 120px;
  width: 80px;
  height: 30px;
  border-radius: 30px 0px 0px 30px;
  background: linear-gradient(90deg, #edd7a5, #ebd197, #eec176);
  z-index: 66;
  box-shadow: 0px 0px 3px #ccc;

  .home-scroll-cricle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 10px;
    bottom: 5px;
    width: 36px;
    height: 36px;
    background-image: url("./assets/picture/player-cricle.png");
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 999px;

    .home-scroll-small-cricle {
      width: 28px;
      height: 28px;
      overflow: hidden;
      border-radius: 999px;
      background-size: cover;
      animation: playMusic 6s infinite linear paused;
    }

    @keyframes playMusic {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .scroll-player-play {
    position: absolute;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    top: 2px;
    right: 5px;
    z-index: 999;

    .icon-play_fill {
      font-size: 26px;
    }
    .icon-pause1 {
      font-size: 26px;
      color: black !important;
    }
  }

  .layer-move {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    border-radius: 30px 0px 0px 30px;
    z-index: 3;
  }
}

.barMove-enter,
.barMove-leave-to {
  transform: translateX(100%);
}
.barMove-enter-active {
  transition: all 0.8s linear;
}
.barMove-leave-active {
  transition: all 0.3s linear;
}
.barMove-enter-to,
.barMove-leave {
  transform: translateX(0px);
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
</style>
