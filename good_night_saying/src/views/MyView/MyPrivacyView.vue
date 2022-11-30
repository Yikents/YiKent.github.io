<template>
  <div class="myprivacy">
    <div class="myprivacy-header">
      <div class="myprivacy-header-arrow" @click="privacyStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="myprivacy-header-text">隐私政策</div>
    </div>
    <div class="myprivacy-body" v-html="privacyString" v-show="isLazying"></div>
    <wd-loading class="lazy-load" size="26px" v-if="!isLazying"></wd-loading>
  </div>
</template>

<script>
export default {
  props: {
    privacyString: String,
    isLazying:Boolean
  },
  methods: {
    privacyStatus() {
      this.$emit("privacyStatus", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.myprivacy {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 3;

  .myprivacy-header {
    display: flex;
    align-items: center;
    height: 40px;
    background: #ededed92;

    .myprivacy-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .myprivacy-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

  .myprivacy-body{
    width:100%;
    height:100vh;
    overflow: scroll;
    line-height: 30px;
    padding-left:5px;
    padding-bottom: 40px;
    font-size:15px;

    &::-webkit-scrollbar{
      width:0px;
      height:0px;
    }

    .tbody{
      width:100px;
      font-size:8px;
    }
  }

  .lazy-load{
    position: fixed;
    top:50px;
    left: 0px;
    right:0px;
    margin:0px auto;
  }
}

</style>