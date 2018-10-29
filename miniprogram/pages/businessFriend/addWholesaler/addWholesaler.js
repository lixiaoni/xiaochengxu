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
       var userId=res.result
        if (userId != "*") {
          var userId = userId.split("user_")[1]
          Api.getStoreDetails({ userId: userId })
            .then(res => {
              var obj=res.obj
              if (Api.isEmpty(obj)){
                var isBizFriend = obj.isBizFriend
                if (isBizFriend){
                  var status=2
                }else{
                  Api.showToast("未找到此供应商！")
                  return
                }
                wx.navigateTo({
                  url: '../information/information?status='+status+'&send=&accept=' + obj.storeId + '&remark=&logo=&name=',
                })
              }else{
                Api.showToast("未找到此供应商！")
              }
              
            })
        } else {
          Api.showToast("未获取信息！")
        }
      },
      fail: (res) => {
        Api.showToast("失败")
      },
      complete: (res) => {
      }
    })
  }
  ,
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
  searchBtn: function (e) {
    var val = e.detail.value
    wx.navigateTo({
      url: '../serList/serList?value='+val,
    })
  },
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