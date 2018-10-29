// pages/register/success.js
Component({
  properties: {
    
  myProperty: { // 属性名
    type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    value: '123', // 属性初始值（可选），如果未指定则会根据类型选择一个
    observer: function (newVal, oldVal, changedPath) {
      // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
      // 通常 newVal 就是新设置的数据， oldVal 是旧数据
    }
  }
  },
  data: {
    coopertaion: {
      imagesrc: "/image/cooperation.png",
      congratulationText: "成功发送合作邀请!",
      tip: "等待批发商添加商友",
      button: "继续逛逛",
      act: "我也要开店"
    },
    register: {
      imagesrc: "/image/success-register.png",
      congratulationText: '恭喜您注册成功!',
      tip: "加为商友合作可享批发价",
      button: '我想与贵店合作',
      act: ""
    },
    partner: {
      imagesrc: "/image/business-partner.png",
      congratulationText: "恭喜您达成合作!",
      tip: "已建立商友合作关系",
      button: "即可查看批发价",
      act: "我也要开店"
    },
    //显示隐藏
    pageShow: false,
    //显示种类
    pageData: {
      imagesrc: "/image/business-partner.png",
      congratulationText: "恭喜您达成合作!",
      tip: "已建立商友合作关系",
      button: "即可查看批发价",
      act: "我也要开店"
    }
  },
  methods: {
    showPage(type) {
      let a = type || 'register';
      this.setData({
        pageData: this.data[a],
        pageShow: true
      }) 
    },
    hidePage() {
      this.setData({
        pageShow: false
      })
    }
  }
})
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     coopertaion:{
//       imagesrc: "/image/cooperation.png",
//       congratulationText: "成功发送合作邀请!",
//       tip: "等待批发商添加商友",
//       button: "继续逛逛",
//       act:"我也要开店"
//     },
//     register:{
//       imagesrc: "/image/success-register.png",
//       congratulationText: '恭喜您注册成功!',
//       tip: "加为商友合作可享批发价",
//       button: '我想与贵店合作',
//       act: ""
//     },
//     partner:{
//       imagesrc: "/image/business-partner.png",
//       congratulationText: "恭喜您达成合作!",
//       tip: "已建立商友合作关系",
//       button: "即可查看批发价",
//       act: "我也要开店"
//     },
//     //显示隐藏
//     pageShow:true,
//     //显示种类
//     pageData: {
//       imagesrc: "/image/business-partner.png",
//       congratulationText: "恭喜您达成合作!",
//       tip: "已建立商友合作关系",
//       button: "即可查看批发价",
//       act: "我也要开店"
//     }
//   },
//   showPage(){
//     this.setData({
//       pageShow: true
//     })
//   },
//   hidePage(){
//     this.setData({
//       pageShow: false
//     })
//   },
//   showdata(type){
//     let a = type || 'register';
//     this.setData({
//       pageData: this.data[a]
//     }) 
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
// })