<template>
  <div class="search-page">
    <div class="search-page-head">
      <div class="search-box">
        <label for="search-bar"
          ><img src="../assets/image/search-cricle.png" alt=""
        /></label>
        <input
          type="search"
          id="search-bar"
          ref="searchText"
          @keydown.enter.exact="getSearchText"
        />
        <div class="search-back" @click="jumpBackEvent">取消</div>
      </div>
    </div>
    <div class="search-page-body">
      <div class="search-page-detail" v-if="searchMessageArr.length == 0">
        <div class="search-page-history" v-if="historyWordArr.length != 0">
          <div class="search-page-history-head">
            <div class="search-page-title">搜索历史</div>
            <div class="s-p-delect" @click="dealHistoryRecord"></div>
          </div>
          <div class="search-page-content">
            <div
              class="search-page-record"
              v-for="it in historyWordArr"
              :key="it.id"
              @click="existTextData(it.txt)"
            >
              <span>{{ it.txt }}</span>
            </div>
          </div>
        </div>
        <div class="search-page-hot-word">
          <div class="hot-search-title">热门搜索</div>
          <div class="s-hot-word">
            <div
              class="s-hot-word-t"
              v-for="(item, index) in hotWordArr"
              :key="index"
              @click="existTextData(item.text)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="search-page-album" v-if="searchMessageArr.length != 0">
        <div
          class="search-page-item"
          v-for="(items, index) in searchMessageArr"
          :key="`${items.albumsId}${index}`"
          @click="deliverySearchData(items)"
        >
          <div class="search-page-left">
            <div class="search-page-img">
              <van-image :src="items.imgUrl">
                <template v-slot:error> </template>
              </van-image>
            </div>
          </div>
          <div class="search-page-right">
            <div class="search-page-r-top">
              <div class="search-page-song-name">{{ items.albumsName }}</div>
              <div class="search-page-songer">{{ items.albumsArtist }}</div>
            </div>
            <div class="search-page-r-bottom">
              <span>发行时间: </span><span>{{ items.publishTime }} 年</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetHotWord, SearchSongDetail } from "@/utils/index";
export default {
  data() {
    return {
      hotWordArr: [],
      searchMessageArr: [],
      historyWordArr: [],
    };
  },
  created() {
    this.getHotWordData();
    this.renderHistoryData();
  },

  methods: {
    async getHotWordData() {
      this.hotWordArr = await GetHotWord();
    },
    getSearchText() {
      let kWord = this.$refs.searchText.value;
      if (!kWord) {
        this.$toast("输入框不能为空");
        return;
      }
      this.shareSameData(kWord);
      this.$refs.searchText.value = "";
    },
    //点击人们搜索词或搜索历史词进行搜索
    existTextData(text) {
      // console.log(text);
      if (!text) {
        this.$toast("输入框不能为空");
        return;
      }
      this.shareSameData(text);
    },
    //初始渲染搜索历史记录
    renderHistoryData() {
      if (localStorage.searchHistoryRecord) {
        let curStorage = JSON.parse(localStorage.searchHistoryRecord);
        this.historyWordArr = [...curStorage];
        // console.log(this.historyWordArr);
      }
    },
    //删除历史记录
    dealHistoryRecord() {
      this.historyWordArr = [];
      localStorage.removeItem("searchHistoryRecord");
    },
    //共享的数据
    async shareSameData(keyWord) {
      let curV = await SearchSongDetail(keyWord);
      if (curV?.length == 0 || !curV) {
        this.$toast("搜索不到相关内容");
        return;
      }

      this.searchMessageArr = curV.map((it) => {
        return {
          imgUrl: it.artist.picUrl,
          albumsId: it.artist.id,
          albumsName: it.name,
          albumsArtist: it.artist.name,
          publishTime: new Date(it.publishTime).getFullYear(),
        };
      });
      if (localStorage.searchHistoryRecord) {
        let curStorage = JSON.parse(localStorage.searchHistoryRecord);
        let find = curStorage.find((it) => it.txt == keyWord);
        if (!find) {
          this.historyWordArr = [
            ...curStorage,
            { txt: keyWord, id: new Date().getTime() },
          ];
          localStorage.searchHistoryRecord = JSON.stringify(
            this.historyWordArr
          );
        }
      } else {
        this.historyWordArr.push({ txt: keyWord, id: new Date().getTime() });
        localStorage.searchHistoryRecord = JSON.stringify(this.historyWordArr);
      }
    },
    //返回上一页
    jumpBackEvent() {
      this.$router.go(-1);
    },
    //跳转到个人相关的专辑
    deliverySearchData(item) {
      this.$store.commit("getCurrentCollection", item);
      this.$router.push({
        path: "/home-album-list/" + item.albumsId,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.search-page {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #fff;
  z-index: 66;
  .search-page-head {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90px;
    padding-left: 20px;

    .search-box {
      width: 100%;
      height: 40px;
      overflow: hidden;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 5px 0px 0px 5px;
        background: #eee;

        img {
          display: block;
          width: 20px;
          height: 20px;
        }
      }

      #search-bar {
        flex: 1;
        border: none;
        background: none;
        height: 40px;
        border-radius: 0px 5px 5px 0px;
        overflow: hidden;
        caret-color: orange;
        background: #eee;
      }

      .search-back {
        width: 60px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #fff;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }

  .search-page-body {
    margin-top: 30px;
    .search-page-detail {
      box-sizing: border-box;
      width: 100%;
      padding: 0px 20px;

      .search-page-history {
        margin-bottom: 20px;
        .search-page-history-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;

          .search-page-title {
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            font-weight: bold;
          }

          .s-p-delect {
            margin-right: 20px;
            width: 23px;
            height: 23px;
            text-align: center;
            background-image: url("../assets/image/delete-icon.png");
            background-size: cover;
          }
        }
        .search-page-content {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          .search-page-record {
            padding: 8px 10px;
            border-radius: 999px;
            background: #eee;
            margin: 5px;
            font-size: 13px;
            color: #777;
          }
        }
      }
    }

    .search-page-hot-word {
      .hot-search-title {
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: bold;
      }
      .s-hot-word {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .s-hot-word-t {
          padding: 8px 10px;
          border-radius: 999px;
          background: #eee;
          margin: 5px;
          font-size: 13px;
          color: #777;
        }
      }
    }

    .search-page-album {
      box-sizing: border-box;
      width: 100vw;
      height: 100vh;
      overflow: scroll;
      //   background: red;
      padding: 0px 20px;

      .search-page-item {
        display: flex;
        margin: 10px 0px;
        .search-page-left {
          margin-right: 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100px;
          height: 100px;
          background-image: url("../assets/image/album-bg.png");
          background-size: 99px 99px;
          background-position: center center;
          background-repeat: no-repeat;
          overflow: hidden;

          .search-page-img {
            display: flex;
            width: 87px;
            height: 92px;
            border-radius: 5px;
            overflow: hidden;
          }
        }
        .search-page-right {
          .search-page-r-top {
            margin-bottom: 15px;
            font-size: 15px;
            .search-page-song-name {
              width: 130px;
              height: 26px;
              line-height: 26px;
              font-weight: bold;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .search-page-songer {
              width: 130px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .search-page-r-bottom {
            height: 26px;
            line-height: 26px;
            font-size: 13px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>