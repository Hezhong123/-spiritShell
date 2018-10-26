// pages/goods/goods.js
const app = getApp()
import { getGoodsRow, postSpirit } from '../../utils/api.js'
const wxParser = require('../../wxParser/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 
  // 支付订单
  paly:function(){
    let params = {
      totalCost: this.data.datas.prie,
      merchandiseDescription: this.data.datas.title
    }

    wx.BaaS.pay(params).then(res => {
      console.log(res)
      const obj = {
         "userId": 1111,
          "fmImg": this.data.datas.cover.path,
          "fmTextl": this.data.datas.title
      }
      if (res.errMsg =='requestPayment:ok'){
        postSpirit((res)=>{
          console.log('订单状态:', res )
          this.postbhs()
        },obj)
      }

    }, err => {
      // 未完成用户授权或发生网络异常等
      console.log(err)
    })
  },

  // 生成海报
  postbhs: function(){
    const obj = {
      "userId": app.globalData.userInfo.id,
      "fmImg": this.data.datas.cover.path,
      "fmTextl": this.data.datas.title
    }
    postSpirit((res) => {
      console.log('订单状态:', res)
    }, obj)
  },

  // 购买
  onBtn: function(){
    this.paly()
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    getGoodsRow((res)=>{
      console.log('datas', res)
      this.setData({
        datas:res.data
      })
      wxParser.parse({
        bind: 'richText',
        html: res.data.content,
        target: this,
        enablePreviewImage: false, // 禁用图片预览功能
        tapLink: (url) => { // 点击超链接时的回调函数
          // url 就是 HTML 富文本中 a 标签的 href 属性值
          // 这里可以自定义点击事件逻辑，比如页面跳转
          wx.navigateTo({
            url
          });
        }
      });

    }, { richTextID: id})
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