// miniprogram/pages/mine/index.js
var _app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    menuitems: [
      { text: '已发布的商品', url: 'thing/thing', icon: '/images/gouwuche.png',  arrows: '/images/jiantou.png' },
      { text: '已发布的帖子', url: 'question/question', icon: '/images/qingdan.png',  arrows: '/images/jiantou.png' },
      { text: '帮助说明', url: 'help/help', icon: '/images/bangzhu.png', arrows: '/images/jiantou.png' },
      { text: '常见问题', url: 'wenti/wenti', icon: '/images/sys06.png', arrows: '/images/right.png' },
      { text: '联系客服', url: 'kefu/kefu', icon: '/images/sys05.png', arrows: '/images/right.png' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect");
    this.setData({
      userinfo,
      collectNums: collect.length
    })
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