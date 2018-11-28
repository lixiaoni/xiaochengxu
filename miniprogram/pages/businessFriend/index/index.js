import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waitPass:0,
    waitVerify:0,
    merchantNumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInfo:function(){
    var _this=this
    Api.index()
    .then(res=>{
      var obj=res.obj
      _this.setData({
        waitPass: obj.waitPass,
        waitVerify: obj.waitVerify,
        merchantNumber: obj.merchantNumber
      })
    })
  },
  onLoad: function (options) {
    if (!Api.isEmpty(authHandler.isLogin())){
      var pages = getCurrentPages();             //  获取页面栈
      var currPage = pages[pages.length - 1];
      var prevPage = pages[pages.length - 2];    // 上一个页面
      prevPage.setData({
      })
      wx.navigateBack({
        data: 1
      })
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
  onShow: function () {
    this.getInfo()
  },
  addWholesaler:function(){
    wx.navigateTo({
      url: '../addWholesaler/addWholesaler',
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


})