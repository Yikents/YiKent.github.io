<template>
  <div class="collection-add-song">
    <div class="collection-add-header">
      <div class="collection-add-arrow" @click="jumpBackPage">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="collection-add-title">添加歌曲到歌单</div>
    </div>
    <div class="collection-add-body">
      <div class="collection-add-list">
        <div
          class="collection-add-item"
          v-for="item in renderCurrentData"
          :key="item.type"
          @click="jumpSelectPage(item)"
        >
          <div class="collection-add-img"><img :src="item.imgUrl" /></div>
          <div class="collection-add-center">
            <div class="collection-add-title">{{ item.text }}</div>
            <div class="collection-add-number">{{ item.number }}</div>
          </div>
          <div class="collection-add-left">
            <span class="iconfont icon-arrowright"></span>
          </div>
        </div>
      </div>
    </div>
    <transition name="move">
      <CollectionSelectMenu
        v-if="isShowSelectPage"
        @SelectPageEvent="SelectPageEvent"
        @backPageEvent="backPageEvent"
        :acceptData="acceptData"
      />
    </transition>
  </div>
</template>
<script>
import CollectionSelectMenu from "./CollectionSelectMenu.vue";
export default {
  data() {
    return {
      renderCurrentData: [
        {
          imgUrl: require("../../assets/image/img2.png"),
          text: "最近播放",
          number: "0首",
          type: "currentPlay",
        },
        {
          imgUrl: require("../../assets/image/img1.png"),
          text: "收藏专辑",
          number: "0首",
          type: "currentAlbum",
        },
        {
          imgUrl: require("../../assets/image/img3.png"),
          text: "收藏歌曲",
          number: "0首",
          type: "currentSong",
        },
      ],
      isShowSelectPage: false,
      acceptData: {},
    };
  },
  created() {
    this.initNumber(localStorage.historyRecord, 0);
    this.initNumber(localStorage.AlbumCollection, 1);
    this.initNumber(localStorage.SingleSongCollection, 2);
  },
  methods: {
    jumpBackPage() {
      this.$emit("jumpToAddSongPage");
    },
    jumpSelectPage(item) {
      this.isShowSelectPage = !this.isShowSelectPage;
      this.acceptData = { ...item };
    },
    SelectPageEvent() {
      this.isShowSelectPage = false;
    },
    backPageEvent() {
      this.isShowSelectPage = false;
      this.$emit("jumpToAddSongPage");
    },

    initNumber(ele, index) {
      if (ele) {
        let currentStorage = JSON.parse(ele);
        this.renderCurrentData[index].number = currentStorage.length + "首";
      }
    },
  },
  components: { CollectionSelectMenu },
};
</script>
<style lang="scss" scoped>
.collection-add-song {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgb(243, 243, 243);
  z-index: 68;
}
.collection-add-header {
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0px 1px 6px #aaa;

  .collection-add-arrow {
    width: 40px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    .icon-arrow-left {
      font-size: 20px;
    }
  }
  .collection-add-title {
    flex: 1;
    text-align: center;
    margin-right: 40px;
  }
}

.collection-add-body {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }

  .collection-add-list {
    margin-top: 15px;
    width: 100%;
    background: #fff;

    .collection-add-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 10px;

      .collection-add-img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 5px;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
        }
      }
      .collection-add-center {
        flex: 1;
        height: 100%;

        .collection-add-title {
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          font-weight: bold;
        }

        .collection-add-number {
          font-size: 13px;
          color: #777;
        }
      }
      .collection-add-left {
        width: 20px;
        height: 60px;
        line-height: 60px;
        text-align: center;

        .icon-arrowright {
          font-size: 18px;
        }
      }
    }
  }
}
.move-enter,
.move-leave-to {
  transform: translateX(100%);
}
.move-enter-active,
.move-leave-active {
  transition: all 0.3s linear;
}
.move-enter-to,
.move-leave {
  transform: translateX(0px);
}
</style>