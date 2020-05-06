// miniprogram/pages/mine/thing/thing.js

const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    thinglist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();
    db.collection('userData').where({
      openid: app.globalData.openid
    })
      .get({
        success: res => {
          this.setData({
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