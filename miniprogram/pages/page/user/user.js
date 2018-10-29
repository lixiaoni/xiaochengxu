// pages/user/user.js
import Api from '../../../utils/api.js';
import authHandler from '../../../utils/authHandler.js';
var app = getApp();
function getIdentity(_this) {
  if (authHandler.isLogin()) {
    Api.userIdentity()
      .then(res => {
        var obj = res.obj
        if (obj == "null" || obj == null) {
          wx.setStorageSync("admin", 1)
          _this.setData({
            limitShow: 1
          }, function () {
            _this.getUser()
          })
        }else{
          var isStoreOwner = obj.isStoreOwner,
            isPurchaser = obj.isPurchaser
          if (isStoreOwner) {
            wx.setStorageSync("admin", 2)
            _this.setData({
              limitShow: 2
            }, function () {
              _this.getUser()
            })
          }
          if (isPurchaser) {
            wx.setStorageSync("admin", 3)
            wx.setTabBarItem({
              index: 1,
              text: '进货车',
              iconPath: '/image/22.png',
              selectedIconPath: '/image/21.png'
            })
            _this.setData({
              limitShow: 3,
            }, function () {
              _this.getUser()
            })
          }
          if (!isPurchaser && !isStoreOwner) {
            wx.setStorageSync("admin", 1)
            _this.setData({
              limitShow: 1
            }, function () {
              _this.getUser()
            })
          }
        }
      })
  } else {
    _this.getUser()
    wx.setStorageSync("admin", 1)
    _this.setData({
      limitShow: 1
    })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUser: false,
    limitShow:1,
    indexEmpty: true,
  },

  showLogin() {
    this.selectComponent("#login").showPage();
  },
  getUser() {
    app.http.getRequest("/api/user/byuserid").then((res) => {
      if (res.obj) {
        this.setData({
          user: res.obj,
          hasUser: true
        })
      }else{
        this.setData({
          user: "",
          hasUser: false
        })
      }
    }).catch(e => {
      this.setData({
        user: "",
        hasUser: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      baseUrl: app.globalData.imageUrl
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
    if (wx.getStorageSync("storeId") == undefined ||  wx.getStorageSync("storeId") == '') {
      this.setData({
        indexEmpty: false
      })
    }
    getIdentity(this)
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