const app = getApp();
import Api from '../../../utils/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    customCategoryCode: '',
    result: [],
    baseUrl: app.globalData.imageUrl,
    allCode:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getList: function () {
    var _this = this,
      allCode = this.data.allCode,
      customCategoryCode = this.data.customCategoryCode
    if (!allCode){
      Api.goodsApiSearchList({ customCategoryCode: customCategoryCode })
        .then(res => {
          var detailList = res.obj.result,
            datas = _this.data.result
          if (detailList.length>0){
            var newArr = app.pageRequest.addDataList(datas, detailList)
            _this.setData({
              result: newArr,
            })
          }
        })
    }else{
      Api.goodsApiSearchList()
        .then(res => {
          var detailList = res.obj.result,
            datas = _this.data.result,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            result: newArr,
          })
        })
    }
   
  },
  onLoad: function (options) {
    app.pageRequest.pageData.pageNum = 0
    wx.setNavigationBarTitle({
      title: options.name
    })
    if (options.allCode){
      this.setData({
        allCode:true
      })
    }else{
      this.setData({
        customCategoryCode: options.code
      })
    }
    this.getList()
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
    this.setData({
      limitShow: wx.getStorageSync('admin')
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
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      result: []
    })
    this.getList()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  },

})