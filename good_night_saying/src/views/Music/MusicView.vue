<template>
  <div class="recordsaying" ref="recordsay">
    <div class="recordsaying-header" :class="{ backgroundStatus: isChange }">
      <div class="recordsaying-header-bar"></div>
      <div class="recordsaying-header-content">
        <div class="recordsaying-header-icon" @click="changeStatus">
          <span
            class="iconfont icon-yueliang1"
            :class="{ active: isChange }"
          ></span>
        </div>
        <div class="recordsaying-header-text" v-show="!isChange">
          小月亮可以点亮哦
        </div>
        <div class="recordsaying-header-refresh" v-show="isChange">
          <div class="refresh-text">{{ wordString }}</div>
          <div class="refresh-icon" ref="refreshRotate" @click="refreshWord">
            <span class="iconfont icon-refresh"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="recordsaying-body">
      <div class="recordsaying-body-reading" @click="sendReadData">
        <div class="recordsaying-body-content">
          <div class="recordsaying-body-title">阅读时光</div>
          <div class="recordsaying-body-tip">
            其实一直陪着你的,是那个了不起的自己
          </div>
        </div>
        <div class="recoordsaying-body-arrow">
          <span class="iconfont icon-cc-arrow-right"></span>
        </div>
      </div>

      <div class="recordsaying-body-greet">
        <div class="recordsaying-greet-title">晚安问候</div>
        <ul class="recordsaying-greet-lists">
          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/girl1.jpg"
                class="img1"
              />
            </div>
            <div class="greet-text">晚安</div>
            <audio
              src="http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wangirl1.mp3"
            ></audio>
          </li>

          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/girl2.jpg"
                class="img2"
              />
            </div>
            <div class="greet-text">按时睡觉</div>
            <audio
              src="http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wangirl2.mp3"
            ></audio>
          </li>

          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/girl3.jpg"
                class="img3"
              />
            </div>
            <div class="greet-text">过得怎样</div>
            <audio
              src="http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wangirl3.mp3"
            ></audio>
          </li>

          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/girl4.jpg"
                class="img4"
              />
            </div>
            <div class="greet-text">晚上好</div>
            <audio
              src="http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wangirl4.mp3"
            ></audio>
          </li>

          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/boy1.jpg"
                class="img5"
              />
            </div>
            <div class="greet-text">盖好被子</div>
            <audio
              src="https://3026553065.qnqcdn.net:22443/qn-xeU2ywgtXIiFWIBAkVCUkI1EnGmQUMT4.audio.pcdn.xmcdn.com/storages/7e98-audiofreehighqps/BD/5D/GKwRIJEG5FqNAAWZbwGaCavY.m4a"
            ></audio>
          </li>

          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/boy2.jpg"
                class="img6"
              />
            </div>
            <div class="greet-text">等你睡着</div>
            <audio
              src="https://3079037649.qnqcdn.net:22443/qn-FxtPqn9DBIiFWIBAkVCUkI1EnGmQUMT4.audio.pcdn.xmcdn.com/group76/M01/72/05/wKgO1F5_ygXjCT0pAAeXCpbIZa8314.m4a"
            ></audio>
          </li>

          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/boy3.jpg"
                class="img7"
              />
            </div>
            <div class="greet-text">不想你太累</div>
            <audio
              src="https://3026553064.qnqcdn.net:22443/qn-ukEPRf6MfIiFWIBAkVCUkI1EnGmQUMT4.audio.pcdn.xmcdn.com/group32/M00/97/A5/wKgJUFn5lraCdaiiAAsm721j44s823.m4a"
            ></audio>
          </li>

          <li class="recordsaying-greet-item" @click="playerEvent">
            <div class="greet-img">
              <img
                src="../../assets/image/headPortrait/boy4.jpg"
                class="img8"
              />
            </div>
            <div class="greet-text">喜欢你</div>
            <audio
              src="http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wanboy1.mp3"
            ></audio>
          </li>
        </ul>
      </div>

      <div class="recordsaying-body-station">
        <div class="recordsaying-station-title">音乐电台</div>
        <ul class="recordsaying-station-lists">
          <li
            class="recordsaying-station-item"
            @click="playStation('https://3079037647.qnqcdn.net:22443/qn-0T5WUFJz5IiFWIBAkVCUkI1EnGmQUMT4.audio.pcdn.xmcdn.com/storages/5402-audiofreehighqps/B8/9A/GKwRIJIHHyVzAJpxzwGxbb76.m4a', 'spaceTime')"
          >
            <div class="station-img">
              <img src="../../assets/image/headPortrait/fengjing1.jpg" />
            </div>
            <div class="station-text">错位时空</div>
          </li>

          <li
            class="recordsaying-station-item"
            @click="playStation('https://3079037648.qnqcdn.net:22443/qn-2UgA5lSKUIiFWIBAkVCUkI1EnGmQUMT4.audio.pcdn.xmcdn.com/storages/f2d4-audiofreehighqps/4C/04/GKwRIDoHHUJJAKBDvwGwiLq4.m4a', 'together')"
          >
            <div class="station-img">
              <img src="../../assets/image/headPortrait/fengjing2.jpg" />
            </div>
            <div class="station-text">陪你看星星</div>
          </li>

          <li
            class="recordsaying-station-item"
            @click="playStation('https://1851079102.qnqcdn.net:22443/qn-Ud84RSiXcIiFWIBAkVCUkI1EnGmQUMT4.audio.pcdn.xmcdn.com/storages/55bd-audiofreehighqps/C8/4C/GKwRIJEHGI_PAG8jbgGukG-A.m4a', 'protect')"
          >
            <div class="station-img">
              <img src="../../assets/image/headPortrait/fengjing3.jpg" />
            </div>
            <div class="station-text">PLANET</div>
          </li>

          <li
            class="recordsaying-station-item"
            @click="playStation('https://1851079096.qnqcdn.net:22443/qn-hMKnCF8y1IiFWIBAkVCUkI1EnGmQUMT4.audio.pcdn.xmcdn.com/storages/d564-audiofreehighqps/00/0C/GKwRIRwHFJkwAKKFrQGs38mA.m4a', 'starSky')"
          >
            <div class="station-img">
              <img src="../../assets/image/headPortrait/fengjing4.jpg" />
            </div>
            <div class="station-text">奔赴星空</div>
          </li>

          <li
            class="recordsaying-station-item"
            @click="
              playStation(
                'http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wantai1.mp3',
                'smile'
              )
            "
          >
            <div class="station-img">
              <img src="../../assets/image/headPortrait/fengjing5.jpg" />
            </div>
            <div class="station-text">微笑的你</div>
          </li>

          <li
            class="recordsaying-station-item"
            @click="
              playStation(
                'http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wantai2.mp3',
                'anxiety'
              )
            "
          >
            <div class="station-img">
              <img src="../../assets/image/headPortrait/fengjing6.jpg" />
            </div>
            <div class="station-text">别焦虑</div>
          </li>

          <li
            class="recordsaying-station-item"
            @click="
              playStation(
                'http://mashengcai.oss-cn-beijing.aliyuncs.com/wanan/wantai3.mp3',
                'thankSelf'
              )
            "
          >
            <div class="station-img">
              <img src="../../assets/image/headPortrait/fengjing7.jpg" />
            </div>
            <div class="station-text">谢谢自己</div>
          </li>
        </ul>
      </div>

      <div class="recordsaying-body-cure">
        <div class="recordsaying-cure-title">治愈视频</div>
        <ul class="recordsaying-cure-lists">
          <li class="recordsaying-cure-item" @click="playVideo('zhiyu1.mp4')">
            <div class="cure-img">
              <img src="../../assets/image/headPortrait/picture1.jpg" />
            </div>
            <div class="cure-text">星空</div>
          </li>

          <li class="recordsaying-cure-item" @click="playVideo('zhiyu2.mp4')">
            <div class="cure-img">
              <img src="../../assets/image/headPortrait/picture2.jpg" />
            </div>
            <div class="cure-text">自然</div>
          </li>

          <li class="recordsaying-cure-item" @click="playVideo('zhiyu3.mp4')">
            <div class="cure-img">
              <img src="../../assets/image/headPortrait/picture3.jpg" />
            </div>
            <div class="cure-text">美景</div>
          </li>

          <li class="recordsaying-cure-item" @click="playVideo('zhiyu4.mp4')">
            <div class="cure-img">
              <img src="../../assets/image/headPortrait/picture4.jpg" />
            </div>
            <div class="cure-text">生活</div>
          </li>
        </ul>
      </div>
    </div>
    <transition name="move">
      <ReadingTime
        @ShowPage="ShowPage"
        v-show="isShow"
        :ReadArr="ReadArr"
        :isCurrentCopy="isCurrentCopy"
      />
    </transition>

    <transition name="move">
      <MusicStation
        @closeStation="closeStation"
        v-if="isShowStation"
        :srcUL="srcUL"
        :imageUrl="imageUrl"
        :stationObj="stationObj"
      />
    </transition>

    <transition name="move">
      <CureVideo @showVideo="jumpPage" v-if="isShowVideo" :player="videoName" />
    </transition>
  </div>
</template>

<script>
import { wordSaying } from "@/utils/musicSaying";
import { stationWord } from "@/utils/musicStation";
import ReadingTime from "../../components/ReadingTime.vue";
import MusicStation from "../../components/MusicStation.vue";
import CureVideo from "../../components/CureVideo.vue";
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      isChange: false,
      wordString: "点击刷新,我来陪你聊聊天吧",
      count: 0,
      isRun: null,
      isShow: false,
      isCurrentCopy: false,
      ReadArr: [],
      isShowVideo: false,
      videoName: "",
      isShowStation: false,
      srcUL: "",
      stationObj: {},
      imageUrl: "",
    };
  },
  methods: {
    changeStatus() {
      if (this.isChange) {
        this.$refs.recordsay.style.backgroundColor = "#def8f9";
      } else {
        this.$refs.recordsay.style.backgroundColor = "#7b99d0";
      }
      this.isChange = !this.isChange;
    },

    refreshWord() {
      this.count = this.count % 9;
      this.wordString = wordSaying[this.count];
      this.count += 1;
      let self = this.$refs.refreshRotate;
      self.classList.add("refreshIt");
      setTimeout(() => {
        self.classList.remove("refreshIt");
      }, 300);
    },

    playerEvent(e) {
      if (e.currentTarget != this.isRun) {
        this.isRun?.firstElementChild.classList.remove("greetvoice");
        this.isRun?.lastElementChild.pause();
        let time = e.currentTarget.lastElementChild.duration;
        e.currentTarget.lastElementChild.play();
        e.currentTarget.firstElementChild.classList.add("greetvoice");
        e.currentTarget.firstElementChild.style.animationDuration = `${time}s`;
        this.isRun = e.currentTarget;
      } else {
        e.currentTarget.lastElementChild.pause();
        e.currentTarget.firstElementChild.classList.remove("greetvoice");
        this.isRun = null;
      }
    },

    getReadData() {
      this.$axios
        .get(
          "/shengcai/api/mobile/common/findHomeReportList?meetid=1339&currentpage=1&maxresult=20&type=0"
        )
        .then(({ data }) => {
          this.ReadArr = [...data.reportlist];
        });
      this.$nextTick(() => {
        this.isCurrentCopy = true;
      });
    },

    sendReadData() {
      this.isShow = !this.isShow;
      this.getReadData = debounce(this.getReadData, 1000);
      this.getReadData();
    },

    ShowPage(val) {
      this.isShow = val;
    },

    playVideo(val) {
      this.isShowVideo = !this.isShowVideo;
      this.videoName = val;
    },

    jumpPage(val) {
      this.isShowVideo = val;
    },

    playStation(val, word) {
      this.isShowStation = !this.isShowStation;
      this.stationObj = stationWord[word];
      this.imageUrl = stationWord[word].img;
      if (val) {
        this.srcUL = val;
      } else {
        this.srcUL = "";
      }
    },

    closeStation(val) {
      this.isShowStation = val;
    },
  },
  components: {
    ReadingTime,
    CureVideo,
    MusicStation,
  },
};
</script>

<style lang="scss" scoped>
.recordsaying {
  box-sizing: border-box;
  width:100%;
  height:100vh;
  overflow: scroll;
  padding-bottom:55px;
  background-color: #e0f7fa;
  &::-webkit-scrollbar {
    width: 0px;
  }

  .recordsaying-header {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    height: 180px;
    background: linear-gradient(#3db4bf 0%, #dde4e3 93%) no-repeat;

    &.backgroundStatus {
      background: url("../../assets/image/headPortrait/sky.jpeg") center
        no-repeat;
      background-size: cover;
    }

    .recordsaying-header-bar {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      width: 1px;
      height: 83px;
      transform: scaleX(1.5);
      background: white;
      margin: 0px auto;
    }

    .recordsaying-header-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .active {
        color: rgb(254, 254, 5) !important;
      }

      .icon-yueliang1 {
        color: #fff;
        font-size: 40px;
      }

      .recordsaying-header-text {
        margin: 20px 0px 30px 0px;
        font-size: 14px;
        color: rgb(254, 254, 5);
      }

      .recordsaying-header-refresh {
        display: flex;
        align-items: center;
        margin: 20px 0px 30px 0px;
        color: rgb(254, 254, 5);

        .refresh-text {
          font-size: 14px;
        }

        .refresh-icon {
          position: absolute;
          right: 30px;
          bottom: 22px;

          .icon-refresh {
            font-size: 30px;
          }
        }
      }
    }
  }

  .recordsaying-body {
    padding: 0px 10px;

    .recordsaying-body-reading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 26px;
      padding: 20px 20px 20px 30px;
      background: #fff;
      border-radius: 10px;

      .recordsaying-body-content {
        .recordsaying-body-title {
          height: 30px;
          font-size: 15px;
          font-weight: bold;
        }

        .recordsaying-body-tip {
          font-size: 13px;
          color: #666;
        }
      }

      .recoordsaying-body-arrow {
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: right;

        .icon-cc-arrow-right {
          color: orange;
          font-size: 30px;
        }
      }
    }

    .recordsaying-body-greet {
      margin-top: 26px;
      padding: 20px 20px 20px 30px;
      background: #fff;
      border-radius: 10px;

      .recordsaying-greet-title {
        height: 36px;
        line-height: 36px;
        font-size: 15px;
        font-weight: bold;
      }

      .recordsaying-greet-lists {
        display: flex;
        flex-wrap: wrap;

        .recordsaying-greet-item {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .greet-img {
            width: 50px;
            height: 50px;
            border-radius: 999px;
            overflow: hidden;
            margin-bottom: 10px;

            & img {
              display: block;
              width: 100%;
            }

            .img1 {
              transform: translateY(-27px);
            }

            .img2 {
              transform: translateY(-12px);
            }

            .img3 {
              transform: translateY(-26px);
            }

            .img4 {
              transform: translateY(-20px);
            }

            .img5 {
              transform: translateY(-14px);
            }

            .img6 {
              transform: translateY(-12px);
            }

            .img7 {
              transform: translateY(-16px);
            }

            .img8 {
              transform: translateY(-12px);
            }
          }

          .greet-text {
            font-size: 12px;
          }
        }
      }
    }

    .recordsaying-body-station {
      margin-top: 26px;
      padding: 20px 20px 20px 30px;
      background: #fff;
      border-radius: 10px;

      .recordsaying-station-title {
        height: 36px;
        line-height: 36px;
        font-size: 15px;
        font-weight: bold;
      }

      .recordsaying-station-lists {
        display: flex;
        flex-wrap: wrap;

        .recordsaying-station-item {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .station-img {
            width: 50px;
            height: 50px;
            border-radius: 999px;
            overflow: hidden;
            margin-bottom: 10px;

            & img {
              display: block;
              width: 100%;
              transform: translateY(-12px);
            }
          }

          .station-text {
            font-size: 12px;
          }
        }
      }
    }

    .recordsaying-body-cure {
      margin-top: 26px;
      margin-bottom: 10px;
      padding: 20px 20px 20px 30px;
      background: #fff;
      border-radius: 10px;

      .recordsaying-cure-title {
        height: 36px;
        line-height: 36px;
        font-size: 15px;
        font-weight: bold;
      }

      .recordsaying-cure-lists {
        display: flex;
        flex-wrap: wrap;

        .recordsaying-cure-item {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .cure-img {
            width: 50px;
            height: 50px;
            border-radius: 999px;
            overflow: hidden;
            margin-bottom: 10px;

            & img {
              display: block;
              width: 100%;
              transform: translateY(-10px);
            }
          }

          .cure-text {
            font-size: 12px;
          }
        }
      }
    }
  }
}
.refreshIt {
  animation: animat 0.3s linear infinite;
}

@keyframes animat {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

.greetvoice {
  animation: rotatePicture 1s linear;
}

@keyframes rotatePicture {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
</style>