// pages/page/manageM/manageM.js
import Api from '../../../utils/api.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getData(){
    app.http.getRequest("/api/user/byuserid").then(res=>{
        if(res.success){
          this.setData({
            user:res.obj
          })
        }
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.setData({
      baseUrl: app.globalData.imageUrl
    })
  },
  //打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '01053361798',
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