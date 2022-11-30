<template>
  <div class="connecting-hardware-devices">
    <div class="nav-bar">
      <span class="left-arrow" @click="connectingHardwareDevicesRouter"
        ><van-icon size="24" name="arrow-left"
      /></span>
      <span>连接硬件设备</span>
    </div>
    <div class="my-devices">我的设备</div>
    <div class="other-devices-and-refresh">
      <div class="other-devices">其他设备</div>
      <div class="refresh" @click="refreshDevices">刷新</div>
    </div>
    <van-overlay :show="editShow" round z-index="23" @click="editShow = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-loading vertical size="50px" />
          <div class="doing-refresh">正在刷新</div>
        </div>
      </div>
    </van-overlay>
    <div class="load" v-show="showLoad == true">扫描失败</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editShow: false,
      showLoad: false,
    };
  },
  created() {
    this.refreshDevices()
  },

  methods: {
    connectingHardwareDevicesRouter() {
      this.$emit("connectingHardwareDevicesRouter", false);
    },
    refreshDevices() {
      setTimeout(() => {
        this.editShow = true;
      }, 200);

      this.$nextTick(() => {
        setTimeout(() => {
          this.editShow = false;
          this.showLoad = true;
          setTimeout(() => {
            this.showLoad = false;
          }, 1500);
        }, 2000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.connecting-hardware-devices {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(240, 240, 240);
  z-index:19;

  .nav-bar {
    position: relative;
    width: 100vw;
    height: 55px;
    text-align: center;
    line-height: 55px;
    box-shadow: 0px 0px 10px #f7f5f5;
    font-size: 20px;
    background-color: #fff;

    .left-arrow {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }

  .my-devices {
    width: 100vw;
    background-color: #fff;
    padding: 20px 20px 10px;
    margin-bottom: 10px;
    color: #888;
    font-size: 14px;
  }

  .other-devices-and-refresh {
    width: 100vw;
    height: 100vh;
    padding: 20px;
    background-color: #fff;
    font-size: 14px;

    .other-devices {
      color: #888;
      margin-bottom: 20px;
    }
    .refresh {
      color: rgb(0, 85, 255);
    }
  }

  .van-overlay {
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    text-align: center;
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 120px;
      height: 120px;
      background-color: #000;
      border-radius: 8px;
      padding-top: 15px;
      box-sizing: border-box;

      .doing-refresh {
        margin: 20px 0px;
      }
    }
  }

  .load {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 40px;
    margin: 0 auto;
    width: 80px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 999px;
    background-color: rgb(0, 0, 0);
    color: #fff;
    padding: 12px;
  }
}
</style>