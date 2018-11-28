const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Change: true,
    id: Api.getThisStoreId(),
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name
    if (name =="邮费到付"){
      this.setData({
        switch1Change:true,
        name:name
      })
    }else{
      this.setData({
        switch1Change: false,
        name: name
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
      switch1Change = this.data.switch1Change,
      _this = this
    _this.setData({
      switch1Change:!switch1Change
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
    var id=this.data.data,
      switch1Change = this.data.switch1Change,
      name=''
    if (switch1Change){
      name ="邮费到付"
    }else{
      name ="全场包邮"
    }
    var data={id:id}
    Api.updateMes(data)
      .then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
          success: function () {
            wx.navigateTo({
              url: '../mesEdit/mesEdit',
            })
          }
        })
      })
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