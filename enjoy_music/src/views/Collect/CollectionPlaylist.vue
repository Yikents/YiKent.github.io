<template>
  <div class="collection-play-list">
     <div class="collection-play-list-empty">
      <div class="play-list-img"></div>
      <div class="play-list-text">抱歉,还没有收藏内容</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.collection-play-list {
  .collection-play-list-empty {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .play-list-img {
      width: 130px;
      height: 130px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../../assets/image/collection.png");
    }
    .play-list-text {
      margin-top: 20px;
      color: #646566;
    }
  }
}
</style>