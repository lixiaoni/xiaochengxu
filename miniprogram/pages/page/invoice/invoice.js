// pages/invoice/invoice.js
const Api = require("../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInvoice:[
      { title: "不开发票", selected: true ,show:true},
      { title: "个人", selected: false, show: false},
      { title: "普通发票", selected: false, show: false},
      { title: "增值税专用发票", selected: false, show: false},
    ],
    ordinary:true,
    com:true,
    invoice:{}  //发票信息
  },
  selectList(e){
    const index1=e.currentTarget.dataset.index;
    let dataInvoice=this.data.dataInvoice;
    var array=this.data.dataInvoice
    array.forEach((item,index,arr)=>{
      var sItem="dataInvoice["+index+"].selected"
      this.setData({
        [sItem]:false,
      })
    })
    if (index1 == 3) {
      this.setData({
        com: false,
        ordinary: true,
      })
    }else if(index1==2){
      this.setData({
        com: true,
        ordinary: false,
      })
    }else{
      this.setData({
        com:true,
        ordinary: true,
      })
    }
    dataInvoice[index1].selected = true
    
    this.setData({
      dataInvoice: dataInvoice
    })

    switch (index1){
      case 0:
        this.setData({
          ["invoice.invoiceCategory"]: "",
          ["invoice.invoiceType"]: ""
        });break;   
      case 1:
        this.setData({
          ["invoice.invoiceCategory"]: "普通发票",
          ["invoice.invoiceType"]: "个人"
        }); break;  
      case 2:
        this.setData({
          ["invoice.invoiceCategory"]: "普通发票",
          ["invoice.invoiceType"]: "公司"
        }); break;  
      case 3:
        this.setData({
          ["invoice.invoiceCategory"]: "增值税专用发票",
          ["invoice.invoiceType"]: "公司"
        }); break;  
    }
  },
  // 监听输入
  watchInput(e){
    let type = e.currentTarget.dataset.type,
      val = e.detail.value;
    this.setData({
      ["invoice."+type+""]: val
    })
  },

  addWrite(e){
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      prePage.getInvoice(this.data.invoice);
      wx.navigateBack();
    }
  },
  cancelShow(){
    Api.getStoreInfo().then(res=>{
      this.setData({
        show: res.obj.isReceipt
      })
      if (res.obj.isReceipt == true){
        let str = res.obj.receiptInfo;
        let arr = str.split(",");
        if (arr.indexOf("个人发票") > -1){
          this.setData({
            ["dataInvoice[1].show"]:true
          })
        }
        if (arr.indexOf("提供增值税普通发票") > -1) {
          this.setData({
            ["dataInvoice[2].show"]: true
          })
        }
        if (arr.indexOf("提供增值税专用发票") > -1) {
          this.setData({
            ["dataInvoice[3].show"]: true
          })
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cancelShow()

    // if (options != {}){
    //   let index = 0;
    //   if (options.invoiceType=="个人"){
    //     index = 1;
    //   }else{
    //     if (options.invoiceCategory == "普通发票"){
    //       index = 2;
    //     }else{
    //       index = 3;
    //     }
    //   }
    //   var array = this.data.dataInvoice
    //   array.forEach((item, i, arr) => {
    //     var sItem = "dataInvoice[" + i + "].selected"
    //     if(i==index){
    //       this.setData({
    //         [sItem]: true,
    //       })
    //     }
    //     this.setData({
    //       [sItem]: false,
    //     })
    //   })

      
    //   this.setData({
    //     invoice: options
    //   })
    // }
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