// pages/imageRecognition/addRecognition/addRecognition.js
const Multipart = require('../../../utils/Multipart.min.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:0,
    types:["照片","CT","MR","X光","PET","超声"],
    imgList:[
      {path:"../../../image/defaultImg.png",type:"",execSelect:false}
    ],
    hideAdd:false,//是否隐藏添加图片按钮
  },
  /**
   * 上传图像 
   */
  onCameraTap(e){
    var index=e.currentTarget.dataset.index
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success: function (res) {
        that.setData({
          ['imgList['+ index + '].path'] : res.tempFilePaths[0],
        })
      }
    })
  },
  /**
   * 进行识别
   */
  recognize(){
    var img
    //判断图像信息是否已完整
    for(let i=0;i<this.data.imgList.length;i++){
      img=this.data.imgList[i]
      if(img.path=="../../../image/defaultImg.png"||img.type==""){
        wx.showToast({
          title: "请将第 "+(i+1).toString()+" 张图像的信息\r\n补充完整！",
          icon: "none",
          mask: true,
          duration: 800,
        })
        return
      }
    }
    //传递给后端
    let types=[]
    let files=[]
    this.data.imgList.forEach(item=>{
      types.push(item.type)
      files=files.concat({name:"img",filePath:item.path})
    })
    let time=util.formatTime(new Date())
    let fields=[{name:"types",value:types},{name:"userId",value:this.data.userId.toString()},{name:"time",value:time}]
    console.log("files",files)
    console.log("fields",fields)
    wx.showLoading({
      title: '识别中',
    })
    new Multipart({
			files,
      fields,
    }).submit('http://117.181.137.102:8001/Medicine/IRController/testRecognize').then((res) => {
      console.log(res.data)
      wx.hideLoading()
      if(res.data.success){
        var irResultVO=res.data.content
        console.log(irResultVO)
        wx.showToast({
          title: '识别成功！',
          duration:800
        })
        setTimeout(()=>{
          wx.navigateTo({
            //注意：若对象的参数或数组的元素中遇到地址，地址中包括?、&这些特殊符号时，对象/数组先要通过JSON.stringify转化为字符串再通过encodeURIComponent编码，接收时，先通过decodeURIComponent解码再通过JSON.parse转换为JSON格式的对象/数组
            url: '../result/result?irResultVO='+encodeURIComponent(JSON.stringify(irResultVO)),
          })
          this.clear()
        },1000)
      }
      else{
        wx.showToast({
          title: '识别失败！',
          icon:'error',
          duration:800
        })
      }
      }).catch(error => {
        console.log("上传失败")
      });
   
  },
  /**
   * 控制选择图像类型下拉框的拉出与收回
   */
  select(e){
    var index=e.currentTarget.dataset.index
    var newSelect = !this.data.imgList[index].execSelect
    this.setData({
      ['imgList['+ index + '].execSelect'] : newSelect,
    })
  },
  /**
   * 选择图片类型
   */
  getType(e){
    var index=e.currentTarget.dataset.index
    this.setData({
      ['imgList['+ index + '].type'] : e.currentTarget.dataset.type,
      ['imgList['+ index + '].execSelect'] : false,
    })
  },
  /**
   * 删除一张图片
   */
  deleteImg(e){
    console.log("删除第",e.currentTarget.dataset.index,"张图片")
    var images = this.data.imgList
    images.splice(e.currentTarget.dataset.index, 1) //从数组中删除index下标位置，指定数量1，返回新的数组
    this.setData({
      imgList: images,
      hideAdd:false,
    });
  },
  /**
   * 添加一张图片
   */
  addImg(e){
    var index=e.currentTarget.dataset.index
    console.log("添加第 "+(index+1).toString()+" 张图片")
    var images=this.data.imgList
    //在中间添加一张图片
    if(index<this.data.imgList.length-1){
      images.splice(index+1,0,{path:"../../../image/defaultImg.png",type:"",execSelect:false})
      this.setData({
        imgList:images
      })
    }
    else{
      this.setData({
        imgList:this.data.imgList.concat({path:"../../../image/defaultImg.png",type:"",execSelect:false})
      }) 
    }
    //在最后添加一张图片
    // this.setData({
    //   imgList:this.data.imgList.concat({path:"../../../image/defaultImg.png",type:"",execSelect:false})
    // })  
  },
  /**
   * 点击查看图片，可以进行保存
   */
  preview(e) {
    if(e.currentTarget.dataset.src.toString()!="../../../image/defaultImg.png"){
      wx.previewImage({
        urls: [e.currentTarget.dataset.src.toString()],
        current: e.currentTarget.dataset.src.toString()
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userId:options.userId,
      imgList:[
        {path:"../../../image/defaultImg.png",type:"",execSelect:false}
      ],
      hideAdd:false,//是否隐藏添加图片按钮
    })
  },
  /**
   * 清空该页面的所有数据
   */
  clear(){
    this.setData({
      userId:0,
      imgList:[
        {path:"../../../image/defaultImg.png",type:"",execSelect:false}
      ],
      hideAdd:false,//是否隐藏添加图片按钮
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