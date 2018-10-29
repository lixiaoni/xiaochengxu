// pages/nopay/nopay.js
const app = getApp();
const util = require('../../../utils/util.js');
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //关闭理由
    reson: [{
      title: "无法联系上买家",
      selected: true
    }, {
      title: "买家误拍或重拍",
      selected: false
    }, {
      title: "买家无诚意完成交易",
      selected: false
    }, {
      title: "缺货无法交易",
      selected: false
    }, {
      title: "其他",
      selected: false
    }],
    navindex: 0,

    carts: [
      { id: 1, title: '周大福 绝色系列 热情似火 18K金镶红宝石钻...', price: '1200', small: '约1.66mm*0.23cm', image: '/image/s5.png', num: 4, selected: true },
      { id: 2, title: '周大福新款珠宝', price: '1200', small: '14号', image: '/image/s6.png', num: 1, selected: true }
    ],
    status6: true,
    status7: true,
    status8: true,
    status9: true,
    allStatus:false,
    num:"",
    getGoodCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num:options.num,
      status: options.status,
      baseUrl: app.globalData.imageUrl
    });  
    this.getData();
  },
  //打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.order.consigneeInfo.userPhone,
    })
  },
  // 验证取货码
  testCode() {
    let num = this.data.num;
    let money = this.data.getGoodCode;
    if (!money || money < 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }
    API.testGoodCode({
      orderNumber: num,
      claimGoodsNum: money
    }).then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      this.afterOperation();
    })
    
  }, 
  // 监听输入
  watchInput(e) {
    let type = e.currentTarget.dataset.type;
    let key = "";
    switch (type) {
      case "change": key = 'changeMoney'; break;
      case "goodCode": key = "getGoodCode"; break;
      case "exCom": key = "expressageCom"; break;
      case "exCode": key = "expressageCode"; break;
    }

    this.setData({
      [key]: e.detail.value
    })
  },
  closeModal() {
    this.setData({
      changeModal: false,
      show: false,
      sureModal:false,
      show3:false
    })
  },
  showModal(e) {
    let type = e.currentTarget.dataset.type;
    let num = this.data.num;
    let obj = {};
    switch (type) {
      case "change":
        obj = {
          changeModal: true,
          changeMoney: ""
        }; break;
      case "goodCode":
        obj = {
          show: true,
          getGoodCode: ""
        }; break;
      case "ex":
        obj = {
          expressage: true,
          expressageCom: "",
          expressageCode: ""
        }; break;
      case 'sureGet':
        obj={
          sureModal:true,

        }; break;  
    }
    this.setData(obj)
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
      order: arr[0]
    })
  },
  // 整体改价
  sureChange() {
    let num = this.data.num;
    let money = this.data.changeMoney;
    if (!money || money < 0) {
      wx.showToast({
        title: '请输入金额',
        icon: 'none'
      })
      return
    }
    app.http.requestAll("/admin/order/" + num + "/updatetotal", {
      orderNumber: num,
      orderAmount: money
    }, "PUT").then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      this.afterOperation()
    })
  },
  //刷新数据
  afterOperation() {
    this.closeModal();
    setTimeout(() => {
      this.getData();
    }, 800)
  },
  //确认收款
  sureGet(){
    let num = this.data.num;
    
    app.http.requestAll("/admin/order/orderpayment/" + num + "/confirm",{
      orderNumber: num
    }, "POST").then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      this.afterOperation()
    })
  },
  // 保存备注
  saveRemark(e) {
    let val = e.detail.value;
    API.addRemark({
      orderNumber: this.data.num,
      remark: val
    }).then(res => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      if (res.success) {

      }
    })
  },
  // 关闭订单
  closeOrder: function (e) {
    let num = e.currentTarget.dataset.num;
    this.setData({
      show3: true,
      closeNum: num
    })
    
  },
  sureClose() {

    let num = this.data.num,
      index = this.data.navindex;
    API.closeOrder({
      reason: this.data.reson[index].title,
      orderNumber: num
    }).then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      this.afterOperation()
    })
  },
  selecRes(e) {
    const index1 = this.data.navindex;
    let reson = this.data.reson;
    var array = this.data.reson
    array.forEach((item, index, arr) => {
      var sItem = "reson[" + index + "].selected"
      this.setData({
        [sItem]: false,
      })
    })
    reson[index1].selected = true
    this.setData({
      reson: reson
    })
  },
  swichNav(e) {
    var current = e.currentTarget.dataset.current;
    if (current == this.data.navindex) {
      return false;
    } else {
      this.setData({
        navindex: current,
      })
    }
    this.selecRes();
  },
//时间戳转化成时间格式
  timeFormat(timestamp) {
    if(!timestamp){return ""}
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
    function add0(m){ return m < 10 ? '0' + m : m }
    
  },
  getData() {
    app.http.getRequest("/api/order/byordernumber/" + this.data.num).then((res) => {
      this.setData({
        order: res.obj,
        status: res.obj.orderStatus  //状态
      })
      this.resetData([this.data.order]);
      this.setData({
        'order.createDate': this.timeFormat(this.data.order.createDate),
        'order.payDate': this.timeFormat(this.data.order.payDate),
        'order.finishDate': this.timeFormat(this.data.order.finishDate),
      })
      //倒计时
      this.total_micro_second = res.timeoutExpressSecond
      util.count_down(this)
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