<template>
  <div class="collect-other">
    <div class="collect-other-header">
      <div class="collect-other-header-title">
        <div class="other-header-left">
          <span class="other-header-text">自建歌单</span><span>0</span>
        </div>
        <div class="other-header-right" @click="jumpNewPage"></div>
      </div>
      <div
        class="collect-other-header-list"
        v-for="(item, index) in MessageContainer"
        :key="index"
      >
        <div class="collect-other-item-title">{{ item.titleName }}</div>
        <div class="collect-other-it">
          <div class="collect-other-context" v-for="it in item.arr" :key="it.id">
            <div class="collection-add-title">{{ it.title }}</div>
            <div class="collection-add-number">{{ it.songer }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="collect-other-body">
      <div
        class="collect-other-content"
        v-if="collectOtherArr.length == 0 && MessageContainer == 0"
      >
        <div class="collect-other-img"></div>
        <div class="other-body-text">抱歉,还没有收藏内容</div>
      </div>

      <div class="collect-other-main" v-if="collectOtherArr.length != 0">
        <div class="collect-other-title">
          <span class="sp">收藏歌单</span
          ><span>{{ collectOtherArr.length }}</span>
        </div>
        <div class="collect-other-situation">
          <div
            class="collect-other-list"
            v-for="item in collectOtherArr"
            :key="item.rId"
            @click="jumpRouterEvent(item)"
          >
            <div class="collect-other-left">
              <img :src="item.imgUrl" />
            </div>
            <div class="collect-other-right">
              <div class="collect-other-song-name">
                {{ item.text }}
              </div>
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
      collectOtherArr: [],
    };
  },
  created() {
    this.rendersongData();
  },
  methods: {
    rendersongData() {
      if (localStorage.songCollection) {
        let currentStorage = JSON.parse(localStorage.songCollection);
        this.collectOtherArr = [...currentStorage];
      }
    },
    jumpRouterEvent(item) {
      this.$store.commit("getSongCollection", item);
      let curV = "recommend" + item.rId;
      this.$router.push({
        path: "/home-album-list/" + curV,
      });
    },
    jumpNewPage() {
      this.$router.push({
        path: "/collection-right-song",
      });
    },
  },
  computed: {
    ...mapState(["listenListState", "MessageContainer"]),
  },
  watch: {
    listenListState() {
      this.rendersongData();
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.collect-other {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  // background: skyblue;
  .collect-other-header {
    .collect-other-header-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 0px 20px;
    }

    .collect-other-header-list {
      padding: 0px 20px;
      .collect-other-item-title {
        height: 30px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
      }
    }
    .other-header-left {
      font-size: 12px;
      color: #777;
      .other-header-text {
        margin-right: 10px;
      }
    }
    .other-header-right {
      width: 30px;
      height: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../../assets/image/collection-more.png");
    }
  }

  .collect-other-body {
    .collect-other-content {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .collect-other-img {
        width: 130px;
        height: 130px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("../../assets/image/collection.png");
      }
      .other-body-text {
        margin-top: 20px;
        color: #646566;
      }
    }

    .collect-other-main {
      .collect-other-title {
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        padding-left: 20px;
        color: #aaa;
        .sp {
          margin-right: 5px;
        }
      }
      .collect-other-situation {
        padding: 0px 20px;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;

        .collect-other-list {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 70px;
          margin: 10px 0px;

          .collect-other-left {
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
            }
          }
          .collect-other-right {
            width: calc(100% - 90px);
            padding-left: 10px;
            .collect-other-song-name {
              height: 20px;
              line-height: 20px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-bottom: 30px;
              font-size: 15px;
              font-weight: bold;
            }
          }
          //  album-bg.png
        }
      }
    }
  }
}
</style>