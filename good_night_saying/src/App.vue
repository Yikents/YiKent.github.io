<template>
  <div id="app">
    <router-view />
    <div class="main-tabbar">
      <router-link tag="div" class="tabbar-item" to="/"
        >
        <div class="icon"><span class="iconfont icon-ic_queue_music"></span></div>
        <div>晚安</div>
        </router-link
      >
      <router-link tag="div" class="tabbar-item" to="/recordsaying"
        >
        <div class="icon"><span class="iconfont icon-flower"></span></div>
        <div>语录</div>
        </router-link
      >
      <router-link tag="div" class="tabbar-item" to="/music"
        >
        <div class="icon"><span class="iconfont icon-xuehua"></span></div>
        <div>音乐</div>
        </router-link
      >
      <router-link tag="div" class="tabbar-item" to="/dynamic"
        >
        <div class="icon"><span class="iconfont icon-yueliang"></span></div>
        <div>动态</div>
        </router-link
      >
      <router-link tag="div" class="tabbar-item" to="/my">
        <div class="icon"><span class="iconfont icon-user"></span></div>
        <div>我</div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-tabbar {
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 55px;
  align-items: center;
  background: #f8f8f8;
  user-select: none;

  .tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color:#666;

    .icon{
      width:26px;
      height:26px;
      line-height: 26px;
      text-align: center;
      margin-bottom: 3px;
    }

    &.router-link-exact-active{
      color:orange;
    }
  }
}
.iconfont{
  font-size:23px;
}
.icon-ic_queue_music{
  font-size:26px;
}

.icon-xuehua{
  font-size:28px;
}

.icon-yueliang{
  font-size:27px;
}

</style>
