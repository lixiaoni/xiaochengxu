import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followNum: 0,
    payOrders: 0,
    todaySaleNum: 0,
    unshippedOrders: 0,
    verifyFriends:0,
    unshippedPurchaseOrders:0,
    payPurchaseOrders:0
  }, 
  goHome: function () {
    wx.switchTab({
      url: '../../page/home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.storeId) {
      wx.setStorageSync("storeId", options.storeId)
    }
    if (!Api.isEmpty(wx.getStorageSync("access_token"))){
      wx.switchTab({
        url: '../../home/home'
      })
    }
    this.getMes()
  },
  goDerm:function(){
    wx.navigateTo({
      url: '../../page/storeIcon/storeIcon',
    })
  },
 getMes:function(){
   var _this=this
   Api.storeIndex()
   .then(res=>{
     var obj=res.obj
     _this.setData({
       followNum: obj.followNum,
       payOrders: obj.payOrders,
       unshippedPurchaseOrders: obj.unshippedPurchaseOrders,
       payPurchaseOrders: obj.payPurchaseOrders,
       todaySaleNum: obj.todaySaleNum,
       unshippedOrders: obj.unshippedOrders,
       verifyFriends: obj.verifyFriends,
     })
   })
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