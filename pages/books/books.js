// pages/books/books.js
import {
  getFictionType,
  searchTitle
} from '../../model/bookModel'

let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    top: app.globalData.fix.totaltop,
    bannerbook: [],
    homebooks: {
      girlschannel: [],
      martial: [],
      fantasymagic: [],
      urbanromance: [],
      othernovels: [],
    },
    onsearch: false,
    searchlist: [],
    searchdone: false,
    searchcount: 0,
    searchindex: 1,
    searchmaxindex: 1,
    searching: false,
    searchvalue: '',
    searchoption: 'title',
    _optionarray: ['title', 'author'],
    optionarray: ['书名', '作者'],
    optionindex: 0,
    search: {
      hottitlelist: [
        '奇怪的先生们',
        '她的山，她的海',
        '将门夫妻混合双打日',
        '穿越到四十年后',
        '误佛江澄青灯',
        '宦官的忠犬宣言',
        '末日循环',
        '师父他太难了',
        '戏精穿进苦情剧',
        '向师祖献上咸鱼',
      ],
      hotauthorlist: ['扶华', '一度君华'],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._setbannerbook()
    this._sethomebooks()
  },

  changeoption(e) {
    const index = e.detail.value
    const optionarray = this.data._optionarray[index]
    this.setData({
      optionindex: index,
      searchoption: optionarray,
    })
  },

  onsearch() {
    this.setData({
      onsearch: true,
    })
  },

  unsearch() {
    this.setData({
      onsearch: false,
      searchvalue: '',
      searchdone: false,
    })
  },

  gosearch(e) {
    const searchvalue = e.detail.value
    const searchoption = this.data.searchoption
    searchTitle(searchvalue, 1, searchoption).then(res => {
      let searchmaxindex =
        res.data.count % 10 === 0 ? parseInt(res.data.count / 10) : parseInt(res.data.count / 10) + 1
      if (res.data.count === 0) {
        searchmaxindex = 1
      }
      this.setData({
        searchlist: res.data.data,
        searchcount: res.data.count,
        searchdone: true,
        searchmaxindex,
        searchindex: 1,
        searchvalue,
      })
    })
  },
  hottag(e) {
    console.log(e)
    const searchoption = e.currentTarget.dataset.op
    const searchvalue = e.currentTarget.dataset.tag
    this.setData({
      searchoption,
      searchvalue
    }, () => {
      this.gosearch({
        detail: {
          value: searchvalue
        }
      })
    })
  },

  onReachBottom() {
    if (this.data.onsearch && this.data.searchindex < this.data.searchmaxindex) {
      this.setData({
          searching: true,
        },
        () => {
          const searchindex = this.data.searchindex + 1
          const searchvalue = this.data.searchvalue
          const tempsearchlist = this.data.searchlist
          const searchoption = this.data.searchoption
          searchTitle(searchvalue, searchindex, searchoption).then(res => {
            const searchlist = tempsearchlist.concat(res.data.data)
            this.setData({
              searchlist,
              searchindex,
              searching: false,
            })
          })
        }
      )
    }
  },

  gotodetail(e) {
    const fictionid = e.currentTarget.dataset.fictionid
    wx.navigateTo({
      url: `./bookdetail/bookdetail?fictionid=${fictionid}`,
    })
  },

  smorebook(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: `./booklist/booklist?index=${index}`,
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  _sethomebooks() {
    const girlschannel = wx.getStorageSync('girlschannel') || []
    const martial = wx.getStorageSync('martial') || []
    const fantasymagic = wx.getStorageSync('fantasymagic') || []
    const urbanromance = wx.getStorageSync('urbanromance') || []
    const othernovels = wx.getStorageSync('othernovels') || []

    // console.log(girlschannel.length, martial.length, fantasymagic.length, urbanromance.length, othernovels.length);
    // if (false) {
    //   this.setData({
    //     'homebooks.girlschannel': girlschannel.slice(0, 6),
    //     'homebooks.martial': martial.slice(0, 6),
    //     'homebooks.fantasymagic': fantasymagic.slice(0, 6),
    //     'homebooks.urbanromance': urbanromance.slice(0, 6),
    //     'homebooks.othernovels': othernovels.slice(0, 6),
    //   })
    // } else {
    //   Promise.all([getFictionType('女生频道'), getFictionType('武侠仙侠'), getFictionType('玄幻魔法'), getFictionType('都市言情'), getFictionType('其他小说')]).then(res => {
    //     const girlschannel = res[0].data.data
    //     const martial = res[1].data.data
    //     const fantasymagic = res[2].data.data
    //     const urbanromance = res[3].data.data
    //     const othernovels = res[4].data.data
    //     console.log(girlschannel, martial, fantasymagic, urbanromance, othernovels);
    //     this.setData({
    //       'homebooks.girlschannel': girlschannel,
    //       'homebooks.martial': martial,
    //       'homebooks.fantasymagic': fantasymagic,
    //       'homebooks.urbanromance': urbanromance,
    //       'homebooks.othernovels': othernovels,
    //     }, () => {
    //       wx.setStorage({
    //         key: 'girlschannel',
    //         data: girlschannel
    //       })
    //       wx.setStorage({
    //         key: 'martial',
    //         data: martial
    //       })
    //       wx.setStorage({
    //         key: 'fantasymagic',
    //         data: fantasymagic
    //       })
    //       wx.setStorage({
    //         key: 'urbanromance',
    //         data: urbanromance
    //       })
    //       wx.setStorage({
    //         key: 'othernovels',
    //         data: othernovels
    //       })
    //     })
    //   })
    // }

    if (girlschannel.length > 0) {
      this.setData({
        'homebooks.girlschannel': girlschannel.slice(0, 6),
      })
    } else {
      getFictionType('女生频道').then(res => {
        this.setData({
            'homebooks.girlschannel': res.data.data.slice(0, 6),
          },
          () => {
            wx.setStorage({
              key: 'girlschannel',
              data: res.data.data,
            })
          }
        )
      })
    }

    setTimeout(() => {
      if (martial.length > 0) {
        this.setData({
          'homebooks.martial': martial.slice(0, 6),
        })
      } else {
        getFictionType('武侠仙侠').then(res => {
          this.setData({
              'homebooks.martial': res.data.data.slice(0, 6),
            },
            () => {
              wx.setStorage({
                key: 'martial',
                data: res.data.data,
              })
            }
          )
        })
      }
    }, 300)

    setTimeout(() => {
      if (fantasymagic.length > 0) {
        this.setData({
          'homebooks.fantasymagic': fantasymagic.slice(0, 6),
        })
      } else {
        getFictionType('玄幻魔法').then(res => {
          this.setData({
              'homebooks.fantasymagic': res.data.data.slice(0, 6),
            },
            () => {
              wx.setStorage({
                key: 'fantasymagic',
                data: res.data.data,
              })
            }
          )
        })
      }
    }, 600)
    setTimeout(() => {
      if (urbanromance.length > 0) {
        this.setData({
          'homebooks.urbanromance': urbanromance.slice(0, 6),
        })
      } else {
        getFictionType('都市言情').then(res => {
          this.setData({
              'homebooks.urbanromance': res.data.data.slice(0, 6),
            },
            () => {
              wx.setStorage({
                key: 'urbanromance',
                data: res.data.data,
              })
            }
          )
        })
      }
    }, 900)
    setTimeout(() => {
      if (othernovels.length > 0) {
        this.setData({
          'homebooks.othernovels': othernovels.slice(0, 6),
        })
      } else {
        getFictionType('其他小说').then(res => {
          this.setData({
              'homebooks.othernovels': res.data.data.slice(0, 6),
            },
            () => {
              wx.setStorage({
                key: 'othernovels',
                data: res.data.data,
              })
            }
          )
        })
      }
    }, 1200)
  },
  no() {},
  _setbannerbook() {
    this.setData({
      bannerbook: [{
          fictionId: '6fef1ba1-cf37-35da-a09d-26fbdd2caf04',
          title: '东风恶',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '文案想不出来，唉，咱看文就看文吧，要啥自行车……先虐后宠，1局天上午900定时更新。入Ｖ公告由于本文作者一度君华好色贪财、见钱眼开，《东风恶》将于6月1日入Ｖ。gt致我们终将填平的坑→→《胭脂债》渣一爆笑古言，那些年没有猜中的开头和结局！！→→《饭票》渣一爆笑末世文，小萝莉教育落魄总裁！→→《灰色国度》渣一都市玄幻文，看蛮勇村女进化为呼风唤雨玄术师！→→《一念执着，一念相思》渣一仙侠言情文，你的执着，我的相思。→→《情人泪岁月尽头》渣一古代仙侠文，陪你到岁月尽头。→→《金主，请上当》渣一古代言情女强文，大当家对决腹黑皇子。-100-35732',
          cover: 'https://i9-static.jjwxc.net/novelimage.php?novelid=2453065&coverid=13&ver=75f285f1bec126dda4835cc4b09b1e0f',
          updateTime: '2020-01-06 00:00:00',
        },
        {
          fictionId: '405c6b55-7b79-3c60-9929-6b5e9c5a4c3d',
          title: '女配不掺和',
          author: '风流书呆',
          fictionType: '女生频道',
          descs: '林淡绑定了一个辅助系统，在无数小世界做维护剧情的辅助任务，说白了就是当女配或炮灰，用自己的卑微去成全别人的伟大。迷茫、执着、疯狂、想爱不能爱、想得得不到，林淡经历了太多失败与痛苦。当她大彻大悟并决定解除绑定回到原世界时，却在传送途中被黑进了三千世界继续挣扎。虽然失去了记忆，林淡却不再迷茫，她决定走自己的路，于是终于发现——只有当你认真爱自己的时候，才能得到别人的爱；只要活出自己，再微不足道也总有一天能成为主角，你若盛开，蝴蝶自来。64043',
          cover: 'http://api.pingcc.cn/fiction/img/女配不掺和/女配不掺和.jpg',
          updateTime: '2019-07-19 00:00:00',
        },
        {
          fictionId: '6e74c73c-6291-32f2-86b2-fe6709f8657b',
          title: '权宦心头朱砂痣',
          author: '袖侧',
          fictionType: '女生频道',
          descs: '权宦霍决，势力滔天。给他送钱送珠宝送各种珍奇之物的人要踏破他的门槛。当然也有给他送女人的。有一天，有人喜滋滋地送给他一个人妇：“听闻这女子早年曾与大人订亲，后来大人家门遭难，这女子便另嫁了。现今把她送给大人，大人随意，随意。”别人都以为这当初弃了霍决的女人落在霍决手中绝没有好下场。没人知道，十年前，有个少女千里走单骑，只为了亲口对那遭了宫刑的前未婚夫说：“人这一辈子，不止一条路可走，不过是换了另一条路罢了。难些，但一定要走下去，活出个人样。”那前未婚夫说：“好。”少女落泪道：“那我回去嫁人啦。”那前未婚夫说：“好。”从此她是他心头朱砂痣，不可思，不可触。-6-2345',
          cover: 'http://api.pingcc.cn/fiction/img/权宦心头朱砂痣/权宦心头朱砂痣.jpg',
          updateTime: '2021-06-16 00:00:00',
        },
        {
          fictionId: 'c010af61-9a0e-3b94-8b6d-ed159ae24945',
          title: '水煮大神',
          author: '一度君华',
          fictionType: '科幻灵异',
          descs: '穿到古代当作家看小透明的成神之路！申明本故事全程虚构如有雷同纯属扯淡╮╯▽╰╭接到JJ通知，二十四日开始入V，不倒V，感谢离去的朋友，-100-26957',
          cover: 'http://api.pingcc.cn/fiction/img/水煮大神/水煮大神.jpg',
          updateTime: '2021-09-19 00:00:00',
        },
        {
          fictionId: 'b47d8ed8-b22d-32fd-8542-95f745c3e9a6',
          title: '灰色国度',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '秦菜出生在一个重男轻女的农村家庭，初中毕业之后辍学待嫁。突然镇上的阴阳先生白河看上了她，用月薪一千二买去当了徒弟。可惜这货正统道术一点没学会，却在一连串的-100-83291',
          cover: 'http://api.pingcc.cn/fiction/img/灰色国度/灰色国度.jpg',
          updateTime: '2021-09-19 00:00:00',
        },
        {
          fictionId: '32867e3c-c8ea-304e-8ba5-f1ce9a89e54a',
          title: '星落凝成糖一度君华',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '★★★本书简介★★★《星落凝成糖》主角是夜昙玄商，是一度君华创作的一部虐情类精彩著作。本站提供星落凝成糖全集阅读：本来是同样命运降生，可夜昙偏偏成为了一个不幸的人，而那位满心算计的姐姐居然还代替自己坐上了天妃的位置，简直可恶至极。不过，女主并未因为自己的悲惨而放弃对生活的希望，她知道早晚有一天会夺回曾经的一切，只是时间长短的问题。-20-5625',
          cover: 'http://api.pingcc.cn/fiction/img/星落凝成糖一度君华/星落凝成糖一度君华.jpg',
          updateTime: '2020-08-28 00:00:00',
        },
        {
          fictionId: '9a66febb-0950-3f1d-b2c1-0ee25269331f',
          title: '明月入君怀',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '掌院和傀首之间是清白的！强强，男主暗恋女主，仙侠，1v1，he。10042805',
          cover: 'http://api.pingcc.cn/fiction/img/明月入君怀/明月入君怀.jpg',
          updateTime: '2020-05-15 00:00:00',
        },
        {
          fictionId: '28d8b542-0727-3938-8eff-53b26380bcf6',
          title: '你开路，我掩护(网游)',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '免费提供作者一度君华的经典小说：《你开路，我掩护网游》最新章节全文阅读服务本站更新及时无弹窗广告欢迎光临观看小说当人猿泰山遇到香喷喷的肉包子，吃还是不吃成为了生死攸关的大事……PS此文封面感谢天如玉好友的妙手啊妙手ヽˋ▽ˊノ今天接到JJ通知开路将于第三十一章开始入V感谢所有离开、和陪我留下来的好友……爆笑穿越文小透明穿到古代当作家-100-67236',
          cover: 'http://api.pingcc.cn/fiction/img/你开路，我掩护(网游)/你开路，我掩护(网游).jpg',
          updateTime: '2020-03-22 00:00:00',
        },
        {
          fictionId: '6fef1ba1-cf37-35da-a09d-26fbdd2caf04',
          title: '东风恶',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '文案想不出来，唉，咱看文就看文吧，要啥自行车……先虐后宠，1局天上午900定时更新。入Ｖ公告由于本文作者一度君华好色贪财、见钱眼开，《东风恶》将于6月1日入Ｖ。gt致我们终将填平的坑→→《胭脂债》渣一爆笑古言，那些年没有猜中的开头和结局！！→→《饭票》渣一爆笑末世文，小萝莉教育落魄总裁！→→《灰色国度》渣一都市玄幻文，看蛮勇村女进化为呼风唤雨玄术师！→→《一念执着，一念相思》渣一仙侠言情文，你的执着，我的相思。→→《情人泪岁月尽头》渣一古代仙侠文，陪你到岁月尽头。→→《金主，请上当》渣一古代言情女强文，大当家对决腹黑皇子。-100-35732',
          cover: 'http://api.pingcc.cn/fiction/img/东风恶/东风恶.jpg',
          updateTime: '2020-01-06 00:00:00',
        },
        {
          fictionId: '6f20e786-5421-3f40-bfe2-84ccd9f5f82b',
          title: '废后将军',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '女将军与皇后争夺帝心，最后发现帝王情爱只是狗屁的故事。纯古言，狗血虐宠热血，女主死心远走，女配下场凄凉。每天早上9：00定时更新。那个叫一度君华的它又在作死了！！-0-6132',
          cover: 'http://api.pingcc.cn/fiction/img/废后将军/废后将军.jpg',
          updateTime: '2018-09-10 00:00:00',
        },
        {
          fictionId: '1a63affd-5a0d-3238-94e5-c8fef9630850',
          title: '爷是人妖爷怕谁？！',
          author: '一度君华所写的《爷是人妖爷怕谁？！》无弹窗免费全文阅读为转载',
          fictionType: '女生频道',
          descs: '爷是人妖爷怕谁？！最新章节列表由网友提供，《爷是人妖爷怕谁？！》全文阅读情节跌宕起伏、扣人心弦，是一本情节与文笔俱佳的网游竞技小说，小兵免费提供爷是人妖爷怕谁？！最新清爽干净的手打文字章节在线阅读。10053979',
          cover: 'http://api.pingcc.cn/fiction/img/爷是人妖爷怕谁？！/爷是人妖爷怕谁？！.jpg',
          updateTime: '2017-07-18 00:00:00',
        },
        {
          fictionId: '29339c00-2556-31af-ab13-307d5151b85d',
          title: '神仙肉',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '神仙肉为一度君华所著非常精彩的都市言情小说小兵手机版在书友们沉迷欣赏神仙肉之际精心整理出手机版的神仙肉方便大家阅读1008163',
          cover: 'http://api.pingcc.cn/fiction/img/神仙肉/神仙肉.jpg',
          updateTime: '2017-01-11 00:00:00',
        },
        {
          fictionId: '01cd731c-f824-3ab9-a19b-1e950ca373e4',
          title: '天下第贰',
          author: '一度君华',
          fictionType: '女生频道',
          descs: '我对着显示器微笑，邪龙佩曾经在全服饰品榜排行第二。可惜……大多数人只看到出来的极品，看不到我作废了的东西可以堆满整个九黎城。-100-48639',
          cover: 'http://api.pingcc.cn/fiction/img/天下第贰/天下第贰.jpg',
          updateTime: '2016-04-25 00:00:00',
        },
      ],
    })
  },
})