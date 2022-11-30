<template>
  <div class="recordsaying">
    <transition name="move">
      <router-view
        :item="currentItem"
        :index="ind"
        :temper="temper"
        :userN="userN"
        @changeObjectData="changeObjectData"
        @changeStorageLength="changeStorageLength"
      />
    </transition>
    <div class="recordsaying-header">
      <div class="recordsaying-header-text">动态</div>
      <div class="recordsaying-header-img" @click="ShowMonologuePage">
        <img src="../../assets/image/user-icon/user_icon_feedback.png" alt="" />
      </div>
    </div>
    <div class="recordsaying-body-main">
      <div
        class="recordsaying-body-content"
        v-for="(items, index) in DynamicArr"
        :key="items.id"
      >
        <div class="recordsaying-body-header">
          <div class="body-header-logo" v-if="!items.isCan">
            <img :src="items.headimage ? secondUrl[index] : secondUrl[7]" />
          </div>
          <!-- 后面发布独白开头 -->
          <div class="body-header-logo hig" :style="{backgroundImage:`url(${items.headimage})`}" v-if="items.isCan">
          </div>
          <!-- 后面发布独白结束 -->
          <div class="body-header-items" @click="JumpRouter(items, index)">
            <div class="body-header-text">{{ items.username }}</div>
            <div class="body-header-times">
              <span>{{ items.timeline }}</span>
            </div>
          </div>
        </div>
        <div class="recordsaying-body-image" @click="showPicture(index)" v-if="!items.isCan">
          <img
            :src="mainSrc[index] ? mainSrc[index] : null"
            v-if="mainSrc[index]"
          />
        </div>
        <!-- 后面发布独白开头 -->
        <div class="recordsaying-body-image" @click="showPicture(index,items.isCan,items.mainImage)" v-if="items.isCan">
          <img
            :src="items.mainImage?items.mainImage:null"
            v-if="items.mainImage"
          />
        </div>
         <!-- 后面发布独白结束 -->
        <!-- 预览照片 -->
        <div class="body-header-img-lay" v-if="isShowLay">
          <div class="body-lay-header" v-show="!isShowHeader">
            <div class="lay-header-left">
              <div class="lay-header-arrow" @click="showElement">
                <span class="iconfont icon-zuojiantou"></span>
              </div>
              <div class="lay-header-text">图片</div>
            </div>
            <div class="lay-header-right">
              <a
                :href="mainSrc[showCt] ? mainSrc[showCt] : null"
                download="pircture.jpg"  v-if="!Caning"
              >
                <span class="iconfont icon-download"></span
              ></a>

               <!-- 后面发布独白开头 -->
              <a
                :href="mImage ? mImage : null"
                download="pircture.jpg" v-if="Caning"
              >
                <span class="iconfont icon-download"></span
              ></a>
               <!-- 后面发布独白结束 -->

            </div>
          </div>
          <div class="body-lay-img" @click="isShowHeader = !isShowHeader">
            <div class="lay-ig" v-if="!Caning">
              <img :src="mainSrc[showCt] ? mainSrc[showCt] : null" />
            </div>
            <!-- 后面发布独白开头 -->
            <div class="lay-ig" v-if="Caning">
              <img :src="mImage ? mImage : null"/>
            
            </div>
             <!-- 后面发布独白结束 -->
          </div>
        </div>
        <!-- 预览结束 -->
        <div class="recordsaying-body-words" @click="JumpRouter(items, index)">
          {{ items.content }}
        </div>
        <div class="recordsaying-body-footer">
          <div class="body-footer-thumbs">
            <img
              :src="items.comp ? IGurl[0] : IGurl[1]"
              v-if="!items.refImageUrl"
            />
            <img :src="items.refImageUrl" v-if="items.refImageUrl" />
            <div class="touch-btn" @click="praiseAdd(items, $event)">
              {{ items.pmax }}
            </div>
          </div>
          <div class="body-footer-comment">
            <img src="../../assets/image/user-icon/comment.png" />
            <div class="comm" @click="commentWord(items, index)">评论</div>
            <div>{{ items.commentcount + items.tempCt }}</div>
          </div>
          <div class="cont-bar"></div>
        </div>
      </div>
    </div>

    <transition name="move">
      <MonologueView
        v-if="isShowMonologue"
        @ListenEventDy="ListenEventDy"
        :username="userN"
        :headimage="logoUrl"
      />
    </transition>

    <wd-loading class="load" size="26px" v-if="!isCurrentDy"></wd-loading>
  </div>
</template>


<script>
import { mainSrc, secondUrl } from "@/utils/DynamicUrl";
import MonologueView from "@/components/MonologueView.vue";
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      DynamicArr: [],
      mainSrc,
      secondUrl,
      isShowLay: false,
      showCt: 0,
      isShowHeader: false,
      currentItem: {},
      ind: 0,
      temper: false,
      isShowMonologue: false,
      isCurrentDy: false,
      comp: false,
      IGurl: [
        require("../../assets/image/user-icon/dz.png"),
        require("../../assets/image/user-icon/like.png"),
      ],
      userN: null,
      phoneValue: null,
      logoUrl: null,
      isPraise: true,
      Caning:null,
      mImage:null
    };
  },

  created() {
    this.getDynamicData = debounce(this.getDynamicData);
    this.getDynamicData();
    this.judgeLocalStorge();
  },

  methods: {
    getDynamicData() {
      this.$axios
        .get(
          "/shengcai/api/mobile/common/showFeedInfosByMeetid?userid=153225&meetid=1339&lang=0&moduletype=1&currentpage=1&maxresult=20"
        )
        .then(({ data }) => {
          this.DynamicArr = [...data.feedInfoList];
          this.updataMainPage();
          this.isCurrentDy = true;
          this.DynamicArr = this.DynamicArr.map((it) => {
            let tempCt = this.dealStorageData(it.id + this.userN);
            return { ...it, comp: this.comp, tempCt };
          });
          this.changePraiseStatus();
        });
    },
    showPicture(val,Caning,mImage) {
      this.showCt = val;
      this.isShowLay = true;
      if(Caning){
        this.Caning=Caning;
        this.mImage=mImage;
      }else{
        this.Caning=null;
        this.mImage=null
      }
    },
    showElement() {
      this.isShowLay = !this.isShowLay;
    },
    JumpRouter(val1, val2) {
      if (this.userN) {
        this.$router.push({ path: "/dynamic/dynamic-details" });
        this.currentItem = val1;
        this.ind = val2;
        this.temper = false;
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    commentWord(v1, v2) {
      if (this.userN) {
        this.temper = true;
        this.$router.push({ path: "/dynamic/dynamic-details" });
        this.currentItem = v1;
        this.ind = v2;
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    ListenEventDy() {
      this.isShowMonologue = false;
    },
    changeObjectData(obj) {
      let temp = [];
      this.DynamicArr.forEach((it) => {
        if (it.id == obj.id) {
          temp.push({ ...it, ...obj });
          // localStorage[it.id + "praise"] = JSON.stringify({
          //   count: obj.pmax,
          //   comp: obj.comp,
          // });
        } else {
          temp.push(it);
        }
      });
      this.DynamicArr = [...temp];
    },
    praiseAdd(items, e) {
      if (this.userN) {
        let touch = e.currentTarget.previousElementSibling;
        let currentSt = JSON.parse(
          localStorage[items.id + this.userN + "praise"] || null
        );
        let count = 0;
        let isjudge = false;
        if (currentSt?.comp) {
          count = currentSt.count;
          this.isPraise = false;
        } else {
          count = items.pmax;
          this.isPraise = true;
        }

        if (!items.comp && this.isPraise) {
          touch.src = require("../../assets/image/user-icon/dz.png");
          count++;
          isjudge = true;

          localStorage[items.id + this.userN + "praise"] = JSON.stringify({
            count,
            comp: true,
          });
        } else {
          touch.src = require("../../assets/image/user-icon/like.png");
          count--;
          isjudge = false;

          localStorage[items.id + this.userN + "praise"] = JSON.stringify({
            count,
            comp: false,
          });
        }

        this.DynamicArr = this.DynamicArr.map((it) => {
          if (it.id == items.id) {
            return { ...it, comp: isjudge, pmax: count };
          } else {
            return it;
          }
        });
      } else {
        this.$router.push({ path: "/login" });
      }
    },

    ShowMonologuePage() {
      if (this.userN) {
        this.isShowMonologue = !this.isShowMonologue;
      } else {
        this.$router.push({ path: "/login" });
      }
    },

    judgeLocalStorge() {
      for (let key in localStorage) {
        let reg = /[0-9]{11}/;
        let res = reg.test(key);
        if (res) {
          let ct = JSON.parse(localStorage[key]);
          if (ct.loginRun) {
            this.userN = ct.uName;
            this.phoneValue = ct.telephone;
            this.logoUrl = ct.logoUrl;
            break;
          }
        }
      }
    },

    dealStorageData(id) {
      if (localStorage[id]) {
        return JSON.parse(localStorage[id]).length;
      } else {
        return 0;
      }
    },

    changeStorageLength(obj) {
      this.DynamicArr = this.DynamicArr.map((it) => {
        if (it.id + this.userN == obj.id) {
          return {
            ...it,
            tempCt: obj.CN,
          };
        } else {
          return { ...it, tempCt: 0 };
        }
      });
    },

    changePraiseStatus() {
      this.DynamicArr = this.DynamicArr.map((it) => {
        if (localStorage[it.id + this.userN + "praise"]) {
          let c = JSON.parse(localStorage[it.id + this.userN + "praise"]);
          if (c.comp) {
            return {
              ...it,
              pmax: c.count,
              comp: true,
              refImageUrl: require("../../assets/image/user-icon/dz.png"),
            };
          } else {
            return it;
          }
        } else {
          return it;
        }
      });
    },

    updataMainPage() {
      if (localStorage.monologue) {
        let lg = JSON.parse(localStorage.monologue);
        this.DynamicArr = [...this.DynamicArr, ...lg];
      }
    },
  },

  components: {
    MonologueView,
  },
};
</script>


<style lang="scss" scoped>
.recordsaying {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #eee;

  .recordsaying-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: orange;
    background-color: #fff;
    text-align: center;
    z-index: 6;

    .recordsaying-header-text {
      flex: 1;
      margin-left: 13px;
    }

    .recordsaying-header-img {
      width: 30px;
      height: 30px;
      margin-right: 10px;

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .recordsaying-body-main {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding-top: 40px;
    padding-bottom: 100px;

    &::-webkit-scrollbar {
      width: 0px;
    }

    .recordsaying-body-content {
      width: 100%;
      margin-top: 10px;
      background: #fff;

      .recordsaying-body-header {
        display: flex;
        align-items: center;
        height: 55px;
        padding: 15px;

        .body-header-logo {
          width: 40px;
          height: 40px;
          margin-right: 7px;
          overflow: hidden;
          border-radius: 999px;

          img {
            display: block;
            width: 100%;
          }
        }

        .hig{
          background-size:cover;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .body-header-items {
          display: flex;
          flex-direction: column;
          justify-content: center;

          .body-header-text {
            font-size: 14px;
            margin-bottom: 5px;
          }

          .body-header-times {
            font-size: 13px;
            color: #777;
          }
        }
      }

      .recordsaying-body-image {
        box-sizing: border-box;
        margin: 0px 15px;
        width: calc(100% - 30px);
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 240px;
        }
      }

      .body-header-img-lay {
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        z-index: 888;
        background: black;

        .body-lay-header {
          display: flex;
          position: fixed;
          justify-content: space-between;
          left: 0px;
          right: 0px;
          height: 40px;

          .lay-header-left {
            display: flex;
            align-items: center;

            .lay-header-arrow {
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;

              .icon-zuojiantou {
                font-size: 23px;
                font-weight: bold;
                color: #777;
              }
            }
            .lay-header-text {
              color: #777;
              margin-left: 10px;
            }
          }

          .lay-header-right {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;

            a {
              text-decoration: none;
            }

            .icon-download {
              color: #777;
              font-size: 30px;
            }
          }
        }

        .body-lay-img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;

          .lay-ig {
            width: 100%;

            img {
              display: block;
              width: 100%;
            }
          }
        }
      }

      .recordsaying-body-words {
        margin: 0px 15px;
        line-height: 30px;
        font-size: 14px;
      }

      .recordsaying-body-footer {
        display: flex;
        position: relative;
        align-items: center;
        width: 100%;
        border-top: 1px solid #ccc;

        .body-footer-thumbs {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          font-size: 13px;
          color: #777;
          text-align: center;
          img {
            width: 16px;
            height: 16px;
          }
          .touch-btn {
            margin-left: 3px;
          }
        }
        .body-footer-comment {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          font-size: 13px;
          color: #777;
          text-align: center;

          img {
            width: 16px;
            height: 16px;
          }

          .comm {
            margin: 5px;
          }
        }
        .cont-bar {
          position: absolute;
          left: 0px;
          right: 0px;
          width: 1px;
          top: 0px;
          bottom: 0px;
          margin: auto;
          background: #ccc;
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
  transition: all 0.2s linear;
}
.move-enter-to,
.move-leave {
  transform: translateX(0px);
}

.load {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
}
</style>