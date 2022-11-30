<template>
  <div class="home-new-album">
    <div class="home-new-album-header">
      <div class="home-new-album-title">专辑上新</div>
      <div class="home-new-album-more" @click="jumpMoreMessage">MORE</div>
    </div>
    <div class="home-new-album-swiper">
      <swiper class="swiper" :options="swiperOption" @touchMove.stop>
        <swiper-slide
          class="home-new-album-swiper-item"
          v-for="item in partAlbumArr"
          :key="item.id"
        >
          <div class="album-background-img" @click="jumpRouterEvent(item)">
            <div class="album-background-ig">
              <van-image :src="item.imgUrl">
                <template v-slot:error></template>
              </van-image>
            </div>

            <!-- <img :src="item.imgUrl" /> -->
          </div>
          <div class="album-swiper-content">
            <div class="album-swiper-song-Name">{{ item.albumsName }}</div>
            <div class="album-swiper-songer">{{ item.albumsArtist }}</div>
          </div>
        </swiper-slide>
      </swiper>
      <van-loading
        type="spinner"
        color="#1989fa"
        v-if="isShowLoad"
        class="van-load"
      />
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 2.5,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      newAlbumArr: [],
      partAlbumArr: [],
      isShowLoad: true,
    };
  },
  created() {
    this.getNewAlbum();
  },
  methods: {
    getNewAlbum() {
      this.$axios.get("http://localhost:3000/album/newest").then(({ data }) => {
        let currentData = data.albums;
        this.newAlbumArr = currentData.map((it) => {
          return {
            imgUrl: it.picUrl,
            albumsId: it.artist.id,
            albumsName: it.name,
            albumsArtist: it.artist.name,
            publishTime: new Date(it.publishTime).getFullYear(),
          };
        });
        this.partAlbumArr = this.newAlbumArr.filter((it, index) => {
          if (index < 6) {
            return it;
          }
        });
        // console.log(currentData);
        this.isShowLoad = false;
      });
    },

    //跳转到个人专辑页面
    jumpRouterEvent(item) {
      this.$store.commit("getCurrentCollection", item);
      this.$router.push({
        path: "/home-album-list/" + item.albumsId,
      });
    },

    jumpMoreMessage() {
      this.getMoreMessage(this.newAlbumArr);
      this.$router.push({
        path: "/home-more-message/专辑上新",
      });
    },

    // 修改store中的MoreMessage数组
    ...mapMutations(["getMoreMessage"]),
  },
};
</script>

<style lang="scss" scoped>
.home-new-album {
  .home-new-album-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 5px;

    .home-new-album-title {
      font-weight: bolder;
      font-size: 17px;
    }
    .home-new-album-more {
      font-size: 13px;
      color: #cfb072;
    }
  }
  .home-new-album-swiper {
    position: relative;
    height: 175px;
    align-items: center;

    .van-load {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 88;
    }

    .home-new-album-swiper-item {
      height: 175px;
      border-radius: 3px;

      .album-background-img {
        display: flex;
        align-items: center;
        width: 130px;
        height: 130px;
        background-image: url("../../assets/image/album-bg.png");
        background-size: 130px 130px;
        margin-bottom: 5px;
        overflow: hidden;

        .album-background-ig{
          display: flex;
          width: 114px;
          height: 125px;
          border-radius: 6px;
          filter: opacity(0.9);
          overflow: hidden;
        }
      }

      .album-swiper-content {
        height: 40px;

        .album-swiper-song-Name,
        .album-swiper-songer {
          width: 130px;
          height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
        }
        .album-swiper-song-Name {
          font-size: 16px;
          font-weight: bold;
        }

        .album-swiper-songer {
          font-size: 15px;
          color: #777;
        }
      }
    }
  }
}
</style>