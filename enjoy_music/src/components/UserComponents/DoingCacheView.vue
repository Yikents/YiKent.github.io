<template>
  <div class="doing-cache-view">
    <div class="nav-bar">
      <span class="left-arrow" @click="doingCacheReturn"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>正在缓存</span>
    </div>
    <div class="dy-list">
      <div class="background-and-text">
        <div class="bg-img"></div>
        <div class="bg-text">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
methods:{

     doingCacheReturn() {
        console.log("hhhh");
      this.$emit("doingCacheReturn", false);
    },
}
};
</script>
<style lang="scss" scoped>
.doing-cache-view {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 106;
  background-color: #fff;

  .nav-bar {
    position: relative;
    width: 100vw;
    height: 55px;
    text-align: center;
    line-height: 55px;
    font-size: 20px;
    box-shadow: 1px 0px 10px #ddd;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }

  .dy-list {
    width: 100vw;
    height: calc(100vh - 99px);
    position: relative;

    .background-and-text {
      position: absolute;
      top: 30%;
      left: calc((100vw - 150px) / 2 );

      .bg-img {
        width: 150px;
        height: 150px;
        background-image: url("@/assets/image/dynamic-bg-img.png");
        background-size: 150px 150px;
        background-position: center;
        background-repeat: no-repeat;
      }

      .bg-text {
        text-align: center;
        color: #999;
        margin-top: 30px;
      }
    }
  }

}
</style>