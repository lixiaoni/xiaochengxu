import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Change: '',
    name:'',
    show:true,
    id: Api.getThisStoreId(),
    data: [{ name: "个人发票", selected: false }, { name: "提供增值税普通发票", selected: false }, { name: "提供增值税专用发票", selected: false }]
  },
  switch1Change: function (e) {
   var checked=e.detail.value
    if (checked){
      this.setData({
        show:false
      })
    }else{
      this.setData({
        show: true
      })
    }
  },
  selectList(e) {
    const index1 = e.currentTarget.dataset.index;
    let data = this.data.data;
    data[index1].selected = !data[index1].selected
    this.setData({
      data: data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var code = options.code,
      name = options.name,
      arr=[],
     data = this.data.data
    arr = name.split(",")
    if (code=="true"){
      this.setData({
        show:false,
        switch1Change:true
      })
      for (var i = 0; i < data.length; i++) {
        if (arr.indexOf(data[i].name) != -1) {
          data[i].selected = true
        }
      }
      this.setData({
        data:data
      })
    } 
    if (code=="false"){
      this.setData({
        show: true,
        switch1Change:false
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  updateMes:function(){
    var _this = this,
      isReceipt = this.data.show,
      data = this.data.data,
      id = Api.getThisStoreId(),
      receiptInfo = ''
    for (var i = 0; i < data.length; i++) {
      if (data[i].selected) {
        receiptInfo += data[i].name + ","
      }
    }
    var data = { isReceipt: !isReceipt, id: id, receiptInfo: receiptInfo.slice(0, -1) }
    Api.updateMes(data)
      .then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            var pages = getCurrentPages();             //  获取页面栈
            var currPage = pages[pages.length - 1];
            var prevPage = pages[pages.length - 2];    // 上一个页面
            prevPage.setData({
              code: 0
            })
            wx.navigateBack({
              data: 1
            })
          }
        })
      })
  },
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