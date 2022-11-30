<template>
  <div class="home-main">
    <div class="home-header-swiper">
      <van-swipe
        class="my-swipe"
        swipeable
        :show-indicators="isShowIndicators"
        :autoplay="2000"
      >
        <van-swipe-item
          v-for="item in bandListArr"
          :key="item.id"
          :style="{backgroundImage: `url(${item.picUrl})` }"
          @click="jumpRouterEvent(item)" lazy-load
        >
        </van-swipe-item>
        <van-loading
          type="spinner"
          color="#1989fa"
          v-if="isShowCont"
          class="van-load"
        />
      </van-swipe>
    </div>
    <div class="home-body">
      <div class="home-cherry-song">
        <div class="home-cherry-left"></div>
        <div class="home-cherry-center">
          <div class="home-cherry-center-title">
            <span>~</span> {{ CherryAudioObj.author }}<span>~</span>
          </div>
          <div class="home-cherry-center-text">
            {{ CherryAudioObj.title }}
          </div>
        </div>
        <div class="home-cherry-right">
          <div class="home-ruler-smallscricle" @click="playRadioStation">
            <img src="../../assets/image/main_fm_play.png" />
            <audio :src="CherryAudioObj.audio" ref="cherryAudio"></audio>
          </div>
        </div>
        <div class="home-ruler-bar">
          <div class="home-ruler-lightbar"></div>
        </div>
      </div>
      <HomeNewAlbumView />
      <HomeBoutiqueView />
      <HomeRecommendView />
      <HomeAuthorityListView />
    </div>
    <div
      class="jump-way-buttum"
      ref="jumpmove"
      @touchstart.prevent="StartEvent($event)"
      @touchmove.stop="MoveEvent($event)"
      @touchend.prevent="EndEvent($event)"
    ></div>
  </div>
</template>
<script>
import HomeNewAlbumView from "@/components/HomeComponents/HomeNewAlbumView.vue";
import HomeBoutiqueView from "@/components/HomeComponents/HomeBoutiqueView.vue";
import HomeRecommendView from "@/components/HomeComponents/HomeRecommendView.vue";
import HomeAuthorityListView from "@/components/HomeComponents/HomeAuthorityListView.vue";
import { CherryAudio } from "@/api/RadioStation";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      bandListArr: [],
      CherryAudioObj: {
        author: "Radio Station",
        title: "我们对一件事情的着迷可能是出于窥探的欲望",
        audio: "",
      },
      CurDataObj: {},
      isShowIndicators: false,
      initPositionX: 0,
      initPositionY: 0,
      isTouchEvent: false,
      isShowCont: true,
      isRunTouch: false,
      curJubge: false,
    };
  },
  created() {
    this.getSongListData();
    this.getRadioStationData();
    this.controlStationMusic(true);
  },
  methods: {
    // 获取数据列表
    getSongListData() {
      this.$axios
        .get(
          "http://localhost:3000/artist/list?type=3&area=96&initial=b&limit=8"
        )
        .then(({ data }) => {
          this.bandListArr = [...data.artists];
          this.isShowCont = false;
          // console.log(this.bandListArr)
        });
    },

    // 触发touchstart事件
    StartEvent(e) {
      this.initPositionX = e.touches[0].clientX;
      this.initPositionY = e.touches[0].clientY;
      this.isTouchEvent = true;
    },
    // 触发touchmove事件
    MoveEvent(e1) {
      if (this.isTouchEvent) {
        if (e1.target.style.left <= window.innerWidth / 2) {
          e1.target.style.left =
            e1.touches[0].clientX - this.initPositionX + "px";
        } else {
          e1.target.style.left =
            e1.touches[0].clientX - e1.target.offsetWidth / 2 + "px";
        }

        if (e1.touches[0].clientY < 55) {
          e1.target.style.top = 55 + "px";
        } else {
          if (e1.touches[0].clientY < window.innerHeight - 110) {
            e1.target.style.top =
              e1.touches[0].clientY - e1.target.offsetHeight / 2 + "px";
          } else {
            e1.target.style.top = window.innerHeight - 110 + "px";
          }
        }
        this.isRunTouch = true;
      }
    },
    // 触发touchend事件
    EndEvent(e2) {
      if (this.isRunTouch) {
        let positionX = e2.target.style;
        if (parseFloat(positionX.left) <= window.innerWidth / 2) {
          positionX.left = 0 + "px";
          positionX.right = null;
        } else {
          positionX.left = null;
          positionX.right = 0 + "px";
        }
        this.isTouchEvent = false;
        this.isRunTouch = false;
      } else {
        this.vistEncyclopedia();
      }
    },

    jumpRouterEvent(item) {
      //处理一下数据
      let tempData={
        imgUrl:item.picUrl,
        albumsId:item.id,
        songName:item.name
      }
      this.$store.commit("getCurrentCollection",tempData);
      this.$router.push({
        path: "/home-album-list/" + item.id,
      });
    },

    vistEncyclopedia() {
      this.$router.push("/home-encyclopedia");
    },
    //获取电台数据
    async getRadioStationData() {
      let curData = await CherryAudio();
      this.CherryAudioObj = {
        author: "Radio Station",
        title: "我们对一件事情的着迷可能是出于窥探的欲望",
        audio: curData.audio,
      };
      this.CurDataObj = { ...curData };
      this.curJubge = true;
    },
    //播放电台
    playRadioStation() {
      if (this.curJubge) {
        this.CherryAudioObj = { ...this.CurDataObj };
        this.curJubge = false;
      }
      if (this.isRunPlayStation) {
        this.$refs.cherryAudio.play();
        this.controlStationMusic(false);
      } else {
        this.$refs.cherryAudio.pause();
        this.controlStationMusic(true);
      }
    },
    //监听播放器的状态来控制电台播放
    RadioStationState() {
      this.$refs.cherryAudio.pause();
      this.controlStationMusic(true);
    },
    ...mapMutations(["controlStationMusic"]),
  },
  computed: {
    ...mapState(["isRunPlayStation", "isPausePlayStation"]),
  },
  watch: {
    isPausePlayStation() {
      if (this.isPausePlayStation) {
        this.RadioStationState();
      }
    },
  },
  components: {
    HomeNewAlbumView,
    HomeBoutiqueView,
    HomeRecommendView,
    HomeAuthorityListView,
  },
};
</script>
<style lang="scss" scoped>
.home-main {
  position: fixed;
  width: 100vw;
  height: calc(100% - 35px - 70px);
  overflow: scroll;
  background: #f7f7f7;
  z-index: 3;

  &::-webkit-scrollbar {
    width: 0px;
  }

  .home-header-swiper {
    .my-swipe {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      height: 180px;

      .van-swipe__track {
        display: flex;
      }
    }

    .my-swipe .van-swipe-item {
      width: 96% !important;
      height: 180px;
      margin: 0px 2%;
      border-radius: 5px;
      overflow: hidden;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .van-load {
      margin-top: 90px;
      transform: translate(-50% -50%);
    }
  }
  .home-body {
    box-sizing: border-box;
    padding: 0px 10px;

    .home-cherry-song {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      margin: 25px 10px 40px;
      width: calc(100% - 20px);
      height: 70px;
      border-radius: 3px 35px 35px 3px;
      background: #f0cd85;

      &::before {
        position: absolute;
        top: -12px;
        left: 12px;
        content: "";
        width: 3px;
        height: 13px;
        background: linear-gradient(rgb(130, 130, 130), #efefef, #777);
      }

      .home-ruler-bar {
        position: absolute;
        width: calc(100% - 33px);
        top: 0px;
        right: 33px;
        height: 13px;
        background-image: url("../../assets/image/rulers.png");
        background-size: 30px 13px;

        .home-ruler-lightbar {
          position: absolute;
          top: 0px;
          left: 33px;
          width: 4px;
          height: 30px;
          background-color: #e1393cca;
        }
      }

      .home-cherry-left {
        margin: 10px;
        width: 18px;
        height: calc(100% - 20px);
        background-image: url("../../assets/image/seconds.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .home-cherry-center {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding: 0px 5px;

        .home-cherry-center-title {
          margin-top: 10px;
          font-size: 15px;
          font-weight: bolder;
          width: 160px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .home-cherry-center-text {
          margin-top: 10px;
          font-size: 14px;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #c8a256;
        }
      }
      .home-cherry-right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        border-radius: 999px;
        background-image: url("../../assets/image/loadCricle.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;

        .home-ruler-smallscricle {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border-radius: 999px;
          background-image: url("../../assets/image/loadCricle.png");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;

          img {
            display: block;
            width: 36px;
            height: 36px;
          }
        }
      }
    }
  }

  .jump-way-buttum {
    position: fixed;
    width: 40px;
    height: 40px;
    bottom: 220px;
    border-radius: 999px;
    background-image: url("../../assets/image/link.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 36;
  }
}
</style>