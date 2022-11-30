<template>
  <div class="recordsaying">
    <header class="title">语录</header>

    <div class="ContentBox">
      <div class="item" v-for="(d, index) in QuotationsData" :key="d.id">
        <div
          class="img"
          :style="{ backgroundImage: `url(${d.headimage})` }"
          @click="toggle(index)"
        >
          <!-- <img :src="d.headimage" /> -->
        </div>
        <div class="text" v-html="d.text">{{ d.text }}</div>

        <div class="Time">
          <div>{{ d.createTime.split(" ")[0] }}</div>
          <div class="icon">
            <div class="down-icon">
              <img
                class="auto-img"
                src="../../assets/image/RecordSayingView-img/c_down.png"
              />
            </div>
            <div class="down-icon">
              <img
                class="auto-img"
                src="../../assets/image/RecordSayingView-img/c_copy.png"
              />
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
      QuotationsData: [],
      urls: [],
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.$axios
        .get(
          "/shengcai/api/mobile/common/findHomeReportList?meetid=1339&currentpage=1&maxresult=20&type=1"
        )
        .then(({ data }) => {
          let res = data.reportlist;
          this.QuotationsData = res;
          res.forEach((it) => {
            this.urls.push(it.headimage);
          });
        });
    },
    toggle(index) {
      this.$preview({
        urls: this.urls,
        showIndex: false,
        current: index,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recordsaying {
  background-color: #eee;
  .title {
    width: 100%;
    position: fixed;
    height: 40px;
    text-align: center;
    font-size: 16px;
    color: orange;
    line-height: 40px;
    background-color: #fff;
  }

  .ContentBox {
    width: 100vw;
    height: 100vh;
    padding-bottom: 65px;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }

    .item {
      box-sizing: border-box;
      margin-top: 10px;
      padding: 10px;
      background-color: #fff;

      .img {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
      }

      .text {
        text-indent: 2em;
        line-height: 30px;
        padding: 5px;
        font-size: 14px;
        font-weight: 520;
        color: #686868;
        border-bottom: 1px solid #ddd;
      }

      .Time {
        line-height: 30px;
        color: #666;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .down-icon {
            margin-left: 10px;
            width: 20px;
            height: 20px;

            .auto-img {
              display: block;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>