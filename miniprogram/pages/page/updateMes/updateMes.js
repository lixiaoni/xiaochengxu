import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    palceName:"小云店名称",
    value:'',
    emptyVal:0,
    num:0,
    id:Api.getThisStoreId(),
    name:'',
    allNum:0,
    status:0,
    isShow:false
  },
  changeValue:function(e){
    var value = e.detail.value,
      num = value.length,
      name=this.data.name,
      status = this.data.status 
    if (status==1){
      if (num > 20) {
        wx.showToast({
          title: '超过最长数字限制',
          icon: 'none',
          duration: 2000,
        })
      } else {
        this.setData({
          value: value.substring(0, 19),
          num: num
        })
      }
    }
    if (status == 2) {
      if (num > 100) {
        wx.showToast({
          title: '超过最长数字限制',
          icon: 'none',
          duration: 2000,
        })
      } else {
        this.setData({
          value: value.substring(0, 99),
          num: num
        })
      }
    }
    if (status == 3) {
      if (num > 30) {
        wx.showToast({
          title: '超过最长数字限制',
          icon: 'none',
          duration: 2000,
        })
      } else {
        this.setData({
          value: value.substring(0, 29),
          num: num
        })
      }
    }
    if (status == 4) {
      if (num > 32) {
        wx.showToast({
          title: '超过最长数字限制',
          icon: 'none',
          duration: 2000,
        })
      } else {
        this.setData({
          value: value.substring(0, 21),
          num: num
        })
      }
    }
    if(status==0){
      this.setData({
        value: value
      })
    }
  },
  putData:function(data){
    var  _this = this
    Api.updateMes(data)
      .then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
          success:function(){
            wx.redirectTo({
              url: '../mesEdit/mesEdit',
            })
          }
        })
      })
  },
  updateMes:function(){
    var value = this.data.value,
      id=this.data.id,
      name = this.data.name,
      data={}
    if (name == "name") {
      data={ name: value, id: id }
    }
    if (name == "description") {
      data = { description: value, id: id }
    }
    if (name == "servicePhone") {
      data = { servicePhone: value, id: id }
    }
    if (name == "openingTime") {
      data = { openingTime: value, id: id }
    }
    if (name == "wechatNumber") {
      data = { wechatNumber: value, id: id }
    }
    if (name == "wechatPublicAccount") {
      data = { wechatPublicAccount: value, id: id }
    }
    this.putData(data)
  },
  emptyVal:function(){
    this.setData({
      value:'',
      num:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name=options.name,
      types = options.types,
      value = options.value
    this.setData({
      name:name,
      value: value==null?'':value,
      num: value.length,
     
    })
    if (name =="name"){
      this.setData({
        allNum:20,
        status:1
      })
    }
    if (name == "description") {
      this.setData({
        allNum: 100,
        status:2
      })
    } 
    if (name == "wechatNumber") {
      this.setData({
        allNum: 30,
        status: 3
      })
    }
    if (name == "wechatPublicAccount") {
      this.setData({
        allNum: 32,
        status:4
      })
    }
    if (name == "openingTime" || name == "servicePhone") {
      this.setData({
        isShow:true
      })
    }
    
    wx.setNavigationBarTitle({
      title: types
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