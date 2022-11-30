// pages/index-activity/index-activity.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list:[
        {
          id:1,
          title: "价值观",
          image:"../../images/download1.jpg",
          header:'价值观使命',
          text:'通过精心挑选的产品和创新的服务,创造欢乐火锅时光,向世界各国美食爱好者传递健康火锅饮食文化。',
          type:0
          
        },
        {
          id: 2,
          title:"使命",
          image: "../../images/download2.jpg",
          header:'使命',
          text:'一个中心：双手改变命运;两个基本点：以顾客为中心，以“勤奋者”为本。',
          type:1
        },
        {
          id: 3,
          title: "内涵",
          image:'../../images/download3.jpg' ,
          text:'倡导平等，充分授权；学习进取，持续创新；自我批判，三思而行；诚实守信，敢于负责；与人为善，知恩图报；充满激情，团队合作。',
          header:'内涵',
          type:2
        },
        {
          id: 4,
          title: "品质",
          header:'品质',
          image: '../../images/download4.jpg',
          text:'诚信、创新、谦虚、勤奋、激情、与人为善、责任感',
          type:3
        },
      ],
    

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    jumpRouterEvent(){
      wx.switchTab({
        url: '/pages/index/index',
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