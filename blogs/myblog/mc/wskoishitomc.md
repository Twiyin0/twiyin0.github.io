---
title: koishi与mc互通(WebSocket版)
date: 2024-11-18
cover: https://api.iin0.cn/img/acc?12782
tags:
 - mc
 - koishi
categories: 
 - myblog
---

# koishi与mc互通(WebSocket版)
奶奶，爷爷七十年前做的插件更新了（）  
之前使用的Socket协议不太行，最近发现个好东西[鹊桥](https://github.com/17TheWord/QueQiao)  
支持插件服也支持MOD服，混合服也支持，比之前的要好的多
<!-- more -->

如果你是socket用户(v1.1.0)请移步至[v1.1.0](./koishiandmc)

## 鹊桥
将 Minecraft 服务端玩家事件以 Json 格式通过 Websocket 分发的服务端 plugin/mod。  
项目地址: [Github](https://github.com/17TheWord/QueQiao)  
下载地址: [Courseforge](https://www.curseforge.com/minecraft/mc-mods/queqiao/files/all?page=1&pageSize=20)  
选择服务器版本对应的mod/插件进行下载  
如果你的服务器为插件服且版本>=1.13使用`QueQiao-spigot+1.13`即可，1.12使用`1.12.2`的版本

## 鹊桥配置项参考
本插件作为`客户端`使用，mc服务端需要设置为`服务端`,你可以根据[鹊桥Wiki](https://github.com/17TheWord/QueQiao/wiki/2.-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)设置，在保证端口可以使用的情况下是不用修改的。  
以下是我的配置文件
```yaml
enable: true # 是否启用插件/模组

debug: false # DEBUG，开启后会打印所有日志

server_name: "papermc" # 服务器名称，当有多个服务器时，请使用不同的命名

access_token: "Toooken1234" # 用于连接时进行验证(对应插件的Token)

# 消息前缀
# 消息前面添加的前缀（不包含Title、ActionBar）
# 设置为空时，不会在消息前面添加前缀
message_prefix: "互通"

# WebSocket Server配置项 鹊桥作为服务端使用 --- 此时koishi应为客户端
websocket_server:
  enable: true          # 是否启用
  host: "0.0.0.0"       # WebSocket Server 地址
  port: 2354            # WebSocket Server 端口

# WebSocket Client配置项 鹊桥作为客户端使用 --- 这里的enable改成true的话koishi就得作为服务端使用
websocket_client:
  enable: false                 # 是否启用
  reconnect_interval: 5         # 重连间隔（秒）
  reconnect_max_times: 5        # 最大重连次数
  url_list:
    - "ws://172.26.128.1:23541/minecraft/ws"

# 订阅事件配置项(建议都打开)
subscribe_event:
  player_chat: true       # 玩家聊天事件监听
  player_death: true      # 玩家死亡事件监听
  player_join: true       # 玩家登录事件监听
  player_quit: true       # 玩家退出事件监听
  player_command: true    # 玩家命令事件监听
```

## koishi对接鹊桥
* 效果演示
    对接完成后的效果  
    ![](./imgs/e731260190e39213d6e367f7d4c56ed7.png)
* 按照[鹊桥配置项参考](#鹊桥配置项参考)配置鹊桥，启动mc服务器（以下以插件服为例）
* 安装koioshi插件`minecraft-sync-msg`，注意需要版本为`2.0.x-xxx`
* 配置koishi插件，可以参考下图  
* 作为服务端使用  
![](./imgs/10EF3902-4F49-4c0b-B3EB-E8644F82A7B4.png)  
* 作为客户端使用  
![](./imgs/DA064F6B-675C-4572-907F-BC672D5E8503.png)  
* 然后启用插件即可

## 插件特殊说明
* 更新前请停止插件
* 插件仍可以使用\<at id="id号"/>来at群里的人,也可以使用\<image url="url"/>来发送图片
* 聊天平台(如qq群)使用`。#(消息)`或`.#(消息)`给mc服务器发送消息如`.#Hello`
* 群里发送`&{颜色单词}&`可以改变发送到mc服务器的颜色,比如`.#你好呀&gold&`
* 聊天平台(如qq群)使用`#/(指令)`可以给RCON发送指令  
示例: #/list (等价于mc内输入/list)
