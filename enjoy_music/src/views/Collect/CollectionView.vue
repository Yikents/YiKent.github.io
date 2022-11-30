<template>
  <div class="collection">
    <div class="collection-header">
      <div class="header-left">收藏</div>
      <div class="header-righrt">/Favorites</div>
    </div>
    <div class="collection-title">
      <van-tabs v-model="active" swipeable animated>
        <van-tab v-for="(item, index) in text" :key="index" :title="item">
          <CollectionAlbum v-if="index == 0" />
          <CollectionSong v-if="index == 1" />
          <CollectionPlaylist v-if="index == 2" />
          <CollectionOther v-if="index == 3" />
          <CollectionListen v-if="index == 4" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import CollectionAlbum from "@/views/Collect/CollectionAlbum.vue";
import CollectionSong from "@/views/Collect/CollectionSong.vue";
import CollectionPlaylist from "@/views/Collect/CollectionPlaylist.vue";
import CollectionOther from "@/views/Collect/CollectionOther.vue";
import CollectionListen from "@/views/Collect/CollectionListen.vue";

export default {
  name: "CollectionView.vue",
  data() {
    return {
      active: 0,
      text: ["专辑", "歌曲", "官方歌单", "其他歌单", "导听"],
    };
  },
  components: {
    CollectionAlbum,
    CollectionSong,
    CollectionPlaylist,
    CollectionOther,
    CollectionListen,
  },
};
</script>

  <style lang="scss">
.collection {
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding-bottom: 70px;
  .collection-header {
    display: flex;
    .header-left {
      font-size: 20px;
      margin: 18px 0 0 10px;
      font-weight: bold;
    }
    .header-righrt {
      font-size: 16px;
      margin-top: 25px;
      margin-left: 5px;
      color: #ecbc73;
    }
  }
  .collection-title {
    height: 55px;
    .van-tabs__content {
      width: 100vw;
      height: 100vh;
      // background: red;
    }
    .van-tabs__line {
      bottom: 24px;
      background-color: #ecbc73;
    }
  }
}
</style>
  