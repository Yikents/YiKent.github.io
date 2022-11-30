<template>
  <div class="song">
    <van-loading
      type="spinner"
      color="#1989fa"
      class="lazy-load"
      v-show="isShowAndHide"
    />
    
    <div
      class="song-list"
      v-for="item in list"
      :key="item.albumId"
      :v-lazy="item"
      @click="goAlbumDetails(item.albumId)"
    >
      <div class="song-left">
        <van-image :src="item.coverUrl" class="album-background-img">
          <template v-slot:error> </template>
        </van-image>
       
      </div>

      <div class="song-right">
        <div class="song-right-name">{{ item.albumName }}</div>
        <div class="song-right-singer-name van-multi-ellipsis-l2">
          {{ item.artistName }}
        </div>
        <div class="song-right-time">发行时间:{{ item.pubTime }}</div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowAndHide: true,
      list: [],
      loading: true,
    };
  },
  methods: {
    getAlbum() {
      this.$axios
        .get("http://localhost:3000/album/list?limit=20")
        .then((data) => {
          this.list = data.data.products.map((i) => {
            return {
              albumId: i.albumId,
              coverUrl: i.coverUrl,
              albumName: i.albumName,
              artistName: i.artistName,
              pubTime: new Date(i.pubTime).getFullYear(),
            };
          });
          console.log("this.list ==>", this.list);
        });

      this.isShowAndHide = false;
    },

    goAlbumDetails(id) {
                this.$router.push({
                    path:'/AlbumDetails/id='+[id]
                })
            }
  },
  created() {
    this.getAlbum();
  },
};
</script>

<style lang="scss" scoped>
.song {
  width: 100vw;
  margin-top: 40px;

  .lazy-load {
    position: fixed;
    top: 30%;
    right: 40vw;
  }

  .song-list {
    display: flex;
    width: 96%;
    height: 150px;
    margin: 0 2%;
    margin-top: 20px;
    border-bottom: 2px solid #ddd;

    .song-left {
      width: 40%;
      height: 150px;
      border-radius: 10px;
      background-image: url("../../assets/image/album-bg.png");
      background-size: 150px 150px;
      background-repeat: no-repeat;

      .album-background-img {
        width: 130px;
        height: 130px;
        margin-top: 10px;
        margin-bottom: 5px;
      }
    }

    .song-right {
      width: 60%;
      height: 150px;

      .song-right-name {
        padding: 10px;
        font-size: 19px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .song-right-singer-name {
        padding: 10px;
        margin-top: 50px;
        font-size: 15px;
        color: #646566;
      }

      .song-right-time {
        padding: 0 10px;
        font-size: 15px;
        color: #646566;
      }
    }
  }

  .song-list:last-child {
    margin-bottom: 170px;
  }
}
</style>