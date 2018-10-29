import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    nameVal:'',
    addressVal:'',
    telephone:'',
    userId: '123',
    isDefault:false,
    isEdit:false,
    region: [],
    id:''
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  goBack:function(){
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      mydata: 1
    })
    wx.navigateBack({
      data: 1
    })
  },
  getDetails:function(id){ 
    var _this=this
    Api.addressInfo({id:id})
      .then(res => {
        const obj=res.obj
        _this.setData({
          isDefault: obj.isDefault,
          region: [obj.province, obj.city, obj.county],
          nameVal: obj.userName,
          addressVal: obj.detailAddress,
          telephone: obj.userPhone,
        })
      })

    
  },
  onLoad: function (options) {
    if (options.id){
      wx.setNavigationBarTitle({
        title:'修改地址'
      })
      this.getDetails(options.id)
      this.setData({
        isEdit:true,
        id: options.id
      })
    }
  },
  // 信息验证
  deleteVal:function(){
    this.setData({
      nameVal:''
    })
  },
  nameValFun: function (event){
    this.setData({
      nameVal: event.detail.value
    })
  },
  addressValFun: function (event){
    this.setData({
      addressVal: event.detail.value
    })
  },
  savePhone(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  checkTel:function(){
    if (!this.testTel()) {
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
      })
      return;
    }
  },
  testTel() {
    let phone = this.data.telephone;
    if (!phone || phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      return false;
    }
    return true;
  },
  //城市选择
  // sureSelectAreaListener: function (e) {
  //   var that = this;
  //   that.setData({
  //     show: false,
  //     province: e.detail.currentTarget.dataset.province,
  //     city: e.detail.currentTarget.dataset.city,
  //     area: e.detail.currentTarget.dataset.area
  //   })
  // },
  // chooseAddress: function () {
  //   var that = this;
  //   that.setData({
  //     show: true
  //   })
  // },
  /**
   * 添加地址
   */
  getInputVal:function(){
    this.checkTel();
    var _this = this,
      userName = this.data.nameVal,
      userPhone = this.data.telephone,
      isDefault = this.data.isDefault,
      userId = this.data.userId,
      region = this.data.region,
      province= region[0],
      city= region[1],
      county= region[2],
      detailAddress = this.data.addressVal,
      addressArr = {}
    console.log(region)
    addressArr = { userName: userName, userPhone: userPhone, isDefault: isDefault, userId: userId, county: county, province: province, city: city, detailAddress: detailAddress }
    return addressArr
  },
  saveAddress:function(){
    var _this = this
    Api.saveAddress(this.getInputVal())
      .then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 2000
        })
        _this.goBack()
      })
  },
  editAddress:function(){
    var list = this.getInputVal(),
        _this=this
    list.id=this.data.id
    Api.editAddress(list)
      .then(res => {
        wx.showToast({
          title: '编辑成功',
          icon: 'none',
          duration: 2000
        })
        _this.goBack()
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