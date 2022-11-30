// pages/index/index.js
const chooseLocation = requirePlugin('chooseLocation');
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图配置
    autoplay: true,
    interval: 2000,
    duration: 1200,
    storeMessage: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var data = {
      "datas": [{
          "id": 1,
          "imgurl": "../../images/0600c33ee0b26b7c4312bf420bbdaa2.jpg"
        },
        {
          "id": 2,
          "imgurl": "../../images/1be867f3843c7d93668f1b0da773163.jpg"
        },
        {
          "id": 3,
          "imgurl": "../../images/581532276d73327d3803a4d9268a5e1.jpg"
        },
        {
          "id": 4,
          "imgurl": "../../images/5899a0aa6d12bc8f22cb0f90ebc0f1d.jpg"
        }
      ]
    };
    that.setData({
      lunboData: data.datas
    })


  },
  menu() {
    wx.navigateTo({
      url: '/pages/index-menu/index-menu',
    })
  },
  change() {
    const key = 'BM5BZ-MSK64-B6JUP-XD4LB-6XZOT-FWFXG'; //使用在腾讯位置服务申请的key
    const referer = 'UnderseaFishing'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: 23.533186,
      longitude: 113.589137
    });
    const category = '海底捞';
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category,
    });

  },
  activity() {
    wx.navigateTo({
      url: '/pages/index-activity/index-activity',
    })
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const location = chooseLocation.getLocation();
    if (location != null) {
      this.setData({
        storeMessage: {
          ...location
        }
      })
    } else {
      this.setData({
        storeMessage: {
          address: "广东省广州市从化区江浦街从大道111号-113号欣荣广场A区A栋二层201号商铺",
          city: "广州市",
          district: "从化区",
          latitude: 23.533186,
          longitude: 113.589137,
          name: "欣荣广场店",
          province: "广东省",
        }
      })
    }



    wx.cloud.database().collection('door-detail').get().then(res => {
      if (res.data.length < 1) {
        db.collection('door-detail').add({
          data: {
            storeMessage: this.data.storeMessage,
            isCanRun:'isRun'
          }
        })
      } else {
    
        db.collection('door-detail').where({
          isCanRun:'isRun'
        }).update({
          data: {
            storeMessage: this.data.storeMessage
          }
        });
      }
    }).catch(err => {
      console.log('请求数据失败', err);
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    chooseLocation.setLocation(null);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})