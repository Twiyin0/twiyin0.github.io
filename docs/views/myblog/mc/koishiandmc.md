---
title: 使用koishi与mc互通
date: 2023-09-07
cover: https://api.iin0.cn/img/acc?127863
tags:
 - mc
 - koishi
categories: 
 - myblog
---

最近有想法做了个mc服务器spigot插件与koishi的onebot互通的项目  
顺便把这篇博客当作详细文档了  
[jar更新日志](https://github.com/Twiyin0/chatSocketServer-spigot)
[koishi插件更新日志](https://www.npmjs.com/package/koishi-plugin-minecraft-sync-msg#CHANGELOG)
<!-- more -->
# 使用koishi与mc互通
最近有想法做了个mc服务器spigot插件与koishi的onebot互通的项目  
顺便把这篇博客当作详细文档了

## 准备
1、一个`jdk17`环境运行的spigot-1.16以上版本的mc服务器(paper也可以)  
2、去我的[github仓库](https://github.com/Twiyin0/chatSocketServer-spigot)下载所需插件  
也可以点击下面下载  
* Github源站[chatSocketServer-spigot](https://github.com/Twiyin0/chatSocketServer-spigot/releases/download/v1.0.0/chatSocketServer-spigot-1.0.0.jar)  
* 镜像1[chatSocketServer-spigot](https://g.in0.re/https://github.com/Twiyin0/chatSocketServer-spigot/releases/download/v1.0.0/chatSocketServer-spigot-1.0.0.jar)
* 镜像2[chatSocketServer-spigot](https://gh.api.99988866.xyz/https://github.com/Twiyin0/chatSocketServer-spigot/releases/download/v1.0.0/chatSocketServer-spigot-1.0.0.jar)

3、下载好后把插件丢进`plugins`文件夹即可  
4、把服务器的RCON服务打开  
* 编辑服务器`server.properties`中`enable-rcon`设置为`true`
* 再设置`rcon.port`为rcon的端口,可以不动 与 `rcon.password`(强烈建议设置密码) 然后保存，关闭
:::tip
插件启动时会自动生成配置文件，里面只有两个配置项  
* host  Socket服务器启动地址
* port  Socket服务器启动端口
如果你不懂，不建议修改
:::

## 安装koishi插件
* 1、插件市场搜索`minecraft-sync-msg`安装即可
* 2、安装完成后去配置插件,详情看[koishi插件配置](#koishi插件配置)

## MC服务器插件配置项
| 配置项              | 说明                 | 注意     |
|--------------------|----------------------|----------|
| host               | Socket服务器启动地址     | |
| port               | Socket服务器启动端口     | | 
| token              | Socket服务器验证令牌     | |
| CMDprefix          | 控制台输出接收数据的前缀  | | 
| CHATprefix         | 聊天栏广播接收数据的前缀  | | 

## koishi插件配置

| 配置项              | 说明                 | 注意     |
|--------------------|----------------------|----------|
| socketServerHost   | socket服务器的地址     | |
| socketServerPort   | socket服务器的端口     | |
| socketServerToken  | socket服务器的验证令牌 | |
| rconServerHost     | RCON服务器的地址       | |
| rconServerPort     | RCON服务器的端口       | |
| rconPassword       | RCON服务器的密码       | |
| alluser            | RCON指令是否所有人可用  | (不推荐) |
| superuser          | 可以用所有RCON的用户ID  | |
| commonCmd          | 普通用户可用的指令      | (只能执行无参数的命令) |
| cannotCmd          | 任何用户都不能用的指令   | (强烈建议禁用restart) |
| sendToChannel      | mc服务器内消息发送到群组 | (请看下面的注意) |
| chatOnly           | 只接收聊天消息          | (v0.2.0)   |

:::warning **注意**  
sendToChannel 是发送的群组数组，格式为`平台:群组id`如发送到qq群`onebot:123456`  
能力有限，目前commonCmd只能做到无参数指令,像list,help,tps这些  
RCON更多指令详情可以百度  
:::

## 其他玩法
* mc服务器内发送&lt;at id="用户id(如QQ号)"/&gt;可以at平台用户
* mc服务器内发送&lt;image url="图片地址"/&gt;可以发送图片到平台
* 聊天平台(如qq群)使用`。#(消息)`或`.#(消息)`给mc服务器发送消息&+数字可以跟mc改变颜色  
示例: .#你好&6呀
* 聊天平台(如qq群)使用`#/(指令)`可以给RCON发送指令  
示例: #/list (等价于mc内输入/list)

## 注意事项
* 1、如果koishi的socket与服务器断开不会自动重连，需要重启插件  
我也想过做自动重连但是logger会爆炸
* 2、java我也是看着来写的，真心不会，所以大概率不会更新  
