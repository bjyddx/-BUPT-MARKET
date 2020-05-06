
const db = wx.cloud.database();//初始化数据库
const good = db.collection('userData')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: "",
    //搜索过后商品列表
    goodList: []
  },
  input(e) {
    this.setData({
      searchVal: e.detail.value
    })
    console.log(e.detail.value)
  },
  clear: function () {
    this.setData({
      searchVal: ""
    })
  },
  //商品关键字模糊搜索
  search: function () {
    wx: wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    //重新给数组赋值为空
    this.setData({
      'goodList': []
    })
    // 数据库正则对象
    db.collection('userData').where({
      name: db.RegExp({
        regexp: this.data.searchVal,//做为关键字进行匹配
        options: 'i',//不区分大小写
      })
    })
      .get().then(res => {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          var name = "goodList[" + i + "].name"
          var id = "goodList[" + i + "].id"
          var image = "goodList[" + i + "].image"
          var price = "goodList[" + i + "].price"
          var description = "goodList[" + i + "].description"
          this.setData({
            [name]: res.data[i].name,
            [id]: res.data[i]._id,
            [image]: res.data[i].bigImg[0],
            [price]: res.data[i].price,
            [description]: res.data[i].description,
          })
          console.log(this.data.goodList[i].content)
          wx.hideLoading();
        }
      }).catch(err => {
        console.error(err)
        wx.hideLoading();
      })
  },
  onLoad: function (options) {
    var _this = this;
    db.collection('userData')
    
      .get({
        success: res => {
          this.setData({
            goodList: res.data
          })
        }
      })
  },
  goDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id=' + id
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
          goodList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})

