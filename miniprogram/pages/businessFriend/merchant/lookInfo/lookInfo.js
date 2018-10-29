import Api from '../../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    watchInput: false,
    value: '',
    addSpec: false,
    userId:'',
    mobile:'',
    baseUrl: app.globalData.imageUrl,
    data:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    this.setData({
      userId: options.userId,
      mobile: options.mobile
    })
    Api.getUserDetaisl({ mobile: options.mobile})
    .then(res=>{
      var obj = res.obj
      _this.setData({
        data:obj
      })
    })
  },
  // 监听input
  watchInput: function (event) {
    if (event.detail.value == '') {
      this.setData({
        watchInput: false,
        value: '',
      })
    } else {
      this.setData({
        watchInput: true,
        value: event.detail.value,
      })
    }
  },
  setName: function () {
    if (this.data.value != '') {
      this.setData({
        watchInput: true,
      })
    }
    this.setData({
      addSpec: true,
    })
  },
  // 取消
  cancel: function () {
    this.setData({
      addSpec: false
    })
  },
  confirm: function () {
    var _this = this,
      remark = this.data.value,
      userId = this.data.userId
    if (remark!=''){
      Api.setUserName({ userId: userId, remark: remark })
        .then(res => {
          wx.showToast({
            title: res.obj.message,
            icon: 'none',
            duration: 1000,
            mask: true,
          })
        })
      this.cancel()
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