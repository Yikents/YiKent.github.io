<template>
  <div class="myprotocol">
    <div class="myprotocol-header">
      <div class="myprotocol-header-arrow" @click="protocolStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="myprotocol-header-text">用户协议</div>
    </div>
    <div class="myprotocol-body" v-show="isLazy">
      <div class="myprotocol-body-title" >《用户服务协议》</div>
      <div class="myprotocol-body-date">生效日期: 2021 年 8 月 16 日</div>
      <div class="myprotocol-body-items" v-for="(item,index) in itemsArr" :key="index">{{item}}</div>
    </div>
    <wd-loading class="lazy-load" size="26px" v-if="!isLazy"></wd-loading>
  </div>
</template>

<script>
export default {
  props:{
    isLazy:Boolean,
    itemsArr:Array
  },
  methods: {
    protocolStatus() {
      this.$emit("protocolStatus", false);
    }
  },
};
</script>

<style lang="scss" scoped>
.myprotocol {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 3;

  .myprotocol-header {
    display: flex;
    align-items: center;
    height: 40px;
    background: #ededed92;

    .myprotocol-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .myprotocol-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }
  
  .myprotocol-body{
    box-sizing: border-box;
    width:100%;
    height:100vh;
    padding:0px 15px 40px 15px;
    overflow: scroll;

    .myprotocol-body-title{
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 15px;
        font-weight: bolder;
    }

    .myprotocol-body-date{
        height:20px;
        line-height: 20px;
        text-align: center;
        font-size:14px;
    }

    .myprotocol-body-items{
      width:100%;
      line-height: 20px;
      white-space: wrap;
      font-size:14px;
      text-indent: 2em;

      &:nth-of-type(7),&:nth-of-type(15),&:nth-of-type(19),&:nth-of-type(27),&:nth-of-type(36),&:nth-of-type(44){
        font-weight: bolder;
        text-indent: 0em;
      }

      &:nth-of-type(n+27){
        font-weight: bolder;
      }

      &:nth-of-type(n+45){
          font-weight: normal;
      }
    }

    &::-webkit-scrollbar{
      width:0px;
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