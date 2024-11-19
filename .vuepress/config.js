module.exports = {
  "title": "音铃的博客",
  "description": "最终还是回归了平平无奇的博客",
  "dest": "public",
  "head": [
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
    [
      "link",
       { 
         rel: "stylesheet",
         href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" 
      }
    ],
  ],
  plugins: [
    [require("@tailwindcss/typography"), require("daisyui")],
    ['vuepress-plugin-code-copy', {
      'align': 'bottom',
      'backgroundTransition': true,
      'successText': "知识已经刻进大脑啦ヾ(•ω•`)o"
    }],
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
        "text": "博客首页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "相关网站",
        "icon": "reco-message",
        "items": [
          {
            "text": "个人主页",
            "link": "https://in0.re"
          },
          {
            "text": "个人图床",
            "link": "https://img.iin0.cn"
          }
        ]
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
    "sidebar": "auto",
    "type": "blog",
    // "blogConfig": {
    //   "category": {
    //     "location": 2,
    //     "text": "Category"
    //   },
    //   "tag": {
    //     "location": 3,
    //     "text": "Tag"
    //   }
    // },
    "friendLink": [
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
    "logo": "/T0o.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "最近更新",
    "author": "暮色音铃Twiyin0",
    "authorAvatar": "/author.png",
    "record": "沪ICP备2024046839号-3",   //备案信息
    "recordLink": "https://beian.miit.gov.cn/",
    "startYear": "2021"
  },
  "markdown": {
    "lineNumbers": true
  }
}