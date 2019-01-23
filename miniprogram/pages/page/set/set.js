// pages/set/set.js
const app = getApp();
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    closeBall: app.globalData.returnBall.show
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
  switchBallChange(){
    let now = app.globalData.returnBall.show;
    this.setData({
      closeBall: !now 
    })   
    app.globalData.returnBall.show = !now
    if(!now == true){
      app.globalData.returnBall.x = 1000;
      app.globalData.returnBall.y = 50;
    }
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
    this.setData({
      closeBall: app.globalData.returnBall.show
    })
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