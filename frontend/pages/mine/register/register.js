// pages/mine/register/register.js
const util = require('../../../utils/util.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canRegister:false,
    seePassword:false,//是否设置密码可见
    seeConfirmPassword:false,//是否设置确认密码可见
    userName:"",
    password:"",
    confirmPassword:"",
    phoneNumber:"",
    passwordNotSame:false,
    phoneNumberWrong:false,
    canSeePassword:false,
    canSeeConfirmPassword:false
  },
  /**
   * 判断是否可以注册
   */
  canRegisterOrNot(){
    if(this.data.userName!=""&&this.data.password!=""&&this.data.confirmPassword!=""&&this.data.phoneNumber!=""){
      this.setData({
        canRegister:true
      })
    }
    else{
      this.setData({
        canRegister:false
      })
    }
  },
  /**
   * 获取输入的用户名
   */
  getUserName:function(options){
    //获取输入框输入的内容
    let value = options.detail.value;
    this.setData({
      userName:value
    })
    this.canRegisterOrNot()
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
    if(this.data.password!=""&&this.data.confirmPassword!=""&&this.data.confirmPassword!=this.data.password){
      this.setData({
        passwordNotSame:true
      })
    }
    else{
      this.setData({
        passwordNotSame:false
      })
    }
    this.canRegisterOrNot()
  },
  /**
   * 获取输入确认密码
   */
  getConfirmPassword:function(options){
    //获取输入框输入的内容
    let value = options.detail.value;
    this.setData({
      confirmPassword:value
    }),
    console.log("输入的确认密码是 " + this.data.confirmPassword)
    if(this.data.password!=""&&this.data.confirmPassword!=""&&this.data.confirmPassword!=this.data.password){
      this.setData({
        passwordNotSame:true
      })
    }
    else{
      this.setData({
        passwordNotSame:false
      })
    }
    this.canRegisterOrNot()
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
    if(this.data.phoneNumber!=""&&(this.data.phoneNumber.length!=11||!util.regexConfig().phoneNumber.test(this.data.phoneNumber))){
      this.setData({
        phoneNumberWrong:true,
        canRegister:false
      })
    }
    else{
      this.setData({
        phoneNumberWrong:false,
        canRegister:true
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
   * 设置确认密码是否可见
   */
  setCanSeeConfirmPassword(){
    this.setData({
      canSeeConfirmPassword:!this.data.canSeeConfirmPassword
    })
  },

  /**
   * 提交注册表单
   */
  registerFormSubmit(e){
    var body=e.detail.value
    console.log("body",body)
    const that=this
    if(this.data.canRegister){
      //注册
      wx.request({
        url: 'http://192.168.0.104:8001/Medicine/PatientAccountController/registerPatientAccount',
        data:{"userName":that.data.userName,
        "password":that.data.password,
        "phoneNumber":that.data.phoneNumber},
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success:function(res){
          console.log(res.data)
          if(res.data.success){
            that.clear()
            wx.showToast({
              title: '注册成功！',
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
      if(this.data.phoneNumberWrong&&this.data.userName!=""&&this.data.password!=""&&this.data.confirmPassword!=""){
        wx.showToast({
          title: "请填写正确格式的手机号！",
          icon: "none",
          mask: true,
          duration: 800,
        })
      }
      else{
        wx.showToast({
          title: "请将注册信息填写完整！",
          icon: "none",
          mask: true,
          duration: 800,
        })
      }
      
    }
  },
  /**
   * 将所有信息清空
   */
  clear(){
    this.setData({
      canRegister:false,
      seePassword:false,
      seeConfirmPassword:false,
      userName:"",
      password:"",
      confirmPassword:"",
      phoneNumber:"",
      passwordNotSame:false,
      phoneNumberWrong:false,
    })
  },
  /**
   * 回到登录页面
   */
  loginClick(){
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.clearStorageSync();   //清除缓存
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