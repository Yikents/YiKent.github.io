<template>
  <div class="night">
    <div class="night-header">
      <div class="night-header-layer">
        <div class="night-header-circle">
          <div class="night-header-title">
            相遇未<span>晚</span> , 随遇而<span>安</span>
          </div>
          <div class="night-header-date">
            <span>日期 :</span><span>{{ dealDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="night-body">
      <div class="night-body-title">TOP 1</div>
      <div class="night-body-content">
        <div class="night-body-content-title">精选语录</div>
        <div class="night-body-content-text">
          <div>最美好的时光,就是回不去的时光</div>
          <div class="night-body-cont">
            <img src="../../assets/image/goodNight/logoBottom.png" >
          </div>
        </div>
      </div>
    </div>

    <div class="night-footer">
      <div class="night-footer-title">TOP 2</div>
      <div class="night-footer-select">
        <div class="night-footer-item night-player">
          <div class="cont-img" ref="itNight">
            <img src="../../assets/image/goodNight/wanitem1.png" />
          </div>
          <div class="night-footer-text">晚安</div>
          <div class="night-footer-aud"  @click="nightClickEvent">
            <audio ref="audio"></audio>
          </div>
        </div>

        <div class="night-footer-item musice-player">
          <div class="cont-img" :class="{ itemMusic: judge }" ref="itMusic">
            <img src="../../assets/image/goodNight/wanitem2.png" />
          </div>
          <div class="night-footer-text">音乐</div>
          <div class="night-footer-audio"  @click="musicClickEvent">
            <audio src="http://101.200.156.176/lixiang.mp3" ref="audio1"></audio>
          </div>
        </div>

        <div class="night-footer-item">
          <div class="cont-img item-essay" @click="showEssay">
            <img src="../../assets/image/goodNight/wanitem3.png" />
          </div>
          <div class="night-footer-text">美文</div>
        </div>

        <div class="night-footer-item">
          <div class="cont-img item-mail" @click="showMails">
            <img src="../../assets/image/goodNight/wanitem4.png" />
          </div>
          <div class="night-footer-text">信箱</div>
        </div>
      </div>
    </div>

    <div class="night-footer-bar">
      <div class="first-bar"></div>
      <div class="second-bar"></div>
    </div>
    <transition name="move">
      <NightEssayView
        v-show="isEssay"
        :renderData="renderData"
        @judgeStatus="judgeStatus"
        :isLoading="isLoad"
      />
    </transition>

    <transition name="move">
      <NightMailsView
        v-show="isMails"
        :mailsData="mailsData"
        @MailStatus="MailStatus"
        :isFinishedLoad="isRun"
      />
    </transition>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import NightEssayView from "./NightEssayView.vue";
import NightMailsView from "./NightMailsView.vue";
import { selectUrl } from '@/utils/nightSaying'

export default {
  name: "NightView",
  data() {
    return {
      judge: false,
      isEssay: false,
      isMails: false,
      renderData: {},
      mailsData: [],
      isRun: false,
      isLoad: false,
      urlLength:0
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(
          "/shengcai/api/mobile/common/findReportListById?rid=135469&userid=153225&meetid=1339"
        )
        .then((data) => {
          this.renderData = data.data.report;
        });
      this.$nextTick(() => {
        this.isLoad = true;
      });
    },
    dealMailsData() {
      this.$axios
        .get(
          "/shengcai/api/mobile/common/findHomeReportList?meetid=1332&currentpage=1&maxresult=20&type=0"
        )
        .then((data) => {
          this.mailsData = [...data.data.reportlist];
        });
      this.$nextTick(() => {
        this.isRun = true;
      });
    },
    nightClickEvent() {
      let self = this.$refs.itNight;
      self.classList.add("item-night");
      setTimeout(function () {
        self.classList.remove("item-night");
      }, 1000);
      this.urlLength=this.urlLength%selectUrl.length;
      this.$refs.audio.src=`${selectUrl[this.urlLength]}`;
      this.$refs.audio.play();
      this.urlLength+=1;
    },
    musicClickEvent() {
      if (!this.judge) {
        this.$refs.itMusic.style.animationPlayState = "running";
        this.$refs.audio1.play();
        this.judge = true;
      } else {
        this.$refs.itMusic.style.animationPlayState = "paused";
        this.$refs.audio1.pause();
        this.judge = false;
      }
    },
    showEssay() {
      this.getData = debounce(this.getData, 2000);
      this.isEssay = true;
      this.getData();
    },
    showMails() {
      this.dealMailsData = debounce(this.dealMailsData, 2000);
      this.isMails = true;
      this.dealMailsData();
    },
    judgeStatus(val) {
      this.isEssay = val;
    },
    MailStatus(val) {
      this.isMails = val;
    },
  },
  computed: {
    dealDate() {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = currentDate.getDate();
      day = day < 10 ? "0" + day : day;
      return year + "." + month + "." + day;
    },
  },

  components: {
    NightEssayView,
    NightMailsView,
  },
};
</script>

<style lang="scss" scoped>
.night {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 55px;
  overflow: auto;
  z-index: 2;
  background: #e0f7fa;
  
  &::-webkit-scrollbar{
    width:0px;
  }

  .night-header {
    position: relative;
    width: 100%;
    height: 50%;
    overflow: hidden;

    .night-header-layer {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0px;
      left: -15%;
      width: 130%;
      height: 100%;
      background: url("../../assets/image/goodNight/bg_login.jpg");
      background-size: 130% 146%;
      background-position: center center;
      background-repeat: no-repeat;
      overflow: hidden;
      border-radius: 0px 0px 50% 50%;

      .night-header-circle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgb(251, 251, 251);
        width: 230px;
        height: 230px;
        background-image: url("../../assets/image/goodNight/wancircle.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;

        .night-header-title {
          margin-bottom: 20px;
          font-size: 13px;

          & span {
            font-size: 15px;
            color: #ffd200;
          }
        }

        .night-header-date {
          font-size: 12px;

          & span:first-child {
            margin-right: 5px;
          }
        }
      }
    }
  }

  .night-body {
    padding: 0px 20px;

    .night-body-title {
      height: 60px;
      line-height: 60px;
      margin-left: 10px;
      color: #ffd630;
    }

    .night-body-content {
      box-sizing: border-box;
      padding-top: 13px;
      padding-bottom: 2px;
      background: rgba(255, 255, 255, 0.292);
      border-radius: 10px;

      .night-body-content-title {
        font-size: 16px;
        margin-left: 10px;
        margin-bottom: 10px;
      }

      .night-body-content-text {
        font-size: 15px;
        margin: 2px 2px 0px 2px;
        background: #9ce6f391;
        border-radius: 5px;
        padding: 0px 20px;
        overflow: hidden;

        & div {
          display: flex;
          align-items: flex-end;
          height: 40px;
        }
        .night-body-cont {
          width:46px;
          height: 46px;
          float:right;

          img {
            display: block;
            width:100%;
          }
        }
      }
    }
  }

  .night-footer {
    padding: 0px 20px;

    .night-footer-title {
      margin-left: 10px;
      height: 60px;
      line-height: 60px;
      color: #ffd630;
    }

    .night-footer-select {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .night-footer-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.night-player{
          position:relative;

          .night-footer-aud{
            position: absolute;
            left:20px;
            right:20px;
            top:0px;
            bottom:0px;
            overflow:hidden;
          }
        }

        &.musice-player {
          position: relative;

          .night-footer-audio {
            position: absolute;
            left: 20px;
            right: 20px;
            top: 0px;
            bottom: 0px;
            overflow: hidden;
          }
        }

        .item-night {
          animation: nightMove 0.3s ease 6;
        }
        @keyframes nightMove {
          from {
            transform: translateX(-3px);
          }
          to {
            transform: translateX(3px);
          }
        }

        .itemMusic {
          animation: musicMove 1s linear infinite;
        }
        @keyframes musicMove {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .cont-img {
          width: 40px;
          height: 40px;

          & img {
            display: block;
            width: 100%;
          }
        }

        .night-footer-text {
          font-size: 15px;
          color: #666;
          padding-top: 10px;
        }
      }
    }
  }

  .night-footer-bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
    margin-bottom:20px;

    .first-bar {
      width: 30px;
      height: 2px;
      margin-bottom: 6px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.9);
    }
    .second-bar {
      width: 40px;
      height: 2px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.9);
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
