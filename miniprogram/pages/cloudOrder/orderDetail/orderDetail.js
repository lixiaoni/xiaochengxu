// pages/cloudOrder/orderDetail/orderDetail.js
const app = getApp();
const Api = require("../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: app.globalData,
    returnModal: false
  },
  gotoStore() {

  },
  getData() {
    app.http.getRequest('/admin/yunstore/order/' + this.data.num).then(res => {
      this.setData({
        msg: res.obj
      })
    })
  },
  buy() {
    wx.navigateTo({
      url: '../../casher/casher?num=' + this.data.num + '&type=cloud'
    })
  },
  getUser() {
    Api.userInfor().then(res => {
      if (res.obj) {
        this.setData({
          user: res.obj
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.num
    })
    this.getUser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
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