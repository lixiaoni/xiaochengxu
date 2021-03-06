import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    value:''
  },
  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        var qrUrl=res.result
        if (qrUrl.indexOf("&userId") == -1) {
          Api.showToast("未获取信息！")
          return
        }
        let type = qrUrl.match(/type=(\S*)&/)[1];
        if (type == "user") {
          let userId = qrUrl.match(/userId=(\S*)/)[1];
          if (Api.isNotEmpty(userId)){
            Api.showPurchaser({ userId: userId })
              .then(res => {
                var obj = res.obj,
                  status = obj.status
                if (status) {
                  if (status == 3) {
                    wx.navigateTo({
                      url: '../information/information?status=0&send=&accept=' + obj.storeId_ + '&remark=&name=&logo=',
                    })
                  }else{
                    wx.navigateTo({
                      url: '../information/information?status=' + status + '&send=&accept=' + obj.storeId_ + '&remark=&name=&logo=',
                    })
                  }
                }
              })
              .catch(res => {
                var data = res.data
                if (data.code) {
                  var code = data.code
                  if (code == "006") {
                    that.setData({
                      isStoreOwner: true
                    })
                  } else if (code == "005") {
                    that.setData({
                      isNotStore: true
                    })
                  }
                }
              })
          } else {
            Api.showToast("未获取信息！")
          }
        } else {
          Api.showToast("未获取信息！")
        }
      },
      fail: (res) => {
        // Api.showToast("失败")
      },
      complete: (res) => {
      }
    })
  },
  // 关闭
  closeTip: function () {
    this.setData({
      isStoreOwner: false,
      isNotStore: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  changeVal:function(e){
    this.setData({
      value: e.detail.value
    })
  },
  searchBtn: function (e) {
    var val = this.data.value
    wx.navigateTo({
      url: '../serList/serList?value='+val,
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: "添加供应商"
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