// pages/component/return/return.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ids:{
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    route:"",  //路由
    id:''
  },

  ready: function () {
    let router = getCurrentPages()[0].route
    this.setData({
      route: getCurrentPages()[0].route,
      // id: getCurrentPages()[0].options.scene || getCurrentPages()[0].options.id
    })
    console.log(router)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回
    fhs: function () {
      switch(this.data.route){
        case 'pages/getShell/getShell':
          wx.redirectTo ({
            url: '../../pages/shell/shell?id='+ this.data.ids,
          })
          console.log('rul', this.data.ids)
        break;
        case 'pages/shell/shell':
          wx.switchTab({
            url: '../../pages/index/index',
          })
          console.log('rul', this.data.route)
        break;
        default:
        wx.navigateBack({
          delta: 1
        })
      }
      
    },

    

  }
})
