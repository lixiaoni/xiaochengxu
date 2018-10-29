import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postageInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMes:function(){
    var _this=this
    Api.storeIdInfo()
      .then(res => {
        var obj = res.obj,
        postageInfo=obj.store[0].store.postageInfo
        _this.setData({
          postageInfo: postageInfo
        })
      })
  },
  onLoad: function (options) {
   
  },
  goStatus:function(){
    wx.navigateTo({
      url: '../status/status',
    })
  },
  postageInfo:function(){
    wx.navigateTo({
      url: '../../page/postageInfo/postageInfo?code='+this.data.postageInfo,
    })
  },
  costFun: function () {
    wx.navigateTo({
      url: '../batchSet/batchSet',
    })
  },
  setFun:function(){
    wx.navigateTo({
      url: '../batchSet/batchSet',
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
    this.getMes()
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