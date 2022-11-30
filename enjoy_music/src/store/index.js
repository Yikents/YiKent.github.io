import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import { bgUrl } from "@/utils/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MoreMessage: [],
    listenListState:'',//监听收藏状态情况
    songAlbumID:'', //获取当前歌曲专辑id
    AlbumCollection:'',//获取当前的歌曲专辑
    songCollection:'',//获取当前的歌单
    singleId: '',    //当前正在播放的歌曲id
    SongSrcObj: {},    //全部歌曲的audio的src
    allSongList:[],   //所有歌曲列表
    singleSongObj: {},  //单首歌曲
    isStartPlayState: false,  //控制HomePlayerView是否能展示
    playerState: false,  //播放器播放情况
    changeBgUrl:bgUrl[1],  //获取相关的git图
    isChangeState:false, //记录歌曲是否切换了
    isRunfrequency:false, //记录git图是否变化
    hideplayer:false,
    isEmptyValue:false, //记录首次进入专辑或者歌单的状态
    isRunPlayStation:true, //判断是否播放电台了
    isPausePlayStation:false,  //判断音乐播放器是否需要切换电台状态
    isShowGit:null,  //为HomePlayerView组件中的播放器中的播放列表提供一个判断
    deliveryPlayerdeObj:{}, //HomePlayerView组件中的播放器中的播放列表播放的歌曲,
    buildSelftSong:[], //创建自定义歌单的数据
    isAddSongStatus:false, //判断是否执行添加歌单
    MessageContainer:[],//自定义歌单的数据
    isPlayAllSong:false, //判断是否顺序播放歌曲
    currentSongCount:0,

    //MyView的信息
    // 用户资料
    userPedName:"",
    signatureContent:"",
    userImg:"",
    userAccountPassword:{},//登录账号密码
    userData:{}, //装用户资料数据
    //MyView的信息结尾
  },
  getters: {
  },
  mutations: {
    getMoreMessage(state, arr) {
      state.MoreMessage = [...arr];
    },

    //获取当前专辑id
    getsongAlbumID(state,id){
      state.songAlbumID=id
      // console.log('asjdklfhasokdfhas',id);
      // console.log("签单...",id)
    },
    
    //获取所有歌曲信息
    dealAllSongList(state,arr){
      state.allSongList=[...arr];
      localStorage.allSongList=JSON.stringify(arr);
      // console.log('getmore==>',arr);
    },

    // 获取歌曲audio的src
    modifyData(state, SongSrcObj) {
      state.SongSrcObj = { ...state.SongSrcObj, ...SongSrcObj };
      if (!state.singleSongObj.audioUrl&&SongSrcObj[state.singleId]) {
        state.singleSongObj = { ...state.singleSongObj, audioUrl:SongSrcObj[state.singleId] }
        // console.log(state.singleSongObj)
      }
    },

    //获取首个歌曲id
    getSingleId(state, id) {
      state.singleId = id;
      // console.log('=====>',id);
    },

    // 音乐结束状态
    ListenMusicEvent(state, judge) {
      state.endedState = judge;
      // console.log(judge)
    },

    //获取正在播放的歌曲信息
    getSingleSongMessage(state, singleSongObj) {
      state.singleSongObj = { ...singleSongObj }
      //记录播放过了歌曲
      let currentTime=+new Date();
      if(localStorage.historyRecord){
        let currentRecord=JSON.parse(localStorage.historyRecord);
        let finds=currentRecord.findIndex(it=>it.audioId==singleSongObj.audioId);
        if(finds!=-1){
          currentRecord=currentRecord.map(item=>{
            if(item.audioId==singleSongObj.audioId){
              return{
                ...item,
                time:currentTime
              }
            }else{
              return item
            }
          });
          localStorage.historyRecord=JSON.stringify(currentRecord);
          
        }else{
          let o={};
          o={...singleSongObj,time:currentTime};
          currentRecord.push(o);
          localStorage.historyRecord=JSON.stringify(currentRecord);
        }
      }else{
          localStorage.historyRecord=JSON.stringify([{...singleSongObj,time:currentTime}])
      }
    },

    //监听播放器play和paused状态
    modifyPlayerState(state, modifyPlayerState) {
      state.playerState = modifyPlayerState;
      localStorage.playerState = JSON.stringify(modifyPlayerState);
      // console.log(modifyPlayerState)
    },

    //判断是否切换歌曲了
    changeCurrentState(state,val){
      state.isChangeState=val;
    },

    //git动态图片
    changeBgUrlState(state,num){
      state.changeBgUrl=bgUrl[num]
      // console.log(state.changeBgUrl)
    },

    hideAndShowPlayer(state,judge){
      state.hideplayer=judge;
    },

    modifyEmptyValue(state,judge){
      state.isEmptyValue=judge
    },

    //控制HomePlayerView是否能展示
    StartPlayStateEvent(state,judge){
      state.isStartPlayState=judge
    },

     //判断电台有没有播放
     controlStationMusic(state,judge){
      state.isRunPlayStation=judge;
    },

    //是否改变电台的状态
      changeAudioStation(state,judge){
        state.isPausePlayStation=judge;
      },

    //修改git图的变化
    modifyShowGit(state,id){
      state.isShowGit=id;
    },


    //获取当前的专辑信息
    getCurrentCollection(state,item){
      state.AlbumCollection=item;
      // console.log(item);
    },

    //获取当前的歌单信息
    getSongCollection(state,item){
      state.songCollection=item;
     
    },

    //获取收藏状态
    requireCollectState(state,judge){
      state.listenListState=judge;
      // console.log('触发了....',judge)
    },

    //获取个人创建自定义歌曲
    getBuildSelftSong(state,obj){
      let cur='';
      if(obj.audioId){
        cur='audioId'
      }else{
        cur='albumsId'
      }
      let finds=state.buildSelftSong.findIndex(it=>it[cur]==obj[cur]);
      if(finds==-1){
      state.buildSelftSong.push(obj);
      }
    },
    deletBuildSelftSong(state,obj){
      let cur='';
      if(obj.audioId){
        cur='audioId'
      }else{
        cur='albumsId'
      }
      state.buildSelftSong=state.buildSelftSong.filter(it=>{
        return it[cur]!=obj[cur];
      })
      // console.log(state.buildSelftSong);
    },
    getAddSongStatus(state,judge){
      state.isAddSongStatus=judge;
    },
    getMessageContainer(state,obj){
      state.MessageContainer.push(obj)
      // console.log(state.MessageContainer);
    },
    clearEmptyArr(state){
      state.buildSelftSong=[];
      state.isAddSongStatus=false;
    },

    //播放全部歌曲的状态
    PlayAllSongStatus(state,judge){
      state.isPlayAllSong=judge;
    },
    //当前播放第几首歌曲
    getCurrentSongCount(state,num){
      state.currentSongCount=num;
    },

    //直接修改singleSongObj
    modifySingleSongObj(state,obj){
      state.singleSongObj={...obj}
    },


    //MyView的信息
   // 更换用户资料
   reviseUserPedName(state,val){
    state.userPedName = val
  },
  reviseSubmitSignatureText(state,val) {
    state.signatureContent = val
  },
  
  reviseUserImg(state,val) {
    state.userImg = val
  },
// 更换手机号
  reviseMobileNumber(state,val){
   Vue.set(state.userAccountPassword,"mobileNumber",val)
   let loginData = {
    mobileNumber:val,
    password:"123456"
   }
   localStorage.setItem('userLoginData', JSON.stringify(loginData));
  },
  // 登录数据保存
  userLoginDataSave(state,val){
    state.userAccountPassword = {
      mobileNumber:val?.num,
      password:val?.pass
    }
    localStorage.setItem('userLoginData', JSON.stringify(state.userAccountPassword ));
  },
  // 获取本地存储user资料数据和登录数据
  getLocalStorageData(state){
  state.userAccountPassword = JSON.parse(localStorage.getItem('userLoginData'))
  state.userData = JSON.parse(localStorage.getItem('userData'))
  state.userPedName = state.userData.userName
  state.userImg = state.userData.userImg
  state.signatureContent = state.userData.userSignature 
  },

    //MyView的信息结尾
  },
  actions: {
    async getdeliveryId({ commit }, id) {
      let res = await axios.get(`http://localhost:3000/song/url?id=${id}`).then(({ data }) => {
        return data.data[0].url;

      })
      let obj = {};
      obj[id] = res
      commit('modifyData', obj);
    },
    async getAllSongList({commit},arr){
     await commit('dealAllSongList',arr)
    },
  },
  modules: {
  }
})
