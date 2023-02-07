// pages/mine/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 退出
   */
  logout(){
    wx.showModal({
      confirmColor:"#00acc9",
      content:"退出后可以再次登录",
      title: "确定退出？",
      success: function (res) {
        if (res.confirm) {//点击确定
          wx.removeStorageSync("userInfo")
          app.globalData.userNeedFlash=true
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
          },300)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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