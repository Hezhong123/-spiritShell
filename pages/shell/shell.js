// pages/shell/shell.js
const app = getApp()
import { getSell, getSellLi} from '../../utils/api.js'
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    datas:"",
    title:"",
    datali:"",
    getImgBtn:true,
    imgArr:[],
    bj:false,
    imgShow:false,
  },

  onGetShel: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/getShell/getShell?id='+id,
    })
  },

  onBtns:function(){
    this.setData({
      bj:true
    })
  },
  // 图片上云
  imgFile: async function (arrs, cd) {
    let MyFile = new wx.BaaS.File()
    let metaData = {
      categoryID: '5bcee7be1e8ac81d1e2d766a',
      categoryName: '书本封面'
    }
    let imgUrl = []
    console.log('2323', arrs)
    for (let i = 0; i < arrs.length; i++) {
      await MyFile.upload({ filePath: arrs[i] }, metaData).then(res => {
        console.log('yun' + i, res)
        imgUrl.push(res.data.path)
      }, err => {
        console.log('3333', err)
      })
    }
    let obj = await cd(imgUrl)
  },

  //查看图片
  ylImg: function (e) {
    let index = e.currentTarget.dataset.index
    console.log(e)
    wx.previewImage({
      current: this.data.datas.fmImg[index], // 当前显示图片的http链接
      urls: this.data.datas.fmImg // 需要预览的图片http链接列表
    })
  },

  //上传图片
  postImg: function () {
    const thit = this

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        thit.setData({
          imgArr: tempFilePaths,
          imgShow:true
        })
        console.log('选择', tempFilePaths, res)
      }
    })
  },

  // 删除图片
  rmImg: function (e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let imgArr = this.data.imgArr
    imgArr.splice(index, 1)
    console.log('rm', imgArr)
    this.setData({
      imgArr: imgArr
    })
  },

  // 提交表单 
  onShell: async function (e) {
    let texts = e.detail.value.textarea
    let fromID = e.detail.formId
    this.imgFile(this.data.imgArr, (res) => {
      console.log('图片上传成功', res)
      let obj = {
        tableID: 54709,
        recordID: this.data.title.id,
        obj: {
          fmTextl: texts,
          fmImg: res[0]
        }
      }     
      // let add = { "tableID": "54709", "recordID": "5bcd23e158c65304164e6dd5", "obj": { "fmTextl": "你好呀", "fmImg": "22221111111" } }
      if (this.data.imgArr.length == 1 && texts!= '' ){
        wx.BaaS.invokeFunction('upData', obj).then(res => {
          console.log('跟新成功', res)
           let objs = { id: this.data.title.id }
           this.onLoad(objs)
        })
        console.log(1111, texts)
      }
    })
    
  },

  // 推出编辑
  noBj: function(){
    this.setData({
      bj: false
    })
  },

  //预览海报
  onArrImg:function(){
    let arrs = this.data.title.imgArr
    console.log('333', arrs )
    wx.showLoading({
      title: '马上出现',
    })
    wx.previewImage({
      current: '',
      urls: arrs,
      success:function(res){
        wx.hideLoading()
      },
      fail:function(){
        wx.hideLoading()
      }
    })
    wx.hideLoading()
    

    // const arrjs= []
    // for (let i in arrs){
    //   this.dwImg(arrs[i],res=>{
    //     console.log(res)
    //     arrjs.push(res)
    //   })
    // }
    // setTimeout(function(){
    //   wx.previewImage({
    //     // current: '', // 当前显示图片的http链接
    //     // urls: arrjs // 需要预览的图片http链接列表
    //     current: '',
    //     urls: ['http://md-1251490080.cos.ap-chengdu.myqcloud.com/5bd285b53f1e361f41568d99']
    //   })
    // },1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    let obj = { "tableID": 54709, "recordID": id }
    wx.BaaS.invokeFunction('getData', obj).then(res=>{
      console.log('精神的壳', res)
      let arrimgs = this.data.imgArr
      arrimgs.push(res.data.data.fmImg)
      this.setData({
        title:res.data.data,
        bj: false,
        imgArr: arrimgs,
        userId: app.globalData.userInfo.id
      })
      

    })

    getSell((res)=>{
        console.log('内容', res)
        this.setData({
          datali: res.data.objects
        })
    }, { "bookid": id, "tableID": 54706})

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