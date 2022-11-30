import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('../views/ExploreView.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/MyView.vue')
    },
    {
      path:'/home-detail',
      name:'/home-detail',
      component:()=>import('../views/HomeDetailView.vue')
    },
    {
      path:'/my-setting',
      name:'my-setting',
      meta:{
        transitionName:'move'
      },
      component:()=>import('../views/MySettingView.vue')
    },
    {
      path:'/every-day-remind',
      name:'every-day-remind',
      meta:{
        transitionName:'move'
      },
      component:()=>import('../views/My/EveryDayRemindView.vue')
    },
    {
      path:'/login',
      name:'login',
      meta:{
        transitionName:'move'
      },
      component:()=>import('../views/loginView.vue')
    },
    {
      path:'/calendar/:text',
      name:'calendar',
      component:()=>import('../views/My/CalendarView.vue')
    },
    {
      path:'/my-record',
      name:'my-record',
      meta:{
        transitionName:'move'
      },
      component:()=>import('../views/My/MyRecordView.vue')
    },
    {
      path:'/my-mind',
      name:'my-mind',
      meta:{
        transitionName:'move'
      },
      component:()=>import('../views/My/MyMindView.vue')
    }
  ]
})

export default router
