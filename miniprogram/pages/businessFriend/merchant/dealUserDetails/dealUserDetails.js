import Api from '../../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    showMes: false,
    baseUrl: app.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMession: function (data) {
    var _this = this
    Api.cusNewDetails(data)
      .then(res => {
        var obj = res.obj
        if (obj != null) {
          _this.setData({
            buyAmount: obj.count.buyAmount,
            buyTimes: obj.count.buyTimes,
            recentBuy: obj.count.recentBuy,
            name: obj.user.name == null ? '' : obj.user.name,
            note: obj.user.note == null ? '' : obj.user.note,
            birthday: obj.user.birthday == null ? '' : obj.user.birthday,
            phone: obj.user.phone == null ? '' : obj.user.phone,
            headPic: obj.user.headPic == null ? '' : obj.user.headPic,
            nickName: obj.user.nickName == null ? '' : obj.user.nickName,
            wechart: obj.user.wechart == null ? '' : obj.user.wechart,
          })
        }
      })
  },
  onLoad: function (options) {
    var accept = options.accept
    this.setData({
      userId: accept
    })
    this.getMession({ userId: accept })
    if (options.code) {
      this.setData({
        showMes: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  urlHome: function () {
    wx.switchTab({
      url: '../../../page/home/home'
    })
  },
  passFunc: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})