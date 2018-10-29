import Api from '../../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    value: '',
    baseUrl: app.globalData.imageUrl,
    totalCount: 0
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
  changeValue: function (e) {
    var val = e.detail.value
    this.setData({
      value: val
    })
  },
  searchBtn: function (e) {
    var val = this.data.value
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      detailList: []
    })
    this.getList({keyword: val })
  },
  getList: function (data) {
    var _this = this
    Api.favoriteusers(data)
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
        } else {
          wx.showToast({
            title: '暂无更多了',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }

      })
  },
  onShow: function () {
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      detailList: []
    })
    this.getList()
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
    this.setData({
      detailList: [],
      value: ''
    })
    app.pageRequest.pageData.pageNum = 0
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var val = this.data.value
    if (val == '') {
      this.getList()
    } else {
      this.getList({keyword: val })
    }
  },

})