const app = getApp();
import Api from '../../../utils/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    customCategoryCode: '',
    result: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getList:function(){
    var _this = this,
      customCategoryCode = this.data.customCategoryCode
    Api.classCodeList({ customCategoryCode: customCategoryCode })
      .then(res => {
        var detailList = res.obj.result,
          datas = _this.data.result,
          newArr = app.pageRequest.addDataList(datas, detailList)
        _this.setData({
          result: newArr,
        })
      })
  },
  onLoad: function (options) {
    app.pageRequest.pageData.pageNum = 0
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      customCategoryCode: options.code
    })
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
      result:[]
    })
    this.getList()
  },

})