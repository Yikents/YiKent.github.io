<template>
  <div class="dynamic-details">
    <div class="dynamic-details-header">
      <div class="dynamic-details-header-arrow" @click="JumpRouter">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="dynamic-details-header-text">详情</div>
    </div>
    <div class="dynamic-details-body">
      <div class="dynamic-body-content">
        <div class="dynamic-body-header">
          <div class="body-header-logo" v-if="!item.isCan">
            <img :src="item.headimage ? secondUrl[index] : secondUrl[7]" />
          </div>
          <!-- 后面发布独白开头 -->
          <div
            class="body-header-logo hig"
            :style="{ backgroundImage: `url(${item.headimage})` }"
            v-if="item.isCan"
          ></div>
          <!-- 后面发布独白结束 -->
          <div class="body-header-items">
            <div class="body-header-text">{{ item.username }}</div>
            <div class="body-header-times">
              <span>{{ item.timeline }}</span>
            </div>
          </div>
        </div>
        <div
          class="dynamic-body-image"
          @click="showPicture(index)"
          v-if="!item.isCan"
        >
          <img
            :src="mainSrc[index] ? mainSrc[index] : null"
            v-if="mainSrc[index]"
          />
        </div>
        <!-- 后面发布独白开头 -->
        <div
          class="dynamic-body-image"
          @click="showPicture(index,item.isCan,item.mainImage)"
          v-if="item.isCan"
        >
          <img
            :src="item.mainImage ? item.mainImage : null"
            v-if="item.mainImage"
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
                download="pircture.jpg" v-if="!Caning"
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
              <img :src="mImage ? mImage : null" />
            </div>
            <!-- 后面发布独白结束 -->
          </div>
        </div>
        <!-- 预览结束 -->
        <div class="dynamic-body-words">{{ item.content }}</div>
        <div class="dynamic-body-footer">
          <div class="body-footer-thumbs">
            <img
              :src="item.comp ? IGurl[0] : IGurl[1]"
              ref="touch"
              v-if="!refImageUrl"
            />
            <img :src="refImageUrl" ref="touch" v-if="refImageUrl" />
            <div class="touch-btn" @click="praiseAdd">
              {{ count }}
            </div>
          </div>
          <div class="body-footer-comment" @click="show = !show">
            <img src="../../assets/image/user-icon/comment.png" />

            <div class="comm">评论</div>

            <div>{{ item.commentcount + CN }}</div>
          </div>
          <div class="cont-bar"></div>
        </div>
        <!-- 评论区 -->
        <ul class="comment-area" v-if="isShowUl">
          <li
            class="comment-area-item"
            v-for="(it, index) in commentArr"
            :key="index"
          >
            <div class="user-ig">
              <div
                class="uig"
                :style="{ backgroundImage: `url(${loginImg})` }"
              ></div>
            </div>
            <div class="comment-area-context">
              <div class="comment-area-userName">{{ userN }}</div>
              <div class="comment-area-text">{{ it.Ctext }}</div>
              <div class="comment-area-foot">
                <div class="comment-area-time">{{ it.Ctime }}</div>
                <div class="comment-area-reply">
                  <img src="../../assets/image/user-icon/comment.png" />
                  <div class="com-rep">回复</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 结束评论 -->
      </div>
    </div>

    <wd-popup v-model="show" position="bottom" :style="{ height: '180px' }">
      <div class="dynamic-details-arrangement">
        <div class="dynamic-arrangement-header">
          <div class="arrangement-header-left" @click="show = !show">取消</div>
          <div class="arrangement-header-center">回帖</div>
          <div class="arrangement-header-right" @click="sendMessage">发送</div>
        </div>
        <div class="dynamic-arrangement-body">
          <textarea ref="iptText" placeholder="请输入评论内容"></textarea>
        </div>
      </div>
    </wd-popup>
  </div>
</template>

<script>
import { mainSrc, secondUrl } from "@/utils/DynamicUrl";
export default {
  name: "GoodNightSayingDynamicDetails",
  props: {
    item: Object,
    index: Number,
    temper: Boolean,
    userN: String,
  },
  data() {
    return {
      mainSrc,
      secondUrl,
      count: this.item.pmax,
      isShowLay: false,
      showCt: 0,
      isShowHeader: false,
      isPraise: this.item.comp,
      show: false,
      IGurl: [
        require("../../assets/image/user-icon/dz.png"),
        require("../../assets/image/user-icon/like.png"),
      ],
      commentArr: [],
      loginImg: null,
      phoneValue: null,
      isShowUl: false,
      CN: 0,
      refImageUrl: null,
    };
  },

  created() {
    this.show = this.temper;
    this.rendCommentData();
  },

  methods: {
    JumpRouter() {
      this.$router.replace({
        path: "/dynamic",
      });
      this.$emit("changeObjectData", {
        ...this.item,
        pmax: this.count,
        comp: this.isPraise,
        refImageUrl: this.refImageUrl,
      });
      this.$emit("changeStorageLength", {
        CN: this.CN,
        id: this.item.id + this.userN,
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
    praiseAdd() {
      if (!this.isPraise) {
        this.count++;
        this.$refs.touch.src = require("../../assets/image/user-icon/dz.png");
        this.isPraise = true;
        this.refImageUrl = require("../../assets/image/user-icon/dz.png");

        localStorage[this.item.id + this.userN + "praise"] = JSON.stringify({
          count: this.count,
          comp: true,
        });
      } else {
        this.count--;
        this.$refs.touch.src = require("../../assets/image/user-icon/like.png");
        this.isPraise = false;
        this.refImageUrl = null;

        localStorage[this.item.id + this.userN + "praise"] = JSON.stringify({
          count: this.count,
          comp: false,
        });
      }
    },
    sendMessage() {
      if (!this.$refs.iptText.value) {
        this.$toast({
          msg: "评论内容不能为空",
          duration: 3000,
          position: "bottom",
        });
      } else {
        let Cid = this.item.id + this.userN;
        let Ctext = this.$refs.iptText.value;
        let Ctime = this.dealCommentTime;

        for (let key in localStorage) {
          let reg = /[0-9]{11}/;
          let res = reg.test(key);
          if (res) {
            let ct = JSON.parse(localStorage[key]);
            if (ct.loginRun) {
              // this.userN = ct.uName;
              this.phoneValue = ct.telephone;
              this.loginImg = ct.logoUrl;
              break;
            }
          }
        }

        if (localStorage[Cid]) {
          let cStorage = JSON.parse(localStorage[Cid]);
          this.commentArr = cStorage;
          localStorage[Cid] = JSON.stringify([
            ...cStorage,
            {
              Ctext,
              Ctime,
              Cid,
              uName: this.userN,
            },
          ]);
          this.commentArr.push({
            Ctext,
            Ctime,
            Cid,
            uName: this.userN,
          });
        } else {
          localStorage[Cid] = JSON.stringify([
            {
              Ctext,
              Ctime,
              Cid,
              uName: this.userN,
            },
          ]);
          this.commentArr.push({
            Ctext,
            Ctime,
            Cid,
            uName: this.userN,
          });
        }

        this.CN = JSON.parse(localStorage[Cid]).length;
        this.show = !this.show;
        this.isShowUl = true;
        this.$refs.iptText.value = "";
      }
    },
    rendCommentData() {
      if (localStorage[this.item.id + this.userN]) {
        for (let key in localStorage) {
          let reg = /[0-9]{11}/;
          let res = reg.test(key);
          if (res) {
            let ct = JSON.parse(localStorage[key]);
            if (ct.loginRun) {
              // this.userN = ct.uName;
              this.phoneValue = ct.telephone;
              this.loginImg = ct.logoUrl;
              break;
            }
          }
        }

        let cStorage = JSON.parse(localStorage[this.item.id + this.userN]);
        this.CN = cStorage.length;
        this.commentArr = cStorage;
        this.isShowUl = true;
      } else {
        this.isShowUl = false;
      }
    },
  },
  computed: {
    dealCommentTime() {
      let currentTime = new Date();
      let year = currentTime.getFullYear();
      let month = currentTime.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = currentTime.getDate();
      day = day < 10 ? "0" + day : day;
      let hour = currentTime.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let Minutes = currentTime.getMinutes();
      Minutes = Minutes < 10 ? "0" + Minutes : Minutes;
      return `${year}-${month}-${day} ${hour}:${Minutes}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamic-details {
  position: fixed;
  left: 0px;
  right: 0px;
  height: 100vh;
  background: #eee;
  z-index: 900;

  .dynamic-details-header {
    display: flex;
    align-items: center;
    height: 40px;
    background: #fff;

    .dynamic-details-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .dynamic-details-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

  .dynamic-details-body {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    padding-bottom: 100px;

    &::-webkit-scrollbar {
      width: 0px;
    }

    .dynamic-body-content {
      width: 100%;
      margin-top: 10px;
      background: #fff;
      padding-bottom: 20px;

      .dynamic-body-header {
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

        .hig {
          background-size: cover;
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

      .dynamic-body-image {
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

      .dynamic-body-words {
        margin: 0px 15px;
        line-height: 30px;
        font-size: 14px;
      }

      .dynamic-body-footer {
        display: flex;
        position: relative;
        align-items: center;
        width: 100%;
        padding-bottom: 10px;
        border-top: 1px solid #ccc;
        border-bottom: 5px dashed #eee;

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
          height: 22px;
          top: 4px;
          margin: auto;
          background: #ccc;
        }
      }

      .comment-area {
        margin-top: 40px;
        .comment-area-item {
          display: flex;
          border-top: 1px solid rgba(204, 204, 204, 0.755);
          .user-ig {
            display: flex;
            justify-content: center;
            width: 60px;
            height: 60px;
            .uig {
              margin-top: 10px;
              width: 40px;
              height: 40px;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              overflow: hidden;
              border-radius: 999px;

              img {
                display: block;
                width: 100%;
              }
            }
          }
          .comment-area-context {
            flex: 1;
            .comment-area-userName {
              margin-top: 10px;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
            }
            .comment-area-text {
              line-height: 30px;
              margin-bottom: 10px;
              font-size: 15px;
            }
            .comment-area-foot {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;

              .comment-area-time {
                font-size: 13px;
                color: #777;
              }
              .comment-area-reply {
                display: flex;
                align-items: center;
                margin-right: 20px;
                img {
                  width: 20px;
                  height: 20px;
                  margin-right: 5px;
                }
                .com-rep {
                  font-size: 14px;
                  color: #999;
                }
              }
            }
          }
        }
      }
    }
  }
}
.dynamic-arrangement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: #ccc;

  .arrangement-header-left {
    color: #777;
    margin-left: 15px;
    font-size: 15px;
  }
  .arrangement-header-center {
    color: #333;
  }
  .arrangement-header-right {
    color: #777;
    margin-right: 15px;
    font-size: 15px;
  }
}
.dynamic-arrangement-body {
  box-sizing: border-box;
  width: 100%;
  height: 140;
  padding: 14px 0px;

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 110px;
    border: none;
    padding: 0px 15px;
    outline: none;
    color: #666;

    &::placeholder {
      font-size: 14px;
    }
  }
}
</style>