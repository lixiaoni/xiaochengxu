// pages/cloudOrder/congratulation/congratulation.js
const Api = require("../../../utils/api.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: app.globalData,
  },
  getStore() {
    Api.storeIdInfo().then(res => {
      this.setData({
        cName: res.obj.store[0].store.name
      })
    })
  },
  toStore() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var store = wx.getStorageSync('storeId');
    this.setData({
      storeID: store
    })
    this.getStore();
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