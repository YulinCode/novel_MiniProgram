// pages/books/fictionContent/fictioncontent.js
import { fictionContent } from '../../../model/bookModel'
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  options: {
    pureDataPattern: /^_/,
  },

  scrool: 0,

  data: {
    top: app.globalData.fix.totaltop,
    title: '',
    content: [],
    readinglist: [],
    tempreadinglist: [],
    readinglistnumber: 0,
    readingheight: 0,
    scrolltop: 0,
    bookindex: 0,
    showcontrolsize: false,
    controlindex: 0,
    fontsize: 22,
    lineheight: 1.5,
    backcolor: '#f7f7f7',
    fontcolor: '#000',
    fictionid: '',
    meunsopen: false,
    readingmenu: {
      lock: false,
      meunindex: 1,
      maxindex: 1,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const readinglist = app.globalData.readinglist
    const bookindex = parseInt(options.index)
    const fictionid = options.fictionid
    const scrolltop = options.scrolltop
    this.setfont()
    this.setData(
      {
        bookindex,
        fictionid,
        readinglist: readinglist,
        tempreadinglist: readinglist.slice(0, 100),
        readinglistnumber: readinglist.length,
        'readingmenu.maxindex': parseInt(readinglist.length / 100),
      },
      () => {
        this.getcontent(bookindex, scrolltop)
      }
    )
  },

  meunsopen() {
    this.setData({ meunsopen: !this.data.meunsopen })
  },

  readinglist() {
    if (!this.data.readingmenu.lock && this.data.readingmenu.meunindex <= this.data.readingmenu.maxindex) {
      this.setData({ 'readingmenu.lock': true }, () => {
        const op = this.data.readingmenu.meunindex + 1
        this.setData({ tempreadinglist: this.data.readinglist.slice(0, 100 * op) }, () => {
          this.setData({ 'readingmenu.lock': false, 'readingmenu.meunindex': op })
        })
      })
    }
  },

  setfont() {
    const fontsize = wx.getStorageSync('fontsize') || 22
    const lineheight = wx.getStorageSync('lineheight') || 1.5
    const backcolor = wx.getStorageSync('backcolor') || '#f7f7f7'
    const fontcolor = wx.getStorageSync('fontcolor') || '#000'
    this.setData({ fontsize, lineheight, backcolor, fontcolor })
  },

  upfontsize() {
    if (this.data.fontsize < 32) {
      const fontsize = this.data.fontsize + 1
      this.setData({ fontsize }, () => {
        wx.setStorage({
          key: 'fontsize',
          data: fontsize,
        })
      })
    }
  },

  downfontsize() {
    if (this.data.fontsize > 12) {
      const fontsize = this.data.fontsize - 1
      this.setData({ fontsize }, () => {
        wx.setStorage({
          key: 'fontsize',
          data: fontsize,
        })
      })
    }
  },

  uplineheight() {
    if (this.data.lineheight < 2.5) {
      const lineheight = Math.floor((this.data.lineheight + 0.1) * 10) / 10
      this.setData({ lineheight }, () => {
        wx.setStorage({
          key: 'lineheight',
          data: lineheight,
        })
      })
    }
  },

  downlineheight() {
    if (this.data.lineheight > 1) {
      const lineheight = Math.floor((this.data.lineheight - 0.1) * 10) / 10
      this.setData({ lineheight }, () => {
        wx.setStorage({
          key: 'lineheight',
          data: lineheight,
        })
      })
    }
  },

  changecolor(e) {
    const backcolor = e.currentTarget.dataset.color
    this.setData({ backcolor })
    if (backcolor === '#0e0e0e') {
      this.setData({ backcolor, fontcolor: '#fff' }, () => {
        wx.setStorage({
          key: 'backcolor',
          data: backcolor,
        })
        wx.setStorage({
          key: 'fontcolor',
          data: '#fff',
        })
      })
    } else {
      this.setData({ backcolor, fontcolor: '#000' }, () => {
        wx.setStorage({
          key: 'backcolor',
          data: backcolor,
        })
        wx.setStorage({
          key: 'fontcolor',
          data: '#000',
        })
      })
    }
  },

  controlsize() {
    this.setData({ showcontrolsize: !this.data.showcontrolsize, controlindex: 0 })
    if (!this.data.showcontrolsize) {
      this.setData({ meunsopen: false })
    }
  },

  control(e) {
    const controlindex = parseInt(e.currentTarget.dataset.index)
    this.setData({ controlindex })
  },

  getcontent(bookindex, scrollTop = 0) {
    this.setData(
      {
        content: [],
      },
      () => {
        const chapterId = this.data.readinglist[bookindex].chapterId
        fictionContent(chapterId).then(res => {
          this.setData(
            {
              content: res.data.data,
              title: this.data.readinglist[bookindex].title,
            },
            () => {
              // this.setheight()
              // wx.pageScrollTo({
              //   scrollTop: scrollTop,
              //   duration: 300,
              // })
            }
          )
        })
      }
    )
  },

  onPageScroll(e) {
    this.scrool = e.scrollTop
  },

  onResize(e) {
    console.log(e)
  },

  // setheight() {
  //   wx.getSystemInfo({
  //     success: result => {
  //       const screenHeight = result.screenHeight
  //       const query = wx.createSelectorQuery()
  //       query.select('#getheight').boundingClientRect()
  //       query.exec(res => {
  //         this.setData({
  //           readingheight: parseInt(res[0].height) - screenHeight,
  //         })
  //       })
  //     },
  //   })
  // },

  back() {
    wx.navigateBack()
  },

  chapter(e) {
    const index = e.currentTarget.dataset.index
    const fictionid = this.data.fictionid
    this.getcontent(index)
    this.readingto(index, fictionid)
    this.setData({ bookindex: index, showcontrolsize: false })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0,
    })
  },

  prea() {
    if (this.data.bookindex != 0) {
      const bookindex = this.data.bookindex - 1
      const fictionid = this.data.fictionid
      this.getcontent(bookindex)
      this.setData(
        {
          showcontrolsize: false,
          bookindex,
        },
        () => {
          this.readingto(bookindex, fictionid)
        }
      )
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      })
    }
  },

  next() {
    if (this.data.bookindex != this.data.readinglistnumber) {
      const bookindex = this.data.bookindex + 1
      const fictionid = this.data.fictionid
      this.getcontent(bookindex)
      this.setData(
        {
          showcontrolsize: false,
          bookindex,
        },
        () => {
          this.readingto(bookindex, fictionid)
        }
      )
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      })
    }
  },

  onUnload() {
    const booklikelist = wx.getStorageSync('booklikelist') || []
    if (booklikelist.length) {
      const index = booklikelist.findIndex(item => item.fictionId === this.data.fictionid)
      if (index >= 0) {
        booklikelist[index].scrolltop = this.scrool
        console.log(this.scrool)
        wx.setStorage({
          key: 'booklikelist',
          data: booklikelist,
        })
      }
    }
  },

  readingto(bookindex, fictionid) {
    const booklikelist = wx.getStorageSync('booklikelist') || []
    if (booklikelist.length) {
      const index = booklikelist.findIndex(item => item.fictionId === fictionid)
      if (index >= 0) {
        booklikelist[index].readingto = bookindex
        wx.setStorage({
          key: 'booklikelist',
          data: booklikelist,
        })
      }
    }
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
