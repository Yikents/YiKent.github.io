<template>
  <div class="mycopyright">
    <div class="mycopyright-header">
      <div class="mycopyright-header-arrow" @click="copyrightStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="mycopyright-header-text">版权声明</div>
    </div>
    <div class="mycopyright-body">
      <div class="mycopyright-body-items">一 : 晚安语录APP的数据来自网友投稿或网上收集,如果APP内容侵犯了您的权利,请您联系我们,我们会在1天之内核实并删除。</div>
      <div class="mycopyright-body-items">二 : APP部分内容转载于其他站点,版权为原作者所有,如果涉及版权等异议问题,敬请指出,我们将配合修正。</div>
      <div class="mycopyright-body-items">三 : 联系方式 : QQ2305401919</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    copyrightStatus() {
      this.$emit("copyrightStatus", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.mycopyright {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 3;

  .mycopyright-header {
    display: flex;
    align-items: center;
    height: 40px;

    .mycopyright-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .mycopyright-header-text {
      flex: 1;
      text-align: center;
      padding-right: 15px;
      color: orange;
    }
  }

  .mycopyright-body{
    width:100%;
    padding: 0px 15px;

    .mycopyright-body-items{
      line-height: 30px;
      font-size:14px;
      text-indent: 1em;
    }
  }
}
</style>