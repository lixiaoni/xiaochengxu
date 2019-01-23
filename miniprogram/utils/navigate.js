import {
  navigateToAppID
} from "./const.js"
class Navigate{
  //构造函数
  constructor() {

  }


  //回到我的店铺
  toMyStore(targetAppId, targetStoreid){
    this.toProgram(targetAppId, "pages/page/user/user", {
      storeId: targetStoreid,
      type: 'myStore'
    })

  }

  //店铺初始化
  toInit(targetAppId, targetStoreid){
    this.toProgram(targetAppId, "pages/page/user/user", {
      storeId: targetStoreid,
      type: 'initStore',
      layerText:'请登陆购买账号后，点击我的工作台初始化账户'
    })
  }
  //店铺跳转
  toProgramStore(targetAppId,targetStoreid){
    this.toProgram(targetAppId,"pages/page/home/home",{
      storeId: targetStoreid,
      type:'store'
    })
  }

  //去mall
  toMall(){
    this.toProgram(navigateToAppID.platform, "pages/mall/newest/newest")
  }

  //返回去逛逛
  returnBack() {
    let fromId = wx.getStorageSync('navigateFromAppId');
    if (fromId && (fromId == navigateToAppID.xpl || fromId == navigateToAppID.xls)) {
      wx.navigateToMiniProgram({
        appId: navigateToAppID.platform,
        envVersion: 'trial'
      })
    } else {
      wx.navigateBackMiniProgram({
        success(res) {

        },
        fail() {
          wx.navigateToMiniProgram({
            appId: navigateToAppID.platform,
            envVersion: 'trial'
          })
        }
      })
    }
  }

  //跳转
  toProgram(targetAppId,targetPath,extraData){
    if (!extraData) { extraData = {}}
    extraData.appid = navigateToAppID.me;

    try{
      if (targetPath){
        if (targetPath.indexOf("?") == -1){
          targetPath += "?"
        }else{
          targetPath += "&"
        }
        let arr = [];
        for (let key in extraData) {
          arr.push(key + "=" + extraData[key]);
        }
        targetPath = targetPath + arr.join("&");
      }
    }catch(e){}

    return new Promise((resolve,reject) => {
      wx.navigateToMiniProgram({
        appId: targetAppId,
        path: targetPath,
        extraData,
        envVersion: 'trial',
        success(res) {
          resolve(res)
        },
        fail(e){
          reject(e)
        }
      })
    })
    
  }

  

  //入口处理跳转参数
  parseExtraDataOnlunch(options) {

  }
  parseExtraDataOnShow(options) {
    if (options.query && options.query.appid) {
      wx.setStorageSync("navigateFromAppId", options.query.appid)
    } else {
      wx.setStorageSync("navigateFromAppId", false)
    }
  }


}

export default Navigate