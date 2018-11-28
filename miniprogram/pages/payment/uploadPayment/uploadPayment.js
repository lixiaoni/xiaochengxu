// pages/payment/uploadPayment/uploadPayment.js
const app = getApp();
let Api = require("../../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUser:false,
    storeID: wx.getStorageSync('storeId'),
    baseUrl: app.globalData.imageUrl
  },
  getStoreImg(){
    Api.getPaymentImg().then(res=>{
      if(res.obj){
        this.setData({
          imgUrl: res.obj
        })
      }else{
      }
      this.setData({
        getUser: true
      })
    })
  },
  
  upload(){
    app.http.onlychoseImg().then(res=>{
      Api.toCuttingImg(res.tempFilePaths[0])
    });
  },
  afterCuttingImg(res){
    app.http.onlyUploadImg(res,"STORE_RECEIPT_CODE").then(res=>{
      var url = JSON.parse(res).obj
      if (url){
        Api.putPaymentImg({ receiptCode:url}).then(res=>{
          wx.showToast({
            title: res.message,
            icon:'none'
          })
          this.setData({
            imgUrl: url
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getStoreImg();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})