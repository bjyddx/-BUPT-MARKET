
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


  goDetail: function (event) {
    var id= event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../bookdetail/bookdetail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})

