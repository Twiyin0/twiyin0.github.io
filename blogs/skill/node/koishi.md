---
title: 使用go-cqthhp+koishi框架搭建QQ机器人
date: 2021-09-10
cover: https://upyun.twiyin0.cn/2022/a6a483bdc6c4b.jpg
tags:
 - bot
 - QQ机器人
categories:
 - node
---

# 官方文档
官方文档[直连](https://koishi.js.org/)

# 准备工作
#### 需要node.js v12+
1、windows安装：<br>
前往node.js[官网](http://nodejs.cn/)下载Windows 二进制文件 (.zip)并解压<br>
最好解压到自己知道的路径
:::tip
win系统这里需要配置环境变量<br>
我的电脑-属性-高级系统设置-环境变量-系统变量-在PATH后加入npm的路径<br>
比如我的F:\Node;
:::

2、linux安装nodejs v12+:
<br>1、安装github
```sh
yum install git -y # (Centos)
apt install git # (Ubuntu)
```
3、安装node.js管理器等组件
```sh
git clone git://github.com/creationix/nvm.git ~/nvm
# 设置nvm 自动运行
echo "source ~/nvm/nvm.sh" >> ~/.bashrc
source ~/.bashrc
# 查看所有版本(部分环境可能不支持最高版本)
nvm list-remote
# 安装npm的最新版本
nvm install stable
# 使用最新版本
nvm use stable
```
4、选择国内镜像
- 对于国内而言，访问外网是很困难的，这会导致访问速度很慢，而国内镜像就很重要了<br>
node 国内镜像
```sh
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
```
npm 国内镜像
```sh
npm config set registry https://registry.npm.taobao.org
```
npm WIN国内镜像
```sh
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
5、安装yarn
```sh
npm i yarn -g
```

## 下载go-cqhttp
前往github[go-cqhttp](https://github.com/Mrs4s/go-cqhttp)<br>
在'release'处下载最新版本<br>
```sh
tar -zxvf go-cqhttp_linux_arm64.tar.gz
```

## 运行go-cqhttp
进入与go-cqhttp(.exe)相同目录的文件夹<br>
使用终端打开go-cqhttp<br>
windows使用
```sh
.\go-cqhttp.exe
```
Linux使用
```sh
./go-cqhttp
```
:::tip
windows使用shift+右键可以快捷打开powershell终端<br>
Linux可能需要给go-cqhttp运行权限<br>
```sh
chmod +x go-cqhttp
```
:::
启动后需要选择通信方式<br>
推荐选择 `正向 Websocket` 通信<br>
提示有`默认配置文件已生成`即可将终端关掉，去修改配置文件<br>

## 修改config.yml
只需看
```yml
# go-cqhttp 默认配置文件
account: # 账号相关
  uin: 123456 # QQ账号
  password: '' # 密码为空时使用扫码登录
  encrypt: false  # 是否开启密码加密
  status: 0      # 在线状态 请参考 https://docs.go-cqhttp.org/guide/
```
修改uin为自己的小号，password可填可不填<br>
然后再次启动go-cqhttp<br>
之后会看到扫码登录或者扫码验证，用手机扫码一下就能登录进去了<br>
做完这步以后，外卖把它挂在后台，其他都不用管了<br>

## vscode安装及使用
** windows系统 **<br>
推荐使用[VScode](https://code.visualstudio.com/)<br>
官网下载特别慢使用<br>
国内镜像下载[VScode-国内镜像](https://update.code.visualstudio.com/latest/win32-x64-user/stable)<br>
运行vscode<br>
刚开始你的界面是全英文的，需要安装扩展<br>
我们在左侧找到扩展(快捷键ctrl+shift+x)<br>
搜索`Chinese(simplified) Language Pack for Visual Studio Code`<br>
点击install安装<br>
安装完成以后，关闭vscode再使用管理员身份运行vscode<br>
在我们熟悉的位置新建一个文件夹命名随便，最好用英文<br>
然后把新建好的文件夹直接拖进vscode<br>
打开终端(快捷键ctrl+shift+`)<br>
给yarn授权<br>
```
set-ExecutionPolicy RemoteSigned
```
检查授权
```
get-ExecutionPolicy
```
如果输出`RemoteSigned`则修改成功<br>

## 安装koishi
使用yarn安装
```sh
# 安装 koishi
yarn add koishi -D

# 生成配置文件
yarn koishi init

# 补全依赖
yarn
```
:::warning
==注意==<br>
生成配置文件的时候要选择与go-cqhttp一致的OneBot-WebSocket协议<br>
port不需要改bot-qq Number与go-cqhttp的qq号要一致<br>
configurate another bot?时选择 n<br>
Database Type暂时选None<br>
经本人测试，插件assets、eval、webui插件会报错，不能选<br>
github插件可选<br>
package.json was updated. install new dependencies now?<br>
的时候输入y
(无脑回车也行)
:::
至此koishi框架安装完成!<br>

## 修改koishi配置文件
```js
// koishi.config.js
module.exports = {
  // Koishi 服务器监听的端口
  port: 8080,
  onebot: {
    secret: '',
  },
  bots: [{
    type: 'onebot:ws',
    // 对应 cqhttp 配置项 ws_config.port
    server: 'ws://localhost:6700',
    selfId: '123456', // 你的QQ账号
    token: 'ws://localhost:6700',
  }],
  plugins: {        // 插件
  //  assets: {},   // 用不了的插件，删掉或者在前面打上俩斜杆
    chat: {},
    common: {},
  //  eval: {},
  },
}
```
插件只需注意assets、eval、webui插件用不了<br>
如果配置文件有，将其删掉就行<br>

## 启动koishi
在终端输入
```sh
yarn koishi start
```
即可启动koishi机器人<br>
现在可以对你的机器人说话了<br>
向机器人发送
```sh
echo 你好
```
机器人会回复`你好`

## 编写自己的插件并调用
需要一点JavaScript基础<br>
在与`koishi.config.js`同级目录下新建`my-plugin.js`文件<br>
然后在`koishi.config.js`中的`plugins`内加入插件
```js
plugins: {
    'chat': {},
    'common': {},
    './my-plugin': {}, // 这个是我们加入自己的插件
  }
```
在`my-plugin.js`文件内输入以下内容<br>
```js
// 如果机器人收到“天王盖地虎”，就回应“宝塔镇河妖”
module.exports = (ctx) => {
  ctx.middleware((session, next) => {
    if (session.content === '天王盖地虎') {
      session.send('宝塔镇河妖')
    }
    return next()
  })
}
```
在终端重启koishi<br>
选择终端，按下ctrl+c会关闭koishi，再输入
```sh
yarn koishi start
```
回车<br>
重新启动koishi(或者直接按键盘方向键的 上 键)<br>
现在，向机器人发送`天王盖地虎`<br>
机器人会回复`宝塔镇河妖`了<br>
如果你向开发插件，可以看看[官方文档](https://koishi.js.org/guide/message.html)

## 注意
使用koishi框架需要注意的地方
- 1、先启动go-cqhttp再启动koishi框架<br>
不然会导致koishi框架连不上onebot
- 2、go-cqhttp的通信协议必须与koishi的通信协议保持一致<br>
比如gocqhttp为ws协议，koishi就必须用ws协议
- 3、koishi在运行时，go-cqhttp必须在后台运行

## 插件函数调用报错问题
官方文档作者有些地方没写明白<br>
比如在调用消息段`segment()`函数的时候<br>
官方文档里面没有写明需要传入函数<br>
所以需要在插件开头传入函数
```js
const { segment } = require("koishi-utils");
module.exports = (ctx) => {
    ...........
}
```
其他函数报错我暂时还没找到解决办法<br>
比如`Time`未声明<br>
如果有大佬找到解决方法可以在评论区留言，谢谢awa

## 写在最后
文章里可能有很多说错的地方awa,大家可以一一指出<br>
目前我自己也没摸清楚官方文档内的某些函数要怎么用<br>
对于我们初学者而言，很多东西还需要大家一起摸索，讨论，向大佬请教<br>
