const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Change: true,
    id: Api.getThisStoreId(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.code=='邮费到付'){
      this.setData({
        switch1Change:true
      })
    }else{
      this.setData({
        switch1Change: false
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

  switch1Change: function (e) {
    var index = e.target.dataset.index,
      id=this.data.id,
      postageInfo='',
      _this = this
    if (index == 1) {
      _this.setData({
        switch1Change: true,
      })
      postageInfo='邮费到付'
    } else {
      _this.setData({
        switch1Change: false
      })
      postageInfo = '全场包邮'
    }
    var data = { postageInfo: postageInfo, id: id}
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
              mydata: 1
            })
            wx.navigateBack({
              data: 1
            })
          }
        })
      })
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