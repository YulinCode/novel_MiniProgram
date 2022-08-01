// components/video/video.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    },
    ishome: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    moviedetail(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('moviedetail', {
        index
      })
    }
  }
})