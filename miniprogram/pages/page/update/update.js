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
    if (options.type == "wx") {
      wx.setNavigationBarTitle({
        title: '修改微信',
      })
      this.setData({
        placeholder: '请输入微信号'
      })
    } else if (options.type == 'name') {
      wx.setNavigationBarTitle({
        title: '修改昵称',
      })
      this.setData({
        placeholder: '请输入昵称'
      })
    }
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
        title: '请填写完整',
        icon: "none"
      })
      return
    }

    if (type == 'name') {
      if (text.length > 10) {
        wx.showToast({
          title: '最多10位字符',
          icon: 'none'
        })
        return
      }
      url = "/api/user/nickname/{{nickName}}";
      obj = { nickName: text };
    } else if (type == 'wx') {
      if (text.length > 50) {
        wx.showToast({
          title: '最多50位字符',
          icon: 'none'
        })
        return
      }
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