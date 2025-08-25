---
title: Vercel部署nodejs api
date: 2025-08-25
collapsable: true
cover: https://img1.iin0.cn/img/acc/74066390_p0.jpg
tags:
 - node
 - vercel
 - express
categories: 
 - node
---

# Vercel部署nodejs api
[*] 为什么用vercel？  
可以脱离服务器运行后端`http api`、`稳定`、`Free！`
[*] 参考链接
[Hosting your API on Vercel](https://vercel.com/guides/hosting-backend-apis)

## 准备工作
你需要提前准备以下环境
- [nodejs](https://nodejs.org/zh-cn)(带npm)
- [vercel](https://vercel.com/)(账户)
- 一点点js基础、python也可以，我也会介绍一下python部署的方法
- （python也需要安装nodejs这一步）

nodejs(npm)安装完成后，需要安装一下vercel cli  
```bash
npm i -g vercel     # 安装 Vercel CLI
```
构建工作区并进入工作区
```
mkdir apiRoot && cd apiRoot && npm init -y
```

## 目录结构
```
root|--
    |- api
      |- index.ts
    |- vercel.json
    |- pakage.json
```

**package.json**
:::details
```json
{
  "name": "examples",
  "repository": "https://github.com/vercel/examples.git",
  "license": "MIT",
  "private": true,
  "devDependencies": {
    "@types/node": "^17.0.42",
    "@vercel/node": "^2.9.6",
    "typescript": "^4.7.3"
  }
}
```
:::

**vercel.json**
:::details
```json
{
	"rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
```
:::

## 本地调试
### 安装依赖
如果你创建了[目录结构](#目录结构)中的package.json，则运行
```bash
npm i
```
如果你没有package.json
```bash
npm i @types/node @vercel/node typescript
```

### 编写代码
`api/index.ts`
:::details
```js
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query
  return res.json({
    message: `Hello ${name}!`,
  })
}
```
:::

### 调试与创建vercel工作空间
运行以下命令开始运行调试
```bash
vercel dev
```
第一次运行会提示创建vercel工作区的信息，按照信息自行填写即可  
填写完成后后台提示打开`http://localhost:3000`来进行调试  
打开浏览器`http://localhost:3000?name=nihao`  
部署完成后就可以通过vercel的域名访问api了

## 上传且部署到vercel
在vercel.json所在目录运行以下命令即可
```bash
vercel
```

## python部署方法
命令都是一样的，就是要把上述的package.json改成requirements.txt,然后再改一下vercel.json  
目录结构如下
```
root|--
    |- api
      |- index.py
    |- vercel.json
    |- requirements.txt
```
`requirements.txt`
:::details
```text
Flask==3.0.3
```
:::

`vercel.json`
:::details
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/api/index" }
  ]
}
```
:::

源码`api/index.py`
:::details
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'About'
```
:::

调试与发布命令
```bash
vercel dev      # 调试
vercel          # 部署
```

## 官方案例
[examples](https://github.com/vercel/examples/tree/main/solutions/express)
