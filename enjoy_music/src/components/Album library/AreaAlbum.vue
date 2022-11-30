<template>
  <div id="app">
    <nav>
      <span class="nav-move-back" @click="prev"></span>
      <span class="nav-title">{{ this.name }}</span>
    </nav>
    <div>
      <div class="area-album-list">
        <div
          class="area-ablum-item"
          v-for="item in albumList"
          :key="item.albumId"
          @click="goAlbumDetails(item.albumId)"
        >
          <div class="ablum-bg-img">
            <van-image :src="item.coverUrl"  class="van-image">
              <template v-slot:error></template>
            </van-image>
          </div>
          <p class="ablum-name">{{ item.albumName }}</p>
          <p class="artist-name">{{ item.artistNames }}</p>
          <p class="price">￥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: this.$route.params.area.split(",")[0],
      name: this.$route.params.area.split(",")[1],
      albumList: [],
    };
  },
  created() {
    this.getAreaAlbumData();
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    getAreaAlbumData() {
      this.$axios
        .get(
          `http://localhost:3000/album/list/style?area=${this.area}&offset=2&limit=30`
        )
        .then((data) => {
          this.albumList = data.data.albumProducts.map((t) => {
            return {
              albumId: t.albumId,
              albumName: t.albumName,
              coverUrl: t.coverUrl,
              price: t.price,
              artistNames: t.artistNames.join("/"),
            };
          });
        });
    },

    goAlbumDetails(id) {
                this.$router.push({
                    path:'/AlbumDetails/id='+[id]
                })
            }
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  position: relative;
  z-index: 10;
  background-color: #2a2925;

  nav {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    height: 46px;
    width: 100vw;
    background-color: #222;
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 46px;
    font-weight: 600;
    letter-spacing: 4px;
    color: #ddd;
    z-index: 10;

    .nav-move-back {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-image: url("../../assets/image/Play/back.png");
      background-size: cover;
      margin-left: 15px;
    }

    .nav-title {
      flex: 1;
      text-align: center;
      margin-right: 30px;
    }
  }

  .area-album-list {
    margin-top: 46px;
    padding: 0 5vw;
    overflow: hidden;

    .area-ablum-item {
      width: 45vw;
      height: 200px;
      float: left;

      .ablum-bg-img {
        width: 100%;
        height: 130px;
        background-image: url("../../assets/image/album-bg.png");
        background-size: 150px 150px;
        background-repeat: no-repeat;

        .van-image {
          width: 130px;
          height: 130px;
          margin-top: 10px;
          margin-bottom: 5px;
          margin: 0;
          .van-image__img  {
            display: block;
            width: 100%;
          }

      
        }
      }

      .ablum-name,
      .artist-name {
        height: 20px;
        font-size: 14px;
        color: #999;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .artist-name {
        color: #999;
        font-size: 12px;
      }

      .price {
        height: 20px;
        line-height: 20px;
        color: #e4393c;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
</style>