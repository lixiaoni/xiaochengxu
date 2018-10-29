import Api from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waitPass: 0,
    waitVerify: 0,
    purchaserNumber: 0,
    buyPurchasers:0,
    buyUsers:0,
    followUsers:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInfo: function () {
    var _this = this
    Api.merchantIndex()
      .then(res => {
        var obj = res.obj
        _this.setData({
          waitPass: obj.waitPass,
          waitVerify: obj.waitVerify,
          purchaserNumber: obj.purchaserNumber,
          buyPurchasers: obj.buyPurchasers,
          buyUsers: obj.buyUsers,
          followUsers: obj.followUsers
        })
      })
  },
  onLoad: function (options) {
    this.getInfo()
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
  addWholesaler: function () {
    wx.navigateTo({
      url: '../addMerchant/addMerchant',
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


})