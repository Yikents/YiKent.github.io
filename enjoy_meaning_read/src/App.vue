<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Api } from './apis';
import { useDetailStore } from '@/stores/details'
import { onBeforeMount } from 'vue';
const store = useDetailStore();
const { getCommentArea } = store
let result = Api.getExploreLatest();
const currentComment = async () => {

  getCommentArea((await result).comments);
}
onBeforeMount(() => {
  currentComment();
})

</script>

<template>
  <transition :name="$route.meta.transitionName || 'fade'">
    <RouterView />
  </transition>
  <div class="wrapper">

    <RouterLink tag="div" class="tabbar-item" to="/">首页</RouterLink>
    <RouterLink tag="div" class="tabbar-item" to="/explore">探索</RouterLink>
    <RouterLink tag="div" class="tabbar-item" to="/my">我</RouterLink>
  </div>

</template>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 55px;
  color: #ccc;
  background: rgba(222, 220, 220, 0.2);

}

.router-link-exact-active {
  color: #fff;
}

.move-enter-from,
.move-leave-to {
  transform: translateX(100%);
}

.move-enter-active,
.move-leave-active {
  transition: all .3s linear;
}

.move-enter-to,
.move-leave-from {
  transform: translateX(0px);
}

</style>
