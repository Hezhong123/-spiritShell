// 获取随机笔记
export const getShellTit = (cd, obj) => {
  wx.showLoading({
    title: '回忆',
  })
  wx.BaaS.invokeFunction('getShellTit', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}

// 用户信息
export const userData = (cd, obj) => {
  wx.showLoading({
    title: '你好呀',
  })
  wx.BaaS.invokeFunction('userData', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}


// 精神
export const getSpirit = (cd, obj) => {
  wx.showLoading({
    title: '稍等',
  })
  wx.BaaS.invokeFunction('getSpirit', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}



// 壳
export const getSell = (cd, obj) => {
  wx.showLoading({
    title: '马上',
  })
  wx.BaaS.invokeFunction('getSell', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}

// 更具id查找
export const getShellRos = (cd, obj) => {
  wx.showLoading({
    title: '马上',
  })
  wx.BaaS.invokeFunction('getShellRos', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}

// 壳列表
export const getSellLi  = (cd, obj) => {
  wx.showLoading({
    title: '稍等',
  })
  wx.BaaS.invokeFunction('getSellLi', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}



// 店
// 获取商品分类
export const getGoodsLI = (cd, obj) => {
  wx.showLoading({
    title: '稍等',
  })
  wx.BaaS.invokeFunction('getGoodsLI', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}

// 商品内容
export const getGoodsRow = (cd, obj) => {
  wx.showLoading({
    title: '稍等',
  })
  wx.BaaS.invokeFunction('getGoodsRow', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}

// 新的订单
export const postSpirit = (cd, obj) => {
  wx.showLoading({
    title: '制造本子',
  })
  wx.BaaS.invokeFunction('postSpirit', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}