// 随机数
export const randomFrom = (lowerValue, upperValue) => {
   return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);x.hideLoading()
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
