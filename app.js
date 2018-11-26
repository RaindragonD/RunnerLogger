//app.js
var wilddog = require('wilddog-weapp-all')

App({
  onLaunch: function() {
    var config = {
      syncURL: 'https://bndsrg.wilddogio.com/',
      authDomain: 'bndsrg.wilddog.com'
    }
    wilddog.initializeApp(config)
    wilddog.auth().signInWeapp().then(function (user) {

    }).catch(function (err) {

    })
    this.ref = wilddog.sync().ref() 
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  
  getDataList: function () {
    return this.ref
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  
  globalData: {
    userInfo: null
  }
})
