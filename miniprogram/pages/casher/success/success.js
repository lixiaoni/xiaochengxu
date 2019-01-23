// pages/casher/success/success.js
const app = getApp();
import Api from "../../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: app.globalData,
    returnModal: false,
    secTime: 5,
    waitStatus: true
  },
  afterPay() {
    if (this.data.waitStatus) {
      return
    }
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
          wx.switchTab({
            url: "../../page/user/user",
          })
        }
      } else {
        this.setData({
          toStatus: "xpl",
          returnModal: true,
          storeId: this.data.user.storeId
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
            url: "../../page/user/user?layerText=请登陆购买账号后，点击我的工作台初始化账户",
          })
        }
      } else {
        this.setData({
          toStatus: "xls",
          returnModal: true,
          storeId: this.data.user.storeId
        })
      }
    }
  },
  toMyStoreXPl(){
    app.navigate.toInit(app.globalData.navigateToAppID.xpl, this.data.storeId).then(res => {
      this.toUser();
    })
  },
  toMyStoreXLS(){
    app.navigate.toInit(app.globalData.navigateToAppID.xls, this.data.storeId).then(res => {
      this.toUser();
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
  toUser() {
    wx.switchTab({
      url: "/pages/page/home/home",
    })
  },
  //倒计时
  startTimeout() {
    wx.showLoading({
      title: this.data.loadText ? this.data.loadText : '加载中',
    })
    let sec = this.data.secTime;
    let timmer = setInterval(() => {
      sec--
      if (sec == 0) {
        wx.hideLoading();
        clearInterval(timmer);
        this.afterTimer();
        Api.userInfor().then(res => {
          if (res.obj) {
            this.setData({
              user: res.obj
            })
            this.setData({
              waitStatus: false
            })
          }
        })
      }
    }, 1000)
  },
  afterTimer() {
    switch (this.data.type) {
      case "cloudXPL":
      case "cloudXLS":
        wx.navigateTo({
          url: '../../cloudOrder/webInitStore/webInitStore',
        })
        break;
    }
  },
  switchType() {
    let obj = {};
    switch (this.data.type) {
      case "cloudXPL":
      case "cloudXLS":
        obj.btnText = '开启' + app.globalData.projectName +'之旅';
        obj.loadText = "正在开启哦~";
        break;
    }
    this.setData(obj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type ? options.type : "",
      price: options.price ? options.price : false
    })
    this.switchType();
    this.startTimeout();
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