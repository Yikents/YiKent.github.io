<template>
  <div
    class="home-player"
    :style="{ backgroundImage: `url(${singleSongObj.imageUrl})` }"
    lazy-load
  >
    <div class="home-player-content">
      <div class="home-player-header">
        <div class="home-player-header-left" @click="ShowAndHideEvent()">
          <span class="iconfont icon-arrow-left"></span>
        </div>
        <div class="home-player-header-right" @click="showLayerEvent">
          <span class="iconfont icon-qita"></span>
        </div>
      </div>

      <div class="home-player-body">
        <div class="home-player-main">
          <div class="home-player-main-part">
            <div class="home-player-main-disc" ref="playerAnimate">
              <div class="home-player-main-img">
                <van-image :src="singleSongObj.imageUrl">
                  <template v-slot:error> </template>
                </van-image>
              </div>
            </div>
            <div
              class="home-player-main-bar"
              :style="{ transform: rotateState }"
            ></div>
          </div>
        </div>
        <div class="home-player-detail">
          <div class="home-song-name">{{ singleSongObj.songName }}</div>
          <div class="home-songer">
            {{ singleSongObj.curSonger || singleSongObj.initSonger }}
          </div>
        </div>
        <div class="home-player-footer">
          <div class="player-footer-item">
            <div class="player-footer-load">
              <span class="iconfont icon-download"></span>
            </div>
            <div class="player-footer-collection" @click="collectAlbumEvent">
              <span
                class="iconfont"
                :class="{
                  'icon-shoucang': !isCollectAlbum,
                  'icon-collection-tag': isCollectAlbum,
                }"
              ></span>
            </div>
            <div class="player-footer-share" @click="isShare = !isShare">
              <span class="iconfont icon-fenxiang"></span>
            </div>
          </div>
          <div class="player-footer-progress">
            <div class="footer-progress-bar">
              <input
                type="range"
                class="range"
                :value="currentPlayTime"
                min="0"
                max="100"
                ref="curProgress"
                @input="changeMusicProgress"
              />
            </div>
            <div class="footer-progress-des">
              <div class="current-time">{{ dealMusicPlay }}</div>
              <div class="duration-time">{{ dealDurationTime }}</div>
            </div>
          </div>
          <div class="player-footer-list">
            <div class="footer-list-loop"></div>
            <div class="footer-list-main">
              <div class="footer-list-pre" @click="playPreSongEvent()"></div>
              <div
                class="footer-list-center"
                :style="{ backgroundImage: `url(${bgPlayerButton})` }"
                @click="playerAndPauseEvent"
              ></div>
              <div class="footer-list-next" @click="playNextSongEvent()"></div>
            </div>
            <div class="footer-list-song-message" @click.self="showAndHideList">
              <transition name="showAnimate">
                <div class="footer-list-box" v-if="isHideList">
                  <div class="list-box-head">
                    <div class="list-box-head-left">
                      <span>播放列表</span
                      ><span>(共 {{ renderListArr.length }} 首)</span>
                    </div>
                    <div class="list-box-head-right">
                      <div class="list-box-r-collect">
                        <span class="iconfont icon-collection-tag"></span>
                      </div>
                      <div
                        class="list-box-r-delect"
                        @click.self="clearListEvent"
                      ></div>
                    </div>
                  </div>
                  <div class="list-box-body">
                    <div
                      class="list-box-body-item"
                      v-for="(items, index) in renderListArr"
                      :key="items.audioId"
                    >
                      <div
                        class="b-item-sequence"
                        v-show="isShowGit != items.audioId"
                      >
                        {{ index + 1 }}
                      </div>
                      <div
                        class="b-item-status"
                        v-show="isShowGit == items.audioId"
                      >
                        <img :src="changeBgUrl" />
                      </div>
                      <div
                        class="b-item-content"
                        @click.stop="playSongEvent(items)"
                      >
                        <div class="b-item-song-name">{{ items.songName }}</div>
                        <div class="b-item-songer">
                          {{ items.curSonger || items.initSonger }}
                        </div>
                      </div>
                      <div class="b-item-it">
                        <div class="b-item-song-time">
                          {{ dealTimeData(items.songerTime) }}
                        </div>
                        <div
                          class="b-item-song-delect"
                          @click="dealSingleSong(items.audioId)"
                        >
                          x
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="list-box-close" @click.stop="showAndHideList">
                    关闭
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-share-sheet
      v-model="showLayer"
      :options="playOptions"
      title="请选择"
      cancel-text=""
    />
    <van-share-sheet
      v-model="isShare"
      title="将这张唱片分享到"
      :options="shareOptions"
      cancel-text=""
    />
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { PlayerButton } from "@/utils";
export default {
  props: [
    "getPlayerState",
    "currentPlayTime",
    "durationPlayTime",
    "temperListen",
  ],
  data() {
    return {
      showLayer: false,
      isShare: false,
      isHideList: false,
      rotateState: "rotate(0deg)",
      bgPlayerButton: PlayerButton[0],
      renderListArr: [],
      preventContinueClick: null,
      isCollectAlbum: true,
      playOptions: [
        {
          name: "分享专辑",
          icon: require("../../assets/image/share.png"),
        },
        {
          name: "收藏专辑",
          icon: require("../../assets/image/collect-dark.png"),
        },
        {
          name: "加到歌单",
          icon: require("../../assets/image/add.png"),
        },
        {
          name: "有疑问",
          icon: require("../../assets/image/problem.png"),
        },
      ],
      shareOptions: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
      ],
    };
  },
  mounted() {
    this.renderMusicData();
  },
  methods: {
    ShowAndHideEvent() {
      this.$emit("ShowOrHidePlayer");
      this.isHideList = false;
    },
    //弹出分享层
    showLayerEvent() {
      this.showLayer = !this.showLayer;
    },

    //控制音乐播放与暂停
    playerAndPauseEvent() {
      if (!this.getPlayerState) {
        this.bgPlayerButton = PlayerButton[1];
        this.rotateState = "rotate(13deg)";
        this.$refs.playerAnimate.style.animationPlayState = "running";
      } else {
        this.bgPlayerButton = PlayerButton[0];
        this.rotateState = "rotate(0deg)";
        this.$refs.playerAnimate.style.animationPlayState = "paused";
      }
      this.$emit("playerAndPause");
    },

    //渲染数据
    renderMusicData() {
      if (!this.getPlayerState) {
        this.bgPlayerButton = PlayerButton[1];
        this.rotateState = "rotate(13deg)";
        this.$refs.playerAnimate.style.animationPlayState = "running";
      } else {
        this.bgPlayerButton = PlayerButton[0];
        this.rotateState = "rotate(0deg)";
        this.$refs.playerAnimate.style.animationPlayState = "paused";
      }
    },

    //改变音乐进度条
    changeMusicProgress(e) {
      let curState = parseInt((e.target.value / 100) * this.durationPlayTime);
      this.$emit("modifyMusicProgress", curState);
    },
    //显示与隐藏播放列表
    showAndHideList() {
      this.isHideList = !this.isHideList;
      let Cid = this.songAlbumID;

      // console.log('测试中....')

      if (localStorage.listExistSongDate) {
        let curStorges = JSON.parse(localStorage.listExistSongDate);

        if (curStorges[Cid]) {
          this.renderListArr = [...curStorges[Cid]];
        } else {
          this.renderListArr = [];
        }
        // console.log('数组情况...',this.renderListArr);
      }

      if (localStorage.singleSongMessage) {
        let getStorage = JSON.parse(localStorage.singleSongMessage);
        this.$store.commit("modifyShowGit", getStorage.audioId);
        if (this.playerState) {
          this.$store.commit("changeBgUrlState", 0);
        } else {
          this.$store.commit("changeBgUrlState", 1);
        }
      }
    },
    //删除播放列表中的全部歌曲
    clearListEvent() {
      let cur = this.renderListArr.map((it) => {
        return it.audioId;
      });
      this.renderListArr = [];
      let Cid = this.songAlbumID;
      let temps = JSON.parse(localStorage.listExistSongDate);

      this.$delete(temps, Cid);
      localStorage.listExistSongDate = JSON.stringify(temps);
      if (localStorage.storageJudge) {
        let t = JSON.parse(localStorage.storageJudge);
        // console.log('ceshizhong..')
        t[Cid] = false;
        localStorage.storageJudge = JSON.stringify(t);
      } else {
        let o = {};
        o[Cid] = false;
        localStorage.storageJudge = JSON.stringify(o);
        // console.log('weizhi...')
      }

      //获取删除的歌曲的audioId
      if (localStorage.dealAudioIdObj) {
        let idObj = JSON.parse(localStorage.dealAudioIdObj);
        if (idObj) {
          if (idObj[Cid]) {
            idObj[Cid].push(...cur);
            localStorage.dealAudioIdObj = JSON.stringify(idObj);
          } else {
            let o = {};
            o[Cid] = cur;
            localStorage.dealAudioIdObj = JSON.stringify({ ...idObj, ...o });
          }
        }
      } else {
        let obj1 = {};
        obj1[Cid] = cur;
        localStorage.dealAudioIdObj = JSON.stringify(obj1);
      }
      // console.log("删除中...");
    },
    //删除播放列表中的单首歌曲
    dealSingleSong(id) {
      this.renderListArr = this.renderListArr.filter((it) => {
        return it.audioId != id;
      });
      let Cid = this.songAlbumID;
      if (this.renderListArr.length != 0) {
        let obj2 = JSON.parse(localStorage.listExistSongDate);
        obj2[Cid] = this.renderListArr;
        localStorage.listExistSongDate = JSON.stringify(obj2);
      } else {
        let res = JSON.parse(localStorage.listExistSongDate);
        res[Cid] = this.renderListArr;
        localStorage.listExistSongDate = JSON.stringify(res);
      }
      //获取删除当前删除的歌曲
      if (localStorage.dealAudioIdObj) {
        let c1 = JSON.parse(localStorage.dealAudioIdObj);
        if (c1[Cid]) {
          if (this.renderListArr.length != 0) {
            c1[Cid].push(id);
            localStorage.dealAudioIdObj = JSON.stringify(c1);
          }
        }
      } else {
        let obj3 = {};
        obj3[Cid] = [id];
        localStorage.dealAudioIdObj = JSON.stringify(obj3);
      }
    },

    //处理播放列表中的数据
    dealTimeData(time) {
      let m = parseInt(time / 1000 / 60);
      let s = parseInt((time / 1000) % 60);
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    },

    ...mapMutations([
      "StartPlayStateEvent",
      "getsongAlbumID",
      "modifyPlayerState",
      "changeCurrentState",
      "getSingleSongMessage",
      "changeBgUrlState",
    ]),
    //传送歌曲id
    ...mapActions(["getdeliveryId"]),

    //播放列表中的歌曲
    playSongEvent(list) {
      if (this.preventContinueClick != list.audioId) {
        this.StartPlayStateEvent(true);
        this.audioUrl = this.SongSrcObj[list.audioId];

        this.$store.commit("modifyShowGit", list.audioId);

        this.preventContinueClick = list.audioId;
        this.changeBgUrlState(0);
        this.getdeliveryId(list.audioId);
        this.getSingleSongMessage({
          ...list,
          audioUrl: this.audioUrl,
          JudgeAlbumId: this.songAlbumID,
        });
        this.modifyPlayerState(true);
        localStorage.singleSongMessage = JSON.stringify({
          ...list,
          audioUrl: this.audioUrl,
          JudgeAlbumId: this.songAlbumID,
        });

        this.changeCurrentState(true);
        // console.log(list);
      }
    },

    //收藏专辑
    collectAlbumEvent() {
      if (this.isCollectAlbum) {
        if (this.singleSongObj.typeJudge != "single") {
          if (localStorage.AlbumCollection) {
            let currST = JSON.parse(localStorage.AlbumCollection);
            currST.push(this.AlbumCollection);
            localStorage.AlbumCollection = JSON.stringify(currST);
            let CollectS = JSON.parse(localStorage.CollectState);
            let o = {};
            o[this.songAlbumID] = false;
            localStorage.CollectState = JSON.stringify({ ...CollectS, ...o });
          } else {
            localStorage.AlbumCollection = JSON.stringify([
              this.AlbumCollection,
            ]);
            // console.log(this.AlbumCollection, "lsldf");
            let j = {};
            j[this.songAlbumID] = false;
            localStorage.CollectState = JSON.stringify(j);
          }
          if (localStorage.JudgeId) {
            let jd = JSON.parse(localStorage.JudgeId);
            jd.push(this.songAlbumID);
            localStorage.JudgeId = JSON.stringify(jd);
          } else {
            localStorage.JudgeId = JSON.stringify([this.songAlbumID]);
          }
        } else {
          if (localStorage.songCollection) {
            let SC = JSON.parse(localStorage.songCollection);
            SC.push(this.songCollection);
            localStorage.songCollection = JSON.stringify(SC);
            let JS = JSON.parse(localStorage.JudgeSid);
            JS.push(this.songCollection.rId);
            localStorage.JudgeSid = JSON.stringify(JS);
            let cop = JSON.parse(localStorage.CollectState);
            let op = {};
            op[this.songCollection.rId] = false;
            localStorage.CollectState = JSON.stringify({ ...cop, ...op });
          } else {
            localStorage.songCollection = JSON.stringify(this.songCollection);
            localStorage.JudgeSid = JSON.stringify(this.songCollection.rId);
            let cr = {};
            cr[this.songCollection.rId] = false;
            localStorage.CollectState = JSON.stringify(cr);
          }
        }

        this.isCollectAlbum = false;
      } else {
        if (this.singleSongObj.typeJudge != "single") {
          if (localStorage.AlbumCollection) {
            let cST = JSON.parse(localStorage.AlbumCollection);
            let f = cST.findIndex((item) => item.albumsId == this.songAlbumID);
            if (f != -1) {
              if (cST.length > 1) {
                cST = cST.filter((it) => {
                  return it.albumsId != this.songAlbumID;
                });

                localStorage.AlbumCollection = JSON.stringify(cST);
              } else {
                localStorage.AlbumCollection = JSON.stringify([]);
              }
            }
            let b = JSON.parse(localStorage.CollectState);
            b[this.songAlbumID] = true;
            localStorage.CollectState = JSON.stringify(b);
          }
          if (localStorage.JudgeId) {
            let temperJ = JSON.parse(localStorage.JudgeId);
            let findId = temperJ.findIndex((it) => it == this.songAlbumID);
            if (findId != -1) {
              temperJ = temperJ.filter((its) => {
                return its != this.songAlbumID;
              });
            }
            localStorage.JudgeId = JSON.stringify(temperJ);
          }
        } else {
          if (localStorage.songCollection) {
            let curSC = JSON.parse(localStorage.songCollection);
            let fid = curSC.findIndex(
              (itm) => itm.rId == this.songCollection.rId
            );
            let jud = JSON.parse(localStorage.JudgeSid);
            let col = JSON.parse(localStorage.CollectState);
            col[this.songCollection.rId] = true;
            localStorage.CollectState = JSON.stringify(col);
            if (fid != -1) {
              if (curSC.length > 1) {
                curSC = curSC.filter((ite) => {
                  return ite.rId != this.songCollection.rId;
                });
                localStorage.songCollection = JSON.stringify(curSC);

                jud = jud.filter((it) => {
                  return it != this.songCollection.rId;
                });

                localStorage.JudgeSid = JSON.stringify(jud);
              } else {
                localStorage.songCollection = JSON.stringify([]);
                localStorage.JudgeSid = JSON.stringify([]);
              }
            }
          }
        }

        this.isCollectAlbum = true;
      }
      this.$store.commit("requireCollectState", this.isCollectAlbum);
    },

    //播放上一首歌
    playPreSongEvent() {
      let SongList = JSON.parse(localStorage.listExistSongDate);
      let songL = JSON.parse(localStorage.allSongList);
      let Cd = this.songAlbumID;
      if (SongList[Cd]) {
        let finds = SongList[Cd].findIndex(
          (it) => it.audioId == this.singleSongObj.audioId
        );
        let fds = songL.findIndex(
          (it) => it.audioId == this.singleSongObj.audioId
        );
        if (fds != -1 && fds != 0 && finds == -1) {
          for (let i = fds; i >= 0; i--) {
            let search = SongList[Cd].findIndex(
              (item) => item.audioId == songL[i].audioId
            );
            if (search != -1) {
              finds = search + 1;
              break;
            }
          }
        }
        if (finds <= 0) {
          finds = 0;
          return;
        }
        finds--;
        this.playSongEvent(SongList[Cd][finds]);
        // console.log(finds,this.singleSongObj);
      }
    },

    //播放下一首歌
    playNextSongEvent() {
      let SongList = JSON.parse(localStorage.listExistSongDate);
      let songL = JSON.parse(localStorage.allSongList);
      let Cd = this.songAlbumID;
      if (SongList[Cd]) {
        let finds = SongList[Cd].findIndex(
          (it) => it.audioId == this.singleSongObj.audioId
        );
        let fds = songL.findIndex(
          (it) => it.audioId == this.singleSongObj.audioId
        );
        if (fds != -1 && fds != songL.length && finds == -1) {
          for (let i = fds; i <= songL.length; i++) {
            let search = SongList[Cd].findIndex(
              (item) => item.audioId == songL[i].audioId
            );
            if (search != -1) {
              finds = search - 1;
              break;
            }
          }
        }
        if (finds >= songL.length - 1 || SongList.length == 0) {
          finds = songL.length;
          return;
        }
        finds++;
        this.playSongEvent(SongList[Cd][finds]);
      }
    },
  },
  computed: {
    ...mapState([
      "playerState",
      "SongSrcObj",
      "singleSongObj",
      "songAlbumID",
      "changeBgUrl",
      "isShowGit",
      "AlbumCollection",
      "listenListState",
      "songCollection",
      "allSongList",
    ]),
    //处理音乐时间
    dealMusicPlay() {
      if (this.durationPlayTime != "00:00") {
        let m = parseInt(
          (this.currentPlayTime * this.durationPlayTime) / 100 / 60
        );
        let s = parseInt(
          ((this.currentPlayTime * this.durationPlayTime) / 100) % 60
        );
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        return m + ":" + s;
      } else {
        return "00:00";
      }
    },
    //处理总时间
    dealDurationTime() {
      if (this.durationPlayTime != "00:00") {
        let m = parseInt(this.durationPlayTime / 60);
        let s = parseInt(this.durationPlayTime % 60);
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        return m + ":" + s;
      } else {
        return this.durationPlayTime;
      }
    },
  },
  watch: {
    playerState() {
      this.renderMusicData();
    },
    listenListState() {
      if (this.singleSongObj.typeJuge != "single") {
        if (localStorage.CollectState) {
          let Cst = JSON.parse(localStorage.CollectState);
          if (Cst[this.songAlbumID]) {
            this.isCollectAlbum = true;
          } else {
            this.isCollectAlbum = false;
          }
        }
      } else {
        if (localStorage.CollectState) {
          let csc = JSON.parse(localStorage.CollectState);
          if (csc[this.songCollection.rId]) {
            this.isCollectAlbum = true;
          } else {
            this.isCollectAlbum = false;
          }
        }
      }
    },
    temperListen() {
      if (localStorage.AlbumCollection) {
        let acn = JSON.parse(localStorage.AlbumCollection);
        let fds = acn.findIndex((it) => it.albumsId == this.songAlbumID);
        if (fds == -1) {
          this.isCollectAlbum = true;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-player {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 66;

  &::after {
    position: absolute;
    display: block;
    content: "";
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 68;
    backdrop-filter: blur(16px);
  }

  .home-player-content {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 70;

    .home-player-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;

      .home-player-header-left {
        width: 30px;
        height: 50px;
        line-height: 50px;
        text-align: center;

        .icon-arrow-left {
          font-size: 23px;
          color: #fff;
        }
      }

      .home-player-header-right {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;

        .icon-qita {
          font-size: 20px;
          color: #fff;
        }
      }
    }

    .home-player-body {
      box-sizing: border-box;
      width: 100vw;
      height: 100vh;
      padding: 0px 10px;

      .home-player-main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        // background:skyblue;
        border-bottom: 1px solid rgba(238, 238, 238, 0.3);

        .home-player-main-part {
          position: relative;
          width: 260px;
          height: 260px;

          .home-player-main-disc {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 260px;
            height: 260px;
            background-image: url("../../assets/image/bg-die.png");
            background-size: cover;
            animation: playerTransition 6s infinite 0.4s linear paused;

            .home-player-main-img {
              width: 136px;
              height: 136px;
              border-radius: 999px;
              background-size: 150px 150px;
              background-repeat: no-repeat;
              background-position: center center;
              overflow: hidden;
            }

            @keyframes playerTransition {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          }
          .home-player-main-bar {
            position: absolute;
            display: block;
            content: "";
            top: -6px;
            right: -33px;
            width: 70px;
            height: 260px;
            background-image: url("../../assets/image/bar.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
            transform-origin: 50px 40px;
            z-index: 88;
            transition: transform 0.4s linear;
            // transform: rotate(13deg);
          }
        }
      }

      .home-player-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 140px;
        padding: 0px 20px;
        margin-top: 20px;

        .home-song-name {
          height: 30px;
          font-size: 18px;
          color: #fff;
        }

        .home-songer {
          font-size: 15px;
          color: #ddd;
        }
      }

      .home-player-footer {
        box-sizing: border-box;
        padding: 0px 20px;
        height: 100vh;

        .player-footer-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;

          .iconfont {
            color: #fff;
          }
          .icon-download {
            font-size: 28px;
          }
          .icon-collection-tag {
            font-size: 26px;
          }
          .icon-shoucang {
            font-size: 26px;
            color: #e4393c;
          }
          .icon-fenxiang {
            font-size: 30px;
          }
        }

        .player-footer-progress {
          height: 60px;
          //   background: red;

          .footer-progress-bar {
            position: relative;
            display: flex;
            align-items: center;
            height: 20px;
            .range {
              position: absolute;
              display: block;
              width: 100%;
              left: 0px;
              right: 0px;
              top: 0px;
              bottom: 0px;
              height: 5px;
              padding: 0px;
              margin: auto 0px;
            }
          }
          .footer-progress-des {
            display: flex;
            justify-content: space-between;
            .current-time,
            .duration-time {
              font-size: 14px;
              color: #ddd;
            }
          }
        }
        .player-footer-list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          //   background: red;

          .footer-list-loop,
          .footer-list-song-message {
            width: 30px;
            height: 30px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .footer-list-loop {
            background-image: url("../../assets/image/loop.png");
          }
          .footer-list-song-message {
            background-image: url("../../assets/image/list.png");

            .footer-list-box {
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: fixed;
              top: 50%;
              bottom: 0px;
              left: 0px;
              right: 0px;
              background-color: #161616;

              .list-box-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 40px;
                background-color: #1f1f1f;

                .list-box-head-left {
                  font-size: 14px;
                  padding-left: 10px;

                  & > span:nth-child(1) {
                    color: #fff;
                    margin-right: 5px;
                  }
                  & > span:nth-child(2) {
                    color: #777;
                    margin-right: 5px;
                  }
                }

                .list-box-head-right {
                  display: flex;

                  .list-box-r-collect {
                    width: 50px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    .icon-collection-tag {
                      font-size: 20px;
                      color: #bbb;
                    }
                  }
                  .list-box-r-delect {
                    width: 50px;
                    height: 40px;
                    background-image: url("../../assets/image/delete-icon.png");
                    background-size: 23px 23px;
                    background-repeat: no-repeat;
                    background-position: center center;
                  }
                }
              }

              .list-box-body {
                box-sizing: border-box;
                width: 100%;
                height: calc(100% - 80px);
                border-top: 1px solid black;
                border-bottom: 1px solid black;
                overflow: scroll;
                &::-webkit-scrollbar {
                  width: 0px;
                }

                .list-box-body-item {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  height: 60px;
                  .b-item-sequence {
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color: #777;
                    font-size: 17px;
                  }

                  .b-item-status {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;

                    img {
                      display: block;
                      width: 20px;
                      height: 20px;
                    }
                  }

                  .b-item-content {
                    flex: 1;
                    color: #fff;
                    .b-item-song-name {
                      width: 220px;
                      height: 30px;
                      line-height: 30px;
                      font-size: 14px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                    .b-item-songer {
                      width: 220px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      font-size: 13px;
                    }
                  }

                  .b-item-it {
                    display: flex;
                    align-items: center;
                    color: #777;
                    .b-item-song-time {
                      font-size: 13px;
                    }
                    .b-item-song-delect {
                      width: 60px;
                      height: 60px;
                      line-height: 60px;
                      text-align: center;
                      font-size: 20px;
                    }
                  }
                }
              }

              .list-box-close {
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #1f1f1f;
                color: #777;
                font-size: 14px;
              }
            }
          }
          .footer-list-main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            .footer-list-pre,
            .footer-list-center,
            .footer-list-next {
              width: 30px;
              height: 30px;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
            }
            .footer-list-pre {
              background-image: url("../../assets/image/pre.png");
            }
            .footer-list-center {
              margin: 0px 30px;
            }
            .footer-list-next {
              background-image: url("../../assets/image/next.png");
            }
          }
        }
      }
    }
  }

  .showAnimate-enter,
  .showAnimate-leave-to {
    transform: translateY(100%);
  }
  .showAnimate-enter-active,
  .showAnimate-leave-active {
    transition: all 0.1s linear;
  }
  .showAnimate-enter-to,
  .showAnimate-leave {
    transform: translateY(50%);
  }
}
</style>