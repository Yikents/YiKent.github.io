<template>
  <div class="home-encyclopedia">
    <div class="home-encyclopedia-header">
      <div class="home-encyclopedia-arrow" @click="backInitPage">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="home-encyclopedia-title">百科</div>
    </div>
    <div class="home-encyclopedia-body">
      <div class="home-encyclopedia-classic">
        <div class="home-encyclopedia-cricle"></div>
      </div>
      <div class="home-encyclopedia-music">
        <div class="home-encyclopedia-cricle1"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    backInitPage() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.home-encyclopedia {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 999;
  background-color: #222;

  .home-encyclopedia-header {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;

    &::before {
      position: absolute;
      content: "";
      right: 0;
      width: 300px;
      height: 390px;
      background-image: url("../../assets/image/bolangxian.png");
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
      z-index: -1;
    }

    .home-encyclopedia-arrow {
      width: 30px;
      height: 50px;
      line-height: 50px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #fff;
      }
    }

    .home-encyclopedia-title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      font-size: 16px;
      color: #fff;
    }
  }

  .home-encyclopedia-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background: #fff;
    height: 100vh;

    .home-encyclopedia-classic,
    .home-encyclopedia-music {
      position: relative;
      width: 300px;
      height: 300px;
      background: #3b3a3557;
      border-radius: 999px;

      &::before {
        position: absolute;
        content: "";
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        width: 230px;
        height: 230px;
        border-radius: 999px;
        border: 1px solid #413f3a;
      }
    }

    .home-encyclopedia-classic {
      margin-bottom: 50px;
      .home-encyclopedia-cricle {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        width: 200px;
        height: 200px;
        background-image: url("../../assets/image/classic-title.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }

    .home-encyclopedia-music{
      margin-bottom: 50px;
      .home-encyclopedia-cricle1 {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        width: 200px;
        height: 200px;
        background-image: url("../../assets/image/popular-title.png");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>