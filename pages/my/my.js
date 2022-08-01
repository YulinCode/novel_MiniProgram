// pages/my/my.js
var app = getApp()
let BGM = app.globalData.BGM
Page({
  /**
   * 页面的初始数据
   */
  data: {
    top: app.globalData.fix.totaltop,
    booklikelist: [],
    movielikelist: [],
    musiclikelist: [],
    selected: 0,
    playmusicname: '',
    isplaying: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  play(e) {
    const tempmusicinfo = this.data.musiclikelist[e.currentTarget.dataset.index]
    if (!this.data.isplaying) {
      if (this.data.playmusicname === tempmusicinfo.name) {
        BGM.play()
      } else {
        this.playinfo(tempmusicinfo)
      }
    } else if (this.data.playmusicname !== tempmusicinfo.name) {
      this.playinfo(tempmusicinfo)
    } else {
      this.pauseinfo()
    }
  },

  like(e) {
    const index = e.currentTarget.dataset.index
    const tempmusicinfo = this.data.musiclikelist[index]
    const temps = `musiclikelist[${index}].like`

    if (tempmusicinfo.like) {
      this.setData(
        {
          [temps]: false,
        },
        () => {
          this.controllike(tempmusicinfo.name, false)
        }
      )
    } else {
      this.setData(
        {
          [temps]: true,
        },
        () => {
          this.controllike(tempmusicinfo.name, true)
        }
      )
    }
  },

  controllike(name, like) {
    const tempmusiclist = wx.getStorageSync('musiclist') || []
    tempmusiclist.forEach((item, index, array) => {
      if (item.name === name) {
        array[index].like = like
      }
    })
    wx.setStorage({
      key: 'musiclist',
      data: tempmusiclist,
    })
  },

  pauseinfo() {
    BGM.pause()
    this.setData({
      isplaying: false,
    })
  },

  playinfo(musicdata) {
    BGM.title = musicdata.name
    BGM.epname = musicdata.name
    BGM.coverImgUrl = musicdata.picurl
    BGM.singer = musicdata.artistsname
    BGM.src = musicdata.url

    BGM.onPause(() => {
      BGM.pause()
      this.pauseinfo()
    })
    BGM.onPlay(() => {
      this.setData({
        playmusicname: musicdata.name,
        isplaying: true,
      })
      BGM.play()
    })
    BGM.onEnded(() => {
      BGM.pause()
      this.pauseinfo()
    })
    BGM.onStop(() => {
      BGM.pause()
      this.pauseinfo()
    })
  },

  onShow() {
    const booklikelist = wx.getStorageSync('booklikelist') || []
    const movielikelist = wx.getStorageSync('movielikelist') || []
    const tempmusiclist = wx.getStorageSync('musiclist') || []
    const musiclikelist = tempmusiclist.filter(item => item.like === true)
    this.setData(
      {
        booklikelist,
        movielikelist,
        musiclikelist,
      },
      () => {
        this.setData({
          showmy: true,
        })
      }
    )
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
      })
    }
  },

  gotodetail(e) {
    const fictionid = e.currentTarget.dataset.fictionid
    const readingto = e.currentTarget.dataset.readingto
    const scrolltop = e.currentTarget.dataset.scrolltop
    const chapterList = wx.getStorageSync(fictionid)?.chapterList
    if (chapterList) {
      app.globalData.readinglist = chapterList
      wx.navigateTo({
        url: `../books/fictionContent/fictioncontent?index=${readingto}&fictionid=${fictionid}&scrolltop=${scrolltop}`,
      })
    }
  },

  gotomoviedetail(e) {
    const moviedetail = this.data.movielikelist[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: `../movies/moviedetail/moviedetail?moviedetail=${encodeURIComponent(JSON.stringify(moviedetail))}`,
    })
  },

  choose(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    if (index !== this.data.selected) {
      this.setData({
        selected: index,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
})
