<template>
  <div class="collection-select-menu">
    <div class="collection-select-header">
      <div class="collection-select-arrow" @click="jumpBackPage">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="collection-select-title">{{ acceptData.text }}</div>
      <div class="collection-select-right" @click="jumpBackRightSong">完成</div>
    </div>
    <div class="collection-select-body">
      <div
        class="collection-select-content"
        v-if="renderSelectData.length == 0"
      >
        <div class="collection-select-img"></div>
        <div class="select-body-text">抱歉,还没有相关内容</div>
      </div>
      <div
        class="collection-select-list"
        v-if="acceptData.type != 'currentAlbum'"
      >
        <div
          class="collection-select-item"
          v-for="(items,index) in renderSelectData"
          :key="items.audioId"
        >
          <div
            class="collection-select-left"
            v-if="acceptData.type == 'currentSong'"
          >
            <div class="select-left-song">{{ items.songName }}</div>
            <div class="select-left-songer">{{ items.initSonger }}</div>
          </div>

          <div
            class="collection-select-current"
            v-if="acceptData.type == 'currentPlay'"
          >
            <div class="select-current-song">
              {{ items.songName }}/{{ items.initSonger }}
            </div>
            <div class="select-current-songer">{{ items.time }}前</div>
          </div>

          <div class="collection-select-box" @click="changeStatus(index,items.audioId,items)">
            <van-checkbox v-model="checked[index][items.audioId]"></van-checkbox>
          </div>
        </div>
      </div>

      <div
        class="collection-select-album"
        v-if="acceptData.type == 'currentAlbum'"
      >
        <div
          class="collection-select-container"
          v-for="(item,index) in renderSelectData"
          :key="item.audioId"
        >
          <div class="collection-select-img"><img :src="item.imgUrl" /></div>
          <div class="collection-select-center">
            <div class="select-center-song">
              {{ item.albumsName || item.songerName || item.songName }}
            </div>
            <div class="select-center-publish" v-if="item.publishTime">
              <span>发行时间: </span><span>{{ item.publishTime }}年</span>
            </div>
          </div>
          <div class="collection-select-check" @click="changeStatus(index,item.audioId,item)">
            <van-checkbox v-model="checked[index][item.audioId]"></van-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["acceptData"],
  data() {
    return {
      checked: [],
      renderSelectData: [],
    };
  },
  created() {
    this.acceptData.type == "currentAlbum"
      ? this.renderCollectData()
      : this.acceptData.type == "currentSong"
      ? this.renderSongData()
      : this.acceptData.type == "currentPlay"
      ? this.renderHistoryData()
      : "";
      this.initeState(this.renderSelectData);
  },
  methods: {
    jumpBackPage() {
      this.$emit("SelectPageEvent");
    },
    renderCollectData() {
      if (localStorage.AlbumCollection) {
        let currentStorage = JSON.parse(localStorage.AlbumCollection);
        this.renderSelectData = [...currentStorage];
      }
    },
    renderSongData() {
      if (localStorage.SingleSongCollection) {
        let currentStorage = JSON.parse(localStorage.SingleSongCollection);
        this.renderSelectData = [...currentStorage];
      }
    },
    renderHistoryData() {
      if (localStorage.historyRecord) {
        let currentStorage = JSON.parse(localStorage.historyRecord);
        currentStorage = currentStorage.map((it) => {
          return {
            ...it,
            time: this.dealTimeEvent(it.time),
          };
        });
        this.renderSelectData = [...currentStorage];
      }
    },
    dealTimeEvent(time) {
      let curDate = +new Date();
      let differTime = curDate - time;
      let day = parseInt(differTime / 1000 / 60 / 60 / 24);
      let hour = parseInt((differTime / 1000 / 60 / 60) % 24);
      let minute = parseInt((differTime / 1000 / 60) % 60);
      let second = parseInt((differTime / 1000) % 60);
      return day != 0
        ? day + "天" + hour + "时" + minute + "分"
        : hour != 0
        ? hour + "时" + minute + "分"
        : minute!=0?minute + "分":second+'秒';
    },
    changeStatus(index,id,item){
        let temper=this.checked[index];
        if(temper){
            if(temper[id]){
                temper[id]=false;
            }else{
                this.$store.commit('getBuildSelftSong',item);
                temper[id]=true;
                }
        }else{
            let o={};
            o[id]=true;
            temper.push(o);

        }
    },
    initeState(arr){
        this.checked=[];
        if(arr.length>0){
            arr.forEach(ele => {
                let o={};
                o[ele.audioId]=false;
                this.checked.push(o);
            });
        }
      
    },
    jumpBackRightSong(){
         this.$emit("backPageEvent");
         this.$store.commit('getAddSongStatus',true);
    }
  },
};
</script>
<style lang="scss" scoped>
.collection-select-menu {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;

  .collection-select-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background: #fff;
    box-shadow: 0px 1px 2px 0px #777;

    .collection-select-arrow {
      width: 30px;
      height: 50px;
      line-height: 50px;
      text-align: center;

      .icon-arrow-left {
        font-size: 20px;
      }
    }

    .collection-select-right {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 15px;
    }
  }
  .collection-select-body {
    width: 100vw;
    height: 100vh;
    background: #fff;
    .collection-select-content {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .collection-select-img {
        width: 130px;
        height: 130px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("../../assets/image/collection.png");
      }
      .select-body-text {
        margin-top: 20px;
        color: #646566;
      }
    }

    .collection-select-list {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 20px;

      .collection-select-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .collection-select-left {
          height: 60px;

          .select-left-song {
            width: 280px;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 30px;
            font-size: 15px;
            font-weight: bold;
          }
          .select-left-songer {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #777;
          }
        }

        .collection-select-current {
          height: 60px;

          .select-current-song {
            width: 280px;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 30px;
            font-size: 15px;
            font-weight: bold;
          }
          .select-current-songer {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #777;
          }
        }
      }
    }

    .collection-select-album {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 20px;

      .collection-select-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        .collection-select-img {
          width: 60px;
          height: 60px;
          margin-right: 10px;
          border-radius: 6px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
          }
        }

        .collection-select-center {
          flex: 1;
          height: 60px;

          .select-center-song {
            width: 200px;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 30px;
            font-size: 15px;
            font-weight: bold;
          }
          .select-center-publish {
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            color: #aaa;
          }
        }
      }
    }
  }
}
</style>