// tRank.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var i = 1;
    var that = this;
    this.ref = app.getDataList().child("users");
    this.ref.orderByChild("totalDistance").on("child_added", function (snapshot) {
      console.log(snapshot.val());
      var obj = {
        "index": i, "nickName": snapshot.key(), 
        "distance": parseFloat(snapshot.val().totalDistance)};
      i++;
      that.data.listData.push(obj);
      that.setData({ listData: that.data.listData });
      that.orderTable()
    });
  },

  orderTable: function () {
    var that = this;
    var copy = that.data.listData;
    var preDis, postDis, preName, postName
    for (var j = 0; j < copy.length; j++) {
      var i = 1;
      while (i < copy.length) {
        preDis = copy[i - 1].distance;
        postDis = copy[i].distance;
        preName = copy[i - 1].nickName;
        postName = copy[i].nickName;
        if (postDis > preDis) {
          copy[i - 1].nickName = postName;
          copy[i - 1].distance = postDis;
          copy[i].nickName = preName;
          copy[i].distance = preDis;
        }
        i++;
      }
    }
    that.setData({
      listData: copy
    });
  },
})