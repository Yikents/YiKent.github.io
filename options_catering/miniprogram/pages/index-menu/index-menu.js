// pages/index-menu/index-menu.js
const db = wx.cloud.database();
import {
  DataList
} from "./utils"
Page({
  data: {
    mainActiveIndex: 0,
    active: 0,
    isActive: '锅底',
    DataList,
    singleList: [],
    textData: ['单锅', '拼锅', '四宫格'],
    storeData: [],
    CurCount: {},
    showImage: [],
    allPrice: 0,
    allCount: 0,
    currentCart: [],
    isCanShow: true,
    lisenEvent: {},
    ReduceEvent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    // console.log(this.data.DataList);
    this.setData({
      singleList: this.data.DataList[0].selectType[0].varietyDishes
    })
    this.renderShowImage(this.data.DataList[0].selectType[0].varietyDishes);
    this.allCountEvent();
  },
  renderShowImage(arr) {
    let currentArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].count > 0 && arr[i].judge == 'pot') {
        for (let j = 0; j < arr[i].count; j++) {
          currentArr.push(arr[i].image);
        }
      }
    }
    // let potObj={};
    // potObj['锅底']=currentArr.length;
    // console.log(arr,currentArr,this.data.showImage);
    this.setData({
      showImage: [...currentArr],
    })
    // console.log('data=======>',currentArr,arr)
  },
  // touchImageEvent(e){
  //   let currentValue=e.detail
  //   this.renderShowImage(currentValue);
  // },
  ChangeMenuStatus(e) {
    this.updateChangeStatus();
    let currentText = e.currentTarget.dataset.type.type;
    let finds = this.data.DataList.find(it => it.type == currentText)

    // console.log('index==>',currentText,this.data.isActive);
    if (currentText != this.data.isActive) {
      this.setData({
        isActive: currentText,
        singleList: finds.selectType[this.data.active].varietyDishes
      })
      // console.log('当前菜单栏=====>',this.data.singleList,this.data.DataList)
    } else {
      return;
    }
  },
  onChange(event) {
    let ind = event.detail.index;
    let finds = this.data.DataList.find(it => it.type == this.data.isActive)
    // console.log('data-===>',this.data.DataList);
    let cart = this.data.currentCart.filter(it => it.judge != 'pot');
    this.setData({
      active: ind,
      singleList: finds.selectType[ind].varietyDishes,
      storeData: [],
      currentCart: cart
    })
    this.renderShowImage(finds.selectType[ind].varietyDishes)
    // console.log('sdf',event.detail)
  },
  jumpRouterEvent() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  computedGoodsEvent(e) {
    let dealCart = [...e.detail.potStoreData, ...e.detail.vegeStoreData]
    // console.log('触发中....',e.detail.vegeStoreData)
    this.setData({
      CurCount: {
        ...this.data.CurCount,
        ...e.detail.goodsCount
      },
    })
    let dealData = e.detail.updata;
    let status = e.detail.index;
    let curA = this.data.DataList.map(it => {
      if (dealData[it.type]) {
        let ct = it.type;
        if (ct != '锅底') {
          let find = it.selectType.map((item) => {
            return {
              ...item,
              varietyDishes: dealData[it.type]
            }
          })

          return {
            ...it,
            selectType: find
          }
        } else {
          // console.log(it.type,'asdlk')
          this.renderShowImage(dealData[it.type])
          if (status == 'change') {
            return {
              ...it,
              ...DataList[0]
            }

          } else {
            // console.log('看一下状态====>',it);
            let fd = it.selectType.map((i, ide) => {
              if (status == ide) {
                return {
                  ...i,
                  varietyDishes: dealData[it.type]
                }
              } else {
                return i;
              }
            })
            return {
              ...it,
              selectType: [...fd]
            }
          }
        }
      } else {
        return it;
      }
    })
    // console.log('curA==>',curA)
    this.setData({
      DataList: curA
    })
    // if(status!=this.data.active){
    this.renewCountEvent();
    this.allCountEvent();
    this.allPriceEvent(dealCart);
    // }
    // this.updateChangeStatus();
    // this.renderShowImage(dealData)
    // console.log('needer========>',this.data.DataList);
  },
  updateChangeStatus() {
    // active: 0,
    // isActive:'锅底',
    let currentActive = this.data.isActive;
    let index = this.data.active;
    if (currentActive != '锅底') {
      let record = this.data.DataList.find(item => item.type == currentActive);
      let cValue = record.selectType[index].varietyDishes;
      let countf = 0;
      for (let i = 0; i < cValue.length; i++) {
        countf = countf + cValue[i].count;
      }
      let tf = {}
      tf[currentActive] = countf;
      let currentCt = {
        ...this.data.goodsCount,
        ...tf
      }
      let changeAfter = record?.selectType.map(it => {
        return {
          ...it,
          varietyDishes: cValue
        };
      })
      record = {
        ...record,
        selectType: changeAfter
      };
      let curS = this.data.DataList.map(it => {
        if (it.type == record.type) {
          return record
        } else {
          return it;
        }
      })

      this.setData({
        DataList: curS,
        goodsCount: currentCt
      })
      //  console.log('当前===>',this.data.goodsCount,record,this.data.goodsCount);
    }
  },
  renewCountEvent() {
    let data = this.data.DataList;
    let objectA = {};
    data.forEach(items => {
      let arr1 = items.selectType[this.data.active].varietyDishes;
      let object = {}
      let count1 = 0;
      arr1.forEach(it => {
        count1 = count1 + it.count;
      });
      object[items.type] = count1;
      objectA = {
        ...objectA,
        ...object
      }
    })
    this.setData({
      CurCount: {
        ...objectA
      }
    })
  },
  allCountEvent() {
    let currentData = this.data.CurCount;
    let num = 0;
    for (let key in currentData) {
      num = num + currentData[key];
    }
    this.setData({
      allCount: num
    })
  },
  allPriceEvent(array) {
    // console.log('array==>',array);
    let datas = this.data.currentCart;
    if (datas.length != 0) {
      for (let i = 0; i < array.length; i++) {
        let a = array[i];
        let dif = datas.findIndex(itm => itm.titleDishes == a.titleDishes);
        if (dif == -1) {
          datas.push(a)
        } else {
          datas = datas.map(item => {
            if (item.titleDishes == a.titleDishes) {
              return a
            } else {
              return item
            }
          })
        }
      }
    } else {
      datas = [...array, ...datas];
    }
    datas = datas.filter(it => {
      return it.count != 0;
    })
    // console.log('arrr====>',datas);
    let all = 0;
    if (datas) {
      datas.forEach(item => {
        if (item.weight == 'all' || item.weight == 'no') {
          all = all + item.price * item.count;
        } else {
          all = all + item.price / 2 * item.count;
        }
      })
    }
    console.log('cun==>',datas);
    this.setData({
      allPrice: all,
      currentCart: [...datas]
    })

  },
  confirmPotEvent() {
    wx.showToast({
      title: '你还未挑选锅底哦!',
      icon: 'error'
    })
  },
  showShopCartList() {
    this.setData({
      isCanShow: !this.data.isCanShow
    })
  },
  addListenEvent(e) {
    // console.log('dadn', this.data.currentCart);
    let find=[];
    let cart=e.currentTarget.dataset.type.titleDishes;
    let recordText=''
    this.data.DataList.forEach(el => {
      el.selectType.forEach(it=>{
        it.varietyDishes.forEach(y=>{
          if(y.titleDishes==cart){
           find=[...it.varietyDishes];
           recordText=el.type;
          }
        })
      })
    })
      this.setData({
        singleList: find,
        isActive:recordText
      })
      this.setData({
        lisenEvent: e
      })
  },
  reduceListenEvent(e) {
    let find=[];
    let cart=e.currentTarget.dataset.reduce.titleDishes;
    let recordText=''
    this.data.DataList.forEach(el => {
      el.selectType.forEach(it=>{
        it.varietyDishes.forEach(y=>{
          if(y.titleDishes==cart){
           find=[...it.varietyDishes];
           recordText=el.type;
          }
        })
      })
    })
    if (this.data.allCount > 1) {
      this.setData({
        singleList: find,
        isActive:recordText
      })
      this.setData({
        ReduceEvent: e
      })
    } else {
      this.setData({
        singleList: find,
        isActive:recordText
      })
      this.setData({
        ReduceEvent: e
      })
      this.showShopCartList();
    }
  },
  clearCartEvent() {
    console.log('清除数据')
  },
  sumbitGoodEvent(){
    let time=this.sumbitOrderTime();
    
    db.collection('order-data').add({
      // name:'index_user_message',
      data: {
       cart: this.data.currentCart,
       allPrice:this.data.allPrice,
       time,
       allCount:this.data.allCount,
       storeName:this.data.storeName,
       status:'ongoing'
      },
      success: () => {
        wx.showToast({
          title: '订单已提交',
        });
      }

    });
    wx.navigateTo({
      url: '/pages/my-order/my-order',
    })
  },
  sumbitOrderTime(){
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    let hour=date.getHours();
    let minute=date.getMinutes();
    let second=date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.cloud.database().collection('door-detail').get().then(res => {
      this.setData({
        storeName:res.data[0].storeMessage.name
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})