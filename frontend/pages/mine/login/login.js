// pages/mine/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canLogin:false,
    phoneNumber:"",
    password:"",
    canSeePassword:false
  },
  /**
   * 获取输入的密码
   */
  getPassword:function(options){
    //获取输入框输入的内容
    let value = options.detail.value;
    this.setData({
      password:value
    }),
    console.log("输入的密码是 " + this.data.password)
    if(this.data.password!=""&&this.data.phoneNumber!=""){
      this.setData({
        canLogin:true
      })
    }
    else{
      this.setData({
        canLogin:false
      })
    }
  },
  /**
   * 获取输入的手机号
   */
  getPhoneNumber:function(options){
    //获取输入框输入的内容
    let value = options.detail.value;
    this.setData({
      phoneNumber:value
    }),
    console.log("输入的手机号是 " + this.data.phoneNumber)
    if(this.data.password!=""&&this.data.phoneNumber!=""){
      this.setData({
        canLogin:true
      })
    }
    else{
      this.setData({
        canLogin:false
      })
    }
  },
  /**
   * 提交登录表单
   */
  loginFormSubmit(e){
    let body=e.detail.value
    console.log("body",body)
    const that=this
    if(this.data.canLogin){
      //登录
      wx.request({
        url: 'http://117.181.137.102:8001/Medicine/PatientAccountController/loginPatientAccount',
        data:{
          "phoneNumber":that.data.phoneNumber,
          "password":that.data.password,
        },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'GET',
        success:function(res){
          console.log(res.data)
          if(res.data.success){
            that.clear()
            console.log(res.data.content)
            wx.setStorageSync("userInfo", res.data.content)
            app.globalData.userNeedFlash=true
            app.globalData.historyNeedFlash=true
            wx.showToast({
              title: '登录成功！',
              icon:'success',
              duration:800
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1,
              })
            },1000)
          }
          else{
            wx.showToast({
              title: res.data.message,
              icon:'none',
              duration:800,
            })
          }
          
        }
      }) 
    }
    else{
      wx.showToast({
        title: "请将登录信息填写完整！",
        icon: "none",
        mask: true,
        duration: 800,
      })
    }
  },
  /**
   * 设置密码是否可见
   */
  setCanSeePassword(){
    this.setData({
      canSeePassword:!this.data.canSeePassword
    })
  },
  /**
   * 将页面数据清空
   */
  clear(){
    this.setData({
      canLogin:false,
      phoneNumber:"",
      password:""
    })
  },
  /**
   * 跳转到注册页面
   */
  registerClick(){
    wx.navigateTo({
      url: '../register/register',
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