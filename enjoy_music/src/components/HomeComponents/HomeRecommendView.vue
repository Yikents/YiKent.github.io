<template>
  <div class="home-recommend">
    <div class="home-recommend-header">
      <div class="home-recommend-title">推荐歌单</div>
      <div class="home-recommend-more">MORE</div>
    </div>
    <div class="home-recommend-swiper">
      <swiper class="swiper" :options="swiperOption" @touchMove.stop>
        <swiper-slide
          class="home-recommend-swiper-item"
          v-for="item in curSongArr"
          :key="item.rId"
        >
          <div
            class="album-background-img"
            @click="jumpRouterEvent(item)"
          >
            <van-image :src="item.imgUrl">
              <template v-slot:error> </template>
            </van-image>
          </div>
          <div class="album-swiper-content">
            <div class="album-swiper-song-Name">{{ item.text }}</div>
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
      recommendSongArr: [],
      curSongArr: [],
      isShowLoad: true,
    };
  },

  created() {
    this.getRecommendSongList();
  },

  methods: {
    getRecommendSongList() {
      this.$axios
        .get("http://localhost:3000/personalized?limit=30")
        .then(({ data }) => {
          this.recommendSongArr = data.result.map((it) => {
            return {
              rId: it.id,
              imgUrl: it.picUrl,
              text: it.name,
            };
          });
          this.curSongArr = this.recommendSongArr.filter((it, index) => {
            if (index < 6) {
              return it;
            }
          });
          // console.log(data.result);
          this.isShowLoad = false;
        });
    },
    jumpRouterEvent(item) {
      this.$store.commit("getSongCollection", item);
      let curV = "recommend" + item.rId;
      this.$router.push({
        path: "/home-album-list/" + curV,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-recommend {
  margin-top: 40px;

  .home-recommend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 5px;

    .home-recommend-title {
      font-weight: bolder;
      font-size: 17px;
    }
    .home-recommend-more {
      font-size: 13px;
      color: #cfb072;
    }
  }
  .home-recommend-swiper {
    position: relative;
    height: 155px;
    align-items: center;

    .van-load {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 88;
    }

    .home-recommend-swiper-item {
      height: 155px;
      border-radius: 3px;

      .album-background-img {
        width: 130px;
        height: 130px;
        border-radius: 3px;
        margin-bottom: 5px;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
        }
      }

      .album-swiper-content {
        height: 40px;

        .album-swiper-song-Name {
          width: 130px;
          height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
        }
        .album-swiper-song-Name {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>