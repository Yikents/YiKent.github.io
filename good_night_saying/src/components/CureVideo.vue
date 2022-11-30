<template>
  <div class="cureVideo">
    <video :src="url" ref="player" id="video" autoplay="true" loop></video>
    <div class="back-arrow" @click="showVideo">
      <span class="iconfont icon-arrow-left"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player:String
  },
  data() {
    return {
      url: require("../assets/image/cureVideo/" + this.player),
    };
  },
  methods: {
    showVideo() {
      this.$emit("showVideo", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.cureVideo {
  box-sizing: border-box;
  position: fixed;
  right: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 3;
  background: #fff;

  #video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .back-arrow {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: rgba(128, 128, 128, 0.7);
    border-radius: 999px;

    .icon-arrow-left {
      font-size: 20px;
      font-weight: bold;
      margin-left: 3px;
      color: #f5f5f5;
    }
  }
}
</style>