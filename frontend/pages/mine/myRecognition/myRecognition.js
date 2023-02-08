// pages/mine/myRecognition/myRecognition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:0,
    IRResultVOList:[
      {userId:1,recognitionTime:"2023/02/08 20:54:16",
      resultList:[
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/0-MR-eix6v7m5Cu12d4a2d4dd30fcbfc350c0f43fd7e1117e.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=GD1h6GxTfDjXkUC0TtXYKh8%2BnnA%3D",
        text: "结果结果结果结果结果0"},
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/1-X%E5%85%89-ZGwRSfFVjQjU88daac4ed231325b1b002afb1c8bb08a.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=sfyDkhliWdv%2FLG54ZhlbsCnjbls%3D",
        text: "结果结果结果结果结果1"},
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/1-X%E5%85%89-ZGwRSfFVjQjU88daac4ed231325b1b002afb1c8bb08a.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=sfyDkhliWdv%2FLG54ZhlbsCnjbls%3D",
        text: "结果结果结果结果结果1"},
        {path: "http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/1-X%E5%85%89-ZGwRSfFVjQjU88daac4ed231325b1b002afb1c8bb08a.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=sfyDkhliWdv%2FLG54ZhlbsCnjbls%3D",
        text: "结果结果结果结果结果1"}
      ]},
      
      {userId:1,recognitionTime:"2023/02/06 23:47:00",
      resultList:[
        {path:"http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1.1675860859510.75111.77765063567/0-MR-eix6v7m5Cu12d4a2d4dd30fcbfc350c0f43fd7e1117e.jpg?Expires=1991220860&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=GD1h6GxTfDjXkUC0TtXYKh8%2BnnA%3D",
        text: "识别结果"},
      ]},
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
      url: 'http://117.181.137.102:8001/Medicine/IRController/getIRResultByUserId',
      data:{
        "userId":that.data.userId,
      },
      header:{'Content-Type': 'application/x-www-form-urlencoded'},
      method:'GET',
      success:function(res){
        console.log(res.data)
        if(res.data.success){
          that.setData({
            IRResultVOList:res.data.content.reverse()
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