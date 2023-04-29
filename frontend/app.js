// app.js
App({
  globalData:{
    userNeedFlash:false,
    homeNeedFlash:false,
    hasNewRecognition:false,
    socket:'http://192.168.0.104:8001/',
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
