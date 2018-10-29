const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeId :123,
    customCategoryCode :'',
    pageNum:1,
    pageSize :20,
    result: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      customCategoryCode: options.customCategoryCode
    })
    var _this = this,
      storeId = this.data.storeId,
      customCategoryCode = this.data.customCategoryCode,
      pageNum = this.data.pageNum,
      pageSize = this.data.pageSize
    app.http.getRequest('/admin/shop/goods/findUnderStoreGoodsByCustomCategoryCode/' + storeId + '?customCategoryCode=' + customCategoryCode + '&pageNum=' + pageNum + '&pageSize=' + pageSize)
      .then(res => {
        const obj = res.obj
        _this.setData({
          result: obj.result
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