<template>
  <div class="home-auditory-guidance">
    <ClassSongView />
    <ClassListView />
  </div>
</template>

<style lang="scss" scoped>
.home-auditory-guidance {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background-color: #f3f3f3;
}
</style>
<script>
import ClassSongView from '../../components/Album library/ClassSongView.vue'
import ClassListView from "../../components/Album library/ClassListView.vue";
export default {
  data() {
    return {
      isShowIndicators: false,

    };
  },
  components: {
    ClassSongView,
    ClassListView
  }
};
</script>