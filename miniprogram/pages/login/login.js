// pages/login/login.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    mobile: '',//用户名或者手机号
    pass: ''//密码
  },
  // 授权登录,这里我是先让用户授权才登录的，不需要的也可以直接放个登录按钮，不授权登录
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.showLoading({
        title: '正在登录...',
      })
      if (this.data.mobile == '') {
        wx.showToast({
          title: '用户名不能为空',
          icon: 'none',
          duration: 2000
        })
      } else if (this.data.pass == '') {
        wx.showToast({
          title: '密码不能为空',
          icon: 'none',
          duration: 2000
        })
      } else {
        var that = this
        // 登录接口
        var parame = {}
        parame = {
          username: this.data.mobile
        }
        
        db.collection('login_info').where(parame)//查询语句
          .get({
            success: function (res) {
              wx: wx.hideLoading();
              if (res.data == '') {//为空说明没有查到数据
                wx.showToast({
                  title: '用户不存在',
                  icon: 'none',
                  duration: 3000
                })
              } else {//不为空说明查询到数据了
                if (res.data[0].pass1 == that.data.pass) {//查询到数据后再判断用户输入的密码是否正确
                  wx.showToast({
                    title: '登录成功',
                    icon: 'none',
                    duration: 3000
                  })
                  
                  wx.setStorage({ //存储用户名
                    key: 'username',
                    data: that.data.mobile,
                  })
                  wx.setStorage({//存储用户的信息id，作为userId
                    key: 'userId',
                    data: res.data[0]._id,
                  })
                  wx.switchTab({
                    url: '../index/index',
                  })
                  // 这里还可以写一些登录成功后的操作，比如登录成功后跳转到首页之类的
                } else {
                  wx.showToast({
                    title: '密码错误',
                    icon: 'none',
                    duration: 3000
                  })
                }
              }
            }
          })
      }
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进行账号登录，请授权之后再登录!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) { }
      })
    }
  },
  // 用户名失焦
  mobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 密码失焦
  pass(e) {
    this.setData({
      pass: e.detail.value
    })
  },
  // 记住密码复选框
  checkboxChange: function (e) {
    this.setData({
      isrememberpass: e.detail.value
    })
  },
  // 点击注册按钮，跳转到注册页面
  register() {
    wx.navigateTo({
      url: "/pages/register/register"
    })
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
  onShow: function () {//这一段是登录界面初始进入页面时，判断如果没有缓存密码，就说明没有记住密码，只需要显示用户名就行了，如果缓存了密码，说明是记住密码的，要从缓存中获取用户名和密码都显示出来
    if (wx.getStorageSync('pass') != '') {
      var check = 'items.[0].checked'
      this.setData({
        mobile: wx.getStorageSync('username'),
        pass: wx.getStorageSync('pass'),
        [check]: true,
        isrememberpass: ["1"]
      })
    } else {
      this.setData({
        mobile: wx.getStorageSync('username'),
      })
    }
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

