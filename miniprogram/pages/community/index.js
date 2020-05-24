const db = wx.cloud.database()
const book = db.collection('discussion')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discussionlist: []
   
  },
  img: function () {
    wx.navigateTo({
      url: 'discuss/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    db.collection('discussion')

      .get({
        success: res => {
          this.setData({
            discussionlist: res.data
          })
        }
      })
  },

  goDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../discussiondetail/discussiondetail?id=' + id
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
  // 拉取数据

  //获取数据
 
  onPullDownRefresh: function () {
    var _this = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'wangkaijie-c2f3e1'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('discussion').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          discussionlist: res.data
        })
      }
    })
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