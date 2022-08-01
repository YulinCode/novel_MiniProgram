// pages/musics/musics.js
import { getNewmusic } from '../../model/musicModel'

let app = getApp()
let BGM = app.globalData.BGM

Page({
  options: {
    pureDataPattern: /^_/,
  },
  /**
   * 页面的初始数据
   */
  data: {
    top: app.globalData.fix.totaltop,
    isplaying: false,
    getnewmusic: false,
    showitem: false,
    music: {},
    index: 0,
    musiclist: [],
    playingname: '',
    // musicduration: 100,
    _lock: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const musiclist = wx.getStorageSync('musiclist') || []
    if (Object.keys(musiclist).length === 0) {
      this._getNewmusic()
    } else {
      const tempmusiclist = musiclist.sort((_, b) => (b.like === true ? 1 : -1))
      this.setData({
        musiclist: tempmusiclist,
      })
      this._setmusicinfo(tempmusiclist[0])
      wx.setStorage({
        key: 'musiclist',
        data: tempmusiclist,
      })
    }
  },

  gohome() {
    this.setData({
      showitem: false,
    })
  },

  openmeun() {
    this.setData({
      showitem: !this.data.showitem,
    })
  },

  meunpaly(e) {
    const musicname = e.currentTarget.dataset.itemname
    const index = this.data.musiclist.findIndex(item => item.name === musicname)
    this.setData(
      {
        index: index,
        music: this.data.musiclist[index],
        showitem: false,
      },
      () => {
        this.play()
      }
    )
  },

  islike(e) {
    const musicname = e.currentTarget.dataset.itemname
    const musiclike = e.currentTarget.dataset.itemlike
    const index = this.data.musiclist.findIndex(item => item.name === musicname)
    const temp = `musiclist[${index}].like`
    this.setData(
      {
        [temp]: !musiclike,
      },
      () => {
        if (musicname === this.data.music.name)
          this.setData({
            'music.like': !musiclike,
          })
        wx.setStorage({
          key: 'musiclist',
          data: this.data.musiclist,
        })
      }
    )
  },

  control() {
    if (BGM.paused === true && !this.data.isplaying) {
      BGM.play()
      return
    }
    if (!this.data.isplaying || this.data.playingname !== this.data.music.name) {
      this.play()
    } else {
      this.pause()
    }
  },

  next() {
    if (this.data.getnewmusic) {
      this._getNewmusic()
    } else {
      const index = this.data.index + 1
      const musiclist = this.data.musiclist
      if (!musiclist[index]) {
        this._getNewmusic()
        this.setData({
          index: index,
        })
      } else {
        this._setmusicinfo(musiclist[index])
        this.setData({
          index: index,
        })
      }
    }
  },

  previous() {
    const index = this.data.index
    if (index <= 0) return
    const musiclist = this.data.musiclist
    this._setmusicinfo(musiclist[index - 1])
    this.setData({
      index: index - 1,
    })
  },

  setnew() {
    this.setData({
      getnewmusic: !this.data.getnewmusic,
    })
  },

  play() {
    this.setData(
      {
        isplaying: true,
      },
      () => {
        const musicdata = this.data.music
        BGM.title = musicdata.name
        BGM.epname = musicdata.name
        BGM.coverImgUrl = musicdata.picurl
        BGM.singer = musicdata.artistsname
        BGM.src = musicdata.url

        BGM.onPause(() => {
          BGM.pause()
          this.pause()
        })
        BGM.onPlay(() => {
          this.setData({
            musicduration: BGM.duration,

            isplaying: true,
          })
        })
        BGM.onEnded(() => {
          BGM.pause()
          this.pause()
        })
        BGM.onStop(() => {
          BGM.pause()
          this.pause()
        })

        app.globalData.playname = musicdata.name
        app.globalData.ispaly = true

        this.setData({
          playingname: musicdata.name,
        })
      }
    )
  },

  pause() {
    this.setData(
      {
        isplaying: false,
      },
      () => {
        BGM.pause()
        app.globalData.ispaly = false
      }
    )
  },

  like() {
    const musiclist = wx.getStorageSync('musiclist') || []
    const index = musiclist.findIndex(item => item.name === this.data.music.name)
    if (!this.data.music.like) {
      musiclist[index].like = true
      this.setData(
        {
          'music.like': true,
          musiclist: musiclist,
        },
        () => {
          wx.setStorage({
            key: 'musiclist',
            data: musiclist,
          })
        }
      )
    } else {
      musiclist[index].like = false
      this.setData(
        {
          'music.like': false,
          musiclist: musiclist,
        },
        () => {
          wx.setStorage({
            key: 'musiclist',
            data: musiclist,
          })
        }
      )
    }
  },
  //
  _getNewmusic() {
    if (!this.data._lock) {
      this.setData({ _lock: true }, _ => {
        getNewmusic()
          .then(res => {
            const musiclist = wx.getStorageSync('musiclist') || []
            const tempmusic = res.data.data
            const index = musiclist.findIndex(item => item.name === tempmusic.name)
            if (index < 0) {
              tempmusic.like = false
              musiclist.push(tempmusic)
              wx.setStorage({
                key: 'musiclist',
                data: musiclist,
              })
              this.setData(
                {
                  musiclist: musiclist,
                  index: musiclist.length - 1,
                },
                () => {
                  this.setData({ _lock: false })
                }
              )
              this._setmusicinfo(tempmusic)
            } else {
              this._getNewmusic()
            }
          })
          .catch(_ => {
            this.setData({ _lock: false })
          })
      })
    }
  },

  _setmusicinfo(musicinfo) {
    this.setData({
      music: musicinfo,
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      })
    }
  },
  //
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
