// pages/books/booklist/booklist.js
import {
  getFictionType
} from '../../../model/bookModel'
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    top: app.globalData.fix.totaltop,
    booklist: [],
    name: "",
    getlock: false,
    pagenumber: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    switch (options.index) {
      case '0':
        const girlschannel = wx.getStorageSync('girlschannel') || []
        this.setData({
          booklist: girlschannel,
          index: 0,
          name: '女生频道'
        })
        break;
      case '1':
        const martial = wx.getStorageSync('martial') || []
        this.setData({
          booklist: martial,
          index: 1,
          name: '武侠仙侠',
        })
        break;
      case '2':
        const fantasymagic = wx.getStorageSync('fantasymagic') || []
        this.setData({
          booklist: fantasymagic,
          index: 2,
          name: '玄幻魔法',
        })
        break;
      case '3':
        const urbanromance = wx.getStorageSync('urbanromance') || []
        this.setData({
          booklist: urbanromance,
          index: 3,
          name: '都市言情',
        })
        break;
      case '4':
        const othernovels = wx.getStorageSync('othernovels') || []
        this.setData({
          booklist: othernovels,
          index: 4,
          name: '其他小说',
        })
        break;

      default:
        const others = wx.getStorageSync('girlschannel') || []
        this.setData({
          booklist: others,
          index: 0,
          name: '女生频道',
        })
        break;
    }
  },
  gotodetail(e) {
    const fictionid = e.currentTarget.dataset.fictionid
    wx.navigateTo({
      url: `../bookdetail/bookdetail?fictionid=${fictionid}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.getlock) {
      const pagenumber = this.data.pagenumber + 1
      const tempbooklist = this.data.booklist
      this.setData({
        getlock: true,
        pagenumber
      }, () => {
        getFictionType(this.data.name, pagenumber).then(res => {
          const booklist = tempbooklist.concat(res.data.data)
          this.setData({
            booklist,
            getlock: false
          })
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})