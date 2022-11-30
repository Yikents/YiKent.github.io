<template>
  <div class="interest-dynamic">
    <div class="nav-bar">
      <span class="left-arrow" @click="interestDynamicReturn"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>关注的动态</span>
    </div>
    <div class="van-tabs-box">
      <van-tabs
        v-model="active"
        animated
        swipeable
        color="#ecbc73"
        line-width="55px"
        title-inactive-color="#888"
        title-active-color="#000"
      >
        <van-tab
          title="专辑"
          :title-style="{ fontSize: '15px', fontWeight: '900' }"
          ><div class="dy-list">
            <div
              class="background-and-text"
              v-show="localStorageData.length == 0"
            >
              <div class="bg-img"></div>
              <div class="bg-text">暂无数据</div>
            </div>
            <div class="lists-box" v-show="localStorageData.length != 0">
              <div
                class="lists"
                v-for="l in localStorageData"
                :key="l.albumsId"
                @click="jumpRouterEvent(l)"
              >
                <div class="lists-img">
                  <img :src="l.imgUrl" />
                </div>
                <div class="list-text">
                  <div class="song-title">
                    {{ l.songName || l.alias || l.albumsName }}
                  </div>
                  <div class="song-name">
                    {{ l.songerName || l.albumsArtist }}
                  </div>
                  <div class="song-time">1分钟前</div>
                </div>
              </div>
            </div>
          </div></van-tab
        >
        <van-tab
          title="官方歌单"
          :title-style="{ fontSize: '15px', fontWeight: '900' }"
          ><div class="dy-list">
            <div class="background-and-text">
              <div class="bg-img"></div>
              <div class="bg-text">暂无数据</div>
            </div>
          </div>
        </van-tab>
        <van-tab
          title="其他歌单"
          :title-style="{ fontSize: '15px', fontWeight: '900' }"
          ><div class="dy-list">
            <div
              class="background-and-text"
              v-show="songCollection.length == 0"
            >
              <div class="bg-img"></div>
              <div class="bg-text">暂无数据</div>
            </div>
            <div class="lists-box"  v-show="songCollection.length != 0">
              <div
                class="lists"
                v-for="s in songCollection"
                :key="s.rId"
                @click="jumpRouterEvent(s)"
              >
                <div class="lists-img">
                  <img :src="s.imgUrl" />
                </div>
                <div class="list-text">
                  <div class="song-title">
                    {{ s.text || s.alias || s.albumsName }}
                  </div>
                  <div class="song-name">
                    {{ s.songerName || s.albumsArtist }}
                  </div>
                  <div class="song-time">1分钟前</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab
          title="导听"
          :title-style="{ fontSize: '15px', fontWeight: '900' }"
          ><div class="dy-list">
            <div class="background-and-text">
              <div class="bg-img"></div>
              <div class="bg-text">暂无数据</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      localStorageData: [],
      songCollection: [],
    };
  },
  created() {
    this.getLocalStorageData();
    this.getSongCollection();
  },
  methods: {
    interestDynamicReturn() {
      this.$emit("interestDynamicReturn", false);
    },
    // 获取本地存储数据
    getLocalStorageData() {
      if (localStorage.AlbumCollection) {
        let currentStorage = JSON.parse(localStorage.AlbumCollection);
        this.localStorageData = [...currentStorage];
      }
    },

    getSongCollection() {
      if (localStorage.songCollection) {
        let songCollectionData = JSON.parse(localStorage.songCollection);
        this.songCollection = [...songCollectionData];
      }
    },
    jumpRouterEvent(item) {
      this.$store.commit("getCurrentCollection", item);
      this.$router.push({
        path: "/home-album-list/" + item.albumsId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.interest-dynamic {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 20;

  .nav-bar {
    position: fixed;
    width: 100vw;
    height: 97.5px;
    text-align: center;
    line-height: 55px;
    font-size: 20px;
    box-shadow: 1px 0px 10px #ddd;
    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }

  .van-tabs-box {
    margin-top: 55px;
  }

  .dy-list {
    width: 100vw;
    height: calc(100vh - 99px);
    position: relative;
    overflow: auto;

    .background-and-text {
      position: absolute;
      top: 30%;
      left: calc((100vw - 150px) / 2);

      .bg-img {
        width: 150px;
        height: 150px;
        background-image: url("@/assets/image/dynamic-bg-img.png");
        background-size: 150px 150px;
        background-position: center;
        background-repeat: no-repeat;
      }

      .bg-text {
        text-align: center;
        color: #999;
        margin-top: 30px;
      }
    }

    .lists-box {
      padding: 15px 20px;
      .lists {
        width: calc(100vw - 40px);
        height: 100px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;

        .lists-img {
          width: 93px;
          height: 80px;
          background-image: url("../../assets/image/album-bg.png");
          background-size: cover;
          background-repeat: no-repeat;
          img {
            width: 80px;
            height: 80px;
            display: block;
            border-radius: 5px;
          }
        }

        .list-text {
          width: calc(100% - 150px);
          height: 80px;
          margin-left: 10px;

          .song-title {
            font-size: 16px;
            font-weight: 600;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 5px;
            margin-bottom: 12px;
          }
          .song-name {
            font-size: 15px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 20px;
          }
          .song-time {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>