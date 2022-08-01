// app.js
App({
  onLaunch() {
    this._setsule()
  },
  globalData: {
    fix: {
      top: 24,
      width: 43,
      height: 32,
      totaltop: 56
    },
    musicBaseUrl: 'https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=json',
    movieBaseUrl: 'https://baobab.kaiyanapp.com/api/v4',
    bookBaseUrl: 'https://api.pingcc.cn/',
    BGM: wx.getBackgroundAudioManager(),
    playname: "",
    ispaly: "",
    readinglist: []
  },

  _setsule() {
    const {
      height,
      top,
      width
    } = {
      ...wx.getMenuButtonBoundingClientRect()
    }
    this.globalData.fix.height = height - 4
    this.globalData.fix.top = top
    this.globalData.fix.width = width / 2 + 10
    this.globalData.fix.totaltop = height + top + 10
  }

})