// pages/set/set.js
const app = getApp();
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: ""
  },

  quit() {

    API.quit({ accesstoken: this.data.token}).then((res) => {
      wx.showToast({
        title: res.message,
        icon: "none"
      })
      app.authHandler.flushTokenInfo();
      this.setData({
        token: ""
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 800)
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync('access_token')
    if (token) {
      this.setData({
        token
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

})