<template>
  <div class="my-dynamic">
    <div class="my-dynamic-header">
      <div class="my-dynamic-header-arrow" @click="DynamicStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="my-dynamic-header-text">独白</div>
    </div>
    <div class="my-dynamic-body" v-show="isloadDy">
         <div class="my-dynamic-lay" v-if="DynamicArr.length==0">你还没发表独白哦</div>
    </div>
    <wd-loading class="lazy-load" size="26px" v-if="!isloadDy"></wd-loading>
  </div>
</template>

<script>
export default {
    props:{
        isloadDy:Boolean,
        DynamicArr:Array
    },
    methods:{
        DynamicStatus(){
            this.$emit('DynamicStatus',false);
        }
    }
};
</script>

<style lang="scss" scoped>
.my-dynamic {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 3;

  .my-dynamic-header {
    display: flex;
    align-items: center;
    height: 40px;
    background: #ededed92;

    .my-dynamic-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .my-dynamic-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

  .my-dynamic-body {
    box-sizing: border-box;
    width: 100%;
    height: 770px;
    padding: 0px 15px;
    overflow: scroll;

     .my-dynamic-lay{
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