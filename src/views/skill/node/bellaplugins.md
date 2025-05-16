---
title: 贝拉QQ机器人(koishi-v4框架)插件开发——接入一个Api
date: 2023-03-30
cover: https://up.iin0.cn/2023/64149510a7bca.png
tags:
 - bot
 - QQ机器人
categories:
 - node
---

# 贝拉QQ机器人插件开发——接入一个Api

## 前期准备
- * [koishi-v4](https://koishi.chat/)
- * [node-v16+](nodejs.org)
- yarn或npm包管理器

## 初始化一个插件
koishi根文件夹  
yarn  
```sh
yarn setup plugin-name  # plugin-name为插件名称
```
npm  
```sh
npm run setup plugin-name  # plugin-name为插件名称
```

此时，在plugins文件夹内会新增一个plugin-name/(定义的插件名称)文件夹  
在src目录内有一个index.ts文件夹，先tsconfig.json文件内"include"项加入"tsx"表示支持tsx
```tsconfig.json
"include": [
    "src",
    "tsx"
  ]
```
后面我们就可以将index.ts改名为index.tsx了，当然不改也行-=-我习惯tsx  

## 实例
初始化做完了，那么接下来就实战吧  
在index.tsx内写入我们的插件脚本  
> 注意：这里的request与rate-limit需要自己安装依赖
```javascript
import { Context, Schema } from 'koishi'
import { Time } from 'koishi'
import { checkTimer } from '@koishijs/plugin-rate-limit'
const request = require('request');

export const name = 'bechat'        //这里是插件名称

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // 拿一个指令举例吧
  ctx.command('bechat <messege: text>','跟贝拉发起Chatgpt聊天',{ minInterval: Time.minute })
  .usage('bechat <聊天内容>')
  .example('bechat 你好啊!')
  .action(async ({ session }, messege) => {
    if(messege && messege !== " ") {
      session.send(<>请耐心等待……(冷却时间1min)</>);              // 发送前的提示信息
      var enUrl = encodeURI(messege);                           // 将发送的内容进行url编码，以便js访问
      var url = `https://api.example.com/?msg=${enUrl}`;        // 比如这是一个自建的chatgpt的api,它返回json
      const data = await makeRequest(url);                      // 进行get请求
      session.send(<>{(data.data).toString()}</>);              // 将请求结果发送出来
    }
    else session.send(<>使用bechat #聊天内容# 向贝拉发起chatgpt聊天（PS：冷却一分钟）</>);
  })
}

// 将get请求包装成Promise返回
async function makeRequest(url) {
  const options = {url: url};
  return new Promise((resolve, reject) => {
    request.get(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}
```

写好以后我们编译插件
```sh
yarn build plugin-name
```
或者
```sh
npm run build plugin-name
```

## 启用插件
在koishi.yml的plugins中加入一行
```json
plugin-name: {}
```
如果有热重载那就ok了，没有的话得重启机器人
