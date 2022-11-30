const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCompleted: false,
    isCancel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let IndexBuildChannel = this.getOpenerEventChannel();
    let self = this;
    IndexBuildChannel.on('acceptMyOrderData', function (data) {
      let result = data.data;
      let arr = result.cart;
      let potData = arr.filter(it => {
        return it.judge == 'pot';
      })
      let vegeData = arr.filter(it => {
        return it.judge != 'pot'
      })
      self.setData({
        vegeData,
        potData,
        renderData: result
      })
      console.log(data.data);

    })
  },
  jumpRouterEvent() {
    wx.navigateBack({
      delta: 0,
    });
  },
  confirmPayEvent() {
    db.collection('order-data').doc(`${this.data.renderData._id}`).update({
      data: {
        status: 'completed'
      }
    });
    this.setData({
      isCompleted: true
    })
    wx.showToast({
      title: '支付成功',
    })
  },
  cancelOrderEvent() {
    db.collection('order-data').doc(`${this.data.renderData._id}`).update({
      data: {
        status: 'cancelOrder'
      }
    });
    this.setData({
      isCompleted: true,
      isCancel:true
    })
    wx.showToast({
      title: '订单已取消',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})