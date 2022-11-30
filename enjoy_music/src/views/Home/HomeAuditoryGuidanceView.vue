<template>
  <div class="home-auditory-guidance">
    <div class="home-auditory-header">
      <div class="home-auditory-title">解决你听古典乐的几个问题</div>
      <div class="home-auditory-bottom">
        <div class="home-auditory-player">
          <div class="home-auditory-time">1:48:07</div>
        </div>
        <div class="home-auditory-collect">
          <span class="iconfont icon-collection-tag"></span>
        </div>
      </div>
    </div>
    <div class="home-auditory-decoration">
      <div class="home-auditory-host">
        <span>主持:</span><span> 科学家包大师</span>
      </div>
      <div class="home-auditory-host">
        <span>嘉宾:</span><span> Kino,双下巴妮妮</span>
      </div>
    </div>
    <div class="home-auditory-tis">
      <div class="home-auditory-content">
        <div class="home-auditory-tis-txt1">
          普通人想开始了解古典音乐,在最开始普遍会遇到几个问题:
        </div>
        <div class="home-auditory-tis-txt2">
          "这歌名是啥意思? Klavierkonzert是啥? Sinfonie又是啥? Sonatas双是啥?"
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.home-auditory-guidance {
  position: fixed;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 0px 10px;

  .home-auditory-header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 160px;
    border-radius: 5px;
    overflow: hidden;
    background-image: url("../../assets/image/background-img.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    .home-auditory-title {
      font-size: 22px;
      color: #fff;
    }

    .home-auditory-bottom {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: 60px;

      .home-auditory-player {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 90px;
        height: 30px;
        margin-left: 10px;
        border-radius: 999px;
        background-image: url("../../assets/image/podcast-play.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;

        .home-auditory-time {
          font-size: 13px;
          color: #fff;
          margin-right: 15px;
        }
      }

      .home-auditory-collect {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        margin-right: 10px;

        .icon-collection-tag{
          font-size:26px;
          color:#fff;
        }
      }
    }
  }

  .home-auditory-decoration {
    margin: 15px 0px;
    .home-auditory-host {
      height: 25px;
      line-height: 25px;
      font-size: 15px;
      color: #666;

      & > span:nth-child(1) {
        margin-right: 5px;
      }
    }
  }

  .home-auditory-tis {
    height: 100px;
    border-radius: 2px;
    background: #f2d8a5ad;
    padding-top: 1px;

    .home-auditory-content {
      width: calc(100% - 2px);
      height: calc(100% - 5px);
      background: #fff;
      margin: 1px 1px 3px;

      .home-auditory-tis-txt1 {
        padding: 20px 10px 5px;
        line-height: 20px;
        font-size: 15px;
        color: #888;
      }
      .home-auditory-tis-txt2 {
        width: calc(100% - 20px);
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        color: #777;
        padding: 0px 10px;
      }
    }
  }
}
</style>