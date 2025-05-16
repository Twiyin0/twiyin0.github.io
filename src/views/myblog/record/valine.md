---
title: Valine评论插件
date: 2021-07-25
cover: /img/yuri1.jpg
tags:
 - 博客
categories: 
 - myblog
---  

<video src="/bili.webm" id="biliv" autoplay loop muted width=800px>
    
</video>

# vuepress-theme-reco主题
## 安装  
npm  
```
npm install valine --save
```  
yarn  
```
yarn add -D valine
```  

## 获取AoppID和AppKey  
`登陆`或`注册` [LeanCloud](https://console.leancloud.cn/),进入控制台创建应用：  
![v1](/img/v1.png)  

填写好应用名称后选择开发版，不够选现有class，填写好描述  
按照下图来查看AppID和AppKey  
![v2](/img/v2.png)  

## 配置valine  
在`config.js`的`themeConfig`中加入以下代码，将AppID和AppKey改成刚刚得到的值  
```js
valineConfig: {
      appId: 'AppID',// your appId
      appKey: 'AppKey', // your appKey
      placeholder: "awa这里填写邮箱可以回复到邮箱~图片拖进来可以上传哦~",//评论框内的字
      requiredFields: ['nick','mail'],  //必要值
      lang: 'zh-CN',
      notify: true,   //邮箱提醒
      verify: false,  //验证码服务
      visitor: true,  //阅读量统计
      recordIP: false, //记录评论者ip
      enableQQ: true,  //强制拉取QQ头像
      background: '/background.jpg' //背景图
    },
```  
其他配置项请参考[Valine](https://valine.js.org/configuration.html)  

# 作为插件使用  

## 快速应用  
npm  
```
npm install --save vuepress-plugin-comment
```  
yarn  
```
yarn add vuepress-plugin-comment -D
```  

## 配置插件  
在`config.js`中加入  
```js
plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: 'Your own appId',
          appKey: 'Your own appKey'
        }
      }
    ]
  ]
```  
修改appID和appKey，其他配置参考[Valine](https://valine.js.org/configuration.html) 

# 评论数据管理  
由于Valine 是无后端评论系统，所以也就没有开发评论数据管理功能。请自行登录`Leancloud`应用管理。

具体步骤：`登录`>`选择你创建的应用`>`数据储存`>`创建Class` `Comment`，然后就可以尽情的发挥你的权利啦(～￣▽￣)～

![v3](/img/v3.png)  

# 参考文档  
[Valine](https://valine.js.org/)  

<!--
<Boxx/>
blockStyle Object 整体块元素的样式 
titleStyle Object 只针对title的样式 
contentStyle Object 只针对content的样式 
changeTime Number 以毫秒值为单位的动态变化时间，顶部为例

eg.
<marquee>
<Boxx :blockStyle="blockStyle"  />
<Boxx type="warning" :blockStyle="titleStyle" :titleStyle="titleStyle" changeTime="1000" title="我是一个大大的且变化的 title"/>
<Boxx type="danger" :blockStyle="contentStyle" :contentStyle="contentStyle" content="我是一个小小的<br><marquee>content</marquee>"/>
</marquee>

<script>
	export default {
		data() {
			return {
				blockStyle: {'background':'#eee','color':'red'},
                titleStyle: {'margin-right': '10%','font-size':'16px'},
                contentStyle: {'margin-right': '20%','font-size':'10px',
                               "margin-top": "1rem","margin-bottom": "0.4rem"},
			}
		}
	}
</script>

-->

        