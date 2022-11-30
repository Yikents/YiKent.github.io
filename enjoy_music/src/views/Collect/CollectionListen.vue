<template>
  <div class="collection-listen">
    <div class="collection-listen-empty">
      <div class="listen-empty-img"></div>
      <div class="listen-empty-text">抱歉,还没有收藏内容</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.collection-listen {
  .collection-listen-empty {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .listen-empty-img {
      width: 130px;
      height: 130px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../../assets/image/collection.png");
    }
    .listen-empty-text {
      margin-top: 20px;
      color: #646566;
    }
  }
}
</style>