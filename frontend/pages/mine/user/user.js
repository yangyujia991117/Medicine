// pages/mine/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    backgroundImg:"https://yangyujia.oss-cn-beijing.aliyuncs.com/medicine/sea.jpg"
  },
  /**
   * 进入设置
   */
  gotoSetting(){
    if(!this.data.userInfo.userName){
      wx.showToast({
        title: "请先登录！",
        icon:"none",
        duration:800
      })
    }
    else{
      wx.navigateTo({
        url: '../setting/setting',
      })
    }
  },
  /**
   * 去登录
   */
  gotoLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(app.globalData.userNeedFlash){
      app.globalData.userNeedFlash=false
      this.getUserInfo()
    }
  },
  getUserInfo(){
    const ui = wx.getStorageSync("userInfo")
    if(ui){
      this.setData({
        userInfo:ui,
      })
    }
    else{
      this.setData({
        userInfo:{},
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})