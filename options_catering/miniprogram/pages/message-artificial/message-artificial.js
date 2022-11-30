// pages/message-artificial/message-artificial.js
// var timestamp = Date.parse(new Date());
// var date = new Date(timestamp);
var util = require('../../pages/message-artificial/utils');
// let dataTime
// let hh = new Date().getHours()
// let mf = new Date().getMinutes()<10?'0'+new Date().getMinutes():
//   new Date().getMinutes()
// let ss = new Date().getSeconds()<10?'0'+new Date().getSeconds():
//   new Date().getSeconds()
//   dataTime = `${hh}:${mf}:${ss}`;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      // input:[]
    },
   

    jumpRouterEvent(){
      wx.switchTab({
        url: '/pages/message/message',
      })
    },
    // userNameInputAction: function (options) {
    //   //获取输入框输入的内容
    //   let value = options.detail.value;
    //   console.log("输入框输入的内容是 " + value)
    // },
    // userNameFocusAction: function (options) {
    //   //输入框焦点获取
    //   let value = options.detail.value;
    //   console.log("输入框焦点获取 " + value)
    // },
  
    // userNameBlurAction: function (options) {
    //   //输入框焦点移出
    //   let value = options.detail.value;
    //   console.log("输入框焦点移出 " + value)
    // },
    
    // userNameConfirm: function (options) {
    //   //点击了键盘上的完成按钮
    //   let value = options.detail.value;
    //   console.log("点击了键盘上的完成按钮 " + value);
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      // 调用函数时，传入new Date()参数，返回值是日期和时间
      var time = util.formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      this.setData({
        time: time
      });
    },
    // getDate(){
     
    //        let time = new Date()
    //        let year = time.getFullYear()
    //        let mon  = time.getMonth() + 1
    //        let day  = time.getDate()
    //        let hour = time.getHours()
    //        let min  = time.getMinutes()
    //        let sec  = time.getSeconds()
        
    //        mon = mon >=  10 ? mon : "0" + mon
    //        day = day >=  10 ? day : "0" + day
    //        hour = hour >=  10 ? hour : "0" + hour
    //        min = min >=  10 ? min : "0" + min
    //        sec = sec >=  10 ? sec : "0" + sec
    //        return year + "-" + mon + "-" + day  + " " + hour + ":" + min + ":" + sec 
       

    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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