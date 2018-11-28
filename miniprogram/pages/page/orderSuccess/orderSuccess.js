// pages/page/orderSuccess/orderSuccess.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dan:"订单",
    paymentModal:true,
    baseUrl: app.globalData.imageUrl,
    orderSuccessHiddenBtn:false,
  },
  getData() {
    app.http.getRequest("/api/order/byordernumber/" + this.data.num).then((res) => {
      this.setData({
        user: res.obj,
        price: res.obj.orderAmount.toFixed(2)        
      })
    })
  },
  toDetail(){
    let type = this.data.user.orderCategory; //订单分类[1 进货单|2 小云店订单|3 普通订单]
    let sendType = this.data.user.orderType; //订单类型[0 其他|1 门店自提|2 物流配送]
    let url = "";
    if (type == 1 && sendType == 1){
      // url = "../stockSelf/stockSelf";
      url = "../allOrder/allOrder?type=list&self=true";
    }
    if (type == 1 && sendType == 2){
      // url = "../stockDetail/stockDetail";
      url = "../allOrder/allOrder?type=list&self=false";
    }
    if (type == 3 && sendType == 1) {
      // url = "../self/self";
      url = "../allOrder/allOrder?type=order&self=true";      
    }
    if (type == 3 && sendType == 2) {
      // url = "../nopay/nopay";
      url = "../allOrder/allOrder?type=order&self=false"; 
    }

    url += "&num="+this.data.num;

    wx.redirectTo({
      url: url
    })
  },
  coypWx(){
    if (this.data.user.storeInfo.wechatNumber){
      wx.setClipboardData({
        data: this.data.user.storeInfo.wechatNumber,
        success: () => {
          wx.showToast({
            title: '复制微信号成功',
            icon: "none"
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      num: options.num,
      admin:wx.getStorageSync('admin')
    })
    if(this.data.admin==3){
      this.setData({
        dan:"进货单"
      })
    }
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

})