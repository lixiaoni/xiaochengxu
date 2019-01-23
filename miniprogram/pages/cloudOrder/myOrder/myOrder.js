// pages/cloudOrder/myOrder/myOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getData() {
    let storeId = wx.getStorageSync("storeId");
    app.http.getRequest("/admin/yunstore/order/store/" + storeId + "/page").then(res => {
      this.setData({
        list: res.obj.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getData()
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