<template>
  <div class="home-more-message">
    <div class="home-more-header">
      <div class="home-more-arrow" @click="jumpRouterEvent">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="home-more-title">{{ messageTitle }}</div>
    </div>
    <div class="home-more-body">
      <div
        class="home-more-body-item"
        v-for="item in MoreMessage"
        :key="item.albumsId"
        @click="DeliveryData(item)"
      >
        <div class="home-more-img">
          <div class="home-show-image">
            <van-image :src="item.imgUrl">
              <template v-slot:error> </template>
            </van-image>
          </div>
        </div>
        <!-- 专辑上新 -->
        <div class="home-more-right" v-if="item.publishTime">
          <div class="home-more-title">{{ item.albumsName }}</div>
          <div class="home-more-des">
            <div class="home-more-song-name">{{ item.albumsArtist }}</div>
            <div class="home-more-songer">
              <span>发行时间: </span> <span>{{ item.publishTime }} 年</span>
            </div>
          </div>
        </div>
        <!-- 热门歌手 -->
        <div class="home-more-it" v-if="!item.publishTime">
          <div class="home-more-right-title">{{ item.songerName }}</div>
          <div class="home-more-right-songer">{{ item.alias }}</div>
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
      messageTitle: "未知",
    };
  },
  created() {
    this.messageTitle = this.$route.params.text;
  },
  methods: {
    DeliveryData(item) {
      this.$store.commit("getCurrentCollection", item);
      this.$router.push({
        path: "/home-album-list/" + item.albumsId,
      });
    },
    jumpRouterEvent() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState(["MoreMessage"]),
  },
};
</script>

<style lang="scss" scoped>
.home-more-message {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 6;
  background: #fff;

  .home-more-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0px 1px 6px rgba(204, 204, 204, 0.785);

    .home-more-arrow {
      width: 30px;
      height: 50px;
      line-height: 50px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
      }
    }
    .home-more-title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      font-size: 16px;
    }
  }

  .home-more-body {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    padding: 0px 15px 50px;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0px;
    }

    .home-more-body-item {
      display: flex;
      padding-top: 40px;

      .home-more-img {
        margin-right: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 135px;
        height: 135px;
        background-image: url("../../assets/image/album-bg.png");
        background-size: 134px 134px;
        background-position: center center;
        background-repeat: no-repeat;
        overflow: hidden;

        .home-show-image {
          display: flex;
          width: 120px;
          height: 135px;
          border-radius: 5px;
          overflow: hidden;
        }
      }

      .home-more-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .home-more-title {
          width: 170px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 18px;
          font-weight: bold;
        }
        .home-more-song-name,
        .home-more-songer {
          width: 170px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          color: #777;
        }
      }

      .home-more-it {
        display: flex;
        flex-direction: column;
        width: calc(100% - 145px);

        .home-more-right-title,
        .home-more-right-songer {
          width: 170px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home-more-right-title {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: bold;
        }

        .home-more-right-songer {
          flex: 1;
          height: 20px;
          font-size: 16px;
          color: #666;
        }
      }
    }
  }
}
</style>