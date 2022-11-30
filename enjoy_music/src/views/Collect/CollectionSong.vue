<template>
  <div class="collection-song">
    <div class="collection-song-empty" v-if="collectionSongArr.length == 0">
      <div class="song-empty-img"></div>
      <div class="song-empty-text">抱歉,还没有收藏内容</div>
    </div>
    <div class="collection-song-body" v-if="collectionSongArr.length != 0">
      <div class="collection-song-header">
        <div class="collection-song-left">
          <div class="collection-song-player"></div>
          <div class="collection-song-text">全部播放</div>
          <div class="collection-song-count">
            (共<span>{{ collectionSongArr.length }}</span
            >首)
          </div>
        </div>
        <div class="collection-song-right"></div>
      </div>
      <div class="collection-song-content">
        <div class="collection-song-list">
          <div
            class="collection-song-item"
            v-for="item in collectionSongArr"
            :key="item.audioId"
          >
            <div class="song-item-left">
              <div class="song-item-name">{{ item.songName }}</div>
              <div class="song-item-songer">{{ item.initSonger }}</div>
            </div>
            <div class="song-item-right">
              <div class="song-item-time">{{ dealTime(item.songerTime) }}</div>

              <div
                class="song-item-share"
                @click.self="showPopupEvent(item.audioId)"
              >
                <div class="popup-cancel" v-if="isShowPopup == item.audioId" @click.self="cancelCollectionEvent(item.audioId)">
                  取消收藏
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collectionSongArr: [],
      judgeState:"",
      isShowPopup: "",
    };
  },
  created() {
    this.renderCollectionData();
  },
  methods: {
    renderCollectionData() {
      if (localStorage.SingleSongCollection) {
        let currentStorage = JSON.parse(localStorage.SingleSongCollection);
        this.collectionSongArr = [...currentStorage];
      }
    },
    dealTime(time) {
      let minute = parseInt(time / 1000 / 60);
      let second = parseInt((time / 1000) % 60);
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return minute + ":" + second;
    },
    onSelect(action) {
      this.$toast(action.text);
    },
    showPopupEvent(id) {
      if(this.isShowPopup==id){
        this.isShowPopup = '';
      }else{
        this.isShowPopup=id;
      }
    },
    cancelCollectionEvent(id){
      let cSt=JSON.parse(localStorage.SingleSongCollection);
      cSt=cSt.filter(it=>it.audioId!=id);
      localStorage.SingleSongCollection=JSON.stringify(cSt);
      this.collectionSongArr=[...cSt];
      this.isShowPopup = '';
      // console.log(this.isShowPopup);
    }
  },
};
</script>
<style lang="scss" scoped>
.collection-song {
  .collection-song-empty {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .song-empty-img {
      width: 130px;
      height: 130px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../../assets/image/collection.png");
    }
    .song-empty-text {
      margin-top: 20px;
      color: #646566;
    }
  }
  .collection-song-body {
    width: 100vw;
    height: 100vh;
    // background:red;

    .collection-song-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 20px;
      height: 60px;

      .collection-song-left {
        display: flex;
        align-items: center;
        height: 30px;

        .collection-song-player {
          width: 26px;
          height: 26px;
          background-image: url("../../assets/image/player-play.png");
          background-size: cover;
          background-position: center center;
        }

        .collection-song-text {
          font-size: 13px;
          margin: 0px 10px 0px 5px;
        }

        .collection-song-count {
          font-size: 13px;
          color: #777;
        }
      }
      .collection-song-right {
        width: 23px;
        height: 23px;
        background-image: url("../../assets/image/gou.png");
        background-size: cover;
        background-position: center center;
      }
    }

    .collection-song-content {
      width: 100vw;
      height: 100vh;

      .collection-song-list {
        box-sizing: border-box;
        padding: 0px 20px;
        width: 100vw;
        height: 100vh;
        overflow: scroll;
        &::-webkit-scrollbar {
          width: 0px;
        }

        .collection-song-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .song-item-left {
            height: 60px;

            .song-item-name {
              width: 220px;
              height: 30px;
              line-height: 30px;
              font-size: 15px;
              font-weight: bold;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .song-item-songer {
              font-size: 13px;
              color: #777;
            }
          }

          .song-item-right {
            display: flex;
            align-items: center;
            .song-item-time {
              margin: 0px 20px;
              color: #777;
              font-size: 14px;
            }
            .song-item-share {
              position: relative;
              width: 30px;
              height: 20px;
              background-image: url("../../assets/image/collection-more.png");
              background-size: cover;
              background-position: center center;

              .popup-cancel {
                position: absolute;
                bottom: -38px;
                left: -23px;
                text-align: center;
                width: 66px;
                height: 30px;
                line-height: 30px;
                font-size: 13px;
                border-radius: 3px;
                background: #fff;
                border: 1px solid #ccc;
                z-index: 1;
                color: #777;

                &::before {
                  position: absolute;
                  display: block;
                  content: "";
                  top: -16px;
                  left: 30px;
                  border-width: 8px;
                  border-color: transparent transparent #ccc transparent;
                  border-style: solid;
                  z-index: 2;
                }
                &::after {
                  position: absolute;
                  display: block;
                  content: "";
                  top: -12px;
                  left: 32px;
                  border-width: 6px;
                  border-color: transparent transparent #fff transparent;
                  border-style: solid;
                  z-index: 3;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>