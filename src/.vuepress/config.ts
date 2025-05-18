import { defineUserConfig } from "vuepress";
import metingPlugin from "vuepress-plugin-meting2";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "音铃的博客",
  description: "无聊的时候甚至会敲代码",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,

  plugins: [
    metingPlugin({
      metingOptions: {
        global: true, // 开启关闭全局播放器
        // server: "netease",
        // api: "https://api.vlssu.com/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r",
        // type: "playlist",
        // mid: "7216749206",
        aplayerOptions: {
          mini: true,       //mini版
          autoplay: false,   //自动播放
          theme: "#09244e", //主题颜色
          volume: 0.3,      //音量
          mutex: true,      //互斥模式
          lrcType: 3,       //歌词解析模式，默认0，想要歌词就推荐3
          listFolded: true, //折叠播放列表
          //可能报错的项
          //loop: "all",    //播放器循环模式'all' | 'one' | 'none'默认all
          order: "random",  //设置播放器的初始顺序模式"list"| "random" 默认list
          preload: "auto",  //设置音频的预加载模式'none' | 'metadata' | 'auto' 默认auto
          //listMaxHeight: 250  //设置播放列表最大高度，单位为像素
        }
      },
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
    }),
  ],
});
