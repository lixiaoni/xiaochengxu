// pages/userdetails/userdetails.js
const app = getApp();
import Api from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexData: [{ sex: "男", val: '1' }, { sex: "女", val: '2' }, { sex: "保密", val: '0' }],
    sex: '男',
    show: true
  },

  getData() {
    app.http.getRequest("/api/user/byuserid").then(res => {
      if (res.success) {
        this.setData({
          user: res.obj
        })
      }
    })
  },
  bindDateChange(e) {
    let date = e.detail.value;
    app.http.putRequest("/api/user/birthday/" + date).then(res => {
      this.after(res)
    })
  },
  choseSex(e) {
    var text = e.target.dataset.text
    this.setData({
      show: true
    })
    app.http.putRequest("/api/user/gender/" + text).then(res => {
      this.after(res)
    })
  },
  after(res) {
    if (res.success) {
      this.getData()
    }
  },
  //改微信
  changeWx() {

  },
  //改头像
  changeIcon() {
    app.http.onlychoseImg().then(res => {
      let url = res.tempFilePaths[0];
      Api.toCuttingImg(url)
    })
  },
  afterCuttingImg(url) {
    this.setData({
      noUpload: true
    })
    app.http.onlyUploadImg(url).then(res => {
      var url = JSON.parse(res).obj
      if (url) {
        Api.changeIcon({
          headPic: url
        }).then(res => {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          this.setData({
            ['user.headPic']: url
          })
        })

      }
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
  updataSex(e) {
    this.setData({
      show: false
    })
  },
  closeShow(e) {
    this.setData({
      show: true
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
    if (this.data.noUpload) {
      this.setData({
        noUpload: false
      })
    } else {
      this.getData();
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