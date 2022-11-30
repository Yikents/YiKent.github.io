<template>
  <div class="AlbumDetails-box">
    <nav class="nav-bar">
      <div class="icon" @click="back()">
        <van-icon size="24" name="arrow-left" />
      </div>
      <div class="album-name">
        {{ this.AlbumDetailsData.album?.artistNames }}《{{
          this.AlbumDetailsData.album?.albumName
        }}》
      </div>
      <div class="share">
        <span is-link @click="showPopup">
          <van-icon size="24" name="share" />
        </span>
      </div>

      <!-- 分享弹框 -->
      <van-popup
        v-model="showShare"
        round
        position="bottom"
        :style="{ height: '30%' }"
      >
        <p class="title">分享</p>
        <van-grid>
          <van-grid-item icon="friends-o" text="好友" />
          <van-grid-item icon="envelop-o" text="私信" />
          <van-grid-item icon="label-o" text="复制链接" @click="doCopy()" />
        </van-grid>

        <div class="share-list">
          <div
            v-for="(item, index) in shareData"
            :key="index"
            class="share-item"
          >
            <div class="img">
              <img :src="item.url" />
            </div>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </van-popup>

      <!-- 购买专辑 -->
      <van-popup
        v-model="showSupport"
        round
        position="bottom"
        :style="{ height: '30%' }"
      >
        <div>
          <van-cell
            class="albumName"
            :title="this.AlbumDetailsData.album?.albumName"
          >
            <template #right-icon>
              <van-icon
                name="close"
                class="search-icon"
                size="25px"
                @click="HideSupport"
              />
            </template>
          </van-cell>

          <div class="price">
            <p>价格</p>
            <p class="pic">￥{{ this.AlbumDetailsData.product?.price }}</p>
          </div>

          <div class="num">
            <p>数量</p>
            <van-stepper v-model="value" integer min="1" max="10" />
          </div>

          <div class="payment-amount">
            <p>支付金额</p>
            <p class="pic">￥{{ this.pic }}</p>
          </div>

          <div class="payment-method">
            <div class="alipay" @click="PaymentSucceeded()">
              <img src="../../assets/image/recharge_channel_alipay.png" />
              <span>支付宝支付</span>
            </div>
            <div class="weChat" @click="PaymentSucceeded()">
              <van-icon name="wechat-pay" color="#fff" size="30px" />
              <span>微信支付</span>
            </div>
          </div>
        </div>
      </van-popup>
    </nav>

    <main>
      <!--   -->
      <div
        class="album-bg"
        :style="{
          backgroundImage: `url(${this.AlbumDetailsData.style?.bgImgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }"
      >
        <div class="layer">
          <div class="album-cover">
            <div class="bullet-chat-box">
              <span class="bullet-chat">弹幕</span>
              <van-switch
                class="switch"
                v-model="checked"
                active-color="#7b322b"
                inactive-color="#4a4e51"
                @click="showSwitch()"
                size="14"
              />
            </div>

            <div class="coverUrl">
              <img :src="this.AlbumDetailsData.album?.coverUrl" />
            </div>

            <div class="ArtistAndAlbumNames">
              <p class="albumName">
                {{ this.AlbumDetailsData.album?.albumName }}
              </p>
              <p class="artistNames">
                {{ this.AlbumDetailsData.album?.artistNames }}
                <van-icon name="arrow" size="14" />
              </p>
            </div>

            <div class="AlbumPic">
              <div class="picAndNum">
                <p class="pic">￥{{ this.AlbumDetailsData.product?.price }}</p>
                <p class="num">已售6666张专辑</p>
              </div>
              <div class="support" @click="ShowSupport" ref="support">立即支持</div>
            </div>

            <div class="interval"></div>

            <div class="tags">
              <span
                class="tags-item"
                v-for="(t, i) in this.AlbumDetailsData.product?.tags"
                :key="i"
              >
                <van-icon name="checked" color="#999" />
                {{ t }}
              </span>
            </div>

            <!-- 弹幕内容 -->
            <div class="bullet-wrap" v-show="checked">
              <div
                class="bullet-item"
                v-for="(item, index) in showingBullets"
                :key="index"
                :data-line="item.line"
              >
                {{ item.text }}
              </div>
            </div>
          </div>

          <div class="album-describe">
            <p class="album-describe-title">专辑详情</p>
            <div v-show="!showdescribe">
              <div
                v-for="(t, index) in dealAlbumData"
                :key="index"
                class="album-describe-item"
              >
                {{ t.resource }}
              </div>
              <div class="show-album-describe" @click="showAndHidedescribe">
                收起<van-icon name="arrow-up" />
              </div>
            </div>
            <div v-show="showdescribe">
              <div
                v-for="(t, index) in partAlbumData"
                :key="index"
                class="album-describe-item"
              >
                {{ t.resource }}
              </div>
              <div class="show-album-describe" @click="showAndHidedescribe">
                展示全部<van-icon name="arrow-down" />
              </div>
            </div>
          </div>

          <div class="short-video" v-show="showMv">
            <div
              class="mvCover"
              :style="{
                backgroundImage: `url(${this.AlbumDetailsData.product?.mvCoverUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }"
              v-show="playMv"
            >
              <div class="playIcon" @click="showPalyMv">
                <van-icon name="play-circle-o" size="50px" color="#fff" />
              </div>
              <p>{{ this.AlbumDetailsData.product?.mvTitle }}</p>
            </div>

            <div class="mvCover" v-show="!playMv">
              <video
                class="mv"
                ref="video"
                :src="this.AlbumDetailsData?.product?.mvPlayUrl"
                height="220px"
                controls
              ></video>
            </div>
          </div>

          <div class="comment">
            <div class="comment-titel">
              <van-divider content-position="left">精选评论</van-divider>
            </div>
            <div class="comment-list">
              <div
                class="comment-item"
                v-for="(item, index) in showingBullets"
                :key="index"
              >
                <div class="head-portrait">
                  <img :src="item.url" />
                </div>
                <div>
                  <div class="publisher">
                    <p class="name">{{ item.name }}</p>
                    <p class="time">{{ item.time }}</p>
                  </div>
                  <div class="publishing-content">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1, //购买专辑数量
      showdescribe: true, //展示专辑详情
      checked: false, //弹幕按钮
      showSupport: false, //展示支持
      showShare: false, //展示分享
      id: this.$route.params.id, //接受传过来的ID值来获取数据
      AlbumDetailsData: [], //总数据
      dealAlbumData: [], //全部专辑详情
      partAlbumData: [], //部分专辑详情
      showMv: true, //是否显示MV这个盒子
      playMv: true, //Video的显示
      pic: "", //购买专辑总金额
      shareData: [
        {
          url: require("../../assets/image/WeChat.png"),
          text: "微信好友",
        },
        {
          url: require("../../assets/image/QQ_space.png"),
          text: "QQ空间",
        },
        {
          url: require("../../assets/image/QQ_friends.png"),
          text: "QQ好友",
        },
        {
          url: require("../../assets/image/micro_blog.png"),
          text: "微博",
        },
        {
          url: require("../../assets/image/Ding_Talk.png"),
          text: "钉钉",
        },
      ],

      //将要显示得弹幕
      waitBullets: [
        {
          name: "旺财",
          text: "20岁不靠父母，全款买下!!!",
          time: "11月1日 12:04",
          line: 0,
          url: require("../../assets/image/ay/aa.jpg"),
        },
        {
          name: "大黄",
          text: "无霸哥",
          time: "3月2日 11:23",
          line: 0,
          url: require("../../assets/image/ay/aaa.jpg"),
        },
        {
          name: "蓝色妖姬",
          text: "英雄可以受委屈",
          time: "7月8日 23:33",
          line: 0,
          url: require("../../assets/image/ay/bb.jpg"),
        },
        {
          name: "红色风暴",
          text: "但是你不能踩我的切尔西",
          time: "1月1日 20:30",
          line: 0,
          url: require("../../assets/image/ay/bbb.jpg"),
        },
        {
          name: "小林同志",
          text: "先定个小目标,赚他一个亿",
          time: "9月23日 16:40",
          line: 0,
          url: require("../../assets/image/ay/zz.jpg"),
        },
      ],
      //展示的弹幕
      showingBullets: [],
      lines: 4, //弹道
      currentLine: 1, //当前当面得弹道
    };
  },

  methods: {
    getAlbumDetails() {
      this.$axios
        .get(`http://localhost:3000/album/detail?id=${this.id}`)
        .then((data) => {
          this.AlbumDetailsData = data.data;
          this.dealAlbumData = this.AlbumDetailsData.product.descr.filter(
            (item) => {
              if (item.resource != "<br>" && item.resource != "</br>") {
                return item;
              }
            }
          );

          this.partAlbumData = this.dealAlbumData.slice(0, 3);
          this.pic = this.AlbumDetailsData.product.price;
          if (!this.AlbumDetailsData.product.mvCoverUrl) {
            this.showMv = false;
          }
          console.log("this.AlbumDetailsData ==>", this.AlbumDetailsData);
        });
    },

    //后退
    back() {
      this.$router.go(-1);
    },
    //分享
    showPopup() {
      this.showShare = true;
    },

    //支持
    ShowSupport() {
      this.showSupport = true;
    },

    HideSupport() {
      this.showSupport = false;
    },

    //展示弹幕
    showSwitch() {
      this.checked = !this.checked;
      console.log("window.location.href ==>", window.location.href);
    },

    showAndHidedescribe() {
      this.showdescribe = !this.showdescribe;
    },

    showPalyMv() {
      this.playMv = false;
    },

    showNextBullet() {
      if (!this.waitBullets.length) {
        return;
      }
      // 先确定弹道，跟上一个弹道错开即可
      this.currentLine = (this.currentLine % this.lines) + 1;
      // 从等待集合里取出第一个
      const currentBullet = this.waitBullets.shift();
      // 设置弹幕的弹道
      currentBullet.line = this.currentLine;
      // 弹幕放进显示集合里，弹幕开始滚动
      this.showingBullets.push(currentBullet);
    },

    doCopy() {
      let selft = this;
      this.$copyText(window.location.href).then(
        function (e) {
          selft.$toast("复制成功");
          console.log(e);
        },
        function (e) {
          selft.$toast("复制失败");
          console.log(e);
        }
      );
    },

    PaymentSucceeded() {
      this.$dialog({
        message: "付款成功" + this.pic + "元",
      }).then(() => {
        this.showSupport = false;
        console.log('this.pic ==>',this.pic);
        console.log('this.value ==>',this.value);
        
        this.$refs.support.innerHTML = '已支持'
      });
    },
  },

  created() {
    this.getAlbumDetails();
  },

  mounted() {
    this.$refs.video.addEventListener("ended", () => {
      this.playMv = true;
    });

    this.showNextBullet();
    setInterval(this.showNextBullet, 700);
  },

  watch: {
    value: function (newval) {
      return (this.pic = newval * this.AlbumDetailsData.product.price);
    },
  },
};
</script>

<style lang="scss" scoped>
.AlbumDetails-box {
  position: relative;
  width: 100vw;
  z-index: 10;

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 999;

    .album-name {
      width: 70%;
      font-size: 18px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
    }

    .van-popup {
      .title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        padding-left: 20px;
        font-weight: 600;
      }

      .van-grid {
        border-bottom: 1px solid #ddd;
      }

      .share-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px;

        .share-item {
          width: 15%;
          height: 80px;

          .img {
            width: 100%;
            height: 50px;
            img {
              display: block;
              height: 100%;
              width: 100%;
            }
          }

          p {
            margin-top: 5px;
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            text-align: center;
          }
        }
      }
    }

    .van-popup {
      .albumName {
        padding: 10px;
        font-size: 20px;
        font-weight: 500;
        border-bottom: 1px solid #eee;
      }
      .price,
      .num,
      .payment-amount {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        padding: 10px;
        align-items: center;
      }

      .price {
        .pic {
          color: red;
          font-weight: bold;
        }
      }
      .num {
        .van-stepper {
          border: 1px solid #ddd;
          border-radius: 999px;
          overflow: hidden;
        }
      }
      .payment-amount {
        .pic {
          color: red;
          font-weight: bold;
        }
      }

      .payment-method {
        display: flex;
        height: 40px;
        padding: 10px;

        .alipay,
        .weChat {
          display: flex;
          align-items: center;
          width: 40%;
          border-radius: 999px;
          padding-left: 30px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }

        .alipay {
          background-color: #00a0e9;
          img {
            width: 15%;
            height: 80%;
            display: block;
            margin-right: 10px;
          }
        }

        .weChat {
          background-color: #09bb07;

          .van-icon {
            margin-right: 10px;
          }
        }
      }
    }
  }

  main {
    padding-top: 44px;
    width: 100vw;
    background-image: linear-gradient(#31322d, #2b2a26, #47423c);

    .album-bg {
      overflow: scroll;
      position: relative;
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }

      .layer {
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.32);
        backdrop-filter: blur(10px);

        .album-cover {
          width: 100vw;
          position: relative;

          .bullet-chat-box {
            position: relative;
            display: flex;
            align-items: center;
            margin-left: auto;
            width: 80px;
            z-index: 20;
            .bullet-chat {
              display: inline-block;
              height: 40px;
              color: #aaa;
              line-height: 40px;
              font-size: 16px;
              margin-right: 5px;
            }
          }

          .coverUrl {
            width: 200px;
            height: 200px;
            margin: 0 auto;

            img {
              width: 100%;
              overflow: auto;
            }
          }

          .ArtistAndAlbumNames {
            margin: 20px auto 10px;

            p {
              text-align: center;
              margin-top: 10px;
            }
            .albumName {
              font-size: 18px;
              color: #f4ffff;
              font-weight: 700;
            }

            .artistNames {
              font-size: 16px;
              font-weight: 500;
              color: #b3bec5;
            }
          }

          .AlbumPic {
            display: flex;
            align-content: center;
            justify-content: space-between;
            border-top: 1px solid #43423d;
            border-bottom: 1px solid #43423d;
            padding: 10px;
            .picAndNum {
              .pic {
                color: #c43c36;
                font-size: 22px;
                font-weight: bold;
              }
              .num {
                color: #b5b4b0;
                font-size: 16px;
                font-weight: 600;
              }
            }

            .support {
              width: 100px;
              height: 30px;
              border-radius: 999px;
              font-size: 16px;
              font-weight: 600;
              line-height: 30px;
              text-align: center;
              color: #fff;
              background-color: #c43c36;
            }
          }

          .interval {
            margin: 3px 6px;
            height: 30px;
            border-radius: 5px;
            background-color: rgba($color: #000, $alpha: 0.2);
          }

          .tags {
            color: #999;
            padding: 0 10px;
            overflow: hidden;

            .tags-item {
              width: 50%;
              height: 20px;
              line-height: 20px;
              float: left;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .bullet-wrap {
            height: 250px;
            width: 100%;
            position: absolute;
            top: 40px;
            left: 0;

            .bullet-item {
              position: absolute;
              color: #fff;
              border-radius: 999px;
              font-size: 14px;
              letter-spacing: 2px;
              font-weight: 500;
              background-color: rgba($color: #000, $alpha: 0.4);
              animation: rightToLeft 7s linear both infinite;
              padding: 5px;
            }

            .bullet-item:nth-child(1) {
              top: 20px;
            }
            .bullet-item:nth-child(2) {
              top: 60px;
            }
            .bullet-item:nth-child(3) {
              top: 100px;
            }
            .bullet-item:nth-child(4) {
              top: 140px;
            }
          }
        }

        .album-describe {
          margin-top: 10px;
          color: #c8c8c0;
          font-size: 14px;
          padding: 10px;
          border-radius: 20px;
          background-color: rgba($color: #000, $alpha: 0.2);

          .album-describe-title {
            width: 80px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            color: #d83a37;
            margin-left: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #d83a37;
          }

          .album-describe-item {
            line-height: 16px;
            margin-top: 10px;
          }

          .show-album-describe {
            margin-top: 20px;
            text-align: center;
            color: #888;
          }
        }

        .short-video {
          box-sizing: border-box;
          width: 100%;
          padding: 0 8px;
          overflow: hidden;
          .mvCover {
            border-radius: 10px;
            width: 100%;
            height: 220px;
            position: relative;
            overflow: hidden;

            .playIcon {
              width: 50px;
              height: 50px;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
            }

            p {
              color: #fff;
              font-size: 17px;
              font-weight: 600;
              position: absolute;
              left: 0;
              bottom: 10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .mvCover:last-child {
            display: flex;
            justify-content: center;
          }
        }

        .comment {
          .comment-titel {
            .van-divider {
              font-size: 18px;
              font-weight: bold;
              color: #d83a37;
            }
          }
          .comment-item {
            padding: 10px 10px;
            border-bottom: 1px solid rgb(158, 157, 157);
            display: flex;

            .head-portrait {
              width: 40px;
              height: 40px;
              border-radius: 999px;
              overflow: hidden;
              margin-right: 13px;

              img {
                width: 100%;
                display: block;
              }
            }
            .publisher {
              height: 40px;
              line-height: 40px;
              .name {
                height: 20px;
                line-height: 20px;
                font-weight: 600;
                font-size: 16px;
                color: #ddd;
              }

              .time {
                height: 15px;
                line-height: 15px;
                color: #999;
                font-size: 12px;
              }
            }

            .publishing-content {
              color: #fff;
              padding: 10px 0;
              font-size: 17px;
            }
          }
        }
      }
    }
  }

  @keyframes rightToLeft {
    0% {
      transform: translate(100vw);
    }
    100% {
      transform: translate(-100%);
    }
  }
}
</style>