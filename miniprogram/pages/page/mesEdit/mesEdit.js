import Api from '../../../utils/api.js'
const app = getApp();
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
    countData: '',
    storeId: '',
    floorInfo: null,
    //店铺号
    shopCode: "",
    // 筛选器
    beforeChose: [0, 0, 0],
    storeMes: '',
    storeGoods: [],
    baseUrl: app.globalData.imageUrl,
    logo: ''
  },
  inputCode(e) {
    this.setData({
      shopCode: e.detail.value
    })
  },
  // 模态框
  showModal(e) {
    let type = e.currentTarget.dataset.type;
    let obj = {};
    switch (type) {
      case "floor":
        obj = {
          floorModal: true
        }
        break;
    }
    this.setData(obj)
  },
  //商城
  choseMall(e) {
    let val = e.detail.value;
    this.setData({
      mallChose: val
    })
  },
  // 楼层
  choseFloor(e) {
    let val = e.detail.value;
    let old = this.data.beforeChose;
    if (val[0] == old[0]) {
      if (val[1] == old[1]) {
        this.setData({
          beforeChose: [val[0], val[1], val[2]]
        })
      } else {
        this.setData({
          beforeChose: [val[0], val[1], 0]
        })
      }
    } else {
      this.setData({
        beforeChose: [val[0], 0, 0]
      })
    }
    let newArr = this.data.beforeChose
    this.setData({
      choseFloor: this.data.choseMall[newArr[0]].childList,
      choseArea: this.data.choseMall[newArr[0]].childList[newArr[1]].childList,
    })
  },
  closeModal() {
    this.setData({
      rangeModal: false,
      floorModal: false,
      mallModal: false
    })
  },
  getFloorList() {
    let mall = this.data.mallSureChose;
    Api.threeFloorList({ mallCode: mall.code ? mall.code : 1000 }).then(res => {
      let arr = this.data.beforeChose;
      this.setData({
        choseMall: res.obj,
        choseFloor: res.obj[arr[0]].childList,
        choseArea: res.obj[arr[0]].childList[arr[1]].childList,
      })
    })
  },
  sureFloor() {
    this.setData({
      floorChose: this.data.beforeChose
    })
    var floorObj = {}
    var _this = this
    //商城
    floorObj.mallCode = this.data.mallSureChose.code;
    var choseMall = this.data.choseMall
    let floorarr = this.data.floorChose;
    let cMall = this.data.choseMall[floorarr[0]] ? this.data.choseMall[floorarr[0]] : { code: 0 },
      cFloor = this.data.choseFloor[floorarr[1]] ? this.data.choseFloor[floorarr[1]] : { code: 0 },
      cArea = this.data.choseArea[floorarr[2]] ? this.data.choseArea[floorarr[2]] : { code: 0 };
    floorObj.balconyCode = cMall.code;
    floorObj.floorAreaCode = cArea.code;
    floorObj.floorCode = cFloor.code;
    floorObj.storeId = this.data.storeId;
    App.http.postRequest("/api/floor/store/addorupdate", floorObj)
      .then(res => {
        _this.onShow()
      })
      .catch(e => {
        wx.showToast({
          title: e.message,
          icon: 'none'
        })
      })
    this.closeModal();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getMallList() {
    App.http.getRequest("/api/floor/mall/findAll").then(res => {
      this.setData({
        mallList: res.obj,
        mallSureChose: res.obj[0],
        mallChose: [0],
      })
      this.getFloorList();
    })
  },
  onLoad: function (options) {
    this.getMallList();
  },
  // editFun: function () {
  //   this.setData({
  //     showHide: false,
  //   })
  // },
  closeShow: function () {
    this.setData({
      showHide: true,
    })
  },
  // 上传logo
  editFun() {
    app.http.onlychoseImg().then(res => {
      let url = res.tempFilePaths[0];
      Api.toCuttingImg(url)
    })
  },
  afterCuttingImg(url) {
    var _this = this
    app.http.onlyUploadImg(url, "STORE_IMAGE").then(res => {
      var url = JSON.parse(res).obj
      // _this.setData({
      //   logo: url
      // })
      if (url) {
        Api.uploadLogoImg(url)
          .then(res => {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 1000,
              mask: true,
              success: function () {
                // _this.closeShow()
                _this.getStoreMes()
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
  getStoreMes:function(){
    var _this = this
    Api.storeIdInfo()
      .then(res => {
        var obj = res.obj,
          storeMes = obj.store[0].store
        var floorInfo = Api.isFloorInfo(obj.floor)
        _this.setData({
          countData: obj.countData,
          floorInfo: floorInfo,
          shopCode: floorInfo == null ? '' : floorInfo.storeDoorNum,
          storeMes: obj.store[0].store,
          openingTime: storeMes.openingTime == null ? '' : storeMes.openingTime,
          servicePhone: storeMes.servicePhone == null || storeMes.servicePhone == "null" ? '' : storeMes.servicePhone,
          wechatNumber: storeMes.wechatNumber == null || storeMes.wechatNumber == "null" ? '' : storeMes.wechatNumber,
          wechatPublicAccount: storeMes.wechatPublicAccount == null || storeMes.wechatPublicAccount == "null" ? '' : storeMes.wechatPublicAccount,
          address: storeMes.address == null || storeMes.address == "null" ? '请填写地址' : storeMes.address,
          province: storeMes.province == null || storeMes.province == "null" ? '' : storeMes.province,
          city: storeMes.city == null || storeMes.city == "null" ? '' : storeMes.city,
          county: storeMes.county == null || storeMes.county == "null" ? '' : storeMes.county,
          storeGoods: obj.store[0].goodsList,
          storeId: obj.store[0].storeId,
          logo: obj.store[0].store.logo
        })
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.switchStore = true
    this.getStoreMes()
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