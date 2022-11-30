<template>
  <div class="home-boutique">
    <div class="home-boutique-header">
      <div class="home-boutique-title">热门歌手</div>
      <div class="home-boutique-more" @click="jumpMoreMessage">MORE</div>
    </div>
    <div class="home-boutique-body">
      <div
        class="home-boutique-body-item"
        v-for="(item, index) in partSongerArr"
        :key="item.albumsId"
      >
        <div class="home-boutique-body-left" @click="jumpRouterEvent(item)">
          <div class="home-boutique-left-title">{{ item.songerName }}</div>
          <div class="home-boutique-left-songer">{{ item.alias }}</div>
        </div>
        <div class="home-boutique-body-right">
          <div class="home-boutique-body-main">
            <van-image :src="item.imgUrl" fill>
              <template v-slot:error> </template>
            </van-image>
          </div>
          <div class="home-boutique-body-img">
            <div
              class="home-boutique-body-player"
              @click="playAndPauseEvent(index, item.albumsId)"
            >
              <span
                class="iconfont icon-play_fill"
                v-show="isShowMusic[index]"
              ></span>
              <span
                class="iconfont icon-pause1"
                v-show="!isShowMusic[index]"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { AxiosApi, GetSongApi } from "@/utils/index";
export default {
  data() {
    return {
      BoutiqueArr: [],
      partSongerArr: [],
      isShowMusic: [true, true, true],
      firstSongId: {},
      temporaryArr: [],
      recordState: "",
      tempID: "",
      tempIndexs: null,
    };
  },
  created() {
    this.getBoutiqueArr();
  },
  methods: {
    getBoutiqueArr() {
      this.$axios
        .get("http://localhost:3000/artist/list?type=1")
        .then(({ data }) => {
          let artData = data.artists;
          this.BoutiqueArr = artData.map((it) => {
            return {
              imgUrl: it.picUrl,
              songerName: it.name,
              albumsId: it.id,
              alias: it.alias.join(" / "),
            };
          });
          this.partSongerArr = this.BoutiqueArr.filter((it, index) => {
            if (index < 3) {
              return it;
            }
          });
          // console.log(artData);
        });
    },

    // 控制播放按键
    async playAndPauseEvent(ind, id) {
      //保存专辑id
      this.getsongAlbumID(id);
      // console.log('id+.>',id);

      let a = await GetSongApi(this.firstSongId[id]);
      this.temporaryArr = this.temporaryArr.map((it) => {
        if (it.audioId == this.firstSongId[id]) {
          return {
            ...it,
            audioUrl: a,
          };
        } else {
          return it;
        }
      });

      if (this.recordState != id) {
        //处理外部点击时获取点击的歌手专辑
        let dealTemporayData = this.temporaryArr[ind].data.map((it) => {
          this.getdeliveryId(it.id);
          return {
            songName: it.name,
            audioId: it.id,
            publishTime: it.publishTime,
            songerTime: it.dt,
            imageUrl: it.al.picUrl,
            type: it.originCoverType,
            curSonger: it.ar[1]?.name,
            initSonger: it.ar[0]?.name,
          };
        });
        localStorage.allSongList = JSON.stringify(dealTemporayData);

        //尾部
        localStorage.singleSongMessage = JSON.stringify(this.temporaryArr[ind]);
        this.changeCurrentState(true);
        this.StartPlayStateEvent(true);
        this.modifyPlayerState(true);

        this.getSingleSongMessage(this.temporaryArr[ind]);
        this.recordState = id;
        this.$store.commit("changeAudioStation", true);
        let tep = this.temporaryArr[ind].audioId;
        this.$store.commit("modifyShowGit", tep);
        let a = this.temporaryArr[ind];
        let o = {
          albumsId: id,
          imgUrl: a.imageUrl,
          songerName: a.initSonger,
        };
        this.$store.commit("getCurrentCollection", o);
      }

      // console.log(this.temporaryArr[ind]);

      // this.isShowMusic = this.isShowMusic.map((it, index) => {
      //   if (index == ind) {
      //     return !it;
      //   } else {
      //     return it;
      //   }
      // });
    },

    jumpRouterEvent(item) {
      this.$store.commit("getCurrentCollection", item);
      this.$router.push({
        path: "/home-album-list/" + item.albumsId,
      });
    },

    jumpMoreMessage() {
      this.getMoreMessage(this.BoutiqueArr);
      this.$router.push({
        path: "/home-more-message/热门歌手",
      });
    },
    //播放器那边的列表渲染情况
    playerListRender() {
      let Cid = this.songAlbumID;
      // console.log("lsdjf",Cid);
      let curArr = JSON.parse(localStorage.allSongList);
      if (!localStorage.listExistSongDate) {
        let obj = {};
        obj[Cid] = curArr;
        localStorage.listExistSongDate = JSON.stringify(obj);

        let o = {};
        o[Cid] = true;
        localStorage.storageJudge = JSON.stringify(o);
      } else {
        let curSt = JSON.parse(localStorage.listExistSongDate);

        if (curSt[Cid]) {
          return;
        } else {
          let ob = JSON.parse(localStorage.storageJudge);
          // console.log(ob[Cid]);
          if (ob[Cid]) {
            curSt[Cid] = curArr;
            localStorage.listExistSongDate = JSON.stringify(curSt);
          } else {
            if (typeof ob[Cid] == "undefined") {
              curSt[Cid] = curArr;
              localStorage.listExistSongDate = JSON.stringify(curSt);
            }
          }
        }
      }
    },
    // 修改store中的MoreMessage数组
    ...mapMutations([
      "getMoreMessage",
      "getSingleSongMessage",
      "StartPlayStateEvent",
      "modifyPlayerState",
      "changeCurrentState",
      "getdeliveryId",
      "getsongAlbumID",
    ]),
    ...mapActions(["getdeliveryId"]),
  },
  computed: {
    ...mapState(["playerState", "singleSongObj", "songAlbumID"]),
  },
  watch: {
    async partSongerArr(newValue) {
      if (newValue) {
        // this.partSongerArr.forEach(async (it) => {
        //   console.log('等待中...')
        //   let a = await AxiosApi(it.albumsId);
        //   this.firstSongId[it.albumsId] = a.audioId;
        //   this.temporaryArr.push(a);
        //   console.log(a,'11')
        //   // console.log('第三部分',this.temporaryArr,a);
        // });
        let item = this.partSongerArr;
        for (let i = 0; i < item.length; i++) {
          let it = item[i];
          let a = await AxiosApi(it.albumsId);
          this.firstSongId[it.albumsId] = a.audioId;
          this.temporaryArr.push(a);
        }
      }
    },
    singleSongObj() {
      //保存专辑id
      if (this.playerState) {
        this.playerListRender();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-boutique {
  margin-top: 40px;

  .home-boutique-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 5px;

    .home-boutique-title {
      font-weight: bolder;
      font-size: 17px;
    }
    .home-boutique-more {
      font-size: 13px;
      color: #cfb072;
    }
  }

  .home-boutique-body-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    border-radius: 5px;
    background: #efefef;
    margin: 10px 0px;

    .home-boutique-body-left {
      width: calc(100% - 90px);
      margin-left: 10px;

      .home-boutique-left-title,
      .home-boutique-left-songer {
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .home-boutique-left-title {
        font-weight: bold;
      }
      .home-boutique-left-songer {
        font-size: 15px;
        color: #777;
      }
    }
    .home-boutique-body-right {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      margin: 0px 10px;

      .home-boutique-body-main{
        position: absolute;
        display: flex;
        top:0px;
        bottom:0px;
        left:0px;
        right:0px;
        border-radius: 5px;
        overflow: hidden;
        z-index: 1;
      }

      .home-boutique-body-player {
        position: absolute;
        top:0px;
        bottom:0px;
        left:0px;
        right:0px;
        margin:auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: rgba(204, 204, 204, 0.5);
        z-index: 333;

        .icon-play_fill,
        .icon-pause1 {
          font-size: 26px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>