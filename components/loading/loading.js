// components/loading/loading.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backcolor: {
      type: String,
      value: '#fff',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    top: app.globalData.fix.totaltop,
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
