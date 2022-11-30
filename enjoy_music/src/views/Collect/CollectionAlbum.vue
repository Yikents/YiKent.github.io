<template>
  <div class="collection-album">
    <div class="collection-album-empty" v-if="collectListArr.length == 0">
      <div class="album-empty-img"></div>
      <div class="album-empty-text">抱歉,还没有收藏内容</div>
    </div>
    <div class="collection-album-body" v-if="collectListArr.length != 0">
      <div class="collection-album-header">
        <span class="sp">收藏专辑</span><span>{{ collectListArr.length }}</span>
      </div>
      <div class="collection-album-content">
        <div
          class="collection-album-list"
          v-for="item in collectListArr"
          :key="item.albumsId"
          @click="jumpRouterEvent(item)"
        >
          <div class="collection-album-left">
            <img :src="item.imgUrl" />
          </div>
          <div class="collection-album-right">
            <div class="collection-album-song-name">
              {{ item.albumsName || item.songerName || item.songName }}
            </div>
            <div class="collection-album-publish" v-if="item.publishTime">
              <span>发行时间: </span><span>{{ item.publishTime }}年</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      collectListArr: [],
    };
  },
  created() {
    this.renderCollectData();
  },
  methods: {
    renderCollectData() {
      if (localStorage.AlbumCollection) {
        let currentStorage = JSON.parse(localStorage.AlbumCollection);
        this.collectListArr = [...currentStorage];
      }
    },
    jumpRouterEvent(item) {
      this.$store.commit("getCurrentCollection", item);
      this.$router.push({
        path: "/home-album-list/" + item.albumsId,
      });
    },
  },
  computed: {
    ...mapState(["listenListState"]),
  },
  watch: {
    listenListState() {
      this.renderCollectData();
    },
  },
};
</script>
<style lang="scss">
.collection-album {
  .collection-album-empty {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .album-empty-img {
      width: 130px;
      height: 130px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../../assets/image/collection.png");
    }
    .album-empty-text {
      margin-top: 20px;
      color: #646566;
    }
  }
  .collection-album-body {
    .collection-album-header {
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      padding-left: 20px;
      color: #aaa;
      .sp {
        margin-right: 5px;
      }
    }
    .collection-album-content {
      box-sizing: border-box;
      width: 100vw;
      height: 100vh;
      overflow: scroll;
      padding: 0px 20px 200px;
      &::-webkit-scrollbar {
        width: 0px;
      }

      .collection-album-list {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        margin: 10px 0px;

        .collection-album-left {
          width: 80px;
          height: 70px;
          background-image: url("../../assets/image/album-bg.png");
          background-size: 80px 70px;
          background-position: center center;
          background-repeat: no-repeat;

          img {
            display: block;
            width: 70px;
            height: 70px;
            overflow: hidden;
            border-radius: 6px;
          }
        }
        .collection-album-right {
          width: calc(100% - 90px);
          padding-left: 10px;
          .collection-album-song-name {
            height: 20px;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 30px;
            font-size: 15px;
            font-weight: bold;
          }
          .collection-album-publish {
            font-size: 13px;
            color: #aaa;
          }
        }
        //  album-bg.png
      }
    }
  }
}
</style>