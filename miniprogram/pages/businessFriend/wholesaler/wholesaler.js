import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    value: '',
    totalCount:0,
    baseUrl: app.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  changeValue:function(e){
    var val = e.detail.value
    this.setData({
      value:val
    })
  },
  initData:function(){
    app.pageRequest.pageData.pageNum = 0
    var _this=this
    this.setData({
      detailList: [],
    }, function () {
      _this.getList()
    })
  },
  searchBtn: function (e) {
    var val = this.data.value
    if(!val){return}
    this.initData()
  },
  getList: function (nextPage) {
    var _this = this,
     val = this.data.value
    Api.wholesalerAll({ keyword: val }, nextPage)
      .then(res => {
        var detailList = res.obj.result,
          totalCount = res.obj.totalCount
        _this.setData({
          totalCount: totalCount
        })
        if (detailList != null) {
          var datas = _this.data.detailList,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            detailList: newArr,
          })
        }else{
          Api.showToast("暂无更多数据了！")
        }
      })
  },
  onShow: function () {
    this.initData()
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
    wx.stopPullDownRefresh();
    this.initData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList(true)
  },

})