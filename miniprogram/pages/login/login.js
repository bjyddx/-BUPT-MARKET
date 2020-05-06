// miniprogram/pages/login/login.js
// pages/login/login.js
let app = getApp();
// 获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('user');//注意，这里就是刚才的集合的名字——user
let name = null;//变量，用于存放用户输入的账号
let password = null;//变量，用于存放用户输入的密码

Page({

  /**
  * 页面的初始数据
  */
  data: {

  },
  //输入用户名
  inputName: function (event) {
    name = event.detail.value//将用户输入的账号放到变量里面
  },
  //输入密码
  inputPassword(event) {
    password = event.detail.value//将用户输入的密码放到变量里面
  },
  //登陆函数
  login() {
    let that = this;
    //登陆获取用户信息
    admin.get({
      success: (res) => {
        let user = res.data;
        console.log(res.data);
        for (let i = 0; i < user.length; i++) { //遍历数据库对象集合
          if (name === user[i].account) { //用户名存在
            if (password !== user[i].password) { //判断密码是否正确
              wx.showToast({
                title: '密码错误！！',
                icon: 'none',
                duration: 2500
              })
            } else {
              console.log('登陆成功！')
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 5000
              })

              wx.switchTab({
                url: '/pages/index/index',//这里是成功登录后跳转的页面
              })
            }
          } else { //不存在
            wx.showToast({
              title: '无此用户名，请前往注册！！',
              icon: 'none',
              duration: 1500
            })
          }
        }
      }
    })
  }
})