import { hopeTheme } from "vuepress-theme-hope";
import { getDirname, path } from "vuepress/utils";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

const __dirname = getDirname(import.meta.url);

export default hopeTheme({
  hostname: "https://blog.vlssu.com",

  author: {
    name: "暮色音铃Twiyin0",
  },

  logo: "author.png",

  repo: "Twiyin0/twiyin0.github.io",
  
  docsBranch: "master",
  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: '<a href="https://beian.miit.gov.cn">沪ICP备2024046839号-3</a>',
  copyright: "CC BY-SA 4.0 Licensed | Copyright © 2021 - 2025 飒爽师叔",
  license: "CC BY-SA 4.0",

  displayFooter: true,

  // 博客相关
  blog: {
    avatar: "author.png",
    description: "一个随处可见的宅男awa无聊时甚至会敲敲代码",
    intro: "/intro.html",
    medias: {
      BiliBili: "https://b23.tv/qfQuYC",
      GitHub: "https://github.com/Twiyin0",
      QQ: "https://qm.qq.com/cgi-bin/qm/qr?k=NT6cq_cVlfjMbn_zXAVQ86pxytSG1gnh&noverify=0",
      // VuePressThemeHope: {
      //   icon: "https://theme-hope-assets.vuejs.press/logo.svg",
      //   link: "https://theme-hope.vuejs.press",
      // },
    },
  },

  // 加密配置
  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": {
  //       hint: "Password: 1234",
  //       password: "1234",
  //     },
  //   },
  // },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    // math: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    comment: {
      provider: "Waline",
      serverURL: "https://xxx",
      requiredMeta: ['nick', 'mail'], // 必要值
      reaction: true, // 开启反应
    },

    components: {
      components: ["Badge", "VPCard", "SiteInfo"],
    },

    icon: {
      prefix: "fa6-solid:",
    },

    slimsearch: true,

    feed: true,

    copyright: {
      global: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     // shortcuts: [
    //     //   {
    //     //     name: "Demo",
    //     //     short_name: "Demo",
    //     //     url: "/demo/",
    //     //     icons: [
    //     //       {
    //     //         src: "/assets/icon/guide-maskable.png",
    //     //         sizes: "192x192",
    //     //         purpose: "maskable",
    //     //         type: "image/png",
    //     //       },
    //     //     ],
    //     //   },
    //     // ],
    //   },
    // },
  },
});
