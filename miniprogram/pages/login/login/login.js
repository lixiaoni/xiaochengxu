const loginApp = getApp();
import API from '../../../utils/api.js';
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    //登录头信息
    loginTitle: '快捷登录',
    //界面显示隐藏
    pageShow: false,
    //获取验证码按钮
    buttonTimer: "获取验证码",
    btnSec: '60',
    disabled: false,
    //电话
    telephone: "",
    //验证码
    verificationCode: "",
    //密码
    password: '',
    //切换登录方式 code pass
    loginType: 'code',
    //密码是否可见
    ifhide: true,
    //密码图片src
    see: '/image/pass-hide.png',
    //忘记密码
    forget: false,
    //登录按钮样式class
    btnID: "loginBtnDis"
  },
  methods: {
    //判断是否输入完整
    checkComplete() {
      if (this.data.loginType === 'code') {
        if (this.data.telephone.length > 0 && this.data.verificationCode.length > 0) {
          this.setData({
            btnID: 'loginBtnAc'
          })
          return
        }
      } else {
        if (this.data.telephone.length > 0 && this.data.password.length > 0) {
          this.setData({
            btnID: 'loginBtnAc'
          })
          return
        }
      }
      this.setData({
        btnID: 'loginBtnDis'
      })
    },
    //忘记密码
    forgetPass() {
      this.setData({
        forget: true,
        password: "",
        verificationCode: ""
      })
    },
    //忘记密码修改新密码
    creatNewPassword() {
      if (!this.testTel()) {
        wx.showToast({
          title: '请输入正确手机号码',
          icon: 'none',
        })
        return;
      }
      if (this.data.verificationCode.length == 0) {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
        })
        return;
      }
      if (this.data.password.length < 6 || this.data.password.length > 16) {
        wx.showToast({
          title: '密码必须是6 - 16位的数字或字母',
          icon: 'none'
        })
        return
      }
      let obj = {
        mobile: this.data.telephone,
        password: this.data.password,
        smsCode: this.data.verificationCode
      }
      API.resetPassword(obj).then(res => {
        wx.showToast({
          title: res.message,
          icon: 'none',
        })
        this.setData({
          forget: false,
          password: "",
          verificationCode: ""
        })
      })
    },
    //登录
    login() {
      if (this.data.btnID === 'loginBtnDis') {
        wx.showToast({
          title: '请填写完整',
          icon: 'none',
        })
        return;
      }
      //校验
      if (!this.testTel()) {
        wx.showToast({
          title: '请输入正确手机号码',
          icon: 'none',
        })
        return;
      }
      if (this.data.loginType == 'code') {
        if (this.data.verificationCode.length == 0) {
          wx.showToast({
            title: '请输入验证码',
            icon: 'none',
          })
          return;
        }
        let obj = {
          mobile: this.data.telephone.trim(),
          smsCode: this.data.verificationCode
        };
        loginApp.authHandler.loginByMobile(this.data.telephone, this.data.verificationCode).then(res => {
          this.loginAfter(res);
        })


      } else {

        if (this.data.password.length < 6 || this.data.password.length > 16) {
          wx.showToast({
            title: '密码必须是6 - 16位的数字或字母',
            icon: 'none'
          })
          return
        }

        let obj = {
          grant_type: 'password',
          username: this.data.telephone.trim(),
          password: this.data.password
        };
        loginApp.authHandler.loginByUser(this.data.telephone, this.data.password).then(res => {
          this.loginAfter(res);
        }).catch(e => {
          API.showToast(e.data.message)         
        })
      }

    },
    loginAfter(res) {
      if (res.message) {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
        return
      }
      if (res.access_token) {
        this.closePage()
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        curPage.onLoad();
        curPage.onShow();
        wx.showToast({
          title: "登录成功",
          icon: 'none'
        })
      }
    },
    //显示隐藏密码
    showHide() {
      let b = !this.data.ifhide;
      this.setData({
        ifhide: b
      })
      if (b) {
        this.setData({
          see: '/image/pass-hide.png'
        })
      } else {
        this.setData({
          see: '/image/pass-show.png'
        })
      }
    },
    //改变登录方式
    changeLoginType() {
      this.setData({
        verificationCode: "",
        password: '',
        btnID: 'loginBtnDis'
      })
      if (this.data.loginType === 'code') {
        this.setData({
          loginType: 'pass',
          loginTitle: "账号登录"
        })
      } else if (this.data.loginType === 'pass') {
        this.setData({
          loginType: 'code',
          loginTitle: "快捷登录"
        })
      }
    },
    //存入手机号
    savePhone(e) {
      this.setData({
        telephone: e.detail.value
      })
      this.checkComplete();
    },
    //存入验证码
    saveCode(e) {
      this.setData({
        verificationCode: e.detail.value
      })
      this.checkComplete();
    },
    //存入密码
    savePass(e) {
      this.setData({
        password: e.detail.value
      })
      this.checkComplete();
    },
    //获取验证码
    getCode() {
      if (!this.testTel()) {
        wx.showToast({
          title: '请输入正确手机号码',
          icon: 'none',
        })
      } else {
        API.phoneMessage({
          mobile: this.data.telephone
        }).then(res => {

        })
        // loginApp.http.getRequest("/oauth/code/sms", {
        //   mobile: this.data.telephone
        // }).then(res => {

        // })

        //获取验证码倒计时
        let sec = this.data.btnSec;
        this.setData({
          buttonTimer: sec + "s",
          disabled: true
        })
        let timer = setInterval(() => {
          sec--;
          this.setData({
            buttonTimer: sec + "s"
          })

          if (sec <= 1) {
            clearInterval(timer)
            this.setData({
              buttonTimer: "获取验证码",
              disabled: false
            })
          }
        }, 1000)
      }
    },
    testTel() {
      let phone = this.data.telephone.trim();
      if (!phone || phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
        return false;
      }
      return true;
    },
    closePage() {
      this.setData({
        pageShow: false,
        forget: false,
        telephone: "",
        password: "",
        verificationCode: "",
        loginType: 'code'
      })
    },
    showPage() {
      this.setData({
        pageShow: true
      })
    }
  }
})
