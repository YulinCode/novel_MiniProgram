import {
  getNewmovie,
  getHotmovie
} from '../../model/movieModel'
let app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    top: app.globalData.fix.totaltop,
    itemList: [],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getnewmovies()
  },

  moviedetail(e) {
    const index = e.detail.index
    const tempdetail = this.data.itemList[index].data
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
    // wx.navigateTo({
    //   url: `./moviedetail/moviedetail?id=${moviedetail.id}&id=${moviedetail.id}&id=${moviedetail.id}&id=${moviedetail.id}&id=${moviedetail.id}&id=${moviedetail.id}&id=${moviedetail.id}&id=${moviedetail.id}&`,
    //   success: result => {},
    // })
    wx.navigateTo({
      url: `./moviedetail/moviedetail?moviedetail=${encodeURIComponent(JSON.stringify(moviedetail))}`
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
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
  onReachBottom() {
    if (!this.data.loading) {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        loading: true
      })

      getHotmovie().then(res => {
        const tempdata = res.data.itemList.filter(item => item.type === 'video')
        const itemList = this.data.itemList.concat(tempdata)
        this.setData({
          itemList
        }, () => {
          this.setData({
            loading: false
          })
          wx.hideLoading({
            success: (res) => {},
          })
          wx.setStorage({
            key: 'movielist',
            data: itemList,
          })
        })
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  _getnewmovies() {
    const movielist = wx.getStorageSync('movielist') || []
    const hoursStorage = wx.getStorageSync('hours') || 0
    const darStorage = wx.getStorageSync('day') || 0
    const date = new Date()
    const hours = date.getHours()
    const day = date.getDate()
    if (movielist.length === 0 || hours !== hoursStorage || day !== darStorage) {
      getNewmovie().then(res => {
        const tempdata = res.data.itemList.filter(item => item.type === 'video')
        tempdata.forEach(item => {
          item.like = false
        })
        this.setData({
          itemList: tempdata
        }, _ => {
          wx.setStorage({
            key: 'movielist',
            data: tempdata,
          })
          wx.setStorage({
            key: 'hours',
            data: hours,
          })
          wx.setStorage({
            key: 'day',
            data: day,
          })
        })
      })
    } else {
      this.setData({
        itemList: movielist
      })
    }
  },
})