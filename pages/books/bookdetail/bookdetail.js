// pages/books/bookdetail/bookdetail.js
import { fictionChapter } from '../../../model/bookModel'
let app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  options: {
    pureDataPattern: /^_/,
  },

  data: {
    top: app.globalData.fix.totaltop,
    _fictionid: '',
    bookdetail: {
      chapterList: [],
    },
    jianjie: '',
    showbutton: true,
    chapterList: 1,
    allchapterList: [],
    odd: true,
    like: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const _fictionid = options.fictionid
    const bookdetail = wx.getStorageSync(_fictionid) || {}
    if (JSON.stringify(bookdetail) === '{}') {
      fictionChapter(_fictionid).then(res => {
        if (res.data.msg === '成功') {
          this.setData(
            {
              _fictionid,
              'bookdetail.author': res.data.data.author,
              'bookdetail.cover': res.data.data.cover,
              'bookdetail.descs': res.data.data.descs,
              'bookdetail.fictionType': res.data.data.fictionType,
              'bookdetail.title': res.data.data.title,
              'bookdetail.updateTime': res.data.data.updateTime,
              'bookdetail.fictionId': res.data.data.fictionId,
              allchapterList: res.data.data.chapterList,
              like: false,
            },
            () => {
              this._jianjie(res.data.data.descs.trim())
              this.setchapterList()
              wx.setStorage({
                key: _fictionid,
                data: res.data.data,
              })
            }
          )
        }
      })
    } else {
      const booklikelist = wx.getStorageSync('booklikelist') || []
      const like = booklikelist.find(item => item.fictionId === bookdetail.fictionId)
      if (like) {
        this.setData({
          like: true,
        })
      }
      this.setData(
        {
          'bookdetail.author': bookdetail.author,
          'bookdetail.cover': bookdetail.cover,
          'bookdetail.descs': bookdetail.descs,
          'bookdetail.fictionType': bookdetail.fictionType,
          'bookdetail.title': bookdetail.title,
          'bookdetail.updateTime': bookdetail.updateTime,
          'bookdetail.fictionId': bookdetail.fictionId,
          'bookdetail.readingto': 0,
          allchapterList: bookdetail.chapterList,
        },
        () => {
          this._jianjie(bookdetail.descs.trim())
          this.setchapterList()
        }
      )
    }
  },

  like() {
    const booklikelist = wx.getStorageSync('booklikelist') || []
    if (!this.data.like) {
      this.setData(
        {
          like: true,
        },
        () => {
          booklikelist.unshift(this.data.bookdetail)
          wx.setStorage({
            key: 'booklikelist',
            data: booklikelist,
          })
        }
      )
    } else {
      this.setData(
        {
          like: false,
        },
        () => {
          const tempbooklikelist = booklikelist.filter(
            item => item.fictionId !== this.data.bookdetail.fictionId
          )
          wx.setStorage({
            key: 'booklikelist',
            data: tempbooklikelist,
          })
        }
      )
    }
  },

  setchapterList() {
    const chapterList = this.data.chapterList
    const templist = this.data.allchapterList.slice(0, chapterList * 10)
    this.setData(
      {
        'bookdetail.chapterList': templist,
      },
      () => {
        this.setData({
          chapterList: this.data.chapterList + 1,
        })
      }
    )
  },

  openread() {
    this.gotofictionContent(0)
  },

  chapterListodd() {
    if (!this.data.odd) {
      this.setData(
        {
          odd: !this.data.odd,
        },
        () => {
          const allchapterList = this.data.allchapterList.reverse()
          this.setData(
            {
              allchapterList,
            },
            () => {
              this.setchapterList()
            }
          )
        }
      )
    }
  },

  chapterListeven() {
    if (this.data.odd) {
      this.setData(
        {
          odd: !this.data.odd,
        },
        () => {
          const allchapterList = this.data.allchapterList.reverse()
          this.setData(
            {
              allchapterList,
            },
            () => {
              this.setchapterList()
            }
          )
        }
      )
    }
  },

  gotofictionContent(e) {
    app.globalData.readinglist = this.data.allchapterList
    const index = e?.currentTarget?.dataset?.index || 0
    const booklikelist = wx.getStorageSync('booklikelist') || []
    const bookid = booklikelist.findIndex(item => item.title === this.data.bookdetail.title)
    const fictionid = this.data.bookdetail.fictionId
    if (booklikelist.length !== 0 && bookid !== -1) {
      booklikelist[bookid].readingto = index
      booklikelist.sort((a, b) => (b.title === this.data.bookdetail.title ? 1 : -1))
      wx.setStorage({
        key: 'booklikelist',
        data: booklikelist,
      })
    }
    wx.navigateTo({
      url: `../fictionContent/fictioncontent?index=${index}&fictionid=${fictionid}`,
    })
  },

  morechapterList() {
    this.setchapterList()
    // this.setData({
    //   chapterList: this.data.chapterList + 1
    // }, () => {
    //   this.setchapterList()
    // })
  },

  showall() {
    this.setData({
      jianjie: this.data.bookdetail.descs,
      showbutton: false,
    })
  },

  _jianjie(e) {
    if (e.trim().length >= 50) {
      this.setData({
        jianjie: e.trim().slice(0, 50) + '...',
      })
    } else {
      this.setData({
        jianjie: e.trim(),
        showbutton: false,
      })
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
