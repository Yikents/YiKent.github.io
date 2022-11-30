<template>
  <div class="music-station" :style="{backgroundImage:'url('+imgUrl+')'}">
    <div class="music-station-body">
      <div class="music-body-header">
        <div class="music-station-title">{{ stationObj.title }}</div>
        <ul class="music-station-lists">
          <li class="music-station-item">音乐</li>
          <li class="music-station-item">放松</li>
          <li class="music-station-item">自然</li>
          <li class="music-station-item">灵感</li>
        </ul>
      </div>
      <div class="music-body-foot">
        <div class="music-body-content">
          <div
            class="music-body-text"
            v-for="(item, index) in stationObj.text"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div
          class="music-player play"
          v-show="isShowPlayer"
          @click="playStation"
        >
          <span class="iconfont icon-play-l"></span>
        </div>
        <div
          class="music-player pause"
          v-show="!isShowPlayer"
          @click="playStation"
        >
          <span class="iconfont icon-pause"></span>
        </div>
        <audio
          :src="audUrl"
          v-if="audUrl != '[object PointerEvent]'"
          autoplay="true"
          ref="playerAudio"
        ></audio>
      </div>
    </div>
    <div class="touch-arrow" @click="closeStation">
      <span class="iconfont icon-arrow-left"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["srcUL", "stationObj","imageUrl"],
  data() {
    return {
      isShowPlayer: false,
      audUrl: this.srcUL,
      imgUrl:require('../assets/image/'+this.imageUrl)
    };
  },
  methods: {
    closeStation() {
      this.$emit("closeStation", false);
    },
    playStation() {
      if (this.isShowPlayer) {
        this.isShowPlayer = false;
        this.$refs.playerAudio.play();
      } else {
        this.isShowPlayer = true;
        this.$refs.playerAudio.pause();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.music-station {
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 3;
  background-size: cover;
  background-position: center;

  .touch-arrow {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: rgba(221, 221, 221, 0.7);
    border-radius: 999px;

    .icon-arrow-left {
      font-size: 20px;
      font-weight: bold;
      margin-left: 3px;
      color: #fff;
    }
  }
}

.music-station-body {
  width: 100%;
}

.music-body-header {
  padding: 0px 20px;

  .music-station-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #fff;
  }
  .music-station-lists {
    display: flex;
    margin-bottom: 40px;

    .music-station-item {
      padding: 5px;
      margin-right: 15px;
      border-radius: 4px;
      color: #fff;
      font-size: 13px;

      &:nth-of-type(1) {
        background: rgba(255, 166, 0, 0.86);
      }
      &:nth-of-type(n + 2) {
        background: rgba(128, 128, 128, 0.86);
      }
    }
  }
}

.music-body-foot {
  padding: 10px 50px 0px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.38);

  .music-body-content {
    box-sizing: border-box;
    height: 200px;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0px;
    }

    .music-body-text {
      line-height: 40px;
      font-size: 15px;
      color: rgb(243, 240, 240);
    }
  }

  .music-player {
    position: absolute;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    right: 30px;
    bottom: 40px;

    & .iconfont {
      font-size: 26px;
      color: rgba(238, 238, 238, 0.862);
    }
  }
}
</style>