
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: ["请选择帖子类型", "商品推荐", "商品吐槽", "相关问题", "其他"],
    objectArray: [
      {
        id: 0,
        name: '请选择帖子类型'
      },
      {
        id: 1,
        name: '商品吐槽'
      },
      {
        id: 2,
        name: '相关问题'
      },
      {
        id: 3,
        name: '其他'
      },
      {
        id: 4,
        name: '商品推荐'
      }
    ],
    index: 0,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function (e) {
    console.log('帖子类型', e.detail.value)
    app.globalData.type = e.detail.value
    this.setData({
      index: e.detail.value//把当前的触摸的索引给expandTypeID
    })
  },

  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        app.globalData.username = res.data
        that.setData({
          username: res.data

        })
      }
    })
  },
  changeBigImg() {
    let that = this;
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            if (res.fileID) {
              that.setData({
                imgurl: res.fileID
              })
            }
            that.setData({
              bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            let fileID = res.fileID;


          },
          fail: err => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },
  submit: function (e) {
    const db = wx.cloud.database()
    db.collection('discussion').add({
      //数据赋值操作，微信小程序中“：”的意思就是赋值
      data: {
        title: e.detail.value.title,
        content: e.detail.value.content,
        type: app.globalData.type,
        bigImg: new Array(app.globalData.fileID),
        owner: app.globalData.username

      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          title: e.detail.value.title,
          content: e.detail.value.content,
          type: app.globalData.type,
          bigImg: new Array(app.globalData.fileID),
          owner: app.globalData.username

        })
        wx.showToast({
          title: '用户录入成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(() => {
          wx.switchTab({
            url: '../../community/index',

          })
        }, 1000)
        //发完贴1秒自动跳转到帖子列表页
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },

      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        });
        setTimeout(() => {
          wx.switchTab({
            url: '../../community/index',

          })
        }, 1000)
        //发完贴1秒自动跳转到帖子列表页
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

  },
  clearInputEvent: function (res) {
    data: {
      inputValue: null
    }
    this.setData({
      'inputValue': ''
    })
  },


  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})

