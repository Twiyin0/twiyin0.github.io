---
title: 回顾博客搭建过程
date: 2021-07-24
sticky: 2
cover: /img/human1.png
tags:
 - 博客
categories: 
 - myblog
---  

::: tip  
因为自己的记性不是很好，想记点东西  
存在电脑里的笔记，过久不翻旧不知道哪去了  
还是写在博客比较好
:::

<!-- more --> 

:::tip
温故而知新，虽然是一步步改过来的，但还是想回顾一下整个过程
:::

# 环境安装  

## node.js安装  
首先得配置环境（node.js 8.6+）[node官网](http://nodejs.cn/)  
windows下载二进制文件（.zip） 
下载完成以后解压  
 
:::tip
当然，win系统这里需要配置环境变量  
我的电脑-属性-高级系统设置-环境变量-在PATH后加入npm的路径  
比如我的F:\Node;
:::
按win+r输入cmd,选择解压的路径,检查是否安装完成  
```
npm -v
```  
切换下载源  
```
npm config set registry http://registry.npm.taobao.org/  #用国内镜像下载源
npm config set registry https://registry.npmjs.org/     #官方下载源
```  
非必要的时候不要选择官方下载源  

## yarn安装  
全局安装yarn  
```
npm install -g yarn  
```  
:::tip
加入yarn的环境变量  
我的电脑-属性-高级系统设置-环境变量-在PATH后加入  
F:\Node\node_modules\yarn\bin\yarn.js;
:::
检查是否安装完成  
```
yarn -v
```  
至此，我们的环境就安装好了  

# 使用  

## 模板 <Badge text="不推荐" type="tip"/>  
总之先把模板放在这[模板(.tar)](/my-blog_6wEjrx.tar)  
解压模板(.tar格式可以用7-zip解压)得到my-blog文件夹  
点击进入，在把cmd定位到该文件夹  
这里推荐VScode，把整个文件夹拖进VScode，在最上面找到 终端(Terminal)-新终端(new Terminal)
:::tip
新建终端快捷键 shift+ctrl+`
:::  

## 初始化  
在cmd输入（VScode终端）  
```
yarn init #或者 npm init
```  
然后看自己来，懒就直接回车回车  

## 安装vuepress本地依赖 <Badge text="选" type="warning"/>
:::danger
如果你下载了模板，那么这一步可以跳过
:::  
如标题所示awa  
```
yarn add -D vuepress #或者 npm install -D vuepress
```
:::warning
如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn (opens new window)而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
:::  

## 主题初始化 <Badge text="选" type="warning"/>  
:::danger
如果你下载了模板，那么这一步可以跳过
:::
npm  
```
npm install @vuepress-reco/theme-cli -g
theme-cli init
```  
yarn  
```
yarn global add @vuepress-reco/theme-cli
theme-cli init
```  

## 编译及运行  
在cmd（终端）输入  
```
yarn dev  #或者  npm run dev
```  
此时Vueprress会在[http://localhost:8080](http://localhost:8080)启动一个热重载的博客。  

# 参考文档  
[快速上手](https://vuepress.vuejs.org/zh/guide/getting-started.html)  
[一款简洁而优雅的 vuepress 博客 & 文档 主题](https://vuepress-theme-reco.recoluan.com/)  
:::warning
浏览器可能会提示你网站不安全，此时你需要点击`高级`-`继续前往网站`即可
:::  

# 修改配置文件  
我们用本地访问我们的博客`http://localhost:8080/my-blog/public/`时，是主题的默认界面  
我们需要通过修改一些东西，把主题改成自己的样子（）  

## config.js  
`docs/.vuepress/config.js`是博客的核心文件之一  
接下来解读这个配置文件  

### title
标题，就是浏览器窗口栏上显示的东西，默认为"Vuepress"  
在`"title": ""`后面的引号""里边输入你想要的内容  
eg.  
```
"title": "音铃的博客"
```  
ctrl+s保存，网页也会刷新  
:::danger
有时候可能编译不了，卡住  
此时你需要在终端输入ctrl+c  
如果ctrl+c也无法把它停掉就关掉终端，重新开一个新终端  
再输入yarn dev  
:::  
再刷新网页，窗口标题就成为你自己编辑的样子啦~  
![blog1](/photos/blog1.png)  

### description  
翻译过来是描述，默认是"Welcome to your vuePress-theme-reco site"  
也就是屏幕中间"vuepress-theme-reco"下面的那段话  
你可以改掉  
```
"description": "欢迎，音铃的博客"
```  
![blog2](/photos/blog2.png)  

### base  
部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。  
这里我们直接删掉它（别问为什么，因为我们没有想让网站部署到一个子目录路径下）  

### dest  
指定 vuepress build 的输出目录。这里我们制定为"public"（即/.vuepress/public）  

### head  
额外需要被注入到当前页面HTML `<head>` 里面的标签，每个标签都可以以[tagName, {attrName:attrValue }, innerHTML?]的歌是指定  
比如我们要改掉标签  
```
head: [
    ['link', { rel: 'icon', href: '/head.jpg' }]  //head.jpg要在 `根目录/docs/.vuepress/public/` 文件夹里  
  ]
```  
`(2021年7月23日，电脑电源坏了，新电源还在路上awa，剩下的到时候补上)`  
保存->编译  
此时，我们窗口就有了我们的图标  
![head.jpg](/photos/blog3.png)  

### theme  
`"theme": "reco"`  这是官方的主题, 这屋里不建议改  

### themeConfig  
主题配置  
nav是导航栏  
里面要改的也就只有链接了（当然，看不懂可以不改）  
"text": "Contact"这个里面都是作者在各个平台的链接  
你可以改成自己的  
"icon"图标可以参考[Config.js配置](https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html)  

### type  
类型，"blog"指的是博客，所以，这个也不要改  

### blogConfig  
博客配置  
不作修改（懒）  

### frindLink  
友情链接  
可以把你推荐的一些链接放在这里  
![blog4](/photos/blog4.png)  

### logo  
就是博客的logo  
我们可以把我们的logo(head.jpg)放在上面  
```
"logo": "/head.jpg"
```  
此时，我们首页的左上角就会显示我们的logo啦  
![blog5](/photos/blog5.png)  

### search 
是否开启搜索功能  
默认：true  

### searchMaxSuggestions  
搜索出的最大推荐数  

### sidebar  
侧边栏  
默认：auto  

### author  
作者名称，通过修改这个可以修改作者（你）的名称  

### authorAvatar  
作者头像，你可以通过它修改你的头像  
我们将head.jpg作为我们的头像（/.vuepress/public/head.jpg）  
```
"authorAvatar": "/head.jpg"
```  
保存、重新编译、刷新后  
![blog6](/photos/blog6.png)  

### record
网页备案信息  

### startYear  
起始年份  

更多配置文件请参考官方  
[vuepress](https://vuepress.vuejs.org/zh/guide/basic-config.html)  
[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html)  

至此，我们的博客算是搭建完了...........  

# 文章发表  
既然博客写完了，我们要怎么发表文章呢？  
文章在我们的目录`/docs/views/`里面  
首先创建（修改/进入）一个文件夹（目录）`category1`  
里面再创建（修改/进入）一个目录（文件夹）`2016`  
在里面创建（修改）.md文件  
接下来我们编辑.md文件里面的内容  
首先我们去看看Maekdown语法的基础  
[vuepress](https://vuepress.vuejs.org/zh/guide/markdown.html#header-anchors)vuepress上的教程  
[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/views/1.x/syntax.html)vuepress-theme-reco上的教程  
[Markdowm基本语法教程](https://markdown.com.cn/basic-syntax/)第三方教程（推荐）  

## 解读默认主题的`./views/category1/2018/121501.md`  
首先用'---'将标题等信息包裹起来  

### title
标题，即文章的标题  

### date  
日期，你可以编辑发表日期  

### tags  
标签，可以给一片文章添加多个标签  
```
tags: 
  - tag1
  - tag2
  ...
```

### category  
目录，给文章分配目录  

## 发表
按照这些，我们把文章修改一下  
```markdown
---
title: 第一篇自己的博文
date: 2021-07-24
tags:
 - 好耶
categories:
 -  心情
---

今天我学会搭建博客啦！
来发一篇文章~
```  
保存
:::tip
虽然markdown是实时更新的，但效果不是很好，想看最终效果还是需要重新编译整个博客  
不重新编译能观看预览效果  
可以等发表时再进行重新编译
:::  
刷新我们的博客，可以看到我们更新的博文已经发表到我们的博客上了  
![blog7](/photos/blog7.png)  

终于写完了awa，累！  
![摸鱼](/photos/moyu.gif)  

[主题开发](https://v2.vuepress.vuejs.org/zh/advanced/theme.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E4%B8%BB%E9%A2%98)
