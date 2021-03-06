// pages/getShell/getShell.js
const app = getApp()
import { getShellRos, dwImg, userData } from '../../utils/api.js'
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    id:"",  // 书签id
    zts:true,
    imgArr: [],  //
    getImgBtn:true
  }, 

  // 登录
  onLogo: function () {
    userData((res) => {
      console.log('用户信息', res)
      this.getUserData(this.data.id)
      app.globalData.userInfo = res.data
      wx.stopPullDownRefresh()
    }, { userId: app.globalData.userInfo.id })

  },

  // 图片上云
  imgFile: async function(arrs,cd){
    let MyFile = new wx.BaaS.File()
    let metaData = {
      categoryID:'5bcd95881941a13c44a491de',
      categoryName:'用户图片'
    }
    let imgUrl = []
    console.log('即将上传图片',arrs)
    for(let i = 0;i<arrs.length;i++){
      await MyFile.upload({ filePath: arrs[i] }, metaData).then(res => {
        console.log('yun'+i, res)
        imgUrl.push(res.data.path)
      }, err => {
        console.log('3333', err)
      })
    }
    let obj = await cd(imgUrl)
  },

  //查看图片
  ylImg: function(e){
    let index = e.currentTarget.dataset.index
    console.log(e)
    wx.previewImage({
      current: this.data.datas.fmImg[index], // 当前显示图片的http链接
      urls: this.data.datas.fmImg // 需要预览的图片http链接列表
    })
  },

  //上传图片
  postImg: function(){
    const thit = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        let arrs = thit.data.imgArr
        for (let i = 0; i < tempFilePaths.length; i++){
          arrs.push(tempFilePaths[i])
        }
        // 图片检测数量
        if (thit.data.imgArr.length >=  9) {
          thit.setData({
            getImgBtn: false
          })
        }
        thit.setData({
          imgArr: arrs
        })
        // console.log(tempFilePaths)
      }
    })  
  },

  // 删除图片
  rmImg:function(e){
    if (this.data.imgArr.length < 9) {
      this.setData({
        getImgBtn: true
      })
    }
    console.log(e)
    let index = e.currentTarget.dataset.index
    let imgArr = this.data.imgArr
    imgArr.splice(index,1)
    console.log('rm', imgArr)
    this.setData({
      imgArr: imgArr
    })
  },

  // 更新数据
  upShell:function(obj){
    wx.BaaS.invokeFunction('upShell', obj).then(res => {
      console.log('提交成功', res)
      this.setData({
        zts:true
      })
      this.getUserData(this.data.datas.id)
    })
  },

  // 提交表单 
  onShell:async function(e){
    wx.showLoading({
    title: 'ing',
  })
    let texts = e.detail.value.textarea
    let fromID = e.detail.formId
    this.imgFile(this.data.imgArr, (res) => {
      console.log('图片上传成功',res)
      let obj = {
        recordID: this.data.datas.id,
        obj: {
          zt: true,
          userName: app.globalData.userInfo.nickname,
          userImg: app.globalData.userInfo.avatar,
          text: texts,
          fmImg: res
        }
      }
      this.upShell(obj)
    })
  },

  //编辑页面
  onBjs: function(){
    this.setData({
      zts:false
    })
  },

  // 获取用户初始化数据
  getUserData(id){
    getShellRos((res)=>{
        console.log('datas', res.data)
        this.setData({
          datas: res.data,
          zts: res.data.zt,
          userId: app.globalData.userInfo.id,
          imgArr: res.data.fmImg,
          shellText: res.data.text
        })

        // 下载图片到本地
        let arrs = []
        for (let i in this.data.imgArr) {
          dwImg(res=>{
            console.log('下载本地', res)
            arrs.push(res.tempFilePath)
          }, this.data.imgArr[i])
        }
        let that = this
        setTimeout(function(){
          that.setData({
            imgArr: arrs
          })
        },2000)

    }, { "recordID": id, "tableID": 54706 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ids = options.id || decodeURIComponent(options.scene)
    console.log('初始id:',ids)
    this.setData({
      id: ids
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  } 
})