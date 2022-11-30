<template>
  <div class="home-authority">
    <div class="home-authority-header">
      <div class="home-authority-title">权威榜单</div>
      <div class="home-authority-more">MORE</div>
    </div>
    <div class="home-authority-swiper">
      <swiper class="swiper" :options="swiperOption" @touchMove.stop>
        <swiper-slide
          class="home-authority-swiper-item"
          v-for="item in AuthorityDataArr"
          :key="item.id"
        >
          <div class="album-background-img">
            <img :src="item.imgUrl" />
          </div>
          <div class="album-swiper-content">
            <div class="album-swiper-song-Name">{{ item.name }}</div>
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
      AuthorityDataArr: [],
      isShowLoad: true,
    };
  },
  created() {
    this.getAuthorityData();
  },
  methods: {
    getAuthorityData() {
      this.$axios
        .get("http://localhost:3000/toplist/detail?limit=6")
        .then(({ data }) => {
          this.AuthorityDataArr = data.list.map((it) => {
            return {
              id: it.id,
              name: it.name,
              imgUrl: it.coverImgUrl,
            };
          });
          // console.log(data);
          this.isShowLoad = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-authority {
  margin: 40px 0px;

  .home-authority-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 5px;

    .home-authority-title {
      font-weight: bolder;
      font-size: 17px;
    }
    .home-authority-more {
      font-size: 13px;
      color: #cfb072;
    }
  }
  .home-authority-swiper {
    position: relative;
    height: 165px;
    align-items: center;

    .van-load {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 88;
    }

    .home-authority-swiper-item {
      height: 165px;
      border-radius: 3px;

      .album-background-img {
        width: 130px;
        height: 130px;
        margin-bottom: 5px;
        border-radius: 3px;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
        }
      }

      .album-swiper-content {
        height: 30px;

        .album-swiper-song-Name {
          width: 130px;
          height: 30px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 30px;
        }
      }
    }
  }
}
</style>