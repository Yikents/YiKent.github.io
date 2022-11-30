<template>
  <div class="about-enjoy">
    <div class="nav-bar">
      <span class="left-arrow" @click="aboutEnjoyRouter"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>关于</span>
    </div>
    <img class="aboutusm first" src="@/assets/image/m1.png" />
    <img class="aboutusm" src="@/assets/image/m2.png" />
    <img class="aboutusm" src="@/assets/image/m3.png" />
    <img class="aboutusm" src="@/assets/image/m7.png" />
    <div class="QR-Code">
      <div class="line"></div>
      <p>
        欢迎关注“享听高品质音乐服务”微信服务号，您在使用中的任何疑问在此服务号内留言即可，我们将第一时间作出解答。
      </p>
    </div>
    <div class="footer">
      <p>
        查看《<a href="https://2496.kuwo.cn/regterm.html"
          >享听高品质音乐服务协议</a
        >》和《<a href="https://2496.kuwo.cn/webterm.html">隐私政策</a>》
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    aboutEnjoyRouter() {
      this.$emit("aboutEnjoyRouter", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.about-enjoy {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  background-color: #fff;
  overflow: auto;

  .nav-bar {
    position: fixed;
    width: 100vw;
    height: 55px;
    text-align: center;
    line-height: 55px;
    font-size: 20px;
    background-color: #fff;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }
  .aboutusm {
    width: 100vw;
    display: block;

    &.first {
      margin-top: 55px;
    }
  }

  .QR-Code {
    text-align: center;
    background-color: #f2f2f2;
    position: relative;
    padding-bottom: 4.4rem;
    padding-top: 2.2rem;
  }
  .line {
    height: 1px;
    width: 100%;
    background-color: #f2f2f2;
    position: absolute;
  }

  .QR-Code img {
    vertical-align: middle;
  }
  .QR-Code p {
    padding: 0 2.2rem;
    font-size: 0.98rem;
    line-height: 1.3rem;
  }
  .footer {
    position: relative;
  }
  .footer p {
    position: absolute;
    font-size: 0.75rem;
    bottom: 2.2rem;
    width: 100%;
    text-align: center;
    color: #999;
  }
  .footer p a {
    color: #9e3737;
    text-decoration: none;
  }
}
</style>