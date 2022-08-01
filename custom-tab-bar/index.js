Component({
  data: {
    selected: 0,
    color: '#999',
    selectedColor: '#f00',
    borderStyle: 'white',
    list: [{
        pagePath: '/pages/books/books',
        text: '图书',
        iconPath: '/static/tabbar/book.png',
        selectedIconPath: '/static/tabbar/book-se.png',
      },
      {
        pagePath: '/pages/movies/movies',
        text: '短片',
        iconPath: '/static/tabbar/movie.png',
        selectedIconPath: '/static/tabbar/movie-se.png',
      }, {
        pagePath: '/pages/musics/musics',
        text: '音乐',
        iconPath: '/static/tabbar/music.png',
        selectedIconPath: '/static/tabbar/music-se.png',
      },


      {
        pagePath: '/pages/my/my',
        text: '我的',
        iconPath: '/static/tabbar/my.png',
        selectedIconPath: '/static/tabbar/my-se.png',
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url,
      })
      this.setData({
        selected: data.index,
      })
    },
  },
})