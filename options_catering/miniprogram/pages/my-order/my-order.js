// pages/my-order/my-order.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id:1,
        title: "待就餐",
        image:"../../images/download1.jpg",
        text:"您还没有待就餐订单哦!",
        image:"../../images/no-three.png",
        type:'onging'
      },
      {
        id: 2,
        title:"已就餐",
        image: "../../images/download2.jpg",
        text:"您还没有已就餐订单哦!",
        image:"../../images/no-two.png",
        type:'completed'   
      },
    ],
    renderData:{},

  },
  jumpRouterEvent(){
    
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  jumpOrderDedailPage(e){
    wx.navigateTo({
      url: '/pages/order-detail/order-detail',
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptMyOrderData', {
          data: e.currentTarget.dataset.item
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    db.collection('order-data').get({
      success: res => {
        let obj1={};
        obj1['onging']=res.data.filter(item=>{
          return item.status=='ongoing'
        })
        let obj2={};
        obj2['completed']=res.data.filter(item=>{
          return item.status!='ongoing'
        })
       this.setData({
         renderData:{...obj1,...obj2}
       })
       console.log(obj1);
      }
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