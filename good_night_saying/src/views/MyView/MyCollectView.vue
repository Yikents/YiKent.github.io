<template>
  <div class="my-collect">
    <div class="my-collect-header">
      <div class="my-collect-header-arrow" @click="CollectStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="my-collect-header-text">我的收藏</div>
    </div>
    <div class="my-collect-body" v-show="isloadCo">
        <div class="my-collect-lay" v-if="CollectArr.length==0">喜欢的短文,可以收藏到这里哦</div>
    </div>
    <wd-loading class="lazy-load" size="26px" v-if="!isloadCo"></wd-loading>
  </div>
</template>

<script>
export default {
    props:{
        isloadCo:Boolean,
        CollectArr:Array
    },
    methods:{
        CollectStatus(){
            this.$emit('CollectStatus',false);
        }
    }
};
</script>


<style lang="scss" scoped>
.my-collect {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 3;

  .my-collect-header {
    display: flex;
    align-items: center;
    height: 40px;
    background: #ededed92;

    .my-collect-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .my-collect-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

  .my-collect-body {
    box-sizing: border-box;
    width: 100%;
    height: 770px;
    padding: 0px 15px;
    overflow: scroll;

    .my-collect-lay{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:15px;
        color:#666;
    }

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  .lazy-load {
    position: fixed;
    top: 50px;
    left: 0px;
    right: 0px;
    margin: 0px auto;
  }
}
</style>