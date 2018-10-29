// pages/goodsList/goodsList.js
let timeId = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: ['戒指', '手环', '项链'],
    result: [
      {
        id: 1,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.01
      },
      {
        id: 2,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.02
      },
      {
        id: 1,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.01
      },
      {
        id: 2,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.02
      }
    ],
    showKeywords: false,
    value: '',
    showResult: false,
  },
  cancelSearch() {
    this.setData({
      showResult: false,
      showKeywords: false,
      value: ''
    })
  },
   /**
   * --搜索
   */
  blurInputEvent: function (e) {
    const val=e.detail.value
    wx.navigateTo({
      url: '/pages/serList/serList?name='+val
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