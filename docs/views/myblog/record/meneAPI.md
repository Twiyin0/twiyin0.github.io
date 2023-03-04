---
title: metingAPI与网易nodejs版API使用说明
date: 2021-07-27
cover: /img/starsky.png
tags:
 - 博客
categories: 
 - myblog
---  

:::tip
因为自己还是个小白，API什么的还不懂怎么弄  
所以就先用别人的吧qwq
:::

<!-- more -->  

# metingAPI的使用说明
环境要求**nodejs8.12+**
## meting参数说明  
server: 数据源  
     netease 网易云音乐(默认)  
     tencent QQ音乐  

type: 类型  
     name 歌曲名  
     artist 歌手  
     url 链接  
     cover 封面  
     lrc 歌词  
     single 获取以上所有信息(单曲)  
     playlist 获取以上所有信息(歌单)

id: 单曲ID或歌单ID  

GitHub：[meting-api](https://github.com/injahow/meting-api)，此API基于 [Meting](https://github.com/metowolf/Meting) 构建。  

## 实例  
例如：  
https://api.injahow.cn/meting/?type=url&id=416892104  
https://api.injahow.cn/meting/?type=single&id=591321  
https://api.injahow.cn/meting/?type=playlist&id=2619366284  

# neteaseAPI搭建以及使用说明  
## 安装  
```
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git  //下载完成以后进入目录NeteaseCloudMusicApi/
npm install
```  
:::danger
服务器从github下载可能会很慢，[官方文档](https://neteasecloudmusicapi.js.org/#/)上的链接不是很推荐，因为会报错没有权限，建议前往[github](https://github.com/Binaryify/NeteaseCloudMusicApi)  
`npm`安装可能会报错`404 not found`  
此时你需要`yarn`安装,npm安装yarn可自行百度  
:::
yarn  
```
yarn install    //目录NeteaseCloudMusicApi/下
```  

## 运行  
```
node app.js
或
yarn start
```  
:::danger
你可能会在这个步骤遇到些问题，比如，报错什么的导致允许不了  
大概率是依赖的问题，重新yarn install应该就可以了()
:::  
服务器启动默认端口为 3000, 若不想使用 3000 端口 , 可使用以下命令 : Mac/Linux  
```sh
PORT=4000 node app.js
```  
windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :  
```sh
set PORT=4000 && node app.js
```  
服务器启动默认 host 为localhost,如果需要更改, 可使用以下命令 : Mac/Linux  
```sh
HOST=127.0.0.1 node app.js
```  
windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :  
```sh
set HOST=127.0.0.1 && node app.js
```  
:::warning
运行时会消耗一定的资源，非必要可以不自己搭（）
:::  

## 实例  
就拿单曲url、歌词、歌单详情举例，具体参数请参考[网易云音乐 API](https://neteasecloudmusicapi.js.org/#/)或者[github](https://github.com/Binaryify/NeteaseCloudMusicApi)  
获取单曲url:  
http://localhost:3000/song/url?id=512376195  
获取歌词：  
http://localhost:3000/lyric?id=512376195  
获取歌单:   
http://localhost:3000/playlist/detail?id=6877495415  

