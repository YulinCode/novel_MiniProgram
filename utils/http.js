const HTTP = (url, data = {}, method = 'GET') => {
  return new Promise((reslove, reject) => {
    wx.request({
      url: url,
      data: data,
      header: { 'content-type': 'application/json' },
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: res => {
        reslove(res)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        console.log('发送了一个请求')
      },
    })
  })
}

export { HTTP }
