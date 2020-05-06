// miniprogram/pages/types/electronic/electronic.js
const db = wx.cloud.database()
const book = db.collection('userData')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sportlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    db.collection('userData').where({
      type: "4"
    })
      .get({
        success: res => {
          this.setData({
            sportlist: res.data
          })
        }
      })
  },
  goDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../sportdetail/sportdetail?id=' + id
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