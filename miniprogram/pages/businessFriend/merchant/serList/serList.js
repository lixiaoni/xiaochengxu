import Api from '../../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    value: '',
    storeId: wx.getStorageSync('storeId'),
    baseUrl: app.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  clickSer:function(e){
    var accept = e.target.dataset.accept,
      logo = e.target.dataset.logo,
      name = e.target.dataset.name,
      phone = e.target.dataset.phone,
      storeId = this.data.storeId
    Api.isFriend({ userId: accept })
      .then(res => {
        var res = res.obj
        if (res){
          wx.navigateTo({
            url: '../reach/reach?accept=' + accept,
          })
        }else{
          wx.navigateTo({
            url: '../merchantInfo/merchantInfo?status=0&send=' + storeId + '&accept=' + accept + '&remark=&greet=&name=' + name + '&logo=' + logo + '&phone=' + phone,
          })
        }
    })
  },
  onLoad: function (options) {
    if (options.value) {
      app.pageRequest.pageData.pageNum = 0
      this.setData({
        value: options.value
      })
    }

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
    var val = e.detail.value
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      detailList: []
    })
    this.getList({ keyword: val })
  },
  getList: function (data) {
    var _this = this
    Api.purchaserList(data)
      .then(res => {
        var detailList = res.obj.result
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
      detailList:[],
    })
    this.getList({ keyword: this.data.value })
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
    this.getList({ keyword: this.data.value })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var val = this.data.value
    this.getList({ keyword: val })
  },

})