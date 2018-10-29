// pages/page/stockSelf/stockSelf.js
const app = getApp();
const util = require('../../../utils/util.js');
import API from "../../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status0: true, ///待付款
    status1: true, //已付款
    status2: true, //待收货
    status3: true, //交易成功
    status4: true, //交易关闭
    statusAll: true,
    //取消订单
    reason: [{
      title: "我不想买了",
      selected: true
    }, {
      title: "信息填写错误，重新拍",
      selected: false
    }, {
      title: "卖家缺货",
      selected: false
    }, {
      title: "同城见面交易",
      selected: false
    }, {
      title: "其他",
      selected: false
    }],
    cancelIndex: 0
  },
  // 确认收货
  sureSure(e) {
    let num = this.data.num;
    app.http.requestAll("/api/order/" + num + "/receive", {}, "PUT").then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      this.afterOperation();
    })
  },
  //取消理由
  swichReason(e) {
    var current = e.currentTarget.dataset.current;
    var array = this.data.reason
    array.forEach((item, index, arr) => {
      if (current == index) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    })
    this.setData({
      reason: array,
      cancelIndex: current
    })
  },
  sureCancel() {
    let num = this.data.num,
      index = this.data.cancelIndex;
    API.cancelOrder({
      reason: this.data.reason[index].title,
      orderNumber: num
    }).then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      this.afterOperation();
    })
  },
  //上传还款凭证
  uploadVoucher() {
    let num = this.data.num;
    wx.navigateTo({
      url: '../../role/supplyVoucher/supplyVoucher?num=' + num,
    })
  },
  //删除
  sureDel() {
    let num = this.data.num;

    app.http.deleteRequest("/api/order/" + num).then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      if (res.success) {
        setTimeout(() => {
          wx.navigateBack({})
        }, 800)
      }
    })
  },

  //刷新数据
  afterOperation() {
    this.closeModal();
    setTimeout(() => {
      this.getData(true);
    }, 800)
  },
  showModal(e) {
    let type = e.currentTarget.dataset.type;
    let num = e.currentTarget.dataset.num;
    let obj = {};
    switch (type) {
      case "goodCode":
        obj = {
          codeModal: true,
        };
        break;
        case 'sureGet':
          obj = {
            sureModal: true,
            sureNum: num,
          }; break;
      case 'del':
        obj = {
          delModal: true,
        };
        break;
      case 'cancel':
        obj = {
          cancelModal: true,
        };
        break;
      case 'after':
        obj = {
          afterModal: true,
          afterTel: e.currentTarget.dataset.tel
        };
        break;
    }
    this.setData(obj)
  },
  closeModal() {
    this.setData({
      codeModal: false, //取货码
      sureModal: false, //收款
      delModal: false, //删除
      cancelModal: false, //取消订单
      afterModal: false //售后
    })
  },


  getData() {
    let num = this.data.num;
    app.http.getRequest("/api/order/byordernumber/" + num).then((res) => {
      try {
        res.obj.createDate = util.formatTime(new Date(res.obj.createDate));
        res.obj.payDate = util.formatTime(new Date(res.obj.payDate));
        res.obj.deliverDate = util.formatTime(new Date(res.obj.deliverDate));
        res.obj.finishDate = util.formatTime(new Date(res.obj.finishDate));
      } catch (e) {}

      this.setData({
        order: res.obj,
        status: res.obj.orderStatus  //状态
      })
      
      //倒计时
      this.total_micro_second = res.timeoutExpressSecond
      util.count_down(this)
    })
  },
  //电话
  call() {
    let tel = this.data.order.storeInfo.servicePhone;
    if (tel) {
      wx.makePhoneCall({
        phoneNumber: tel,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      num: options.num,
      status: options.status,
      baseUrl: app.globalData.imageUrl
    })
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
    this.getData()
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