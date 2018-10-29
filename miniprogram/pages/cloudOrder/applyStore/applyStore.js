// pages/cloudOrder/applyStore/applyStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 筛选器
    years:[1990123123123,1991],
    months:[12,123,123],
    days:[123,123],
    beforeChose:[0,0,0],
    readyChose:"",
    //END 筛选器
    floorModal: false, //
    rangeModal: false,  //经营范围
    modal:false,  //第一步
    nameNum: 0,
    name: "",
    url: "",
    itemNum: 0,
    item: [{
      title: "男装",
      checked: false
    }, {
      title: "女装",
      checked: false
    }, {
      title: "男装",
      checked: false
    }]
  },
  watchInput(e) {
    let val = e.detail.value,
      type = e.currentTarget.dataset.type,
      obj = {};
    switch (type) {
      case 'name':
        let num = val.length;
        obj = {
          name: val,
          nameNum: num
        }

    }
    this.setData(obj);
  },
  open() {
    let url = this.data.url,
      name = this.data.name;
    if (!url) {
      wx.showToast({
        title: "请上传LOGO",
        icon: 'none'
      })
      return
    }
    if (!name) {
      wx.showToast({
        title: "请输入名称",
        icon: 'none'
      })
      return
    }

  },
  choseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: "compressed",
      success: (res) => {
        this.setData({
          url: res.tempFilePaths
        })
      },
    })
  },
  pcikMe(e) {
    let index = e.currentTarget.dataset.index;
    let status = !this.data.item[index].checked ;
    this.setData({
      ["item[" + index + "].checked"]: status
    })
    if(status){
      this.setData({
        itemNum: ++this.data.itemNum
      })
    }else{
      this.setData({
        itemNum: --this.data.itemNum
      })
    }
  },
  sureRange(){
    this.closeModal();
  },
  // 模态框
  showModal(e){
    let type = e.currentTarget.dataset.type;
    let obj = {};
    switch(type){
      case "range":
        obj={
          rangeModal:true
        }
        break;
      case "floor":
      obj={
        floorModal:true
      }  
      break;
    }
    this.setData(obj)
  },
  closeModal(){
    this.setData({
      rangeModal: false,
      floorModal: false
    })
  },
  // 楼层
  choseFloor(e){
    let val = e.detail.value;
    this.setData({
      beforeChose: val
    })
  },
  sureFloor(){
    this.setData({
      readyChose: this.data.beforeChose
    })
    this.closeModal();
  },
  // 下一步
  next(){
    
    wx.navigateTo({
      url: '../congratulation/congratulation',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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