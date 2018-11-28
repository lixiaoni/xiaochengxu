// pages/derm/derm.js
const app = getApp();
import Api from '../../../utils/api.js';
import util from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.imageUrl,
    urlCode:''
  },
  saveImg() {
    if (this.data.urlCode) {
      let imgUrl = this.data.baseUrl + this.data.urlCode;
      util.saveImgToPhone(imgUrl)
    } else {
      wx.showToast({
        title: '暂无二维码',
        icon: 'none'
      })
    }
  },
  share() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.storeId) {
      wx.setStorageSync("storeId", options.storeId)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var _this=this
    var storeId = Api.getThisStoreId()
    Api.miniProgramCode({ storeId: storeId})
    .then(res=>{
      var obj = res.obj.miniProgramCode
      _this.setData({
        urlCode: obj
      })
    })
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
  onShareAppMessage: function (res) {
    
  }
})