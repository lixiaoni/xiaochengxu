const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    storeId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        value: options.value,
        storeId: options.storeId,
      })
  },
  changeValue: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  updateMes: function () {
    var floorObj = {}
    floorObj.storeDoorNum = this.data.value;
    floorObj.storeId = this.data.storeId;
    App.http.postRequest("/api/floor/store/addorupdate", floorObj)
      .then(res => {
        var pages = getCurrentPages();             //  获取页面栈
        var currPage = pages[pages.length - 1];
        var prevPage = pages[pages.length - 2];    // 上一个页面
        prevPage.setData({
          code: 0
        })
        wx.navigateBack({
          data: 1
        })
      })
      .catch(e => {
        wx.showToast({
          title: e.message,
          icon: 'none'
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})