// pages/shell/shell.js
import { getSell, getSellLi} from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:"",
    datali:""
  },

  onGetShel: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/getShell/getShell?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    getSell((res)=>{
        console.log('内容', res)
        getSellLi((r)=>{
            console.log('列表', r)
            this.setData({
              datali: r.data.objects
            })
        }, { arrys : res.data.shell})
    }, { "recordID": id, "tableID": 54709})
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