<template>
  <div class="about-box">
    <div class="about-header">
      <div class="retire-arrow" @click="aboutStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="header-title">关于</div>
    </div>
    <div class="about-content">
        <div>晚安语录</div>
        <div>这里有温暖的句子，精致的图文。</div>
        <div class="text">不开心的时候，深夜无法入睡的时候，迷失未来方向的时候，希望这里给您更多温，成为我们的心灵避风港</div>
        <div class="foot">相遇未晚，随遇而安。</div>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        aboutStatus() {
            this.$emit('aboutStatus',false)
        }
    }
};
</script>


<style lang="scss" scoped>
.about-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f6f6f6;
  z-index: 3;
  .about-header {
    display: flex;
    align-items: center;
    height: 40px;

    .retire-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .header-title {
      font-size: 16px;
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

   .about-content {
        div{
            text-indent: 2em;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            color: #000;
            padding: 0 6px;
        }
        .text {
            height: 60px;
        }

        .foot {
            margin-top: 50px;
        }
    }
}
</style>
