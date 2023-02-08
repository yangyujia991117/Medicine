// pages/recognition/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"",
    resultImgList:["http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1675669798420.33864.90897513406/0-X%E5%85%89-4IwZ1iqzhzr10d070e8a97bb9cb1d5b525b7290b3aad.jpg?Expires=1991029798&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=bK%2FsdlUM0RZb1E1N%2F1Al14eUojg%3D","http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1675669798420.33864.90897513406/1-MR-8PiNjXqyt4pFd4a2d4dd30fcbfc350c0f43fd7e1117e.jpg?Expires=1991029798&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=O9Mz6wPff6qaJTrMxzk6v56imWQ%3D"],
    resultTextList:["结果0结果0结果0结果0结果0","结果1结果1结果1结果1结果1"],
    // resultList:[{path:"http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1675669798420.33864.90897513406/0-X%E5%85%89-4IwZ1iqzhzr10d070e8a97bb9cb1d5b525b7290b3aad.jpg?Expires=1991029798&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=bK%2FsdlUM0RZb1E1N%2F1Al14eUojg%3D",text:"结果0结果0结果0结果0结果0"},
    // {path:"http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1675669798420.33864.90897513406/1-MR-8PiNjXqyt4pFd4a2d4dd30fcbfc350c0f43fd7e1117e.jpg?Expires=1991029798&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=O9Mz6wPff6qaJTrMxzk6v56imWQ%3D",text:"结果1结果1结果1结果1结果1"},
    // {path:"http://yangyujia.oss-cn-beijing.aliyuncs.com/images/1675669798420.33864.90897513406/0-X%E5%85%89-4IwZ1iqzhzr10d070e8a97bb9cb1d5b525b7290b3aad.jpg?Expires=1991029798&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=bK%2FsdlUM0RZb1E1N%2F1Al14eUojg%3D",text:"结果0结果0结果0结果0结果0"}]
    resultList:[],
    recognitionTime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let ir = JSON.parse(decodeURIComponent(options.irResultVO))
    // this.setData({
    //   resultImgList:ir.resultImgList,
    //   resultTextList:ir.resultTextList
    // })
    // for(var i=0;i<this.data.resultImgList.length;i++){
    //   this.setData({
    //     resultList:this.data.resultList.concat({path:this.data.resultImgList[i],text:this.data.resultTextList[i]})
    //   })
    // }
    this.setData({
      resultList:ir.resultList,
      recognitionTime:ir.recognitionTime
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