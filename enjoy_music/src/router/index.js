import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import AlbumLibraryView from '../views/songs/AlbumLibraryView.vue'
import CollectionView from '../views/Collect/CollectionView.vue'
import MyView from '../views/MyView/MyView.vue'
import HomeAlbumListView from '../views/HomeAlbumListView.vue'
import HomeMoreMessage from '../views/Home/HomeMoreMessage.vue'
import HomeEncyclopediaView from '../views/Home/HomeEncyclopediaView.vue'
import SearchPageView from '../views/SearchPageView.vue'
import LoginView from '../views/MyView/LoginView.vue'
import AreaAlbum from '../components/Album library/AreaAlbum.vue'
import CollectionRightSong from '../views/Collect/CollectionRightSong.vue'
import AlbumDetails from '../components/Album library/AlbumDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/album-library',
    name:'album-library',
    component:AlbumLibraryView
  },
  {
    path:'/collection',
    name:'collection',
    component:CollectionView
  },
  {
    path:'/my',
    name:'my',
    component:MyView
  },
  {
    path:'/home-album-list/:id',
    name:'home-album-list',
    component:HomeAlbumListView,
  },
  {
    path:'/home-more-message/:text',
    name:'/home-more-message',
    component:HomeMoreMessage
  },
  {
    path:'/home-encyclopedia',
    name:'home-encyclopedia',
    component:HomeEncyclopediaView
  },
  {
    path:'/search-page',
    name:'search-page',
    component:SearchPageView
  },
  {
    path:'/login',
    name:'login',
    component:LoginView
  },
  {
    path:'/area-album/:area',
    name:'area-album',
    component:AreaAlbum
  },
  {
    path:'/collection-right-song',
    name:'collection-right-song',
    component:CollectionRightSong
  },
  {
    path:'/AlbumDetails/id=:id',
    name:'AlbumDetails',
    component:AlbumDetails
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
