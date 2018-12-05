// pages/casher/success/success.js
const app = getApp();
import Api from "../../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnModal: false
  },
  afterPay() {
    switch (this.data.type) {
      case "cloudXPL":
      case "cloudXLS":
        this.cloudPay();
        break;
    }
  },
  cloudPay() {
    let type = this.data.type;
    // let type = this.data.user.storeNature;
    let env = app.globalData.projectType;
    if (type == "cloudXPL") {
      //新批零
      if (env == 'xpl') {
        let toID = this.data.user.storeId;
        if (toID) {
          wx.setStorageSync("storeId", toID)
          app.globalData.switchStore = true;
          app.globalData.userShowTip = true;
          wx.switchTab({
            url: "../../page/user/user",
          })
        }
      } else {
        this.setData({
          toStatus: "xpl",
          returnModal: true
        })
      }
    } else if (type == "cloudXLS") {
      //新零售
      if (env == 'xls') {
        let toID = this.data.user.storeId;
        if (toID) {
          wx.setStorageSync("storeId", toID)
          app.globalData.switchStore = true;
          wx.switchTab({
            url: "../../page/user/user?layerText=请登陆购买账号后，点击小云店工作台初始化账户",
          })
        }
      } else {
        this.setData({
          toStatus: "xls",
          returnModal: true
        })
      }
    }
  },
  getUser() {
    Api.userInfor().then(res => {
      if (res.obj) {
        this.setData({
          user: res.obj
        })
        this.afterPay();
      }
    })
  },
  toUser() {
    wx.switchTab({
      url: "/pages/page/user/user",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.type) {
      return
    }
    this.setData({
      type: options.type
    })
    this.getUser();
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