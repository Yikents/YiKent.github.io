<template>
  <div class="my-message">
    <div class="my-message-header">
      <div class="my-message-header-arrow" @click="MessageStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="my-message-header-text">我的留言</div>
    </div>
    <div class="my-message-body" v-show="isloadMe">
       <div class="my-message-lay" v-if="MessageArr.length==0">还没收到留言哦,主动一点嘛</div>
    </div>
    <wd-loading class="lazy-load" size="26px" v-if="!isloadMe"></wd-loading>
  </div>
</template>

<script>
export default {
    props:{
        isloadMe:Boolean,
        MessageArr:Array
    },
    methods:{
        MessageStatus(){
            this.$emit('MessageStatus',false);
        }
    }
};
</script>

<style lang="scss" scoped>
.my-message {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #fff;
  z-index: 3;

  .my-message-header {
    display: flex;
    align-items: center;
    height: 40px;
    background: #ededed92;

    .my-message-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .my-message-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

  .my-message-body {
    box-sizing: border-box;
    width: 100%;
    height: 770px;
    padding: 0px 15px;
    overflow: scroll;
    
     .my-message-lay{
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