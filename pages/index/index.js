//index.js
//获取应用实例
const app = getApp()
import { userData, getSpirit, getSell, randomFrom , getShellTit } from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spirit:'', //精神
    titobj:{
      text: "人活在世上 \n  就是为了忍受摧残 一直到死 \n 想明了这一点 \n 一切都能泰然处之。",
      created_at: 1537348740,
      book: "説明書",
      nums:1
    }
  },

  // 壳
  onPage:function(e){
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/shell/shell?id='+id,
    })
  },

  //获取随机标题
  Tit: function(e) {
    getShellTit((res)=>{
        console.log(res)
        if(res){
          this.setData({
            titobj:res
          })
        }
      wx.stopPullDownRefresh()
    }, { "userID": e})
  },

  // 登录
  onLogo: function (e) {
    userData((res) => {
      console.log('用户信息', res)
      this.Tit(res.data.id)
      getSpirit((rei)=>{
        let dats = rei.data.objects //精神
        console.log('用户精神集',dats )
        this.setData({
          spirit: rei.data.objects
        })

      }, { userId: res.data.id})
      app.globalData.userInfo = res.data
      wx.stopPullDownRefresh()
    }, { userId: app.globalData.userInfo.id })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '2018年10月1日',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    this.Tit(app.globalData.userInfo.id)
    getSpirit((rei) => {
      let dats = rei.data.objects //精神
      console.log('用户精神集', dats)
      this.setData({
        spirit: rei.data.objects
      })

    }, { userId: res.data.id })
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
