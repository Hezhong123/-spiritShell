// pages/component/moTr/moTr.js

import regeneratorRuntime from '../../utils/regenerator-runtime/runtime.js'

const app = getApp()
// import app from '../../../app.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    logos: app.globalData.logos,
  },

  attached:function(){
    let that = this
    wx.getUserInfo({
      success: function (res) {
        wx.BaaS.login().then((res) => {
          // 用户允许授权，res 包含用户完整信息，详见下方描述
          console.log('授权', res)
          getApp().globalData.userInfo = res  //传入用户id
          that.triggerEvent('myevent', res, {})
          that.setData({
            logos: false
          })
        }, (res) => {
          // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
          console.log('拒绝授权', res)
        })
        wx.showTabBar({
          animation: true
        })

      },
      fail: function (err) {
        that.setData({
          logos: true
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onlogin: async function(e){
      console.log('点击登录', e.detail.userInfo)
      wx.BaaS.login().then((res) => {
        // 用户允许授权，res 包含用户完整信息，详见下方描述
        console.log('授权', res)
        getApp().globalData.userInfo = res  //传入用户id
        this.triggerEvent('myevent', res, {})
        this.setData({
          logos: false
        })
        wx.showTabBar({
          animation: true
        })
      }, (res) => {
        // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
        console.log('拒绝授权', res)
      })
    }
  }
})
