---
title: 问题汇总
date: 2021-07-22
cover: /img/yourname.jpg
tags:
 - 博客
categories: 
 - myblog
---

# 前言  
在搭建过程中难免会遇到很多问题，都把它放在这里吧。

# 关于静态网站部署问题  

## 使用宝塔面板搭建网站  
在宝塔上搭建网站需要指定一个网站目录，而我的博客需要再指定一个运行的子目录public  
这个步骤没问题后，我们开放我们博客的端口，然后再测试  
发现会出现黑杆杆，或者404  
404则可能还没编译或者哪个路径错了.............  
出现了黑杆杆就是.vuepress/config.js里面的"base"  
如果不需要指定访问路径的话，可以把它删掉了  
这样大概就不会有问题了叭..............  
记得每次改完都build一下  

# 插件问题  

## 在安装dynamic-title插件时出现的问题  
Linux服务器在安装"dynamic-title"插件时会报错404 not found
解决：  
将npm下载源换回官方源  
```
npm config set registry https://registry.npmjs.org/
```  
可能是国内镜像访问不了网站，换成官方源就行  
下载完以后记得把它换回来  
```
npm config set registry http://registry.npm.taobao.org/
```  
## meting音乐播放插件的问题  
这个是插件源[Meting-Github](https://github.com/moefyit/vuepress-plugin-meting)  
按照这个文档来配置meting插件会报错，说错误在"order: "和"preload: "后  
但是我把它放在后面又没有报错了，也不知道是为什么，或者我当时改选项的时候没有加引号''/""  
当然这里注意string型记得加引号""  
使用auto可以获取playlist的内容但分开填不可以，导致播放器播放不了音乐  
```
//注释掉这三行，改为auto
//server: "netease",
//type: "playlist",
//mid: "xxxx"
auto: "https://music.163.com/playlist?id=xxxx"
```  

# 美化、优化问题  

## 博客列表透明化  
因为加了nest插件，粒子好好看，可惜被黑黑大大的列表框挡住了，难受.................  
在前面学得，我们可以通过.vuepress/styles/里面的两个.styl文件（stylus）来修改我们博客的样式  
浏览器F12可以查看我们网页的元素（这里需要HTML基础）  

:::warning
以下是我踩的坑
:::  
### 坑
我第一次试着跟着小弋大佬提供的“修改主题样式”[源](https://lovelijunyi.gitee.io/posts/6b66.html)  
里面看到有这么一行代码  
```css
// 分组的透明度修改，未生效
.sidebar-group.is-sub-group > .sidebar-heading:not(.clickable){
    opacity: 0.5;
}
```  
发现这个"opacity"属性可以调整透明度  
于是我从浏览器F12扒出我博客列表找到`class="blog-list"`  
这个定位为我博客列表的类  
因此我在index中添加一行  
```css
.blog-list{
    opacity: 0.5;
}
```  
很好，它确实透明了，但它完全透明了qwq  
连同标题等全部透明了  
这不是我的预期效果（啊啊啊啊啊啊啊啊啊）  
然后我捉摸了好久，到处去扒别人的博客（没有那个意思） 
修改过标题字体的透明度，受大块（blog-list是这个块中最大的）透明度的限制  
标题title的透明度最大也只能是0.5  
实在自己没办法了，去别的大佬博客看看吧  
然后在小弋大佬的主页扒出background的一个没见过的值（我见得东西不多qwq）  
```css
background: transparent;
```  
原来这个值是透明awa  
什么嘛，就这样啊（打）  
  
### 操作  
`.vuepress/index.styl`里加入  
```css
.abstract-item{
    background: transparent !important;
}
```  
(!important 表示强制先加载)  
为什么不是将"blog-list"或者"abstract-wrapper"类透明？  
因为它们的背景本来就透明的，而不透明的是"abstract-item"类  

由此类推，我们可以把我们的作者和侧边栏扒出来，将它们透明化  
```css
//作者栏（头像的地方）
.personal-info-wrapper, .info-wrapper{
    background: transparent !important;
}
//侧边栏
aside.sidebar{
    background: transparent !important;
}
```  

## 摘要问题  
"<\!-- -->"之前的都是摘要，但注意"<\!-- -->"里面的内容不能是中文，否则摘要部分的内容不会显示在标题上  

## 主题更换问题  
在换主题的时候出现了点问题，将zeal大大的主题加到自己的`.vuepress/thtme`后，还需要修改`package.json`  
安装上新的依赖  
当然还要对自己原来的主题做一些修改  
需要修改的有`/docs/README.md`还有最重要的`config.js`  
发现zeal大大的格言只能显示英文，没有中文  
经过琢磨，发现以前config.js里的"title"占据了\<h1\>元素。  
之前为了消除title，我在`.vuepress/styles/index.styl`里将`.blog-home h1`显示none  
导致\<h1\>一直处于被隐藏的状态，现在将这个删掉就好了

# 其他问题

## VScode报错  
在VScode执行yarn指令的时候报错  
```sh
yarn : 无法加载文件 F:\node\yarn.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ yarn init
+ ~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```  
是因为终端不是以管理员身份运行的  
### 解决办法1  
首先以管理员的身份运行 VS Code .  
在终端执行 get-ExecutionPolicy,打印显示出 Restricted,表示禁止状态.  
接下来在终端执行 set-ExecutionPolicy RemoteSigned.  
在此输入 get-ExecutionPolicy查看，显示 RemoteSigned.  

### 解决办法2  
参考原文[CSDN](https://blog.csdn.net/qq_38661184/article/details/107168849)  
执行：  
先输入  
```sh
get-ExecutionPolicy 
```  
可能会出现两种情况（1.1是有提示命令，1.2是没有提示命令的）  
1.1控制台会给出回复一大串红字(即有提示命令)，里面含有`Restricted`，表示状态是禁止的，然后直接根据提示运行命令；  
输入  
```sh
Set -ExecutionPolicy -Scope CurrentUser  
```  
显示 `ExecutionPolicy：RemoteSigned` 表示状态是允许运行的；  

1.2控制台只回复`Restricted `(即无提示命令)  
就要先输入：  
```sh
set-ExecutionPolicy RemoteSigned
```  
然后根据提示再输入  
```sh
Set-ExecutionPolicy -Scope CurrentUser
```  
后续会有加其他问题
