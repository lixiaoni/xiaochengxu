import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    watchInput: false,
    value:'',
    addSpec:false,
    send:'',
    status:'',
    success: false,
    oneGreet: false,
    aginGreet: false,
    accept:'',
    logo:'',
    name:'',
    addShow:false,
    storeName:'',
    address:'',
    servicePhone:'',    
    floor:'',
    baseUrl: app.globalData.imageUrl,
    wechatNumber:'',
    businessScope:'',
    area:'',
    goodsList:[],
    remarkChange:false,
    remarkName:'',
    mallLogo:'',
    area:'',
    floor:'',
    balcony:'',
    doorNum:'',
  },
  showLogo: function () {
    this.selectComponent("#login").showPage();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getMession: function (status, accept) {
  var _this = this,
      url=''
    if (status == 1) {
      url = '/admin/bizfriend/store/applyinfo/'+accept
    }
    if(status == 0) {
      url = '/api/store/' + accept+'/floorinfo'
    }
    if (status == 2){
      url = '/admin/bizfriend/store/merchantinfo/'+accept
    }
    if(status == 3) {
      url = '/admin/bizfriend/store/applyinfo/'+accept
    }
    Api.purchaserUserId(url)
    .then(res => {
      var obj = res.obj,
        store = obj.store[0],
        goodsList = store.goodsList,
        storeMes = store.store,
        floor = obj.floor,
        info=''
      if (goodsList!=null){
        _this.setData({
          goodsList:goodsList
        })
      }
      if (floor!=null){
        info = floor.floorInfo
        _this.setData({
          area: info.area,
          floor: info.floor,
          mallName: info.mallName,
          mallLogo: info.mallLogo,
          balcony: info.balcony,
          doorNum: info.doorNum,
        })
      }
      if (obj != null) {
        _this.setData({
          address: storeMes.address,
          servicePhone: storeMes.servicePhone,
          wechatNumber: storeMes.wechatNumber, 
          businessScope: storeMes.businessScope, 
          send: storeMes.id,
          name: storeMes.name == null ? '' :storeMes.name,
          logo: storeMes.logo,
        })
      }
    })
},
  onLoad: function (options) {
    var status = options.status,
        send=options.send,
        accept = options.accept,
        logo = options.logo,
        name=options.name,
        remark = options.remark
    if (remark =="null"){
      this.setData({
        value:'',
        remarkName:'',
      })
    }else{
      this.setData({
        value: remark,
        remarkName: remark,
      })
    }
    this.setData({
      status:status,
      accept: accept,
    })
  if(status==2){
    this.setData({
      success:true
    })
    this.getMession(status, accept)
  } 
  if (status == 1){
    this.setData({
      aginGreet: true
    })
    this.getMession(status, accept)
  }
  if (status == 3) {
    this.setData({
      oneGreet: true
    })
    this.getMession(status, send)
  } 
  if(status==0){
    this.setData({
      addShow:true
    })
    this.getMession(status, accept)
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
    var _this=this,
      purchaserUserId = this.data.accept,
      remark = this.data.value
    _this.setData({
      remarkName: remark
    })
    if (Api.isEmpty(remark)){
      this.cancel()
      if (this.data.status == 2) {
        Api.setName({ remark: remark })
          .then(res => {
            wx.showToast({
              title: '修改成功',
              icon: 'none',
              duration: 1000,
              mask: true
            })
          })
      }
    }
    
  },
  invitation:function(){
    if (!Api.isEmpty(wx.getStorageSync("access_token"))) {
      this.showLogo()
      return
    }
    wx.navigateTo({
      url: '../invitation/invitation?accept=' + this.data.accept + "&remark=" + this.data.remarkName + "&name=" + this.data.name + "&logo=" + this.data.logo + "&send=" + this.data.send + "&mallName=" + this.data.mallName + "&mallLogo=" + this.data.mallLogo,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  urlHome: function () {
    // wx.setStorage({
    //   key: 'storeId',
    //   data: this.data.accept,
    // })
    wx.setStorageSync("storeId", this.data.accept)
    wx.switchTab({
      url: '../../page/home/home'
    })
  },
  passFunc:function(){
    var send = this.data.send,
      accept = this.data.accept,
      remark = this.data.remarkName
    Api.acceptmerchant({ accept: accept, send: send, remark: remark })
      .then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        wx.navigateTo({
          url: '../mewWholesaler/mewWholesaler'
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