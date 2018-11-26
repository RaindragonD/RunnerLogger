// pages/Rank/Rank.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

  data: {
    listData:[]
  },

  onLoad: function(){
    var i=1;
    var that=this;
    var time = util.formatTime(new Date());
    this.ref = app.getDataList().child(time);
    this.ref.orderByChild("distance").on("child_added", function (snapshot) {
      var obj = {
        "index": i, "nickName": snapshot.val().nickName, "distance": parseFloat(snapshot.val().distance), "speed": snapshot.val().speed};
      i++;
      that.data.listData.push(obj);
      that.setData({ listData: that.data.listData });
      that.orderTable()
    });
  },

  orderTable: function(){
    var that = this;
    var copy = that.data.listData;
    var preDis, postDis, preName, postName, preSpeed, postSpeed;
    for (var j = 0; j < copy.length; j++) {
      var i = 1;
      while (i < copy.length) {
        preDis = copy[i - 1].distance;
        postDis = copy[i].distance;
        preName = copy[i - 1].nickName;
        postName = copy[i].nickName;
        preSpeed = copy[i - 1].speed;
        postSpeed = copy[i].speed;
        if (postDis > preDis
        || (postDis==preDis&&postSpeed<preSpeed)) {
          copy[i - 1].nickName = postName;
          copy[i - 1].distance = postDis;
          copy[i - 1].speed = postSpeed;
          copy[i].nickName = preName;
          copy[i].distance = preDis;
          copy[i].speed = preSpeed;
        }
        i++;
      }
    }
    that.setData({
      listData: copy
    });
  },
  onShareAppMessage: function () {
    return {
      title: '十一马帮打卡',
      desc: '打卡',
      path: '/page/user?id=123'
    }
  }
  
})