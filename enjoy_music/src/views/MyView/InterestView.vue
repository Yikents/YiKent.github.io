<template>
  <div class="interesr-view">
    <div class="nav-bar">
      <span class="left-arrow" @click="interestViewReturn"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>关注</span>
    </div>
    <div class="van-tabs-box">
      <van-tabs
        v-model="active"
        animated
        swipeable
        color="#ecbc73"
        line-width="64px"
        title-inactive-color="#888"
        title-active-color="#000"
      >
        <van-tab
          title="我的关注"
          :title-style="{ fontSize: '16px', fontWeight: '900' }"
          ><div class="dy-list">
            <div class="background-and-text">
              <div class="bg-img"></div>
              <div class="bg-text">暂无数据</div>
            </div>
            <div class="artist-user">
              <div class="artist" :class="{select:clickSelect == false}" @click="clickSelect = false">艺术家</div>
              <div class="user" :class="{select:clickSelect == true}" @click="clickSelect = true">用户</div>
            </div>
          </div></van-tab
        >
        <van-tab
          title="关注我的"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      clickSelect:false
    };
  },

  methods: {
    interestViewReturn() {
      this.$emit("interestViewReturn", false);
    },
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
  }

  .dy-list {
    width: 100vw;
    height: calc(100vh - 99px);
    position: relative;
    overflow: auto;

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

  .artist-user{
    display: flex;
    justify-content: space-evenly;
    height: 40px;
    align-items: center;
    padding-top: 10px;

    div{
      padding: 8px 0px;
      width: 80px;
      border-radius: 999px;
      background-color: #eee;
      text-align: center;
      font-size: 12px;
      color: #666;
    }

    .select{
      background-color: rgba(249, 222, 124, 0.812);
      color:  rgb(174, 148, 55);
    }
  }

 .van-tabs-box{
  margin-top: 55px;
  background-color: transparent;
 }
}
</style>