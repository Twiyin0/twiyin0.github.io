---
title: npm,yarn更换缓存位置
date: 2022-03-10
collapsable: true
cover: https://upyun.twiyin0.cn/2022/ae93272468190.jpg
tags:
 - node
categories: 
 - node
---

# npm更换缓存位置

npm给了我们配置的方法，可以通过命令行的方式
```sh
npm config set prefix "位置路径"
npm config set cache "位置路径"
```

修改了路径，环境变量却还没配置，所以在实际使用npm安装的包时，系统会找不到可执行程序<br>
如果需要可以将新的位置加入环境变量中

# yarn更换缓存位置

npm给了我们配置的方法，可以通过命令行的方式
```sh
yarn config set cache-folder "你的磁盘路径"     # 更换缓存路径
yarn config  set global-folder "你的磁盘路径"   # 更换全局安装路径
```

检查当前yarn 的 bin的 位置
```
yarn global bin

```
检查当前 yarn 的 全局安装位置
```
yarn global dir
```
