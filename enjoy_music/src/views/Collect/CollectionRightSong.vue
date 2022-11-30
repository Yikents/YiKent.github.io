<template>
  <div class="collection-right-song">
    <div class="collection-right-song-header">
      <div class="cancel" @click="goback">取消</div>
      <div class="newsong">新建歌单</div>
      <div class="submit" @click="submitEvent">提交</div>
    </div>
    <div class="collection-right-song-body">
      <div class="input">
        <input type="text" placeholder="输入歌单标题" ref="titleName" />
      </div>
      <div class="checkbox">
        <input class="check" type="checkbox" />
        <span>设为隐私歌单</span>
        <span class="num">0/40</span>
      </div>
      <div class="biginput">
        <textarea class="textinput" type="text" placeholder="添加描述" ref="areaText">
        </textarea>
      </div>
      <div class="check-word-number"><span>0</span>/<span>100</span></div>
      <div class="check-add-music" @click="jumpToAddSongPage">
        <div class="add-music-icon">
          <span class="iconfont icon-add"></span>
        </div>
        <div class="add-music-text">添加音乐</div>
      </div>
      <div class="check-add-list">
        <div
          class="check-add-list-item"
          v-for="(item ,index) in renderData"
          :key="index"
        >
          <div class="list-item-left" @click="deleteCurrentData(item)"></div>
          <div class="list-item-center">
            <div class="item-center-title">{{ item.title }}</div>
            <div class="item-center-songer">{{ item.songer }}</div>
          </div>
        </div>
      </div>
    </div>

    <transition name="move">
      <CollectionAddSong
        @jumpToAddSongPage="jumpToAddSongPage"
        v-if="isShowPage"
      />
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CollectionAddSong from "./CollectionAddSong.vue";
export default {
  data() {
    return {
      isShowPage: false,
      renderData: []
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    jumpToAddSongPage() {
      this.isShowPage = !this.isShowPage;
    },
    dealCurrentData() {
      this.renderData=[];
      this.renderData = this.buildSelftSong;
      this.renderData = this.renderData.map((it) => {
        return {
          id: it.audioId ? it.audioId : it.albumsId,
          title: it.songName ? it.songName : it.albumsName,
          songer: it.initSonger ? it.initSonger : it.albumsArtist,
          ...it
        };
      });
    },
    deleteCurrentData(obj){
      this.$store.commit('deletBuildSelftSong',obj);
      this.dealCurrentData();
    },
    submitEvent(){
      let titleName=this.$refs.titleName.value
      let des=this.$refs.areaText.value;
      if(titleName&&des){
        this.$store.commit('getMessageContainer',{
         titleName,
         des,
         arr:this.renderData
        });
         this.$store.commit('clearEmptyArr');
         this.renderData=[];
         this.$refs.titleName.value='';
         this.$refs.areaText.value='';
         this.goback();
      }else{
        this.$toast('输入框不能为空');
      }
    },
  },
  computed: {
    ...mapState(["buildSelftSong", "isAddSongStatus"]),
  },
  watch: {
    isAddSongStatus() {
      if (this.isAddSongStatus) {
        this.dealCurrentData();
        this.$store.commit("getAddSongStatus", false);
      }
    },
  },
  components: { CollectionAddSong },
};
</script>


<style lang="scss" scoped>
.collection-right-song {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #fff;
  z-index: 66;
  .collection-right-song-header {
    width: 100vw;
    height: 50px;
    text-align: center;
    line-height: 50px;
    display: flex;
    box-shadow: 1px 0 10px #ddd;
    .cancel {
      width: 25vw;
      font-size: 14px;
      color: #777;
    }
    .newsong {
      width: 50vw;
      font-size: 18px;
      font-weight: bold;
    }
    .submit {
      width: 25vw;
      font-size: 14px;
      color: #777;
    }
  }
  .collection-right-song-body {
    width: 100vw;
    padding: 30px 20px;
    .input {
      width: 100vw;
      input {
        width: 85vw;
        padding: 10px;
        border: 0px;
        border-bottom: 1px solid #ccc;
        &::placeholder {
          color: #ccc;
          font-size: 15px;
        }
      }
    }
    .checkbox {
      width: 90vw;
      height: 20px;
      padding: 10px;

      .check {
        margin: 0px;
        margin-top: 5px;
      }
      span {
        padding: 10px;
        font-size: 15px;
        color: #ccc;
      }
      .num {
        padding-left: 160px;
      }
    }
    .biginput {
      box-sizing: border-box;
      margin-top: 60px;
      width: calc(100% - 40px);
      border-bottom: 1px solid #ccc;
    }
    .textinput {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      background: none;
      border: none;
      padding: 0px;
      &::placeholder {
        color: #ccc;
        font-size: 15px;
      }
    }
    .check-word-number {
      width: calc(100% - 40px);
      height: 40px;
      line-height: 40px;
      text-align: right;
      font-size: 14px;
      color: #777;
    }
    .check-add-music {
      width: 120px;
      display: flex;
      align-items: center;
    }
    .add-music-icon {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-right: 10px;

      .icon-add {
        font-size: 20px;
      }
    }
    .check-add-list {
      width: calc(100% - 40px);

      .check-add-list-item {
        display: flex;
        align-items: center;
        height: 60px;

        .list-item-left {
          width: 30px;
          height: 30px;
          margin-right: 5px;
          background-image: url("../../assets/image/delete.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .list-item-center {
          flex: 1;
          height: 60px;
          .item-center-title {
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            font-weight: bold;
          }
          .item-center-songer {
            font-size: 14px;
            color: #777;
          }
        }
      }
    }
  }
  .move-enter,
  .move-leave-to {
    transform: translateX(100%);
  }
  .move-enter-active,
  .move-leave-active {
    transition: all 0.3s linear;
  }
  .move-enter-to,
  .move-leave {
    transform: translateX(0px);
  }
}
</style>