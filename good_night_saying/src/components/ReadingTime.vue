<template>
  <div class="readingtime">
    <div class="readingtime-header">
      <div class="readingtime-header-arrow" @click="ShowPage">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="readingtime-header-text">美文</div>
    </div>
    <wd-pull-refresh v-model="isLoading" @refresh="refresh">
      <div class="readingtime-body" v-show="isCurrentCopy">
        <div
          class="readingtime-body-items"
          v-for="item in dealData"
          :key="item.rid"
          @click="dealObtainData(item.rid)"
        >
          <div class="readingtime-body-title">{{ item.title }}</div>
          <div class="readingtime-body-content">
            <div class="readingtime-body-text" v-if="item.url">
              {{ item.url }}
            </div>
            <div class="readingtime-body-date">{{ item.createTime }}</div>
          </div>
        </div>
      </div>
    </wd-pull-refresh>
    <wd-loading class="load" size="26px" v-if="!isCurrentCopy"></wd-loading>
    <transition name="move">
      <ReadingTimeChildren
        v-if="isHide"
        @transmitData="transmitData"
        :ObtianObj="ObtianObj" :reload="reload"
      />
    </transition>
  </div>
</template>

<script>
import ReadingTimeChildren from "@/components/ReadingTimeChildren.vue";
import { debounce } from "lodash-es";

export default {
  props: {
    ReadArr: Array,
    isCurrentCopy: Boolean,
  },
  data() {
    return {
      ObtianObj: {},
      isLoading: false,
      isHide: false,
      reload:false
    };
  },
  methods: {
    ShowPage() {
      this.$emit("ShowPage", false);
    },
    dealTime(val) {
      let date = new Date(val);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      return "/" + year + "-" + month + "-" + day;
    },
    refresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    dealObtainData(id){
      this.ObtianObj={};
      this.reload=false;
      this.obtainData=debounce(this.obtainData,1000);
      this.isHide = !this.isHide;
      this.obtainData(id);
    },
    obtainData(id) {
      this.$axios
        .get(
          `/shengcai/api/mobile/common/findReportListById?rid=${id}&userid=153225&meetid=1339`
        )
        .then(({ data }) => {
          let reg = /src="(.*?)"/;
          reg.test(data.report.text);
          let URL = RegExp.$1;
          let res = data.report;
          let txt=this.filterText(res.text)
          this.ObtianObj = {
            time: res.createTime,
            text: txt,
            title: res.title,
            url:  URL,
          };
        });
        this.$nextTick(()=>{
            this.reload=true
        })
    },
    transmitData(val) {
      this.isHide = val;
    },
    filterText(txt){
      let arr1=txt.split(/<\/p>/);
      let arr2=[];
      arr1.forEach(it=>{
        if(it){
          let a=it.split(/<p>/);
          if(a[1]){
            arr2.push(a[1]);
          }
        }
      })
      arr2=arr2.join('knt').replace(/<span style="(.*?)">/g,'').replace(/<\/span>/g,'').replace(/<br \/>/g,'').replace(/<div (.*?)>/g,'').replace(/<p (.*?)>/,'').replace(/<(\/?)strong>/g,'').split('knt');
      return arr2;
    }
  },
  computed: {
    dealData() {
      return this.ReadArr.map((it) => {
        return {
          createTime: this.dealTime(it.createTime),
          text: it.text,
          title: it.title,
          url: it.url,
          rid: it.id,
        };
      });
    }
  },
  components: {
    ReadingTimeChildren,
  },
};
</script>

<style lang="scss" scoped>
.readingtime {
  box-sizing: border-box;
  position: fixed;
  right: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 3;
  background: #f5f5f5;
}

.readingtime-header {
  display: flex;
  align-items: center;
  height: 40px;
  background: #fff;

  .readingtime-header-arrow {
    width: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .icon-arrow-left {
      font-size: 23px;
      color: #666;
    }
  }

  .readingtime-header-text {
    flex: 1;
    text-align: center;
    margin-right: 15px;
    color: orange;
  }
}

.readingtime-body {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;

  .readingtime-body-items {
    margin-top: 10px;
    padding-bottom: 8px;
    background: #fff;

    .readingtime-body-title {
      line-height: 40px;
      padding: 0px 15px;
    }

    .readingtime-body-content {
      padding: 0px 15px;
      border-top: 5px dashed rgba(238, 238, 238, 0.633);
      border-bottom: 5px dashed rgba(238, 238, 238, 0.633);

      .readingtime-body-text {
        line-height: 36px;
        font-size: 15px;
        color: gray;
        margin-bottom: 50px;
      }

      .readingtime-body-date {
        line-height: 36px;
        font-size: 15px;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 0px;
  }
}

.load {
  position: fixed;
  top: 50px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
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
</style>