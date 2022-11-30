<template>
  <div class="vip-serve">
    <div class="nav-bar">
      <span class="left-arrow" @click="returnVipView"
        ><van-icon size="24" name="arrow-left"
      /></span>
    </div>
    <div class="vip-bg"><img src="@/assets/image/vip-bg.png" alt="" /></div>
    <div class="vip-text">享听音乐 <span> VIP</span></div>
    <div class="vip-month">
      <div class="head-line"></div>
      <span class="open-immediately" @click="show = true">立即开通</span>
      <span class="vip-money"><span>￥ 49 </span> /月</span>
    </div>
    <div class="vip-year">
      <div class="head-line"></div>
      <span class="open-immediately" @click="showYear = true">立即开通</span>
      <div class="add-time"></div>
      <span class="vip-money"><span>￥ 499 </span> /年</span>
    </div>
    <div class="vip-activate">
      <div class="music-activate">使用享听激活码激活VIP服务</div>
      <span class="open-immediately" @click="showActivate = true"
        >立即开通</span
      >
    </div>
    <div class="vip-explain">
      <div class="vip-explain-title">· VIP会员服务说明 ·</div>
      <div class="vip-explain-text">· 加入会员即可畅听享听高品质音乐</div>
      <div class="vip-explain-text">· 如有疑问可加客服QQ群：250837076咨询</div>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '30%', background: '#000', color: '#fff' }"
    >
      <div class="text-down-news">
        <div class="select">选择支付方式</div>
        <div class="money" v-show="show">￥ 49</div>
        <div class="order" v-show="show">订单信息：享听VIP会员服务30天</div>
      </div>
      <div class="wx">
        <div class="wx-text">
          <span class="wx-icon"></span>
          &nbsp; 微信支付
        </div>
        <van-icon size="24" name="arrow" />
      </div>
      <div class="zfb">
        <div class="zfb-text">
          <span class="zfb-icon"></span>
          &nbsp; 支付宝支付
        </div>
        <van-icon size="24" name="arrow" />
      </div>
    </van-popup>
    <van-popup
      v-model="showYear"
      position="bottom"
      :style="{ height: '30%', background: '#000', color: '#fff' }"
    >
      <div class="text-down-news">
        <div class="select">选择支付方式</div>
        <div class="money" v-show="showYear">￥ 499</div>
        <div class="order" v-show="showYear">订单信息：享听VIP会员服务1年</div>
      </div>
      <div class="wx">
        <div class="wx-text">
          <span class="wx-icon"></span>
          &nbsp; 微信支付
        </div>
        <van-icon size="24" name="arrow" />
      </div>
      <div class="zfb">
        <div class="zfb-text">
          <span class="zfb-icon"></span>
          &nbsp; 支付宝支付
        </div>
        <van-icon size="24" name="arrow" />
      </div>
    </van-popup>
    <van-overlay :show="showActivate">
      <div class="wrapper" @click.stop>
        <div class="activate-box">
          <span class="activate-number">激活码</span>
          <input
            type="number"
            class="activate-input"
            placeholder="请输入激活码"
            v-model.trim="actvateInput"
          />
          <img src="@/assets/image/vip-activate-box.png" alt="" />
          <div class="activate" @click="activateClickHandel"></div>
        </div>
      </div>
    </van-overlay>
    <div class="block" v-show="loader == true">
      <van-loading vertical size="50px" />
    </div>
    <div class="load" v-show="showLoad == true">激活码不存在</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      showYear: false,
      showActivate: false,
      actvateInput: null,
      loader: false,
      showLoad: false,
    };
  },
  methods: {
    returnVipView() {
      this.$emit("returnVipView", false);
    },
    activateClickHandel() {
      if (this.actvateInput != "") {
        this.loader = true;
        setTimeout(() => {
          this.actvateInput = "";
          this.showActivate = false;
          this.loader = false;
          this.showLoad = true;
          setTimeout(() => {
            this.showLoad = false;
          }, 1000);
        }, 2000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vip-serve {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(37, 37, 37);
  z-index:21;
  overflow: auto;
  padding: 0px 20px;

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 55px;
    text-align: center;
    line-height: 55px;
    font-size: 20px;
    color: #eee;
    background-color: transparent;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }
  .vip-bg {
    width: 75vw;
    height: 100px;
    transform: translate(75px, -7px);
    img {
      width: 100%;
      display: block;
    }
  }

  .vip-text {
    color: rgb(255, 255, 227);
    font-weight: 600;
    font-size: 24px;
    transform: scale(0.77, 1.2);
    transform-origin: left;
    margin-bottom: 10px;

    span {
      color: rgb(240, 196, 115);
    }
  }

  .vip-month,
  .vip-year {
    position: relative;
    width: calc(100vw - 40px);
    height: 135px;
    border-radius: 10px;
    overflow: hidden;
    background-image: url("@/assets/image/vip_prise_item_bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 20px;

    .head-line {
      height: 5px;
      background-color: rgb(167, 134, 89);
    }

    .open-immediately {
      position: absolute;
      bottom: 10px;
      left: 20px;
      padding: 10px 15px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      background-image: linear-gradient(
        90deg,
        rgb(247, 226, 173),
        rgb(144, 110, 73)
      );
    }

    .vip-money {
      position: absolute;
      right: 30px;
      bottom: 30px;
      color: rgb(240, 196, 115);
      font-size: 16px;
      font-weight: bold;
      span {
        color: rgb(255, 255, 227);
        font-size: 22px;
      }
    }
  }

  .vip-activate {
    position: relative;
    width: calc(100vw - 40px);
    height: 135px;
    border-radius: 10px;
    overflow: hidden;
    background-image: url("@/assets/image/vip_active_code_bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 20px;
    .music-activate {
      position: absolute;
      bottom: 53.6px;
      left: 20px;
      font-size: 17px;
      font-weight: 600;
      color: rgb(240, 195, 120);
    }
    .open-immediately {
      position: absolute;
      bottom: 10px;
      left: 20px;
      padding: 10px 15px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      background-image: linear-gradient(
        90deg,
        rgb(247, 226, 173),
        rgb(144, 110, 73)
      );
    }
  }

  .vip-explain {
    width: calc(100vw - 40px);
    height: 80px;
    border: 1px dotted rgb(89, 76, 59);
    position: relative;
    padding-top: 10px;
    color: rgba(177, 156, 64, 0.5);

    .vip-explain-title {
      position: absolute;
      top: -12.3px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 34vw;
      border-radius: 999px;
      padding: 5px 3px;
      text-align: center;
      color: rgb(225, 186, 124);
      font-size: 14px;
      background-color: rgb(89, 76, 59);
      z-index: 2;
    }

    .vip-explain-text {
      margin-top: 15px;
      font-size: 13px;
    }
  }
  .add-time {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px !important;
    background-image: url("@/assets/image/vip-add-time.png");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .text-down-news {
    text-align: center;
    padding: 15px 0px 20px 20px;

    .select {
      font-size: 17px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 15px;
    }

    .money {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .order {
      font-size: 17px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .wx,
  .zfb {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding-left: 20px;
    color: rgba(255, 255, 255, 0.8);

    .wx-text,
    .zfb-text {
      display: flex;
      align-items: center;
    }

    .wx-icon {
      display: inline-block;
      width: 40px;
      height: 34px;
      background-image: url("@/assets/image/recharge_channel_wechat.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
    .zfb-icon {
      display: inline-block;
      width: 36px;
      height: 36px;
      background-image: url("@/assets/image/recharge_channel_alipay.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .activate-box {
      position: relative;
      width: 300px;
      height: 256px;
      background-color: rgb(96, 97, 98);

      .activate-number {
        position: absolute;
        top: 32px;
        left: 0;
        right: 0;
        text-align: center;
        margin: 0 auto;
        color: #ffcc00;
        font-size: 16px;
        font-weight: bold;
      }
      .activate-input {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        margin: 0 auto;
        outline-style: none;
        border: none;
        height: 50px;
        width: 250px;
        color: #999;
        background-color: rgba(0, 0, 0, 0.7);
      }

      .activate {
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 250px;
        height: 43px;
        background-image: url("@/assets/image/vip-activate.png");
        background-size: cover;
        background-repeat: no-repeat;
      }
      img {
        width: 100%;
        display: block;
      }
    }
  }
  .block {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    padding-top: 15px;
    box-sizing: border-box;
    padding-top: 25px;
    z-index: 30;
  }
  .load {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 40px;
    margin: 0 auto;
    width: 120px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 999px;
    background-color: rgb(0, 0, 0);
    color: #fff;
    padding: 12px;
  }
}
</style>