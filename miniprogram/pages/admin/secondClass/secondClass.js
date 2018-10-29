const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
        parentCategoryCode =options.code,
        name = options.name
    that.setData({
      name:name
    })
    app.http.getRequest('/admin/shop/category/sublist/{{parentCategoryCode}}',{ parentCategoryCode:parentCategoryCode})
      .then(res => {
        const obj = res.obj
        that.setData({
          dataList: obj
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