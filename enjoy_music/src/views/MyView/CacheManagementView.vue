<template>
  <div class="interesr-view">
    <div class="nav-bar">
      <span class="left-arrow" @click="cacheManagementReturn"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>缓存管理</span>
      <span class="right-icon" @click="doingCacheRouter = true"></span>
    </div>
    <div class="van-tabs-box">
      <van-tabs
        v-model="active"
        animated
        swipeable
        color="#ecbc73"
        line-width="32px"
        title-inactive-color="#888"
        title-active-color="#000"
      >
        <van-tab
          title="歌曲"
          :title-style="{ fontSize: '16px', fontWeight: '900' }"
          ><div class="dy-list">
            <div class="background-and-text">
              <div class="bg-img"></div>
              <div class="bg-text">暂无数据</div>
            </div>
          </div></van-tab
        >
        <van-tab
          title="导听"
          :title-style="{ fontSize: '16px', fontWeight: '900' }"
          ><div class="dy-list">
            <div class="background-and-text">
              <div class="bg-img"></div>
              <div class="bg-text">暂无数据</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <transition name="setting">
      <DoingCacheView
        v-show="doingCacheRouter == true"
        @doingCacheReturn="doingCacheReturn"
      />
    </transition>
  </div>
</template>

<script>
import DoingCacheView from "@/components/UserComponents/DoingCacheView.vue";
export default {
  data() {
    return {
      active: 0,
      doingCacheRouter: false,
    };
  },

  methods: {
    cacheManagementReturn() {
      this.$emit("cacheManagementReturn", false);
    },
    doingCacheReturn(val) {
      this.doingCacheRouter = val;
    },
  },
  components: {
    DoingCacheView,
  },
};
</script>

<style lang="scss" scoped>
.interesr-view {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  background-color: #fff;

  .nav-bar {
    position: fixed;
    width: 100vw;
    height: 97.5px;
    text-align: center;
    line-height: 55px;
    font-size: 20px;
    box-shadow: 1px 0px 10px #ddd;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }

    .right-icon {
      position: absolute;
      top: 15px;
      right: 20px;
      display: inline-block;
      width: 25px;
      height: 25px;
      background-image: url("@/assets/image/drowse-management.png");
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  .dy-list {
    width: 100vw;
    height: calc(100vh - 99px);
    position: relative;
    overflow: auto;

    .background-and-text {
      position: absolute;
      top: 30%;
      left: calc((100vw - 150px) / 2);

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

  .van-tabs-box {
    margin-top: 55px;
    background-color: transparent;
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