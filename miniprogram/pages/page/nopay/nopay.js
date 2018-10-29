// pages/nopay/nopay.js
const app = getApp();
const util = require('../../../utils/util.js');
import API from "../../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [
      { id: 1, title: '周大福 绝色系列 热情似火 18K金镶红宝石钻...', price: '1200', small: '约1.66mm*0.23cm', image: '/image/s5.png', num: 4, selected: true },
      { id: 2, title: '周大福新款珠宝', price: '1200', small: '14号', image: '/image/s6.png', num: 1, selected: true }
    ],
    status0: true,
    status1: true,
    status2: true,
    status3: true,
    status4: true,
    statusAll:true,
    //取消订单
    reason: [{ title: "我不想买了", selected: true }, { title: "信息填写错误，重新拍", selected: false }, { title: "卖家缺货", selected: false }, { title: "同城见面交易", selected: false }, { title: "其他", selected: false }],
    cancelIndex: 0
  },

  showModal(e) {
    let type = e.currentTarget.dataset.type,
      num = e.currentTarget.dataset.num,
      obj = {};
    switch (type) {
      case 'get':
        obj = {
          sureModal: true,
          getNum: e.currentTarget.dataset.num
        }; break;
      case 'del':
        let index = e.currentTarget.dataset.index;
        obj = {
          delModal: true,
          delNum: { num: num, index: index }
        }; break;
      case 'cancel':
        obj = {
          cancelModal: true,
          cancelNum: num
        }; break;
      case 'after':
        obj = {
          afterModal: true,
          afterTel: e.currentTarget.dataset.tel
        }
    }
    this.setData(obj)
  },
  closeModal() {
    this.setData({
      codeModal: false,  //取货码
      sureModal: false,  //收款
      delModal: false,  //删除
      cancelModal: false, //取消订单
      afterModal: false //售后
    })
  },
  //刷新数据
  afterOperation() {
    this.closeModal();
    setTimeout(() => {
      this.getData(true);
    }, 800)
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
  // 上传凭证
  uploadVoucher(){
    wx.navigateTo({
      url: '../../role/supplyVoucher/supplyVoucher?num='+this.data.num,
    })
  },
  //删除
  sureDel() {
    let del = this.data.num,
      list = this.data.showList;

    app.http.deleteRequest("/api/order/" + del).then((res) => {
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

  getData() {
    app.http.getRequest("/api/order/byordernumber/" + this.data.num).then((res) => {
      try {
        res.obj.createDate = util.formatTime(new Date(res.obj.createDate));
        res.obj.payDate = util.formatTime(new Date(res.obj.payDate));
        res.obj.deliverDate = util.formatTime(new Date(res.obj.deliverDate));
        res.obj.finishDate = util.formatTime(new Date(res.obj.finishDate));
        
      } catch (e) { }

      this.setData({
        order: res.obj,
        status: res.obj.orderStatus  //状态
      })
      this.resetData([this.data.order]);

      //倒计时
      this.total_micro_second = res.timeoutExpressSecond
      util.count_down(this)
    })
  },  
  resetData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) { // 循环订单
      let oldGoods = data[i].goodsInfos,  //商品数组
        newGoods = [];
      for (let j = 0; j < oldGoods.length; j++) { //货品循环

        let type = oldGoods[j].orderDetails;  //规格数组

        for (let k = 0; k < type.length; k++) {
          //当前货物,类型变为对象
          let nowGood = {};
          Object.assign(nowGood, oldGoods[j]);
          nowGood.orderDetails = type[k];
          newGoods.push(nowGood);
        }
      }
      //编辑新订单数组
      let newOrder = data[i];
      newOrder.goodsInfos = newGoods;
      arr.push(newOrder)
    }
    this.setData({
      showList: arr[0].goodsInfos
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.num,
      status: options.status,
      baseUrl: app.globalData.imageUrl
    })
    
  },
  //打电话
  tel: function () {
    let tel = this.data.order.storeInfo.servicePhone;
    if (tel) {
      wx.makePhoneCall({
        phoneNumber: tel,
      })
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
    this.getData();
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