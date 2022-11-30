<template>
  <div class="home">
    <van-tabs
      v-model="active"
      swipeable
      line-height="6px"
      title-active-color="black"
    >
      <van-tab :title="text[0]">
        <ClassicalView />
      </van-tab>
      <van-tab :title="text[1]">
        <PopularView />
      </van-tab>
    </van-tabs>
    <div class="search-cont" @click="jumpSearchRouter"></div>
  </div>
</template>
<script>
import ClassicalView from "./ClassicalView.vue";
import PopularView from "./PopularView.vue";
export default {
  name: "HomeView",
  data() {
    return {
      active: 0,
      text: ["地区", "榜单"],
    };
  },
  methods:{
    jumpSearchRouter(){
      this.$router.push({
        path:'/search-page'
      })
    }
  },
  components: { ClassicalView, PopularView },
};
</script>
<style lang="scss">
.home {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 70px;
  z-index: 0;

  .van-tabs__wrap {
    box-sizing: border-box;
    height: 55px ;

    .van-tab {
      font-size: 17px;
    }
    .van-tab--active {
      font-size: 20px;
      .van-tab__text--ellipsis {
        font-weight: bolder;
      }
    }
    .van-tabs__line {
      left: 0px;
      margin: 0px auto;
      bottom: 30px;
      background: rgba(255, 166, 0, 0.611);
      z-index: 0;
    }
  }

  .search-cont {
    position: absolute;
    width: 26px;
    height: 26px;
    background-image: url("../../assets/image/search-cricle.png");
    background-repeat: no-repeat;
    background-size: cover;
    top: 12px;
    right: 20px;
  }
}
</style>

