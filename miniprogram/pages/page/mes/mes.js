import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide:true,
    countData:'',
    floor:'',
    description:'',
    storeMes:'',
    storeGoods:[],
    baseUrl: app.globalData.imageUrl,
    limitShow:'',
  }, 
  urlHome: function () {
    wx.switchTab({
      url: '../home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  calling: function () {
    var storeMes = this.data.storeMes
    wx.makePhoneCall({
      phoneNumber: storeMes.servicePhone,
      success: function () {
      },
      fail: function () {
      }
    })
  },
  onLoad: function (options) {
    if (options.code){
      this.setData({
        limitShow: options.code
      })
    }
    var _this=this
    Api.storeIdInfo()
    .then(res=>{
      var obj=res.obj,
        description=''
      if (obj.store[0].store.description == "null" || obj.store[0].store.description == null){
        description=''
      }else{
        description=obj.store[0].store.description
      }
      _this.setData({
        countData: obj.countData,
        floor: obj.floor.floorInfo,
        storeMes: obj.store[0].store,
        description: description,
        storeGoods: obj.store[0].goodsList
      })
    })
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