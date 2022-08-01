// pages/movies/moviedetail/moviedetail.js
import {
  getHotmovie
} from '../../../model/movieModel'
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    top: app.globalData.fix.totaltop,
    moviedetail: {},
    movielist: [],
    like: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const moviedetail = JSON.parse(decodeURIComponent(options.moviedetail))
    this._getdetail(moviedetail)
    getHotmovie().then(res => {
      const movielist = res.data.itemList.filter(item => item.type === 'video')
      this.setData({
        movielist
      })
    })
  },

  like() {
    const movielikelist = wx.getStorageSync('movielikelist') || []

    if (!this.data.like) {
      this.setData({
        like: true,
        'moviedetail.consumption.collectionCount': this.data.moviedetail.consumption.collectionCount + 1
      }, () => {
        movielikelist.unshift(this.data.moviedetail)
        wx.setStorage({
          key: 'movielikelist',
          data: movielikelist
        })
      })
    } else {
      this.setData({
        like: false,
        'moviedetail.consumption.collectionCount': this.data.moviedetail.consumption.collectionCount - 1
      }, () => {
        const tempmovielikelist = movielikelist.filter(item => item.id !== this.data.moviedetail.id)
        wx.setStorage({
          key: 'movielikelist',
          data: tempmovielikelist
        })
      })
    }
  },

  moviedetail(e) {
    const index = e.detail.index
    const movielist = this.data.movielist
    const tempdetail = movielist[index].data
    const moviedetail = {
      id: tempdetail.id,
      playInfo: tempdetail.playInfo,
      playUrl: [tempdetail.playUrl[0]],
      title: tempdetail.title,
      description: tempdetail.description,
      tags: tempdetail.tags.map(item => item.name),
      consumption: tempdetail.consumption,
      authorname: tempdetail.author.name,
      category: tempdetail.category,
      cover: tempdetail.cover,
    }
    this._getdetail(moviedetail)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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

  _getdetail(obj) {
    const moviedetail = obj
    const movielikelist = wx.getStorageSync('movielikelist') || []
    const like = movielikelist.find(item => item.id === moviedetail.id)
    if (like) {
      moviedetail.consumption.collectionCount += 1
      this.setData({
        moviedetail,
        like: true
      })
    } else {
      this.setData({
        moviedetail,
        like: false
      })
    }
  },
})