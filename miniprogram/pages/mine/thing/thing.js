const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    thinglist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'username',
      success: res => {
        app.globalData.username = res.data
        that.setData({
          username: res.data

        })
      }
    }),

      db.collection('userData').where({
        owner: app.globalData.username
      })
        .get({
          success: res => {
            that.setData({
              thinglist: res.data
            })
          }
        })
  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openid)
        var openid = res.result.openid;
        app.globalData.openid = res.result.openid;
        that.setData({
          openid: openid
        })
      }
    })
  },
  delete: function (event) {
    var id = event.currentTarget.dataset.id;
    const db = wx.cloud.database()
    db.collection('userData').doc(id).remove().then(res => {
      console.log(res)
    })
  },
  onPullDownRefresh: function () {
    var _this = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'wangkaijie-c2f3e1'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('userData').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          thinglist: res.data
        })
      }
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