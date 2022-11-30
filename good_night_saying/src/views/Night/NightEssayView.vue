<template>
  <div class="nightessay">
    <div class="nightessay-header">
      <div class="nightessay-header-arrow" @click="sendData">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="nightessay-header-text">美文</div>
      <div class="nightessay-header-create">
        <span class="iconfont icon-collection"></span>
      </div>
    </div>
    <div class="nightessay-body" v-show="isLoading">
      <div class="nightessay-body-title">{{ renderData?.title }}</div>
      <div class="nightessay-body-content">
        <div v-for="(item, index) in dealData" :key="index" class="items-text">
          {{ item }}
        </div>
        <div class="nightessay-body-time">{{renderData.createTime}}</div>
      </div>
    </div>
    <wd-loading class="load" size="26px" v-if="!isLoading"></wd-loading>
  </div>
</template>

<script>
export default {
  props: {
    renderData: Object,
    isLoading: Boolean,
  },
  data() {
    return {};
  },
  created() {
    this.dealData;
  },
  methods: {
    sendData() {
      this.$emit("judgeStatus", false);
    },
  },
  computed: {
    dealData() {
      let reg = /<\/p>/;
      let arr1 = this.renderData?.text?.split(reg);
      let arr2 = [];
      if (arr1) {
        arr1.forEach((it) => {
          let b = it.split(/>/);
          if (b[1]) {
            arr2.push(b[1]);
          }
        });
      }

      return arr2;
    },
  },
};
</script>

<style lang="scss" scoped>
.nightessay {
  box-sizing: border-box;
  position: fixed;
  right: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background-color: #f5f5f5;
}
.nightessay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  .nightessay-header-arrow {
    width: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .icon-arrow-left{
      font-size:23px;
      color:#666;
    }
  }

  .nightessay-header-text {
    color: orange;
  }

  .nightessay-header-create {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .icon-collection{
      font-size:23px;
      color:#666;
    }
  }
}

.nightessay-body {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0px 20px 40px 20px;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }

  .nightessay-body-title {
    position: relative;
    height: 40px;
    line-height: 40px;

    &::after {
      position: absolute;
      content: "";
      display: block;
      width: 110%;
      left: -20px;
      bottom: -6px;
      border-bottom: 6px dashed rgba(106, 106, 106, 0.062);
    }
  }

  .nightessay-body-content {
    width: 100%;

    .items-text {
      margin: 10px 0px;
      line-height: 30px;
      font-size: 15px;
    }

    .nightessay-body-time{
      margin-top: 20px;
      font-size:15px;
    }
  }
}

.load {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
}
</style>