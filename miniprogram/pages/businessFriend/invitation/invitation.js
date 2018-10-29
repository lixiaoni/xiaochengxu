import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'期待与您合作。',
    accept:'',
    logo:'',
    baseUrl: app.globalData.imageUrl,
    name:'',
    mallLogo:'',
    mallName:'',
    send:''
  },
  goBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  emptyVal:function(){
    this.setData({
      value:''
    })
  },
  searchBtn: function (e) {
    var val = e.detail.value
    this.setData({
      value: val
    })
  },
  invita:function(){
    var _this=this,
      accept = this.data.accept,
      greet=this.data.value,
      send = this.data.send,
      remark = this.data.remark
    Api.addWholesaler({ accept: accept, send: send, greet: greet, remark: remark})
    .then(res=>{
      wx.showToast({
        title: '发送成功',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      wx.navigateTo({
        url: '../mewWholesaler/mewWholesaler',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        accept:options.accept,
        remark: options.remark,
        logo: options.logo,
        name: options.name,
        send:options.send,
        mallLogo: options.mallLogo,
        mallName: options.mallName,
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