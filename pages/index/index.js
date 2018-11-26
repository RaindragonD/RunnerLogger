//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    nickName: null,
    distance: null,
    speed: "0:00",
    tip: undefined,
    disabled: false,
    pickerColor: "grey",
    totalDistance:0
  },

  bindSpeedChange: function (e) {
    this.setData({
      speed: e.detail.value,
      pickerColor: "black"
    })
  },

  formSubmit: function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    var rsNum = regNum.exec(e.detail.value.dis);
    if (e.detail.value.nick.length == 0 ||
    e.detail.value.dis.length == 0 ||
    e.detail.value.speed.length == 0) {
      this.setData({
        tip: '没填全==',
      })
    } else if(!rsNum) {
      this.setData({
        tip: e.detail.value.dis+' 是多少km==',
      })
    }
    else{
      this.submitData(e);
    }
  },

  submitData: function (e) {
    var data = {
      nickName: e.detail.value.nick,
      distance: e.detail.value.dis,
      speed: e.detail.value.speed
    };
    var time = util.formatTime(new Date());
    var postRef = this.ref.child(time);
    postRef.push(data);

    var nickName = data.nickName;
    var newDistance = parseFloat(data.distance);
    var oldDistance;
    var totalDistance = newDistance;
    var userData = this.ref.child("users").child(nickName);
    userData.once('value', function (snapshot, prev){
      try{
          oldDistance = parseFloat(snapshot.val().totalDistance);
          totalDistance = oldDistance + newDistance
      }catch(err){
      }
      userData.set({
        totalDistance: totalDistance
      })
    });
    

    this.setData({
      nickName: '',
      distance: '',
      speed: '',
      tip: '已提交，感谢',
      disabled: true,
      pickerColor: "grey"
    })
  },

  formReset: function(e){
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      pickerColor: "grey"
    })
  },

  useUser: {
    userInfo: {}
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShareAppMessage: function () {
    return {
      title: '十一马帮打卡',
      desc: '打卡',
      path: '/page/user?id=123'
    }
  },
  
  onLoad: function () {
    console.log('onLoad')
    this.ref = app.getDataList();
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
