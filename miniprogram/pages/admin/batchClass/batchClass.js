// pages/batch/batch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: true,
    datas: [
      { id: 1, title: '周大福 绝色系列 热情似火 18K金镶红宝石钻', priceP: '1200', priceL: '1200', num: '22', yy: '22', jh: '22', xl: '22', image: '/image/img.png', selected: false },
      { id: 1, title: '周大福 绝色系列 热情似火 18K金镶红宝石钻', priceP: '1200', priceL: '1200', num: '22', yy: '22', jh: '22', xl: '22', image: '/image/img.png', selected: true },
      { id: 1, title: '周大福 绝色系列 热情似火 18K金镶红宝石钻', priceP: '1200', priceL: '1200', num: '22', yy: '22', jh: '22', xl: '22', image: '/image/img.png', selected: true },
    ],
    allSelected: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let datas = this.data.datas;
    const selected = datas[index].selected;
    datas[index].selected = !selected;
    this.setData({
      datas: datas
    });
  },
  selectAll(e) {
    if (this.data.allSelected) {
      this.setData({
        allSelected: false
      })
    } else {
      this.setData({
        allSelected: true
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