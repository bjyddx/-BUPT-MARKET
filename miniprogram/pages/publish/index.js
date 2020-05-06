
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: ["请选择商品类型", "书籍", "电子产品", "其他", "体育用品"],
    objectArray: [
      {
        id: 0,
        name: '请选择商品类型'
      },
      {
        id: 1,
        name: '书籍'
      },
      {
        id: 2,
        name: '电子产品'
      },
      {
        id: 3,
        name: '其他'
      },
      {
        id: 4,
        name: '体育用品'
      }
    ],
    index:0,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function (e) {
    console.log('商品类型', e.detail.value)
    app.globalData.type = e.detail.value
    this.setData({
      index: e.detail.value//把当前的触摸的索引给expandTypeID
    })
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
submit: function(e){
  const db = wx.cloud.database()
  db.collection('userData').add({
    //数据赋值操作，微信小程序中“：”的意思就是赋值
    data: {
      name: e.detail.value.inputName,
      number: e.detail.value.inputNumber,
      price: e.detail.value.inputPrice,
      type: app.globalData.type,
      description: e.detail.value.inputDescription,
      email: e.detail.value.inputEmail,
      wechat: e.detail.value.inputWechat,
      bigImg:new Array(app.globalData.fileID)

    },
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      this.setData({
        name: e.detail.value.inputName,
        number: e.detail.value.inputNumber,
        price: e.detail.value.inputPrice,
        type: app.globalData.type,
        description: e.detail.value.inputDescription,
        email: e.detail.value.inputEmail,
        wechat: e.detail.value.inputWechat,
        bigImg: new Array(app.globalData.fileID)    


      })
      wx.showToast({
        title: '用户录入成功',
        icon: 'success',
        duration: 2000
      }); 
      setTimeout(() => {
        wx.switchTab({
          url: '../../pages/index/index',

        })
      }, 1000)
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      });
      setTimeout(() => {
        wx.switchTab({
          url: '../../pages/publish/index',

        })
      }, 1000)
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
  
    