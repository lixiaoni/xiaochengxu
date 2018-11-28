// pages/cloudOrder/myOrder/myOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getData() {
    console.log(wx.getStorageInfoSync("access_token"));
    let wo = wx.getStorageSync("access_token");
    if(!wo){
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      return
    }
    wx.request({
      url: 'https://dev-mall.youlife.me/api/yunstore/order/user/page/orderstatus/all',
      header:{
        Authorization: "bearer "+wo
      },
      success: (res)=>{
        this.setData({
          list: res.data.obj.result
        })
      }
    })
    // app.http.getRequest("/api/yunstore/order/user/page/orderstatus/all").then(res => {
    //   // wx.showToast({
    //   //   title: res.message,
    //   //   icon:'none'
    //   // })
    //   if (res.success) {
    //     this.setData({
    //       msg: res.obj.result
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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