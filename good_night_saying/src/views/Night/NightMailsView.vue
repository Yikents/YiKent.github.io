<template>
  <div class="nightmails">
    <div class="nightmails-header">
      <div class="nightmails-header-arrow" @click="sendData">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="nightmails-header-text">信箱</div>
      <div class="nightmails-header-create">创作</div>
    </div>
    <div class="nightmails-body" v-show="isFinishedLoad">
      <div
        class="nightessay-body-content"
        v-for="(items, index) in dealData"
        :key="index"
      >
        {{ items }}
      </div>
    </div>
    <wd-loading class="load" size="26px" v-if="!isFinishedLoad"></wd-loading>
  </div>
</template>

<script>
export default {
  props: {
    mailsData: Array,
    isFinishedLoad: Boolean,
  },
  data() {
    return {};
  },
  created() {
    this.dealData;
  },
  methods: {
    sendData() {
      this.$emit("MailStatus", false);
    },
  },
  computed: {
    dealData() {
      let arr2 = [];
      if (this.mailsData) {
        this.mailsData.forEach((item) => {
          let reg = /<\/h4>/;
          let arr1 = item?.text?.split(reg);
          if (arr1) {
            arr1.forEach((it) => {
              let b = it.split(/<h4>/);
              if (b[1]) {
                arr2.push(b[1]);
              }
            });
          }
        });
        arr2 = arr2
          .join(",")
          .replace(/&nbsp;/g, "")
          .replace(/<br>/g, "");
        let temper = arr2.split(",");
        arr2 = [];
        temper.forEach((itm) => {
          if (itm) {
            arr2.push(itm);
          }
        });
      }

      return arr2;
    },
  },
};
</script>

<style lang="scss" scoped>
.nightmails {
  position: fixed;
  right: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background-color: #f5f5f5;
}
.nightmails-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: #fff;

  .nightmails-header-arrow {
    width: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .icon-arrow-left {
      font-size: 23px;
      color: #666;
    }
  }

  .nightmails-header-text {
    color: orange;
  }

  .nightmails-header-create {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    color: orange;
    margin-right: 10px;
  }
}

.nightmails-body {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding-bottom:50px;
  overflow: scroll;

  &::-webkit-scrollbar{
    width:0px;
  }

  .nightessay-body-content {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    text-indent: 1em;
    margin-top: 10px;
    line-height: 33px;
    word-wrap: break-word;
    background: #fff;
  }
}
.load {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
}
</style>