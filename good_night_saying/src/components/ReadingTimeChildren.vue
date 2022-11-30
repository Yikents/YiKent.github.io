<template>
  <div class="spaceTime">
    <div class="spaceTime-header">
      <div class="spaceTime-header-arrow" @click="transmitData">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="spaceTime-header-text">美文</div>
      <div class="spaceTime-header-create">
        <span class="iconfont icon-collection"></span>
      </div>
    </div>
    <div class="spaceTime-body" v-show="reload">
      <div class="spaceTime-body-title">{{ObtianObj.title}}</div>
      <div class="spaceTime-body-content">
        <div class="items-text" v-for="(item,index) in ObtianObj.text" :key="index">{{item}}</div>
        <img v-lazy="ObtianObj.url">
        <div class="spaceTime-body-time">{{ObtianObj.time}}</div>
      </div>
    </div>
    <wd-loading class="load" size="26px" v-if="!reload"></wd-loading>
  </div>
</template>

<script>
export default {
    props:{
        ObtianObj:Object,
        reload:Boolean
    },
  methods: {
    transmitData() {
      this.$emit("transmitData", false);
    },
  },
};
</script>


<style lang="scss" scoped>
.spaceTime {
  box-sizing: border-box;
  position: fixed;
  right: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background-color: #f5f5f5;
}
.spaceTime-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  .spaceTime-header-arrow {
    width: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .icon-arrow-left {
      font-size: 23px;
      color: #666;
    }
  }

  .spaceTime-header-text {
    color: orange;
  }

  .spaceTime-header-create {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .icon-collection {
      font-size: 23px;
      color: #666;
    }
  }
}

.spaceTime-body {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding-bottom:40px;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }

  .spaceTime-body-title {
    position: relative;
    padding: 0px 20px;
    height: 40px;
    line-height: 40px;

    &::after {
      position: absolute;
      content: "";
      display: block;
      width: 100%;
      left: 0px;
      bottom: -6px;
      border-bottom: 6px dashed rgba(106, 106, 106, 0.062);
    }
  }

  .spaceTime-body-content {
    padding: 0px 20px;
    width: 100%;

    .items-text {
      margin: 10px 0px;
      line-height: 30px;
      font-size: 14px;
      color:#666;
    }

    img{
        display: block;
        width:100%;
        margin-bottom: 60px;
    }

    .spaceTime-body-time {
      margin-top: 20px;
      font-size: 15px;
    }
  }
}

.load {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
}
</style>