// pages/update/update.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      value: options.name,
      type: options.type
    })
  },
  // 清空input的内容
  emptyInput(e) {
    this.setData({
      value: ''
    })
  },
  searchInput(e) {
    let val = e.detail.value;
    this.setData({
      value: val
    })
  },
  save() {
    let text = this.data.value.trim();
    let type = this.data.type;
    let url = "";
    let obj = {};
    if (text == '') {
      wx.showToast({
        title: '请填写',
        icon: "none"
      })
      return
    }

    if (type == 'name') {
      url = "/api/user/nickname/{{nickName}}";
      obj = { nickName: text };
    } else if (type == 'wx') {
      url = "/api/user/weixinNumber/{{weixinNumber}}";
      obj = { weixinNumber: text };
    }

    if (text) {
      app.http.putRequest(url, obj).then(res => {
        this.after(res);
      })
    }
  },
  after(res) {
    wx.showToast({
      title: res.message,
      icon: 'none'
    })
    if (res.success) {
      wx.navigateBack({})
    }
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