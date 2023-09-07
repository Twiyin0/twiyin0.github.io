module.exports = {
  "title": "音铃的博客",
  "description": "无聊的时候甚至会敲代码",
  //"base": "/in0.github.io/",
  "dest": "public",
  "port": 2333,
  plugins: [
    [require("@tailwindcss/typography"), require("daisyui")],
    [
        '@vuepress/last-updated',
        {
            /*transformer: (timestamp, lang) => {
                // 不要忘了安装 moment
                // moment 时间格式化文档戳这里 http://momentjs.cn/
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).fromNow()
            }*/
        }
    ],
    [
      "vuepress-plugin-nuggets-style-copy", 
      {
        copyText: "复制代码",
        tip: 
        {
          content: "复制成功"
        }
      }
    ],
    [
      //nest效果 yarn add vuepress-plugin-nest -D
      "nest", 
      {
        color: '189,255,255', // color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
        pointColor: '0,0,0', // color of points, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
        opacity: 0.5, // the opacity of line (0~1), default: 0.5.
        count: 300,  // the number of lines, default: 99.
        zIndex: -1  // z-index property of the background, default: -1.
        //showInMobile: true // whether to display on the mobile side, default: false.
      }
    ],
    [
      //yarn add vuepress-plugin-cursor-effects -D 光标效果
      "cursor-effects"
    ],
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(人*´∀｀)｡*ﾟ欢迎回来~",
        hideIcon: "/head.jpg",
        hideText: "( ≧Д≦)不要走啊~",
        recoverTime: 2000
      }
    ],
    /*[
      //Live2d
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ['z16', 'shizuku', 'koharu', 'haru2'],
        clean: false,    //隐藏所有按钮
        messages: {//按钮提示语
          welcome: '欢迎~这里是音铃的博客~',
          home: '回到主页~',
          theme: '召唤其他小伙伴吗~', 
          close: '下次再见~',
          info: '想知道关于我的更多信息吗？'
        },
        messageStyle: {//自定义消息框样式
          left: '140px',
          bottom: '220px'
        },
        modelStyle: {//自定义模型样式
          left: '20px',
          bottom: '72px',
          opacity: '0.9' 
        },
        btnStyle: {//自定义按钮样式
          left: '15px', 
          bottom: '120px',
        },
        width: 150,
        height: 220
      }
    ],*/
    //meting
    [
      //安装meting: yarn add vuepress-plugin-meting -D
      "meting",{
        metingApi: "https://api.injahow.cn/meting/",
        aplayer:
        {
          fixed: false,     //吸底模式
          mini: true,       //mini版
          autoplay: false,   //自动播放
          //theme: "#aaa",    //主题颜色
          volume: 0.3,      //音量
          mutex: true,      //互斥模式
          lrcType: 3,       //歌词解析模式，默认0，想要歌词就推荐3
          listFolded: true, //折叠播放列表
          //可能报错的项
          //loop: all,    //播放器循环模式'all' | 'one' | 'none'默认all
          //order: "list",    //设置播放器的初始顺序模式"list"| "random" 默认list
          //preload: "auto",   //设置音频的预加载模式'none' | 'metadata' | 'auto' 默认auto
          //listMaxHeight: 250  //设置播放列表最大高度，单位为像素
          additionalAudios: [
            //模板
            /*{
              name: "",
              artist: "",
              url: "https://api.injahow.cn/meting/?type=url&id=",
              cover: "https://api.injahow.cn/meting/?type=cover&id=",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id="
            }*/
            {
              name: "アイシテ",
              artist: "nameless",
              url: "https://api.injahow.cn/meting/?type=url&id=38689097",
              cover: "https://api.injahow.cn/meting/?type=cover&id=38689097",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=38689097"
            },
            {
              name: "恋のうた (feat. 由崎司)",
              artist: "Yunomi/鬼頭明里",
              url: "https://api.injahow.cn/meting/?type=url&id=1484336476",
              cover: "https://api.injahow.cn/meting/?type=cover&id=1484336476",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1484336476"
            },
            {
              name: "License of Love",
              artist: "Tomggg / kiki vivi lily",
              url: "https://api.injahow.cn/meting/?type=url&id=1863343404",
              cover: "https://api.injahow.cn/meting/?type=cover&id=1863343404",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1863343404"
            },
            {
              name: "かたわれ時(黄昏之时) Remix",
              artist: "1n / PianoPrinceOfAnime",
              url: "https://api.injahow.cn/meting/?type=url&id=435305770",
              cover: "https://api.injahow.cn/meting/?type=cover&id=435305770",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=435305770"
            },
            {
              name: "デート2 (1n Cover)",
              artist: "1n",
              url: "https://api.injahow.cn/meting/?type=url&id=435305771",
              cover: "https://api.injahow.cn/meting/?type=cover&id=435305771",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=435305771"
            },
            {
              name: "You",
              artist: "千坂 / N2V",
              url: "https://api.injahow.cn/meting/?type=url&id=506520164",
              cover: "https://api.injahow.cn/meting/?type=cover&id=506520164",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=506520164"
            },
            {
              name: "白日",
              artist: "King Gnu",
              url: "https://api.injahow.cn/meting/?type=url&id=1347630432",
              cover: "https://imgessl.kugou.com/stdmusic/20190307/20190307102304186446.jpg",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1347630432"
            },
            {
              name: "朗朗晴天",
              artist: "pia碳",
              url: "https://api.injahow.cn/meting/?type=url&id=1318493473",
              cover: "//imgessl.kugou.com/stdmusic/20190403/20190403005229772418.jpg",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1318493473"
            },
            {
              name: "你的猫咪",
              artist: "hanser",
              url: "https://upyun.twiyin0.cn/blog/mp3/hanser-neko.mp3",
              cover: "https://imgessl.kugou.com/stdmusic/20191225/20191225140513936647.jpg",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1420109766"
            },
            {
              name: "青空を触るまで",
              artist: "宫野栞/理想放逐",
              url: "https://api.vlssu.com/meting/?server=netease&type=url&id=1494296154",
              cover: "https://api.vlssu.com/meting/?type=cover&id=1494296154",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1494296154"
            },
            {
              name: "恋爱吧☆魔法少女",
              artist: "hanser",
              url: "https://api.injahow.cn/meting/?type=url&id=1451998397",
              cover: "https://imgessl.kugou.com/uploadpic/softhead/400/20200116/20200116053155994591.jpg",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1451998397"
            },
            {
              name: "もう一度",
              artist: "夏野natsuno",
              url: "https://api.vlssu.com/meting/?type=url&id=1421273800",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1421273800",
              cover: "https://api.vlssu.com/meting/?type=cover&id=1421273800"
            },
            {
              name: "蝶々結び",
              artist: "Amier",
              url: "https://api.vlssu.com/meting/?type=url&id=431259253",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=431259253",
              cover: "https://api.vlssu.com/meting/?type=cover&id=431259253"
            },
            {
              name: "だから僕は音楽を辞めた",
              artist: "夏野Natsuno",
              url: "https://api.vlssu.com/meting/?type=url&id=1371137521",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1371137521",
              cover: "https://api.vlssu.com/meting/?type=cover&id=1371137521"
            },
            {
              name: "アイロニ",
              artist: "夏野Natsuno",
              url: "https://api.injahow.cn/meting/?type=url&id=1342403439",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1342403439",
              cover: "https://api.injahow.cn/meting/?type=cover&id=1342403439"
            },
            {
              name: "カタオモイ",
              artist: "Amier",
              url: "https://api.vlssu.com/meting/?type=url&id=431259256",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=431259256",
              cover: "https://api.injahow.cn/meting/?type=cover&id=431259256"
            },
            {
              name: "失眠飞行",
              artist: "KBShinya / Hanser",
              url: "https://api.injahow.cn/meting/?type=url&id=1394847947",
              cover: "https://api.injahow.cn/meting/?type=cover&id=1394847947",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1394847947"
            },
            {
              name: "インドア系ならトラックメイカー (Fdby Remix)",
              artist: "Yunomi / nicamoq / Fdby",
              url: "https://api.injahow.cn/meting/?type=url&id=425684779",
              cover: "https://api.injahow.cn/meting/?type=cover&id=425684779",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=425684779"
            },
            {
              name: "Intro",
              artist: "ラブリーサマーちゃん",
              url: "https://api.injahow.cn/meting/?type=url&id=40915401",
              cover: "https://api.injahow.cn/meting/?type=cover&id=40915401",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=40915401"
            },
            {
              name: "大丈夫",
              artist: "RADWIMPS",
              url: "https://api.injahow.cn/meting/?type=url&id=1378492147",
              cover: "https://api.injahow.cn/meting/?type=cover&id=1378492147",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1378492147"
            },
            {
              name: "Black bird",
              artist: "ぼくのりりっくのぼうよみ",
              url: "https://api.injahow.cn/meting/?type=url&id=39449871",
              cover: "https://api.injahow.cn/meting/?type=cover&id=39449871",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=39449871"
            },
            {
              name: "アンサー",
              artist: "花谱",
              url: "https://api.injahow.cn/meting/?type=url&id=1501450519",
              cover: "https://api.injahow.cn/meting/?type=cover&id=1501450519",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1501450519"
            },
            {
              name: "Orange",
              artist: "pia碳",
              url: "https://api.injahow.cn/meting/?type=url&id=1323130624",
              cover: "https://api.injahow.cn/meting/?type=cover&id=1323130624",
              lrc: "https://api.injahow.cn/meting/?type=lrc&id=1323130624"
            },
            {
                name: "无梦之梦",
                artist: "小瞳喵",
                url: "https://meting.warma.ren/?type=url&id=1444255144",
                cover: "https://meting.warma.ren/?type=cover&id=1444255144",
                lrc: "https://meting.warma.ren/?type=lrc&id=1444255144"
            },
            {
                name: "约束",
                artist: "秋绘Akie",
                url: "https://api.injahow.cn/meting/?type=url&id=1354451040",
                cover: "https://api.injahow.cn/meting/?type=cover&id=1354451040",
                lrc: "https://meting.warma.ren/?type=lrc&id=1354451040"
            },
            {
                name: "心拍数#0822",
                artist: "鹿乃",
                url: "https://api.injahow.cn/meting/?type=url&id=537854741",
                cover: "https://api.injahow.cn/meting/?type=cover&id=537854741",
                lrc: "https://api.injahow.cn/meting/?type=lrc&id=537854741"
            },
            {
                name: "爱してる",
                artist: "高鈴",
                url: "https://api.injahow.cn/meting/?type=url&id=756701",
                cover: "https://api.injahow.cn/meting/?type=cover&id=756701",
                lrc: "https://api.injahow.cn/meting/?type=lrc&id=756701"
            },
            {
                name: "カワキヲアメク(TV size)（翻自 美波） ",
                artist: "鸣海narumi",
                url: "https://api.injahow.cn/meting/?type=url&id=1378064713",
                cover: "https://api.injahow.cn/meting/?type=cover&id=1378064713",
                lrc: "https://api.injahow.cn/meting/?type=lrc&id=1378064713"
            },
            {
                name: "だから僕は音楽を辞めた/所以我放弃了音乐（翻自 ヨルシカ）  ",
                artist: "鸣海narumi",
                url: "https://api.injahow.cn/meting/?type=url&id=1364715702",
                cover: "https://api.injahow.cn/meting/?type=cover&id=1364715702",
                lrc: "https://api.injahow.cn/meting/?type=lrc&id=1364715702"
            },
            {
                name: "一日都市（人声本家） ",
                artist: "小野道ono,Hanser",
                url: "https://api.injahow.cn/meting/?type=url&id=494952303",
                cover: "https://api.injahow.cn/meting/?type=cover&id=494952303",
                lrc: "https://api.injahow.cn/meting/?type=lrc&id=494952303"
            },
            {
                name: "病名为爱（病名は愛だった）（Cover リン&レン） ",
                artist: "Yukiri,Hanser",
                url: "https://api.injahow.cn/meting/?type=url&id=510697890",
                cover: "https://api.injahow.cn/meting/?type=cover&id=510697890",
                lrc: "https://api.injahow.cn/meting/?type=lrc&id=510697890"
            }
          ]
        },
        meting:
        {
          //server: "netease",
          //type: "playlist",
          //mid: "5482993727",
          auto: "https://music.163.com/playlist?id=6877495415"
          //auto: "https://music.163.com/song?id=39449871"
          //auto: "https://music.163.com/#/song?id=39449871"
        },
        mobile:{
          cover: false,
          lrc: true
        }
      }
   ],
   ["vuepress-plugin-boxx"],
   // 配置插件vuepress-plugin-thirdparty-search, 默认主题的搜索框集成第三方搜索引擎
    [
      "thirdparty-search",
      {
        thirdparty: [
          // 可选，默认 []
          {
            title: "在谷歌中搜索",
            frontUrl: "https://www.google.com.hk/search?q="
          },
          {
            title: "在百度中搜索", // 在搜索结果显示的文字
            frontUrl: "https://www.baidu.com/s?wd=", // 搜索链接的前面部分
            behindUrl: "" // 搜索链接的后面部分，可选，默认 ''
          },
          {
            title: "在360中搜索",
            frontUrl: "https://www.so.com/s?q="
          }
        ]
      }
    ],
],
  "locales": {
    "/": {
      "lang": 'zh-CN'
    }
  },
  "head": [
    /*[
      "link",
      {
        rel: "stylesheet",
        href: "/css/APlayer.min.css"
      }
    ],
    // 引入jquery
    [
      "script",
      {
        "language": "javascript",
        type: "text/javascript",
        src: "/js/APlayer.min.js"
      }
    ],*/
    [
      "script",
      { 
        src: "/js/color-thief.js" 
      }
    ],

    [
      "link",
       { 
         rel: "stylesheet",
         href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" 
      }
    ],
    /*[
      "script",
      { 
        src: "/js/sakura.js" 
      }
    ],*/
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    /*["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "/js/MouseClickEffect.js"
    }]*/
  ],
  "theme": "reco",
  "themeConfig": {
    valineConfig: {
      appId: 'OWO5YTOSzOCq8CjtyzeXUPA6-gzGzoHsz',// your appId
      appKey: 'mtoAq1NBIXCc9WCo19VenDAl', // your appKey
      placeholder: "awa这里填写邮箱可以回复到邮箱~图片拖进来可以上传哦~",
      requiredFields: ['nick','mail'],  //必要值
      lang: 'zh-CN',
      notify: true,   //邮箱提醒
      verify: false,  //验证码服务
      visitor: true,  //阅读量统计
      recordIP: false, //记录评论者ip
      enableQQ: true,  //强制拉取QQ头像
      background: '/background.jpg' //背景图
    },
    "nav": [
      {
        "text": "首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "个人主页",
        "link": "https://iin0.cn/",
        "icon": "reco-account"
      },
      {
        "text": "链接",
        "icon": "reco-message",
        "items": [
          {
            "text": "QQ",
            "link": "https://qm.qq.com/cgi-bin/qm/qr?k=NT6cq_cVlfjMbn_zXAVQ86pxytSG1gnh&noverify=0",
            "icon": "reco-qq"
          },
          {
            "text": "GitHub",
            "link": "https://github.com/Twiyin0",
            "icon": "reco-github"
          },
          {
            "text": "CSDN",
            "link": "https://blog.csdn.net/m0_55588781",
            "icon": "reco-csdn"
          },
          {
            "text": "Bilibili",
            "link": "https://b23.tv/qfQuYC",
            "icon": "reco-bilibili"
          }
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "博客模板作者-zealsay",
        "desc": "zealsay说你想说",
        "logo": "https://pan.zealsay.com/avatar/20200606105310570000000.jpg",
        "link": "https://blog.zealsay.com"
      },
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com/"
      },
      {
        "title": "vuepress-theme-reco(博客主题)",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      },
      {
        "title": "师叔の小窝",
        "desc": "这个是师叔的博客",
        "avatar": "https://blog.vlssu.com//favicon.ico",
        "link": "https://blog.vlssu.com/"
      },
      {
        "title": "小弋的生活馆",
        "desc": "这个是小弋大佬的博客（超级好康的awa）",
        "avatar": "/xiaoyi.gif",
        "link": "https://lovelijunyi.gitee.io/"
      },
      {
        "title": "lazy's blog",
        "desc": "这个是lazy大佬的博客（超级好康的awa）",
        "avatar": "/xiaoyi.gif",
        "link": "https://blog.imlazy.ink:233/"
      },
      {
        "title": "随意之光的博客",
        "desc": "这个是随意之光大佬的博客，metingAPI教程可以参考",
        "avatar": "/xiaoyi.gif",
        "link": "https://blog.suiyil.cn/"
        //metingAPI：https://blog.suiyil.cn/1340.html
      },
      {
        "title": "zealsay说你想说",
        "desc": "真正的梦就是现实的彼岸",
        "avatar": "https://www.zealsay.com/logo.png",
        "link": "https://www.zealsay.com/"
      },
      {
        "title": "小小白的小破站",
        "desc": "一个电子爱好者",
        "avatar": "https://tc.xxbwz.cn/i/2023/02/04/130tvdz.webp",
        "link": "https://home.xxbwz.cn"
      },
      {
        "title": "Xzai的个人空间",
        "desc": "这个人很懒，都不给我简介的说",
        "avatar": "https://tc.xxbwz.cn/i/2023/02/04/130tvdz.webp",
        "link": "https://xzai.cloud/"
      }
    ],
    "logo": "/author.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "sidebar": "auto",
    "lastUpdated": "Last Updated",
    "author": "暮色音铃Twiyin0",
    "authorAvatar": "/author.png",
    "record": "赣ICP备2023000574号-2",   //备案信息
    "recordLink": "https://beian.miit.gov.cn/",
    "startYear": "2021",
    publish: false,
    smoothScroll: true,
    mode: 'dark',
    modePicker: true,
    displayAllHeaders: true,    //显示所有页面的标题链接
    activeHeaderLinks: true,    //活动的标题链接
    "info": "一个随处可见的宅男awa无聊时甚至会敲敲代码",
    "mottos": [{
      "zh": "愿你保持初心和善良,笑里尽是温暖与坦荡。",
      "en": "May you keep your original heart and kindness, and smile with warmth and magnanimity."
      },
      {
        "zh": "年轻就是无限的可能。",
        "en": "Youth means limitless possibilities."
      },
      {
        "zh": "真正的梦就是现实的彼岸。",
        "en": "Real dream is the other shore of reality."
      },
      {
        "zh": "不为模糊不清的未来担忧，只为清清楚楚的现在努力。",
        "en": "Don't worry about the vague future, just strive for the clear present."
      },
      {
        "zh": "与其装腔作势企图影响别人，不如咬牙切齿狠命修理自己。",
        "en": "Rather than pretending to influence others, it's better to grind your teeth and repair yourself."
      }, {
        "zh": "上天是公平的，只要努力就会有收获，否则就是你不够努力。",
        "en": "God is fair, as long as effort will include results, otherwise is you hard enough."
      },
      {
        "zh": "人生没有后悔，我们只能尽力去不让自己后悔。",
        "en": "Life without regret, we can only do our best to not to regret."
      }
    ],
    "covers": [
      'https://api.iin0.cn/img/acc',
      'https://api.iin0.cn/img/acc',
      'https://api.iin0.cn/img/acc',
      'https://api.iin0.cn/img/acc',
      'https://api.iin0.cn/img/acc',
      'https://api.iin0.cn/img/acc',
      'https://api.iin0.cn/img/acc'
    ],
    "codeTheme": "tomorrow",
  },
  
  "markdown": {
    "lineNumbers": true       //代码中显示行号
  }
}
