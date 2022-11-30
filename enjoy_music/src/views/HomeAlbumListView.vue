<template>
  <transition name="move">
    <div class="home-album-list">
      <div
        class="home-album-header"
        :style="{ backgroundColor: `rgba(18, 17, 17, ${getscrollTop})` }"
      >
        <div class="album-header-left" @click="jumpRouterEvent">
          <span class="iconfont icon-arrow-left"></span>
        </div>
        <div class="album-header-center">{{ AlbumText }}</div>
        <div class="album-header-right" @click="showHideEvent">
          <span class="iconfont icon-qita"></span>
        </div>
      </div>
      <div class="home-album-layer" v-show="!isShowLoad">
        <div class="home-album-body" @scroll.stop="scrollEvent($event)">
          <div
            class="album-body-detail"
            :style="{ backgroundImage: `url(${bgImageUrl})` }"
          >
            <div class="album-body-content">
              <div class="album-body-song-name">{{ initSongName }}</div>
              <div class="album-body-pircture-area">
                <div class="album-body-song-img">
                  <van-image :src="bgImageUrl" fill>
                    <template v-slot:error> </template>
                  </van-image>
                </div>
                <div class="album-body-song-detail">
                  <div class="album-body-song-decoration">
                    <div class="album-body-songer-name">
                      {{ cSonger || sName }}
                    </div>
                    <div class="album-body-publish-time">
                      <div class="album-text">发行时间</div>
                      :
                      <div class="album-cnt">{{ initYear }} 年</div>
                    </div>
                    <div class="album-body-pin">
                      <div class="album-text">原始类型</div>
                      :
                      <div class="album-cnt">{{ originText[typeIndex] }}</div>
                    </div>
                    <div class="album-body-type">
                      <div class="album-text">原唱</div>
                      <div class="album-cnt">{{ sName }}</div>
                    </div>
                  </div>
                  <div class="album-song-message">查看完整信息 ></div>
                </div>
              </div>
              <div class="album-body-select">
                <div class="album-download">
                  <span class="iconfont icon-download"></span><span>缓存</span>
                </div>

                <div class="album-collection" @click="collectMessageEvent">
                  <span
                    class="iconfont"
                    :class="{
                      'icon-shoucang': !isCollectData,
                      'icon-collection-tag': isCollectData,
                    }"
                  ></span
                  ><span>收藏</span>
                </div>

                <div class="album-share" @click="showShareEvent">
                  <span class="iconfont icon-fenxiang"></span><span>分享</span>
                </div>
              </div>
            </div>
          </div>
          <div class="home-song-list">
            <div class="home-song-list-header">
              <div class="song-list-player"></div>
              <div class="song-list-text">
                <span>全部播放 </span
                ><span>(共 {{ songListArr.length }} 首)</span>
              </div>
            </div>
            <ul class="home-song-list-detail">
              <li
                class="home-song-list-item"
                v-for="(item, index) in songListArr"
                :key="item.id"
              >
                <div
                  class="song-list-sequence"
                  v-show="isShowStatus != item.audioId"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="song-list-play-status"
                  v-show="isShowStatus == item.audioId"
                >
                  <img :src="changeBgUrl" />
                </div>
                <div class="song-list-des-text" @click="playMusicEvent(item)">
                  <div class="song-list-left">
                    <div class="song-list-song-name">{{ item.songName }}</div>
                    <div class="song-list-songer">
                      {{ item.curSonger || item.initSonger }}
                    </div>
                  </div>
                  <div class="song-list-right">
                    {{ dealPlayMusicTime(item.songerTime) }}
                  </div>
                </div>
                <div
                  class="song-list-share"
                  @click.stop="showHideListEvent(item)"
                >
                  <span class="iconfont icon-qita"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <van-share-sheet
          v-model="showShare"
          title="将这张唱片分享到"
          :options="options"
          cancel-text=""
        />
        <van-share-sheet
          v-model="isShowHide"
          :options="dotOptions"
          title="请选择"
          cancel-text=""
          @select="vantSecondEvent"
        />
        <van-share-sheet
          v-model="isShowList"
          :options="dotSelect"
          title="请选择"
          cancel-text=""
          @select="vantThreeEvent"
        />
      </div>
      <van-loading
        type="spinner"
        color="#1989fa"
        v-if="isShowLoad"
        class="van-load"
      />
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      bgImageUrl: null,
      songListArr: [],
      getscrollTop: 0,
      initPositionY: 0,
      isTouchEvent: false,
      showShare: false,
      isShowHide: false,
      isShowList: false,
      isShowLoad: true,
      initSongName: null,
      initYear: null,
      sName: null,
      cSonger: null,
      originText: ["未知", "原曲", "翻唱"],
      typeIndex: 0,
      preventContinueClick: null,
      isShowStatus: null,
      AlbumText: "",
      audioUrl: "",
      tempID: "",
      isCollectData: true,
      currentClickSong: "",
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
      ],
      dotOptions: [
        {
          name: "分享专辑",
          icon: require("../assets/image/share.png"),
        },
        {
          name: "收藏专辑",
          icon: require("../assets/image/collect-dark.png"),
        },
        {
          name: "加到歌单",
          icon: require("../assets/image/add.png"),
        },
        {
          name: "有疑问",
          icon: require("../assets/image/problem.png"),
        },
      ],
      dotSelect: [
        {
          name: "分享专辑",
          icon: require("../assets/image/share.png"),
        },
        {
          name: "收藏歌曲",
          icon: require("../assets/image/collect-dark.png"),
        },
        {
          name: "加到歌单",
          icon: require("../assets/image/add.png"),
        },
        {
          name: "有疑问",
          icon: require("../assets/image/problem.png"),
        },
      ],
      // isRunMove: false,
    };
  },
  created() {
    let curJudge = this.$route.params.id.slice(0, 9);
    // console.log(curJudge)
    if (curJudge != "recommend") {
      this.AlbumText = "专辑";
      this.getSongListEvent();
    } else {
      this.AlbumText = "歌单";
      this.getRecommendListEvent();
    }
    // console.log(this.playerState);
  },

  methods: {
    // 控制头部导航栏的背景颜色透明程度
    scrollEvent(e) {
      if ((e.target.scrollTop / 300).toFixed(1) <= 1) {
        this.getscrollTop = (e.target.scrollTop / 300).toFixed(1);
      } else {
        this.getscrollTop = 1;
      }
    },

    //弹出分享层
    showShareEvent() {
      if (this.showShare) {
        this.showShare = false;
      } else {
        this.showShare = true;
      }
    },
    showHideEvent() {
      if (this.isShowHide) {
        this.isShowHide = false;
      } else {
        this.isShowHide = true;
      }
    },
    showHideListEvent(item) {
      this.currentClickSong = item;
      if (this.isShowList) {
        this.isShowList = false;
      } else {
        this.isShowList = true;
        if (localStorage.SingleSongCollection) {
          let fd = item.audioId;
          let currentStorage = JSON.parse(localStorage.SingleSongCollection);
          let findAimt = currentStorage.findIndex((it) => it.audioId == fd);
          if (findAimt != -1) {
            this.dotSelectActiveEvent(0);
          } else {
            this.dotSelectActiveEvent(1);
          }
        }
      }
    },
    //跳转页面
    jumpRouterEvent() {
      this.$router.go(-1);
      this.hideAndShowPlayer(false);
    },
    //获取相关歌曲列表
    getSongListEvent() {
      let songId = this.$route.params.id;

      //初始渲染收藏值的状态
      this.renderCollectData(songId);

      //保存专辑id
      this.tempID = songId;

      this.hideAndShowPlayer(true);
      this.$axios
        .get(`http://localhost:3000/artist/top/song?id=${songId}`)
        .then((data) => {
          let dealData = data.data.songs;
          this.songListArr = dealData.map((it) => {
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
              typeJudge: "Album",
            };
          });
          this.dealYearEvent(this.songListArr[0].publishTime);
          this.initSongName = this.songListArr[0].songName;
          this.bgImageUrl = this.songListArr[0].imageUrl;
          this.typeIndex = this.songListArr[0].type;
          this.sName = this.songListArr[0].initSonger;
          this.cSonger = this.songListArr[0].curSonger;
          this.isShowStatus = this.songListArr[0].audioId;
          this.preventContinueClick = this.songListArr[0].audioId;
          this.isShowLoad = false;

          this.$store.commit("modifyShowGit", this.isShowStatus);

          this.getAllSongList(this.songListArr);

          if (localStorage?.singleSongMessage) {
            let currentLocalStorage = JSON.parse(
              localStorage?.singleSongMessage
            );

            //  if (!this.singleSongObj) {
            //   this.getSingleSongMessage(currentLocalStorage);
            // }

            let find = this.songListArr.find(
              (it) => it.audioId == currentLocalStorage.audioId
            );
            this.preventContinueClick = currentLocalStorage.audioId;
            // this.modifyPlayerState(true);
            if (find) {
              this.isShowStatus = currentLocalStorage.audioId;

              this.$store.commit("modifyShowGit", this.isShowStatus);

              this.dealPartPageMessage();
              if (this.playerState) {
                this.changeBgUrlState(0);
              } else {
                this.changeBgUrlState(1);
              }
            } else {
              this.changeBgUrlState(1);
            }
            //  console.log("lsld01")
          } else {
            this.getSingleId(this.songListArr[0].audioId);
            // this.getdeliveryId(this.songListArr[0].audioId);
            this.getSingleSongMessage({
              ...this.songListArr[0],
              JudgeAlbumId: this.tempID,
            });

            this.modifyEmptyValue(true);
          }
        });
    },

    //获取推荐歌单传过的数据
    getRecommendListEvent() {
      let songId = this.$route.params.id.slice(9);

      //初始渲染收藏值的状态
      this.renderCollectData(songId);

      //保存专辑id
      this.tempID = songId;

      this.hideAndShowPlayer(true);
      this.$axios
        .get(`http://localhost:3000/personalized/newsong/id=${songId}`)
        .then((data) => {
          let dealList = data.data.result;
          this.songListArr = dealList.map((it) => {
            this.getdeliveryId(it.id);
            return {
              songName: it.name,
              audioId: it.id,
              publishTime: it.song.album.publishTime,
              songerTime: it.song.duration,
              imageUrl: it.picUrl,
              type: it.song.originCoverType,
              curSonger: it.song.artists[1]?.name,
              initSonger: it.song.artists[0]?.name,
              typeJudge: "single",
            };
          });
          this.dealYearEvent(this.songListArr[0].publishTime);
          this.initSongName = this.songListArr[0].songName;
          this.bgImageUrl = this.songListArr[0].imageUrl;
          this.typeIndex = this.songListArr[0].type;
          this.sName = this.songListArr[0].initSonger;
          this.cSonger = this.songListArr[0].curSonger;
          this.isShowLoad = false;
          this.isShowStatus = this.songListArr[0].audioId;

          this.$store.commit("modifyShowGit", this.isShowStatus);

          this.getSingleId(this.songListArr[0].audioId);
          // this.getSingleSongMessage({
          //   ...this.songListArr[0],
          // });

          this.getAllSongList(this.songListArr);

          if (localStorage?.singleSongMessage) {
            let currentLocalStorage = JSON.parse(
              localStorage.singleSongMessage
            );
            // if (!this.singleSongObj) {
            //   this.getSingleSongMessage(currentLocalStorage);
            // }
            let find = this.songListArr.find(
              (it) => it.audioId == currentLocalStorage.audioId
            );
            this.preventContinueClick = currentLocalStorage.audioId;

            // this.modifyPlayerState(true);
            if (find) {
              this.isShowStatus = currentLocalStorage.audioId;

              this.$store.commit("modifyShowGit", this.isShowStatus);

              this.dealPartPageMessage();
              if (this.playerState) {
                this.changeBgUrlState(0);
              } else {
                this.changeBgUrlState(1);
              }
            } else {
              this.changeBgUrlState(1);
            }
          } else {
            this.getSingleId(this.songListArr[0].audioId);
            // this.getdeliveryId(this.songListArr[0].audioId);
            this.getSingleSongMessage({
              ...this.songListArr[0],
              JudgeAlbumId: this.tempID,
            });
            this.modifyEmptyValue(true);
          }
        });
    },

    //播放列表中的歌曲
    playMusicEvent(list) {
      if (this.preventContinueClick != list.audioId) {
        //保存专辑id
        this.getsongAlbumID(this.tempID);
        this.playerListRender(list);

        this.StartPlayStateEvent(true);
        this.audioUrl = this.SongSrcObj[list.audioId];
        this.isShowStatus = list.audioId;

        this.$store.commit("modifyShowGit", this.isShowStatus);

        this.initSongName = list.songName;
        this.bgImageUrl = list.imageUrl;
        this.typeIndex = list.type;
        this.sName = list.initSonger;
        this.cSonger = list.curSonger;
        this.dealYearEvent(list.publishTime);
        this.preventContinueClick = list.audioId;
        this.changeBgUrlState(0);
        this.getdeliveryId(list.audioId);
        this.getSingleSongMessage({
          ...list,
          audioUrl: this.audioUrl,
          JudgeAlbumId: this.tempID,
        });
        this.modifyPlayerState(true);
        localStorage.singleSongMessage = JSON.stringify({
          ...list,
          audioUrl: this.audioUrl,
          JudgeAlbumId: this.tempID,
        });

        this.changeCurrentState(true);
        // console.log(list);
      }
      // console.log("方法=>", this.$refs.playerMusic.src);
    },

    //获取单首歌曲信息
    ...mapMutations([
      "getSingleSongMessage",
      "modifyPlayerState",
      "getSingleId",
      "changeBgUrlState",
      "changeCurrentState",
      "getMoreMessage",
      "hideAndShowPlayer",
      "modifyEmptyValue",
      "StartPlayStateEvent",
      "getsongAlbumID",
    ]),

    //处理页面信息的渲染
    dealPartPageMessage() {
      let curStorage = JSON.parse(localStorage.singleSongMessage);
      this.dealYearEvent(curStorage.publishTime);
      this.initSongName = curStorage.songName;
      this.bgImageUrl = curStorage.imageUrl;
      this.typeIndex = curStorage.type;
      this.sName = curStorage.initSonger;
      this.cSonger = curStorage.curSonger;
    },

    //传送歌曲id
    ...mapActions(["getdeliveryId", "getAllSongList"]),

    //处理歌曲时间
    dealPlayMusicTime(time) {
      let minute = parseInt(time / 60 / 1000);
      let second = parseInt(time % 60);
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;

      return minute + ":" + second;
    },

    //处理年份
    dealYearEvent(t) {
      this.initYear = new Date(t).getFullYear();
    },

    //播放器那边的列表渲染情况
    playerListRender(tobj) {
      let Cid = this.songAlbumID;
      if (!localStorage.listExistSongDate) {
        let obj = {};
        obj[Cid] = this.songListArr;
        localStorage.listExistSongDate = JSON.stringify(obj);
        // console.log("1------");
        let o = {};
        o[Cid] = true;
        localStorage.storageJudge = JSON.stringify(o);
      } else {
        let curSt = JSON.parse(localStorage.listExistSongDate);
        // console.log("2------");
        // console.log(curSt);

        if (curSt[Cid]) {
          // console.log("3------");
          if (localStorage.dealAudioIdObj) {
            // console.log("4------");
            let n = JSON.parse(localStorage.dealAudioIdObj);
            let findEm = n[Cid]?.find((it) => it == tobj.audioId);
            // console.log("red=>",findEm);
            if (findEm) {
              // console.log("5------");
              curSt[Cid].push(tobj);
              localStorage.listExistSongDate = JSON.stringify(curSt);
              n[Cid] = n[Cid].filter((it) => {
                return it != findEm;
              });
              localStorage.dealAudioIdObj = JSON.stringify(n);
            }
          } else {
            // console.log("6------", curSt[Cid], this.songListArr);
            if (curSt[Cid].length < this.songListArr.length) {
              curSt[Cid].push(tobj);
              localStorage.listExistSongDate = JSON.stringify(curSt);
            }
          }
        } else {
          let ob = JSON.parse(localStorage.storageJudge);
          // console.log("是否进入此处", localStorage.dealAudioIdObj);

          // console.log("7------");
          if (ob[Cid]) {
            curSt[Cid] = this.songListArr;
            localStorage.listExistSongDate = JSON.stringify(curSt);
          } else {
            // console.log("8------");
            if (typeof ob[Cid] == "undefined") {
              curSt[Cid] = this.songListArr;
              localStorage.listExistSongDate = JSON.stringify(curSt);
              // console.log("9------");
            } else {
              let dealobj = JSON.parse(localStorage.dealAudioIdObj);
              // console.log("10------");
              curSt[Cid] = [tobj];
              localStorage.listExistSongDate = JSON.stringify(curSt);
              if (dealobj[Cid]) {
                dealobj[Cid] = dealobj[Cid].filter((it) => {
                  return it != tobj.audioId;
                });
                localStorage.dealAudioIdObj = JSON.stringify(dealobj);
              }
            }
          }
        }
      }
    },

    //点击播放全部歌曲
    // playAllSong() {
    //   let currS = JSON.parse(localStorage.allSongList);
    //   if (localStorage.singleSongMessage) {
    //     let singleS = JSON.parse(localStorage.singleSongMessage);
    //     let finds = currS.findIndex((it) => it.audioId == singleS.audioId);
    //     if (finds != -1) {
    //       if (!this.isPlayAllSong) {
    //         this.$store.commit("getCurrentSongCount", finds);
    //         this.$store.commit("PlayAllSongStatus", true);
    //       }
    //     } else {
    //       // this.playMusicEvent(this.songListArr[0]);
    //       this.$store.commit("getCurrentSongCount", 0);
    //     }
    //   } else {
    //     this.$store.commit("PlayAllSongStatus", true);
    //   }
    // },



    //存储相关收藏的专辑或歌单数据
    collectMessageEvent() {
      let cJudge = this.$route.params.id.slice(0, 9);
      // console.log("test=>",cJudge)
      if (cJudge != "recommend") {
        let aId = this.$route.params.id;
        if (localStorage.JudgeId) {
          let jd = JSON.parse(localStorage.JudgeId);
          let findId = jd.findIndex((it) => it == aId);
          if (findId != -1) {
            this.isCollectData = true;
            // 分享面板的开头
            this.dotOptionsActiveEvent(1);
            //分享面板的结尾
            jd = jd.filter((it) => {
              return it != aId;
            });
            localStorage.JudgeId = JSON.stringify(jd);
            let cS = JSON.parse(localStorage.AlbumCollection);
            cS = cS.filter((its) => {
              return its.albumsId != aId;
            });
            localStorage.AlbumCollection = JSON.stringify(cS);
          } else {
            this.isCollectData = false;
            // 分享面板的开头
            this.dotOptionsActiveEvent(0);
            //分享面板的结尾
            jd.push(aId);
            localStorage.JudgeId = JSON.stringify(jd);
            //存储专辑数据
            let cStorage = JSON.parse(localStorage.AlbumCollection);
            cStorage.push(this.AlbumCollection);
            // console.log("lsadjfl", this.AlbumCollection);
            localStorage.AlbumCollection = JSON.stringify(cStorage);
          }
        } else {
          this.dotOptionsActiveEvent(0);
          this.isCollectData = false;
          localStorage.JudgeId = JSON.stringify([aId]);
          localStorage.AlbumCollection = JSON.stringify([this.AlbumCollection]);
        }
        this.CollectDataState(aId);
      } else {
        let aId = this.$route.params.id.slice(9);
        if (localStorage.JudgeSid) {
          let jd = JSON.parse(localStorage.JudgeSid);
          let findId = jd.findIndex((it) => it == aId);
          if (findId != -1) {
            this.isCollectData = true;
            // 分享面板的开头
            this.dotOptionsActiveEvent(1);
            //分享面板的结尾
            jd = jd.filter((it) => {
              return it != aId;
            });
            localStorage.JudgeSid = JSON.stringify(jd);
            let cS = JSON.parse(localStorage.songCollection);

            cS = cS.filter((its) => {
              return its.rId != aId;
            });
            localStorage.songCollection = JSON.stringify(cS);
          } else {
            this.isCollectData = false;
            // 分享面板的开头
            this.dotOptionsActiveEvent(0);
            //分享面板的结尾
            jd.push(aId);
            localStorage.JudgeSid = JSON.stringify(jd);
            //存储歌单数据
            let cStorage = JSON.parse(localStorage.songCollection);
            cStorage.push(this.songCollection);
            localStorage.songCollection = JSON.stringify(cStorage);
          }
        } else {
          this.isCollectData = false;
          localStorage.JudgeSid = JSON.stringify([aId]);
          localStorage.songCollection = JSON.stringify([this.songCollection]);
        }
        this.CollectDataState(aId);
      }
      this.$store.commit("requireCollectState", this.isCollectData);
      // console.log(this.isCollectData);
    },
    //进来初步渲染收藏状态
    renderCollectData(id) {
      if (localStorage.CollectState) {
        let fd = JSON.parse(localStorage.CollectState);
        if (fd[id] == false) {
          this.isCollectData = fd[id];
          this.dotOptions = this.dotOptions.map((it) => {
            if (it.name == "收藏专辑") {
              return {
                ...it,
                icon: require("../assets/image/collect-light.png"),
              };
            } else {
              return it;
            }
          });
        } else {
          this.dotOptions = this.dotOptions.map((it) => {
            if (it.name == "收藏专辑") {
              return {
                ...it,
                icon: require("../assets/image/collect-dark.png"),
              };
            } else {
              return it;
            }
          });
        }
      }
      this.$store.commit("requireCollectState", this.isCollectData);
    },
    //isCollectData的变化
    CollectDataState(cid) {
      if (localStorage.CollectState) {
        let st = JSON.parse(localStorage.CollectState);
        st[cid] = this.isCollectData;
        localStorage.CollectState = JSON.stringify(st);
      } else {
        let obj = {};
        obj[cid] = this.isCollectData;
        localStorage.CollectState = JSON.stringify(obj);
      }
    },
    dotOptionsActiveEvent(value) {
      if (value == 1) {
        this.dotOptions = this.dotOptions.map((it) => {
          if (it.name == "收藏专辑") {
            return {
              ...it,
              icon: require("../assets/image/collect-dark.png"),
            };
          } else {
            return it;
          }
        });
      } else {
        this.dotOptions = this.dotOptions.map((it) => {
          if (it.name == "收藏专辑") {
            return {
              ...it,
              icon: require("../assets/image/collect-light.png"),
            };
          } else {
            return it;
          }
        });
      }
    },
    dotSelectActiveEvent(value) {
      if (value == 1) {
        this.dotSelect = this.dotSelect.map((it) => {
          if (it.name == "收藏歌曲") {
            return {
              ...it,
              icon: require("../assets/image/collect-dark.png"),
            };
          } else {
            return it;
          }
        });
      } else {
        this.dotSelect = this.dotSelect.map((it) => {
          if (it.name == "收藏歌曲") {
            return {
              ...it,
              icon: require("../assets/image/collect-light.png"),
            };
          } else {
            return it;
          }
        });
      }
    },
    vantSecondEvent(e) {
      if (e.name == "收藏专辑") {
        this.collectMessageEvent();
      }
    },
    vantThreeEvent(e) {
      let sgId = this.currentClickSong;
      if (e.name == "收藏歌曲") {
        if (localStorage.SingleSongCollection) {
          let curSingle = JSON.parse(localStorage.SingleSongCollection);
          let findTarget = curSingle.findIndex(
            (it) => it.audioId == sgId.audioId
          );
          if (findTarget != -1) {
            curSingle = curSingle.filter((its) => {
              return its.audioId != sgId.audioId;
            });
            localStorage.SingleSongCollection = JSON.stringify(curSingle);
            this.dotSelectActiveEvent(1);
          } else {
            curSingle.push(sgId);
            localStorage.SingleSongCollection = JSON.stringify(curSingle);
            this.dotSelectActiveEvent(0);
          }
        } else {
          localStorage.SingleSongCollection = JSON.stringify([sgId]);
          this.dotSelectActiveEvent(0);
        }
        // console.log(e.icon, this.currentClickSong);
      }
    },
  },
  computed: {
    ...mapState([
      "SongSrcObj",
      "changeBgUrl",
      "playerState",
      "isChangeState",
      "songAlbumID",
      "singleSongObj",
      "AlbumCollection",
      "songCollection",
      "isPlayAllSong",
    ]),
  },
  watch: {
    playerState() {
      //保存专辑id
      if (this.playerState) {
        if (localStorage.singleSongMessage) {
          let cs = JSON.parse(localStorage.singleSongMessage);
          this.getsongAlbumID(cs.JudgeAlbumId);
        } else {
          this.getsongAlbumID(this.tempID);
        }
        this.playerListRender(this.singleSongObj);
        // console.log(this.singleSongObj);
        // console.log(this.tempID);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-album-list {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 38;
  background: rgb(18, 17, 17);

  .home-album-header {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 33;

    .album-header-left {
      width: 30px;
      height: 50px;
      line-height: 50px;
      text-align: center;

      .icon-arrow-left {
        font-size: 25px;
        color: #fff;
      }
    }

    .album-header-center {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    .album-header-right {
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

  .home-album-body {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    background: rgb(18, 17, 17);
    &::-webkit-scrollbar {
      width: 0px;
    }

    .album-body-detail {
      position: relative;
      height: 340px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      z-index: 1;

      &::before {
        position: absolute;
        content: "";
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        z-index: 3;
        backdrop-filter: blur(16px);
      }

      .album-body-content {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 100px;
        bottom: -1px;
        padding: 0px 20px;
        background: linear-gradient(transparent 80%, rgb(18, 17, 17) 97%);
        z-index: 6;

        .album-body-song-name {
          color: #fff;
          height: 30px;
          line-height: 30px;
          margin-bottom: 20px;
        }

        .album-body-pircture-area {
          display: flex;
          height: 120px;

          .album-body-song-img {
            width: 120px;
            height: 120px;
            margin-right: 10px;
            border-radius: 5px;
            overflow: hidden;
          }

          .album-body-song-detail {
            flex: 1;
            height: 120px;

            .album-body-song-decoration {
              height: 90px;

              .album-body-songer-name {
                font-size: 14px;
                color: #fff;
                height: 30px;
                line-height: 30px;
              }

              .album-body-publish-time,
              .album-body-pin,
              .album-body-type {
                display: flex;
                height: 20px;
                line-height: 20px;
                font-size: 13px;
                color: #ccc;
              }
              .album-text {
                width: 60px;
                text-align-last: justify;
                margin-right: 3px;
                color: #ccc;
              }
              .album-cnt {
                color: #fff;
                margin-left: 3px;
              }
            }
            .album-song-message {
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              color: rgb(204, 143, 63);
              text-align: right;
            }
          }
        }

        .album-body-select {
          display: flex;
          align-items: center;
          margin-top: 30px;
          justify-content: space-around;
          color: #fff;
          padding-bottom: 16px;
          border-bottom: 1px solid #ccc;

          .icon-download,
          .icon-fenxiang {
            font-size: 23px;
          }
          .icon-collection-tag,
          .icon-shoucang {
            font-size: 20px;
          }
          .icon-shoucang {
            color: #e4393c;
          }

          .album-download,
          .album-collection,
          .album-share {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .home-song-list {
      padding: 0px 20px;
      .home-song-list-header {
        display: flex;
        align-items: center;
        height: 50px;

        .song-list-player {
          width: 25px;
          height: 25px;
          margin-right: 5px;
          border-radius: 999px;
          background-image: url("../assets/image/player-play.png");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .song-list-text {
          font-size: 14px;
          color: #fff;
        }
      }
      .home-song-list-detail {
        // background: red;
        .home-song-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0px;
          height: 40px;

          .song-list-sequence {
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            margin-right: 10px;
            color: #aaa;
          }

          .song-list-play-status {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            margin-right: 10px;
            img {
              display: block;
              width: 20px;
              height: 20px;
            }
          }

          .song-list-des-text {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .song-list-song-name {
              box-sizing: border-box;
              width: 160px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 14px;
              color: #fff;
              height: 30px;
              line-height: 30px;
            }
            .song-list-songer {
              height: 10px;
              line-height: 10px;
              color: #aaa;
              font-size: 13px;
            }

            .song-list-right {
              font-size: 13px;
              color: #aaa;
              margin-right: 10px;
            }
          }

          .song-list-share {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;

            .icon-qita {
              font-size: 20px;
              color: #555;
            }
          }
        }
      }
    }
  }

  .van-load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 88;
  }
}

.move-leave-to {
  transform: translateX(100%);
}

.move-leave-active {
  transition: all 0.3s linear;
}

.move-leave {
  transform: translateX(0px);
}
</style>