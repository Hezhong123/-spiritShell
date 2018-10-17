//app.js
import regeneratorRuntime from './utils/regenerator-runtime/runtime.js'

App({
  onLaunch: async function () {
    require('./utils/sdk-v1.4.0 2.js')
    // 初始化 SDK
    let clientID = '488ecbf8acbeedaa7982'
    wx.BaaS.init(clientID)
    wx.hideTabBar({
      animation:true
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 知晓云登陆
    wx.BaaS.login().then((res) => {
      // 用户允许授权，res 包含用户完整信息，详见下方描述
      wx.BaaS.invokeFunction('userData', { userId: res.id }).then(res => {
        console.log('登录', res)
        getApp().globalData.userInfo = res.data.data
      })
    }, (res) => {
      // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
      // this.globalData.userInfo = res
      this.globalData.logos = true
      console.log('拒绝授权', res)
    })
  },
  globalData: {
    userInfo: null
  }
})