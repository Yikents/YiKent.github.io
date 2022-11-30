// pages/userDetail.js
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    endDate: new Date(),
    userData: {},
    gender: ''
  },

  getUserData() {
    db.collection('userData').get({
      success: res => {
        console.log(res.data[0])
        this.setData({
          userdata: res.data[0]
        })
      }
    })
  },

  getGender(e) {
    console.log(e.detail.value)
    this.setData({
      gender: e.detail.value
    })
  },

  save() {
    if (this.data.date) {
      db.collection('userData').doc('a07d70686368f4960040c3ed33e2610d').update({
        data: {
          gender: this.data.gender,
          birthday: this.data.date
        },
        success: res => {
          console.log(res)
        }
      })
    } else {
      db.collection('userData').doc('a07d70686368f4960040c3ed33e2610d').update({
        data: {
          gender: this.data.gender,
        },
        success: res => {
          console.log(res)
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserData()
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