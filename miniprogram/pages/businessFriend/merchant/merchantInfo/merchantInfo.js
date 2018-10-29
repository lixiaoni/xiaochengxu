import Api from '../../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    watchInput: false,
    value:'',
    addSpec:false,
    storeId: wx.getStorageSync('storeId'),
    send:'',
    status:'',
    baseUrl: app.globalData.imageUrl,
    success: false,
    oneGreet: false,
    aginGreet: false,
    accept:'',
    pass:false,
    passCode:0,
    greet:[],
    headPic:'',
    userName:'',
    mobile:'',
    showName:'',
    weixinNumber:'',
    name:''
  },

  // 电话
  call() {
    if (this.data.mobile) {
      wx.makePhoneCall({
        phoneNumber: this.data.mobile,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var _this=this,
        status = options.status,
        send=options.send,
        storeId = this.data.storeId,
        accept = options.accept,
        greetArr=[],
        greet = (options.greet).split("#;#"),
        name = options.name,
        remark = options.remark,
        mobile = options.phone,
        headPic=options.logo
    for (var i = 0; i < greet.length;i++){
      greetArr.push({ mes: greet[i], name: name})
    }
    if (accept && status!=3){
      Api.newUserInfor({ userId: accept })
        .then(res => {
          var obj=res.obj
          _this.setData({
            weixinNumber: obj.weixinNumber
          })
        })
    }else{
      Api.newUserInfor({ userId: send })
        .then(res => {
          var obj = res.obj
          _this.setData({
            weixinNumber: obj.weixinNumber
          })
        })
    }
    this.setData({
      status:status,
      send:send,
      accept: accept,
      value: remark == "null" ? '' : remark,
      showName: remark == "null" ? '' : remark,
      greet: greetArr,
      name:name,
      userName:name==null?'':name,
      headPic: headPic,
      mobile: mobile
    })
    if (status==0){
      this.setData({
        pass: true
      })
    }else{
      if (status == 2) {
        this.setData({
          success: true
        })
      } else {
        if (storeId == send) {
          this.setData({
            aginGreet: true
          })
        } else {
          this.setData({
            oneGreet: true
          })
        }
    }
  }
   
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
  setName:function(){
    if(this.data.value!=''){
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
  confirm:function(){
    this.cancel()
    this.setData({
      showName:this.data.value
    })
  },
  invitation:function(){
    wx.navigateTo({
      url: '../invite/invite?accept=' + this.data.accept + "&remark=" + this.data.showName + "&headPic=" + this.data.headPic + "&name="+ this.data.name,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  urlHome: function () {
    wx.switchTab({
      url: '../../page/home/home'
    })
  },
  passFunc:function(){
    var  send = this.data.send,
      accept = this.data.accept,
      remark = this.data.showName
    Api.acceptPurchaser({ accept: accept, send: send, remark: remark})
    .then(res=>{
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      wx.navigateTo({
        url: '../newMerchant/newMerchant'
      })
    })
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