// components/capsule/capsule.js
var app = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    isback: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '15:11',
    },
    titlecolor: {
      type: String,
      value: '#000',
    },
    opacity: {
      type: String,
      value: '1',
    },
    needblur: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fix: {
      top: app.fix.top,
      width: app.fix.width,
      height: app.fix.height,
    },
  },
  lifetimes: {
    ready() {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      wx.navigateBack()
    },
  },
})