import Api from '../../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    send: wx.getStorageSync('storeId'),
    baseUrl: app.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getList: function (data) {
    var _this = this
    Api.newMerchant(data)
      .then(res => {
        var detailList = res.obj.result
        if (detailList != null) {
          for (var i = 0; i < detailList.length;i++){
            var greet = (detailList[i].greet).split("#;#")
            detailList[i].greet=greet[0]
          }
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
  searchBtn: function (e) {
    var val = e.detail.value
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      detailList: []
    })
    this.getList({keyword: val })
  },
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
  onShow: function () {
    this.setData({
      detailList: []
    })
    app.pageRequest.pageData.pageNum = 0
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
    this.getList({ userId: wx.getStorageSync('userId') })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var val = this.data.value
    if (val == '') {
      this.getList({ userId: wx.getStorageSync('userId') })
    } else {
      this.getList({keyword: val })
    }
  },

})