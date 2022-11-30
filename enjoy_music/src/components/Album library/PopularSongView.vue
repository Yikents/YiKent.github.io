<template>
  <div class="ranking-box">
    <van-sidebar v-model="activeKey" @change="onChange">
      <van-sidebar-item
        class="sidebar-item"
        v-for="item in tabList"
        :key="item.id"
        :title="item.name"
      >
      </van-sidebar-item>
    </van-sidebar>

    <div class="list-box">
      <div class="text">
        <span>榜单每半个小时更新一次</span>
        <span is-link @click="showPopup">
          <span class="icon">i</span>
        </span>
        <van-popup v-model="show" class="prompt-box">
          <p>
            此榜单包含5首歌曲及以上的迷你专辑和完整的专辑,按照售卖张数排名,专辑内单曲购买的数据不在统计范围内,榜单30分钟更新一次。
          </p>
          <br />
          <p>
            日榜:网易云音乐当日销售最高的五十张数字专辑,按照售卖张数排名,每日0点清空昨日数据,榜单30分钟更新一次,只统计当前在售的数字专辑
          </p>
          <br />
          <p>
            周榜:网易云音乐本周销售最高的五十张数字专辑,按照售卖张数排名,每周一0点清空上周数据,榜单30分钟更新一次,只统计当前在售的数字专辑
          </p>
          <br />
          <p>
            年榜:网易云音乐所有数字专辑在当年度1月1日00:00 -
            12月31日24:00所产生的销售数量,只展示销售量排名最高的50张数字专辑,按照售卖张数排名,榜单没30分钟更新一次。
          </p>
          <br />
          <p>
            总榜:网易云音乐销量最高的50张数字专辑,按照售卖张数排名,榜单30分钟更新一次
          </p>
        </van-popup>
      </div>

      <div
        class="list-item"
        v-for="item in RankingAlbumList"
        :key="item.albumId"
      >
        <div class="rank">{{ item.rank + 1 }}</div>

        <div class="go-details" @click="goAlbumDetails(item.albumId)">
          <van-image :src="item.coverUrl" class="album-background-img">
            <template v-slot:error></template>
          </van-image>

          <div class="details">
            <p class="ablumName">{{ item.albumName }}</p>
            <p class="saleNum">已售{{ item.saleNum }}张</p>
          </div>
        </div>
        <div class="support-box">
          <div class="support">支持</div>
        </div>
        
      </div>
      <van-loading
        type="spinner"
        color="#1989fa"
        class="lazy-load"
        v-show="isShowAndHide"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false, //提示框
      activeKey: 0,
      isShowAndHide: true, //加载动画
      tabList: [
        {
          id: 1,
          name: "日榜",
          type: "daily",
        },
        {
          id: 2,
          name: "周榜",
          type: "week",
        },
        {
          id: 3,
          name: "年榜",
          type: "year",
        },
        {
          id: 4,
          name: "总榜",
          type: "total",
        },
      ],

      type: "daily",
      RankingAlbumList: [],
    };
  },

  created() {
    this.getRankingAlbum(this.dataUrl);
  },

  methods: {
    showPopup() {
      this.show = true;
    },
    //监听选择的榜单
    onChange(index) {
      this.isShowAndHide = true;
      return (this.type = this.tabList[index].type);
    },

    //获取榜单数据
    async getRankingAlbum(url) {
      await this.$axios.get(url).then((data) => {
        this.RankingAlbumList = data.data.products;
        console.log("this.RankingAlbumList ==>", this.RankingAlbumList);
        this.isShowAndHide = false;
      });
    },

    //点击跳转到专辑详情
    goAlbumDetails(id) {
      this.$router.push({
        path: "/AlbumDetails/id=" + [id],
      });
    },
  },

  computed: {
    dataUrl() {
      return `http://localhost:3000/album/songsaleboard?type=${this.type}`;
    },
  },
  watch: {
    dataUrl(newURL) {
      // 监听计算属性this.type的变化 来重新请求数据
      this.getRankingAlbum(newURL);
    },
  },
};
</script>

<style lang="scss"  scoped>
.ranking-box {
  position: relative;
  width: 100vw;
  height: 100vh;
  border-top: 2px solid #ddd;
  .van-sidebar {
    position: fixed;
    top: 57px;
    left: 0;
    width: 20vw;
    .sidebar-item {
      width: 100%;
      padding: 0;
      height: 10vh;
      line-height: 10vh;
      text-align: center;
      font-size: 18px;
      font-weight: 300;
    }
  }

  .list-box {
    box-sizing: border-box;
    width: 80vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 20vw;
    padding: 10px;
    padding-bottom: 150px;
    overflow: auto;

    .text {
      color: #1e1e1e;
      font-size: 16px;
      height: 20px;
      line-height: 20px;
      font-weight: 300;
      margin-bottom: 10px;
      .icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 2px solid #888;
        border-radius: 999px;
        line-height: 15px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
      }

      .prompt-box {
        padding: 10px;
        color: #fff;
        width: 90vw;
        background-color: rgba($color: #000, $alpha: 0.6);
        border-radius: 10px;

        p {
          line-height: 20px;
          color: #ddd;
          font-size: 14px;
        }
      }
    }

    .list-item {
      width: 100%;
      height: 10vh;
      // background-color: #ddd;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      overflow: hidden;

      .rank {
        font-size: 16px;
        font-weight: bold;
        margin-left: 15px;
        color: #999;
        width: 20px;
        height: 20px;
      }
      .go-details {
        display: flex;
        .album-background-img {
          margin: 0 10px 0 0 !important;
          width: 80px;
          height: 80px;
          margin: 10px;

          .van-image__img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .details {
          width: 100px;
          margin-right: 10px;
          .ablumName {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            color: #000;
            font-size: 16px;
            font-weight: 600;
            height: 30px;
            line-height: 30px;
          }

          .saleNum {
            display: block;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #999;
          }
        }
      }

      .support-box {
        height: 100%;
        display: flex;
        align-items: center;
        .support {
        width: 50px;
        height: 20px;
        border-radius: 999px;
        border: 1px solid #e4393c;
        color: #e4393c;
        text-align: center;
        line-height: 20px;
        font-size: 16px;
        z-index: 10;
      }
      }
     
    }
    .lazy-load {
      position: fixed;
      top: 30%;
      right: 40vw;
    }
    .list-item:nth-child(1) .rank,
    .list-item:nth-child(2) .rank,
    .list-item:nth-child(3) .rank {
      color: #e4393c;
      font-size: 22px;
      font-weight: bolder;
    }
  }
}
</style>