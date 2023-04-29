// pages/mine/myRecognition/myRecognition.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:0,
    IRResultVOList:[
      {id:1,userId:1,recognitionTime:"2023/02/08 20:54:16",
      resultList:[
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/0-MR-eix6v7m5Cu12d4a2d4dd30fcbfc350c0f43fd7e1117e.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=GD1h6GxTfDjXkUC0TtXYKh8%2BnnA%3D",
        text: "结果结果结果结果结果0"},
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/1-X%E5%85%89-ZGwRSfFVjQjU88daac4ed231325b1b002afb1c8bb08a.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=sfyDkhliWdv%2FLG54ZhlbsCnjbls%3D",
        text: "结果结果结果结果结果1"},
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/1-X%E5%85%89-ZGwRSfFVjQjU88daac4ed231325b1b002afb1c8bb08a.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=sfyDkhliWdv%2FLG54ZhlbsCnjbls%3D",
        text: "结果结果结果结果结果1"},
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/1-X%E5%85%89-ZGwRSfFVjQjU88daac4ed231325b1b002afb1c8bb08a.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=sfyDkhliWdv%2FLG54ZhlbsCnjbls%3D",
        text: "结果结果结果结果结果1"}
      ],ask_hidden:true},
      
      {id:2,userId:1,recognitionTime:"2023/02/06 23:47:00",
      resultList:[
        {path:"http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/0-MR-eix6v7m5Cu12d4a2d4dd30fcbfc350c0f43fd7e1117e.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=GD1h6GxTfDjXkUC0TtXYKh8%2BnnA%3D",
        text: "识别结果"},
      ],ask_hidden:true},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userId:options.userId
    })
    this.getMyRecognition()
  },

  /**
   * 获取该用户的图像识别历史
   */
  getMyRecognition(){
    const that=this
    wx.request({
      url: 'http://192.168.0.104:8001/Medicine/IRController/getIRResultByUserId',
      data:{
        "userId":that.data.userId,
      },
      header:{'Content-Type': 'application/x-www-form-urlencoded'},
      method:'GET',
      success:function(res){
        console.log(res.data)
        if(res.data.success){
          res.data.content.forEach(item=>{
            item.ask_hidden=true//给每一项添加ask_hidden属性
          })
          that.setData({
            IRResultVOList:res.data.content.reverse()
          })
        }
      }
    })
  },
  /**
   * 点击删除按钮
   */
  clickDeleteButton(e){
    this.setData({
      ['IRResultVOList['+ e.currentTarget.dataset.index + '].ask_hidden'] : false
    })
  },
  /**
   * 点击取消按钮 
   */
  clickCancelButton(e){
    this.setData({
      ['IRResultVOList['+ e.currentTarget.dataset.index + '].ask_hidden'] : true
    })
  },
  /**
   * 删除识别历史
   */
  deleteRecognition(e){
    console.log("删除",e.currentTarget.dataset.index)
    var id=this.data.IRResultVOList[e.currentTarget.dataset.index].id
    const that=this
    wx.request({
      url: 'http://192.168.0.104:8001/Medicine/IRController/deleteIRResultById',
      data:{
        "id":id,
      },
      header:{'Content-Type': 'application/x-www-form-urlencoded'},
      method:'DELETE',
      success:function(res){
        console.log(res.data)
        if(res.data.success){
          console.log("删除成功")
          that.data.IRResultVOList.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            IRResultVOList:that.data.IRResultVOList
          })
        }
      }

    })
  },
  /**
   * 点击查看图片，可以进行保存
   */
  preview(e) {
    console.log(e.currentTarget.dataset.src.toString())
    wx.previewImage({
      urls: [e.currentTarget.dataset.src.toString()],
      current: e.currentTarget.dataset.src.toString()
    })
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