import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
    countData: '',
    floorInfo:null,
    storeMes: '',
    storeGoods: [],
    baseUrl: app.globalData.imageUrl,
    logo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  editFun: function () {
    this.setData({
      showHide: false,
    })
  },
  closeShow: function () {
    this.setData({
      showHide: true,
    })
  },
  // 上传logo
  chooseImage() {
    app.http.onlychoseImg().then(res => {
      let url = res.tempFilePaths[0];
      Api.toCuttingImg(url)
    })
  },
  afterCuttingImg(url) {
    var _this=this
    app.http.onlyUploadImg(url).then(res => {
      var url = JSON.parse(res).obj
      _this.setData({
        coverUrl: url,
        logo: url
      })
      if (url) {
        Api.uploadLogoImg(url)
          .then(res => {
            app.globalData.switchStore = true
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 1000,
              mask: true,
              success: function () {
                _this.closeShow()
              }
            })
          })
      }
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
    var _this = this
    Api.storeIdInfo()
      .then(res => {
        var obj = res.obj,
          storeMes = obj.store[0].store
        var floorInfo = Api.isFloorInfo(obj.floor)
        _this.setData({
          countData: obj.countData,
          floorInfo: floorInfo,
          storeMes: obj.store[0].store,
          openingTime: storeMes.openingTime == null? '' : storeMes.openingTime,
          servicePhone: storeMes.servicePhone == null || storeMes.servicePhone == "null"? '' : storeMes.servicePhone,
          wechatNumber: storeMes.wechatNumber == null || storeMes.wechatNumber == "null"? '' : storeMes.wechatNumber,
          wechatPublicAccount: storeMes.wechatPublicAccount == null || storeMes.wechatPublicAccount == "null"? '' : storeMes.wechatPublicAccount,
          address: storeMes.address == null || storeMes.address == "null"? '' : storeMes.address, 
          province: storeMes.province == null || storeMes.province == "null"? '' : storeMes.province,
          city: storeMes.city == null || storeMes.city == "null"? '' : storeMes.city,
          county: storeMes.county == null || storeMes.county == "null"? '' : storeMes.county,
          storeGoods: obj.store[0].goodsList,
          logo: obj.store[0].store.logo
        })
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
    var limitShow = wx.getStorageSync("admin")
    // wx.navigateTo({
    //   url: '../mes/mes?code=' + limitShow,
    // })
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