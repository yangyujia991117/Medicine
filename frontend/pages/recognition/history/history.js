// pages/recognition/history/history.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
  },
  gotoAddRecognition(){
    if(this.data.id!=0){
      wx.navigateTo({
        url: '/pages/recognition/addRecognition/addRecognition?userId='+this.data.id
      })
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        mask: true,
        duration: 800,
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '/pages/mine/login/login',
        })
      },1000)
    }
    
  },

  /**
   * 重新设置页面所有数据 
   */
  getData(){
    const ui = wx.getStorageSync("userInfo")
    if(ui.id){
      this.setData({
        id:ui.id,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
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
    if(app.globalData.historyNeedFlash){
      this.getData()
      app.globalData.historyNeedFlash=false
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