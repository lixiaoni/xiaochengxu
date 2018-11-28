import {
  adminGoodsListUrl,
  adminGoodsDeleteUrl,
  adminGoodsUpUrl,
  goodsApiSearchListUrl,
  adminGoodsDownUrl,
  adminShopCateUrl,
  adminGoodsStatusUrl,
  saleBatchNumUrl,
  isFriendUrl,
  newGoodsSearchListUrl,
  cusNewDetailsUrl,
  salebatchamountUrl,
  saleBatchUrl,
  goodsSearchListUrl,
  classListUrl,
  addClassUrl,
  adminGoodsDetailsUrl,
  customCategoryCodeUrl,
  classCodeListUrl,
  goodsDetailsUrl,
  batchNumUrl,
  addressListUrl,
  addressDefaultUrl,
  addressDeleteUrl,
  saveAddressUrl,
  addressInfoUrl,
  editAddressUrl,
  cartListUrl,
  addTemplateUrl,
  templateUrl,
  templateDeleteUrl,
  updateTemplateNameUrl,
  updateSpecNameUrl,
  addCartUrl,
  topGoodsUrl,
  deleteTemplateUrl,
  addTempContUrl,
  deteleCartGoodsUrl,
  deteleCartFaiUrl,
  addMoreCartUrl,
  likeStoreUrl,
  deteleLikeStoreUrl,
  saveSpecTemplateContentUrl,
  shopListUrl,
  indexUrl,
  mewWholesalerUrl,
  setNameUrl,
  addWholesalerUrl,
  passUrl,
  wholesalerAllUrl,
  merchantIndexUrl,
  merchantListUrl,
  newMerchantUrl,
  applyUrl,
  acceptPurchaserUrl,
  userInfoUrl,
  saveDetailsUrl,
  serWholesalerListUrl,
  purchaserListUrl,
  remakInfoUrl,
  acceptmerchantUrl,
  purchaserUserIdUrl,
  configUrl,
  homeIndexUrl,
  storeIdInfoUrl,
  updateCoverUrl,
  apiSetUserUrl,
  apiAddUserUrl,
  adminSetUserUrl,
  adminAddUserUrl,
  dealUserUrl,
  favoriteusersUrl,
  updateMoreCartUrl,
  updateMesUrl,
  uploadLogoImgUrl,
  storeIndexUrl,
  setUserNameUrl,
  getUserDetaislUrl,
  userIdentityUrl,
  classListApiUrl,
  quitUrl,
  updataPwdUrl,
  changeIconUrl,
  testGoodCodeUrl,
  addGoodsUrl,
  isFriendStoreUrl,
  uploadPayVoucherUrl,
  resetPasswordUrl,
  phoneMessageUrl,
  registerUrl,
  newUserInforUrl,
  registerPhoneMsgUrl,
  removeDefaultUrl,
  closedOrderUrl,
  cancelOrderUrl,
  miniProgramCodeUrl,
  addDxpressUrl,
  addRemarkUrl,
  classCodeParUrl,
  updateGoodsUrl,
  seeVoucherUrl,
  getStoreNameUrl,
  getStoreDetailsUrl,
  userInforUrl,
  supplyOrderUrl,
  showPurchaserUrl,
  showMerchantUrl,
  getPaymentImgUrl,
  putPaymentImgUrl,
  recentGoodsUrl,
  copyGoodsUrl,
  tempSortUrl
} from './constUrl.js'

const app = getApp()
/**判断是否为空**/
function isEmpty(str) {
  if (str == '' || str == undefined || str == null){
    return false
  }else{
    return true
  }
}
/**提示**/
function showToast(message) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  })
}
/**判断楼座是否为空**/
function isFloorInfo(obj) {
  if (isEmpty(obj)) {
    var floor = obj
      floor.mallName = floor.mallName == null ? '' : floor.mallName,
      floor.areaName = floor.areaName == null ? '' : floor.areaName,
      floor.balconyName = floor.balconyName == null ? '' : floor.balconyName,
      floor.floorName = floor.floorName == null ? '' : floor.floorName,
      floor.floorDescription = floor.floorDescription == null ? '' : floor.floorDescription,
      floor.storeDoorNum = floor.storeDoorNum == null ? '' : floor.storeDoorNum
    return floor
  } else {
    return null
  }
}
/**用户身份判断**/
function userIdentity(data) {
  data = initStoreId(data);
  return app.http.getRequest(userIdentityUrl, data)
}
/**根据id获取店铺ID**/
function getStoreDetails(data) {
  return app.http.getRequest(getStoreDetailsUrl, data)
}
/**获取店铺的小程序码**/
function miniProgramCode(data) {
  return app.http.getRequest(miniProgramCodeUrl, data)
}
/**获取店铺信息**/
function getStoreInfo() {
  let data = initStoreId({})
  return app.http.getRequest(miniProgramCodeUrl, data)
}
/**云享品管理 列表**/ 
function adminGoodsList(data){
  data = initStoreId(data);
  return app.pageRequest.pageGet(adminGoodsListUrl, data)
}
/**首页新品**/
function recentGoods(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(recentGoodsUrl, data)
}
/**商品 删除**/
function adminGoodsDelete(data) {
  return app.http.deleteRequest(adminGoodsDeleteUrl, data)
}
/**获取进货商资料**/
function userInfor(data) {
  return app.http.getRequest(userInforUrl, data)
}
/**获取店铺客户关系资料**/
function cusNewDetails(data) {
  data = initStoreId(data);
  return app.http.getRequest(cusNewDetailsUrl, data)
}

/**获取批发商商资料**/
function newUserInfor(data) {
  return app.http.getRequest(newUserInforUrl, data)
}

/**分类列表**/
function classCodePar(data) {
  return app.http.getRequest(classCodeParUrl, data)
}
/**商品 上架**/
function adminGoodsUp(data) {
  data = initStoreId(data);
  return app.http.postRequest(adminGoodsUpUrl, data)
}
/**商品 下架**/
function adminGoodsDown(data) {
  data = initStoreId(data);
  return app.http.postRequest(adminGoodsDownUrl, data)
}
/**本店分类**/
function adminShopCate(data) {
  data = initStoreId(data);
  return app.http.getRequest(adminShopCateUrl, data)
}
/**工作台**/
function storeIndex(data) {
  data = initStoreId(data);
  return app.http.getRequest(storeIndexUrl, data)
}
/**商品状态筛选**/
function adminGoodsStatus(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(adminGoodsStatusUrl, data)
}
/**店铺设置起批量**/
function saleBatchNum(data) {
  return app.http.putRequest(saleBatchNumUrl+'?saleBatchNum='+data)
} 
/**添加商品**/
function addGoods(data) {
  data = initStoreId(data);
  return app.http.postRequest(addGoodsUrl,data)
} 
/**更新商品**/
function updateGoods(data) {
  return app.http.putRequest(updateGoodsUrl,data)
} 
/**编辑商品详情**/
function adminGetDetails(data) {
  return app.http.getRequest(adminGoodsDetailsUrl, data)
}
/**分类**/
function customCategoryCode(data) {
  data = initStoreId(data);
  return app.http.putRequest(customCategoryCodeUrl,data)
}
/**店铺设置起批量**/
function saleBatchAmount(data) {
  return app.http.putRequest(salebatchamountUrl+'?amount='+data)
} 
/**获取店铺起批配置**/
function saleBatch(data) {
  data = initStoreId(data);
  return app.http.getRequest(saleBatchUrl, data)
}
/**商品搜索列表**/
function goodsSearchList(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(goodsSearchListUrl, data)
}
/**商品搜索列表**/
function newGoodsSearchList(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(newGoodsSearchListUrl, data)
}
/**商品搜索列表**/
function goodsApiSearchList(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(goodsApiSearchListUrl, data)
}
/**关注用户列表**/
function favoriteusers(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(favoriteusersUrl, data)
}
/**店铺首页**/
function homeIndex(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(homeIndexUrl, data)
}
/**获取店内分类列表**/
function classList(data) {
  data = initStoreId(data);
  return app.http.getRequest(classListUrl,data)
}
/**无登录状态获取店内分类列表**/
function classListApi(data) {
  data = initStoreId(data);
  return app.http.getRequest(classListApiUrl, data)
}
/**新建分类**/
function addClass(data) {
  data = initStoreId(data);
  return app.http.postRequest(addClassUrl, data)
} 
/**商品置顶**/
function topGoods(data) {
  return app.http.putRequest(topGoodsUrl+"?isTop=true", data)
}
/**取消默认地址**/
function removeDefault(data) {
  return app.http.putRequest(removeDefaultUrl, data)
}
/**商品状态筛选**/
function classCodeList(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(classCodeListUrl, data)
}
/**设置用户备注**/
function setUserName(data) {
  data = initStoreId(data);
  return app.http.postRequest(setUserNameUrl, data)
} 
/**商品详情**/
function goodsDetails(data) {
  return app.http.getRequest(goodsDetailsUrl, data)
}
/**查询商品的起批设置**/
function batchNum(data) {
  return app.http.getRequest(batchNumUrl, data)
}
/**获取用户地址列表**/
function addressList(data) {
  return app.http.getRequest(addressListUrl,data)
}
/**默认用户地址**/
function addressDefault(data) {
  return app.http.getRequest(addressDefaultUrl, data)
}
/**地址 删除**/
function addressDelete(data) {
  return app.http.deleteRequest(addressDeleteUrl, data)
}
/**地址添加**/
function saveAddress(data) {
  return app.http.postRequest(saveAddressUrl,data)
} 
/**地址详情**/
function addressInfo(data) {
  return app.http.getRequest(addressInfoUrl, data)
}
/**编辑地址**/
function editAddress(data) {
  return app.http.putRequest(editAddressUrl, data)
}
/**用户购物车列表**/
function cartList(data) {
  data = initStoreId(data);
  return app.http.getRequest(cartListUrl, data)
}
/**保存模板**/
function addTemplate(data) {
  return app.http.postRequest(addTemplateUrl, data)
} 
/**排序模板**/
function tempSort(data) {
  return app.http.postRequest(tempSortUrl +"?sortType=asc", data)
}
/**调换规格位置**/
function saveSpecTemplateContent(data) {
  return app.http.postRequest(saveSpecTemplateContentUrl, data)
}
/**模板列表**/
function template(data) {
  return app.http.getRequest(templateUrl, data)
}
/**模板 删除**/
function templateDelete(data) {
  return app.http.deleteRequest(templateDeleteUrl + '?templateId=' + data)
}
/**更新模板**/
function updateTemplateName(templateId, templateName ) {
  return app.http.putRequest(updateTemplateNameUrl+'?templateId='+templateId+'&templateName='+templateName )
} 
/**更新规格**/
function updateSpecName(templateContentId,specName,data) {
  data = initStoreId(data);
  return app.http.putRequest(updateSpecNameUrl+'?templateContentId='+templateContentId+'&specName='+specName)
} 
/**添加到购物车**/
function addCart(data) {
  data = initStoreId(data);
  return app.http.postRequest(addCartUrl, data)
}
/**批量添加到购物车**/
function addMoreCart(data) {
  return app.http.postRequest(addMoreCartUrl, data)
}
/**删除购物车商品**/
function deteleCartGoods(data) {
  return app.http.deleteRequest(deteleCartGoodsUrl,data)
}
/**修改购物车**/
function updateMoreCart(data) {
  var goodsId = JSON.parse(data)[0]["goodsId"]
  var url = '/api/shop/shoppingcart/shop/goods/batch/'+goodsId
  return app.http.putRequest(url, data)
}
/**情况购物车失效商品**/
function deteleCartFai(data) {
  data = initStoreId(data);
  return app.http.deleteRequest(deteleCartFaiUrl,data)
}
/**删除规格**/
function deleteTemplate(data) {
  return app.http.deleteRequest(deleteTemplateUrl+'?templateContentId='+data)
}
/**添加规格**/
function addTempCont(templateContentId, specValueList) {
  return app.http.putRequest(addTempContUrl+'?templateContentId='+templateContentId+'&specValueList='+specValueList)
}
/**取消关注**/
function deteleLikeStore(data) {
  return app.http.deleteRequest(deteleLikeStoreUrl+'?storeId='+wx.getStorageSync('storeId'))
}
/**关注店铺**/
function likeStore(data) {
  return app.http.putRequest(likeStoreUrl+'?storeId='+wx.getStorageSync('storeId'))
}
/**店铺信息**/
function shopList(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGetIndex(shopListUrl, data)
}
/**批发商数据**/
function index(data) {
  data = initStoreId(data);
  return app.http.getRequest(indexUrl, data)
}
/**判断与供应商是否是好友关系**/
function isFriendStore(data) {
  return app.http.getRequest(isFriendStoreUrl, data)
}
/**判断与此进货商是否是好友关系**/
function isFriend(data) {
  data = initStoreId(data);
  return app.http.getRequest(isFriendUrl, data)
}
/**新增批发商列表**/
function mewWholesaler(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(mewWholesalerUrl, data)
}
/**设置备注**/
function setName(data) {
  return app.http.postRequest(setNameUrl, data)
}
/**添加批发商**/
function addWholesaler(data) {
  return app.http.postRequest(addWholesalerUrl, data)
}
/**批发商通过验证**/
function pass(data) {
  return app.http.postRequest(passUrl, data)
}
/**进货商通过验证**/
function acceptmerchant(data) {
  return app.http.postRequest(acceptmerchantUrl, data)
}
/**批发商列表**/
function wholesalerAll(data) {
  return app.pageRequest.pageGet(wholesalerAllUrl, data)
}
/**进货商数据**/
function merchantIndex(data) {
  data = initStoreId(data);
  return app.http.getRequest(merchantIndexUrl, data)
}
/**进货商列表**/
function merchantList(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(merchantListUrl, data)
}
/**成交信息**/
function dealUser(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(dealUserUrl, data)
}
/**新增进货商列表**/
function newMerchant(data) {
  data = initStoreId(data);
  return app.pageRequest.pageGet(newMerchantUrl, data)
}
/**发送商友申请 添加到进货商**/
function apply(data) {
  data = initStoreId(data);
  return app.http.postRequest(applyUrl, data)
}
/**接受申请添加到进货商**/
function acceptPurchaser(data) {
  data = initStoreId(data);
  return app.http.postRequest(acceptPurchaserUrl, data)
}
/**客户信息**/
function userInfo(data) {
  data = initStoreId(data);
  return app.http.getRequest(userInfoUrl, data)
}
/**保存客户信息**/
function saveDetails(data) {
  data = initStoreId(data);
  return app.http.postRequest(saveDetailsUrl, data)
}
/**添加批发商分页查询列表**/
function serWholesalerList(data) {
  return app.pageRequest.pageGet(serWholesalerListUrl, data)
}
/**添加进货商分页查询列表**/
function purchaserList(data) {
  return app.pageRequest.pageGet(purchaserListUrl, data)
}
/**进货商资料**/
function remakInfo(data) {
  data = initStoreId(data);
  return app.http.getRequest(remakInfoUrl, data)
}
/**批发商资料**/
function purchaserUserId(url) {
  return app.http.getRequest(url)
}
/**扫一扫查看批发商**/
function showPurchaser(data) {
  return app.http.getRequest(showPurchaserUrl,data)
}
/**扫一扫查看进货商**/
function showMerchant(data) {
  return app.http.getRequest(showMerchantUrl, data)
}
/**满足起批配置信息**/
function config(goodsId) {
  var storeId = wx.getStorageSync('storeId')
  return app.http.getRequest(configUrl+'?storeId='+storeId+'&goodsId='+goodsId)
}
/**店铺详情**/
function storeIdInfo(data) {
  data = initStoreId(data);
  return app.http.getRequest(storeIdInfoUrl, data)
}
/**上传图片**/
function uploadImage(types) {
  return app.http.chooseImageUpload(types)
}
/**更换小云店封面**/
function updateCover(url,data) {
  data = initStoreId(data);
  return app.http.putRequest(updateCoverUrl +'?coverUrl='+url,data)
}
/**更换小云店名称**/
function updateMes(data) {
  data = initStoreId(data);
  return app.http.putRequest(updateMesUrl, data)
}
/**更换小云店logo**/
function uploadLogoImg(url,data) {
  data = initStoreId(data);
  return app.http.putRequest(uploadLogoImgUrl+'?logo='+url, data)
}
/**获取用户权限设置**/
function apiSetUser(data) {
  return app.http.getRequest(apiSetUserUrl, data)
}
function adminSetUser(data) {
  return app.http.getRequest(adminSetUserUrl, data)
}
/**获取店铺名称**/
function getStoreName(data) {
  data = initStoreId(data);
  return app.http.getRequest(getStoreNameUrl, data)
}

/**获取用户信息**/
function getUserDetaisl(data) {
  return app.http.getRequest(getUserDetaislUrl, data)
}
/**权限设置**/
function apiAddUser(data) {
  return app.http.putRequest(apiAddUserUrl+"?bfPripermission="+data)
}
function adminAddUser(data) {
  return app.http.putRequest(adminAddUserUrl,data)
}
// 退出登录
function quit(data){
  return app.http.postRequest(quitUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
// 修改密码
function updataPwd(data){
  return app.http.postRequest(updataPwdUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
// 修改头像
function changeIcon(data){
  return app.http.putRequest(changeIconUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
// 验证取货码
function testGoodCode(data){
  return app.http.putRequest(testGoodCodeUrl,data, { 'content-type': 'application/x-www-form-urlencoded' })
}
// 上传凭证
function uploadVoucher(data){
  return app.http.postRequest(uploadPayVoucherUrl, data, {'content-type':'application/x-www-form-urlencoded'})
}
/**重置密码**/
function resetPassword(data) {
  return app.http.postRequest(resetPasswordUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**短信验证码**/
function phoneMessage(data) {
  return app.http.getRequest(phoneMessageUrl, data)
}
/**注册**/
function register(data) {
  return app.http.postRequest(registerUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**注册短信验证码**/
function registerPhoneMsg(data) {
  return app.http.getRequest(registerPhoneMsgUrl, data)
}
// 关闭订单
function closeOrder(data){
  return app.http.putRequest(closedOrderUrl+"?reason="+data.reason, data)
}
// 取消订单
function cancelOrder(data){
  return app.http.putRequest(cancelOrderUrl + "?reason=" + data.reason, data)
}
// 添加快递
function addExpress(data){
  let expressCompany = data.expressCompany ? data.expressCompany:"";
  let expressNumber = data.expressNumber ? data.expressNumber:"";
  return app.http.putRequest(addDxpressUrl + "?expressCompany=" + expressCompany + "&expressNumber=" + expressNumber, data)
}
// 订单填写商家备注
function addRemark(data){
  return app.http.putRequest(addRemarkUrl +"?remark=" + data.remark, data)
}  
// 查看凭证
function seeVoucher(data){
  return app.http.getRequest(seeVoucherUrl, data)
}
// 裁剪图片跳转
function toCuttingImg(url,quality,width,height){
  if(url){
    let add = '/pages/page/upload/upload?src=' + url;
    quality?add+="&quality=true":"";
    add +="&width=";
    width?add+=width:add+="750";
    add += "&height=";
    height ? add += height : add += "750";
    wx.navigateTo({
      url: add,
    })
  }
}
// 提交订单
function supplyOrde(data){
  data = initStoreId(data);
  return app.http.postRequest(supplyOrderUrl, data);
}
/**更新商品**/
function copyGoods(data) {
  return app.http.putRequest(copyGoodsUrl, data)
} 
// 回首页
function toHome(){
  wx.switchTab({
    url: '/pages/page/home/home'
  })
}
// 获取收款二维码
function getPaymentImg(data){
  data = initStoreId(data);  
  return app.http.getRequest(getPaymentImgUrl, data)
}
// 设置收款二维码
function putPaymentImg(data) {
  data = initStoreId(data);
  return app.http.putRequest(putPaymentImgUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**
 * 获取formId
 */
function getFormId(e) {
  var formId = e.detail.formId;
  var content = e.detail.target.dataset.name//记录用户的操作
  wx.setStorageSync("formId", formId)
}
/**
 * 初始化storeId
 */
function initStoreId(data) {
  if (data == null || data == undefined) {
    data = {};
  }
  if (getStoreId()){
    data.storeId = wx.getStorageSync('storeId');
    return data;
  }else{
    showToast("暂无店铺ID！")
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1]
    curPage.setData({
      indexEmpty: false
    })
  }
}
/**
 * 获取店铺storeId
 */
function getThisStoreId(){
  if(getStoreId()){
    return wx.getStorageSync("storeId")
  }
}
/**
 *判断是否有storeId
 */
function getStoreId() {
  if (wx.getStorageSync("storeId") == undefined || wx.getStorageSync("storeId") == '' || wx.getStorageSync("storeId") == null){
    return false
  }else{
    return true
  }
}
module.exports = {
  copyGoods: copyGoods,
  getFormId: getFormId,
  tempSort: tempSort,
  isFloorInfo: isFloorInfo,
  putPaymentImg: putPaymentImg,
  getPaymentImg: getPaymentImg,
  getStoreId: getStoreId,
  getThisStoreId: getThisStoreId,
  toHome: toHome,
  getStoreInfo: getStoreInfo,
  supplyOrde: supplyOrde,
  toCuttingImg: toCuttingImg,
  seeVoucher: seeVoucher,
  addRemark: addRemark,
  addExpress: addExpress,
  cancelOrder: cancelOrder,
  closeOrder: closeOrder,
  resetPassword: resetPassword,
  phoneMessage: phoneMessage,
  register: register,
  registerPhoneMsg: registerPhoneMsg,
  uploadVoucher: uploadVoucher,
  testGoodCode: testGoodCode,
  isEmpty: isEmpty,
  showToast: showToast,
  classListApi: classListApi,
  adminGoodsList: adminGoodsList,
  adminGoodsDelete: adminGoodsDelete,
  adminGoodsUp: adminGoodsUp,
  adminGoodsDown: adminGoodsDown,
  adminShopCate: adminShopCate,
  adminGoodsStatus: adminGoodsStatus,
  saleBatchNum: saleBatchNum,
  saleBatchAmount: saleBatchAmount,
  saleBatch: saleBatch,
  goodsSearchList: goodsSearchList,
  classList: classList,
  addClass: addClass,
  classCodeList: classCodeList,
  goodsDetails: goodsDetails,
  batchNum:batchNum,
  addressList: addressList,
  isFriend: isFriend,
  isFriendStore: isFriendStore,
  addressDefault: addressDefault,
  addressDelete: addressDelete,
  saveAddress: saveAddress,
  addressInfo: addressInfo,
  editAddress: editAddress,
  getStoreDetails: getStoreDetails,
  cartList: cartList,
  newUserInfor: newUserInfor,
  removeDefault: removeDefault,
  addTemplate: addTemplate,
  template: template,
  templateDelete: templateDelete,
  updateTemplateName: updateTemplateName,
  updateSpecName: updateSpecName,
  addCart:addCart,
  deleteTemplate: deleteTemplate,
  addTempCont: addTempCont,
  deteleCartGoods: deteleCartGoods,
  deteleCartFai:deteleCartFai,
  addMoreCart: addMoreCart,
  deteleLikeStore: deteleLikeStore,
  likeStore: likeStore,
  saveSpecTemplateContent,
  shopList: shopList,
  index:index,
  mewWholesaler: mewWholesaler,
  setName: setName,
  addWholesaler: addWholesaler,
  pass:pass,
  updateGoods: updateGoods,
  wholesalerAll:wholesalerAll,
  merchantIndex: merchantIndex,
  merchantList: merchantList,
  newMerchant: newMerchant,
  apply: apply,
  acceptPurchaser: acceptPurchaser,
  userInfo: userInfo,
  saveDetails: saveDetails,
  serWholesalerList: serWholesalerList,
  purchaserList: purchaserList,
  remakInfo: remakInfo,
  acceptmerchant: acceptmerchant,
  purchaserUserId: purchaserUserId,
  config: config,
  homeIndex: homeIndex,
  getStoreName: getStoreName,
  storeIdInfo: storeIdInfo,
  uploadImage: uploadImage,
  updateCover: updateCover,
  apiSetUser: apiSetUser,
  apiAddUser: apiAddUser,
  cusNewDetails: cusNewDetails,
  adminAddUser: adminAddUser,
  adminSetUser: adminSetUser,
  dealUser:dealUser,
  favoriteusers: favoriteusers,
  updateMoreCart: updateMoreCart,
  updateMes: updateMes,
  uploadLogoImg: uploadLogoImg,
  topGoods: topGoods,
  adminGetDetails: adminGetDetails,
  storeIndex: storeIndex,
  setUserName: setUserName,
  getUserDetaisl: getUserDetaisl,
  userIdentity: userIdentity,
  customCategoryCode: customCategoryCode,
  quit: quit,
  miniProgramCode: miniProgramCode,
  userInfor: userInfor,
  classCodePar: classCodePar,
  addGoods: addGoods,
  newGoodsSearchList: newGoodsSearchList,
  classListApi: classListApi,
  goodsApiSearchList: goodsApiSearchList,
  updataPwd: updataPwd,
  changeIcon: changeIcon,
  showPurchaser: showPurchaser,
  showMerchant: showMerchant,
  recentGoods: recentGoods
}
