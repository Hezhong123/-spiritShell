//index.js
//获取应用实例
const app = getApp()
import { userData, getSpirit, getSell , randomFrom } from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spirit:'', //精神
    titobj:{
      text: "人活在世上 \n  就是为了忍受摧残 一直到死 \n 想明了这一点 \n 一切都能泰然处之。",
      time: 1537348740,
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

  // 登录
  onLogo: function (e) {
    userData((res) => {
      console.log('用户信息', res)
      getSpirit((rei)=>{
        let dats = rei.data.objects //精神
       
        let num1 = randomFrom(0, dats.length-1)
        console.log('选择壳', num1, dats, dats.length )
        this.setData({
          spirit: rei.data.objects
          // 获取随机标题
        })
        const key = dats[num1]  //随机选中的精神
        console.log('精神',key)
       
        if (key){
          const shellNum = key.shell.length  //第几条书签
          console.log(key.shell.length)
          const shell = key.shell[randomFrom(0, shellNum)-1]
         
          if (shell){
            getSell((r) => {
              console.log('壳', shellNum,  r)
              let obj = {
                text: r.data.text,
                time: r.data.created_at,
                book: key.fmTextl,
                nums: shellNum
              }
              this.setData({
                titobj: obj
              })
            }, { "recordID": shell, "tableID": 54706})
          }
          
        }
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
    this.onLogo()
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
