// components/book/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {
        fictionId: "e7160f20-5dc0-3c1b-acfe-4623db44de3a",
        title: "一念青云",
        author: "天地白",
        "fictionType": "修真小说",
        descs: "完全纯正的凡人流修仙小说，主角天赋平平，不开金手指，不靠奇遇与运气，修行突破完全靠自身的努力与时间沉淀，做不到越级战斗，甚至会被天才越级击败，在这个人吃人的世界，且看一个平凡人如何经历无数磨难到达巅峰！",
        cover: "http://api.pingcc.cn/fiction/img/一念青云/一念青云.jpg",
        updateTime: "2020-06-25 00:00:00"
      }
    },
    index: {
      type: Number,
      value: 0
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

  }
})