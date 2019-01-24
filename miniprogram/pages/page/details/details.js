import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    indexEmpty: true,
    goRetailStore: true,
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
  onShow: function () {
    if (authHandler.isLogin()){
      this.selectComponent("#login").closePage()
    }
    if (!Api.getStoreId()) {
      this.setData({
        indexEmpty: false
      })
    } else {
      var _this = this
      if (app.globalData.storeIdRetail) {
        _this.setData({
          goRetailStore: false
        })
      } else {
        Api.classListApi()
          .then(res => {
            const obj = res.obj
            for (var i = 0; i < obj.length; i++) {
              obj[i].selected = false
            }
            _this.setData({
              list: obj
            })
          })
      }
      
    }
    
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