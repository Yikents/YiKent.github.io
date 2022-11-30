<template>
  <div class="monologue">
    <div class="monologue-header">
      <div class="monologue-header-arrow" @click="ListenEventDy">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="monologue-header-text">写独白</div>
      <div class="monologue-header-announce" @click="announceWordEvent">
        发布
      </div>
    </div>
    <div class="monologue-body">
      <div class="monologue-body-area">
        <textarea
          placeholder="有什么新鲜事想告诉大家呢?"
          ref="txtContent"
        ></textarea>
        <label>
          <div class="upload-image" ref="img">
            <input type="file" id="file-img" @change="uploadData" ref="file" />
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
const MONOLOGUE = "monologue";
export default {
  props: ["username", "headimage"],
  data() {
    return {
      mainImage: null,
      timer:null
    };
  },
  methods: {
    uploadData() {
      let fram = new FileReader();
      let fr = this.$refs.file.files[0];
      fram.readAsDataURL(fr);
      const self = this;
      fram.onload = function () {
        self.$refs.img.style.backgroundImage = `url(${this.result})`;
        self.mainImage = this.result;
      };
    },
    ListenEventDy() {
      this.$emit("ListenEventDy");
    },
    announceWordEvent() {
      let content = this.$refs.txtContent.value;
      let timeline = this.dealCommentTime;
      if (content) {
        if (localStorage[MONOLOGUE]) {
          let currentStorage = JSON.parse(localStorage[MONOLOGUE]);
          localStorage[MONOLOGUE] = JSON.stringify([
            ...currentStorage,
            {
              headimage: this.headimage,
              username: this.username,
              timeline,
              mainImage: this.mainImage,
              content,
              pmax: 0,
              commentcount: 0,
              id: new Date().getTime(),
              isCan: true,
            },
          ]);
        } else {
          localStorage[MONOLOGUE] = JSON.stringify([
            {
              headimage: this.headimage,
              username: this.username,
              timeline,
              mainImage: this.mainImage,
              content,
              pmax: 0,
              commentcount: 0,
              id: new Date().getTime(),
              isCan: true,
            },
          ]);
        }
        this.$emit("ListenEventDy");
        this.$refs.txtContent.value = "";
       setTimeout(()=>{
         location.reload();
       },200)
      } else {
        this.$toast.warning({
          position: "top",
          msg: "独白不能为空!",
        });
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
      let second = currentTime.getSeconds();
      second = second < 10 ? "0" + second : second;
      return `${year}-${month}-${day} ${hour}:${Minutes}:${second}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.monologue {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 933;
  background: #eee;

  .monologue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .monologue-header-arrow {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .monologue-header-text {
      color: orange;
    }

    .monologue-header-announce {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: left;
      font-size: 15px;
      color: orange;
    }
  }

  .monologue-body-area {
    position: relative;
    width: 100%;
    height: 230px;
    background: #fff;

    textarea {
      box-sizing: border-box;
      width: 100%;
      height: 130px;
      padding: 15px;
      overflow: scroll;
      margin: 0px;
      outline: none;
      border: none;
      background: none;
      &::-webkit-scrollbar {
        width: 0px;
      }
    }

    .upload-image {
      width: 80px;
      height: 80px;
      overflow: hidden;
      margin-left: 20px;
      background-image: url("../assets/image/user-icon/publish.png");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      #file-img {
        display: none;
      }
    }
  }
}
</style>