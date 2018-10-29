import Api from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  // 0未知 1男 2女
  data: {
    sexData: [{ sex: "男", no: 1 }, { sex: "女", no: 2}, { sex: "未知", no: 0}],
    show: true,
    showAddress: false,
    name:'',
    nickName:'',
    sex: '未知',
    note:'',
    phone:'',
    wechart:'',
    birthday:'',
    showCity:true,
    region:[],
    detailAddress:'',
    userId:null,
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      showCity:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getInfo:function(userId){
    var _this=this,
    sex=null
    Api.userInfo({userId: userId})
    .then(res=>{
      var obj=res.obj
      if (obj.sex==0){
        sex='未知'
      } else if (obj.sex == 1) {
        sex = '男'
      } else if (obj.sex == 2){
        sex = '女'
      }
      var province=obj.province == null ? '' : obj.province
      var city=obj.city == null ? '' : obj.city
      var area=obj.county == null ? '' : obj.county
      if (province==''){
        _this.setData({
          showCity:false
        })
      }
      _this.setData({
        name: obj.name,
        nickName: obj.nickName,
        sex: sex,
        note: obj.note,
        phone: obj.phone,
        wechart: obj.wechart,
        birthday: obj.birthday,
        region: [province, city, area],
        detailAddress: obj.detailAddress,
        userId: obj.userId
      })
    })
  },
  onLoad: function (options) {
    var userId = options.userId
    this.setData({
      userId: userId
    })
    this.getInfo(userId)
  },
  changeValue:function(e){
    var name=e.target.dataset.name,
        value=e.detail.value
    if(name=="name"){
      this.setData({
        name: value
      })
    } else if (name == "nickName") {
      this.setData({
        nickName: value
      })
    } else if (name == "note") {
      this.setData({
        note: value
      })
    } else if (name == "phone") {
      this.setData({
        phone: value
      })
    } else if (name == "wechart") {
      this.setData({
        wechart: value
      })
    } else if (name == "detailAddress") {
      this.setData({
        detailAddress: value
      })
    } else if (name == "birthday") {
      this.setData({
        birthday: value
      })
    }
  },
// 性别
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
  choseSex(e) {
    var text = e.target.dataset.text.sex
    this.setData({
      sex: text,
      show: true
    })
  },
  // 更新
  addDetails:function(){
    var _this=this,
      name=this.data.name,
      nickName = this.data.nickName,
      sex = this.data.sex,
      note = this.data.note,
      phone = this.data.phone,
      wechart = this.data.wechart,
      birthday = this.data.birthday,
      region = this.data.region,
      province = region[0],
      city = region[1],
      county = region[2],
      userId = this.data.userId,
      detailAddress = this.data.detailAddress,
      data={},
      no=null
    if (sex == '未知') {
      no = 0
    } else if (sex == '男') {
      no = 1
    } else if (sex == '女') {
      no = 2
    }
    data = { name: name, nickName: nickName, sex: no, note: note, phone: phone, wechart: wechart, birthday: birthday, province: province, city: city, county: county, detailAddress: detailAddress, userId: userId}
    Api.saveDetails(data)
    .then(res=>{
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      _this.goback()
    })
  },
  // 返回上一页
  goback: function () {
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      mydata:1
    })
    wx.navigateBack({
      data: 1
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