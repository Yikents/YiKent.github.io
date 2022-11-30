<template>
  <div class="home-auditory-guidance">
    <PopularSongView />
   
  </div>
</template>
<style lang="scss" scoped>
.home-auditory-guidance {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}
</style>
<script>
import PopularSongView from "../../components/Album library/PopularSongView.vue";

export default {
  data() {
    return {
      isShowIndicators: false,
    };
  },
  components: {
    PopularSongView

  },
};
</script>