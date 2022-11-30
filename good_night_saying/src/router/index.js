import Vue from 'vue'
import VueRouter from 'vue-router'
import NightView from '../views/Night/NightView.vue'
import RecordSayingView from '../views/RecordSaying/RecordSayingView.vue'
import MusicView from '../views/Music/MusicView.vue'
import DynamicView from '../views/DynamicView/DynamicView.vue'
import MyView from '../views/MyView/MyView.vue'
import loginView from '../views/loginView.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'night',
    component: NightView
  },
  {
    path: '/recordsaying',
    name: 'recordsaying',
    component: RecordSayingView
  },
  {
    path: '/music',
    name: 'music',
    component: MusicView
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: DynamicView,
    children: [
      {
        path: 'dynamic-details',
        name: 'dynamic-details',
        component: () => import("../views/DynamicView/DynamicDetails.vue")
      }
    ]
  },
  {
    path: '/my',
    name: 'my',
    component: MyView,
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
