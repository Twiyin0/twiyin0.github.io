---
title: ztncui搭建私有化zerotier服务器
date: 2023-08-07
cover: https://api.zroxp.cn/img/acc?type=webp
tags:
 - ztncui
 - zerotier
 - VPN
categories: 
 - 经验
---  

不想翻别人的教程了，干脆自己写吧
<!-- more -->

# ztncui搭建私有化zerotier服务器
因为zerotier的根节点大多在国外，导致国内用户使用zerotier搭建虚拟专有网络（VPN）延迟特别大  
同时，搭建Moon节点也不稳定，依旧会时常大于280ms  
为了解决延迟太大的问题，在想能不能自己搭建planet节点或者不要planet节点

## ztncui 安装
发现了一个可视化的后台，[ztncui](https://github.com/key-networks/ztncui)  
[ztncui官网](https://key-networks.com/ztncui/)  

## ztncui安装
ztncui是依赖zerotier的，因此你需要先安装zerotier
```bash
curl -s https://install.zerotier.com | sudo bash
```
然后安装ztncui，这里我用0.8.14版本的.deb为例
```bash
curl -O https://s3-us-west-1.amazonaws.com/key-networks/deb/ztncui/1/x86_64/ztncui_0.8.14_amd64.deb && apt install -y ./ztncui_0.8.14_amd64.deb
```
随后开放端口
```bash
ufw allow 3443 # ztncui后端端口
ufw allow 9993 # Moon节点端口
```

## ztncui配置
配置文件目录默认不生成要自己写进去，默认位置`/opt/key-networks/ztncui/.env`
```bash
sudo sh -c "echo ZT_TOKEN=`cat /var/lib/zerotier-one/authtoken.secret` > /opt/key-networks/ztncui/.env"
```
```bash
sudo sh -c "echo ZT_ADDR=127.0.0.1:9993 >> /opt/key-networks/ztncui/.env"
```
```bash
sudo sh -c "echo HTTPS_PORT=3443 >> /opt/key-networks/ztncui/.env"
```
```bash
sudo sh -c "echo NODE_ENV=production >> /opt/key-networks/ztncui/.env"
```
权限管理
```bash
sudo chmod 400 /opt/key-networks/ztncui/.env
```
```bash
sudo chown ztncui:ztncui /opt/key-networks/ztncui/.env
```
重启服务
```bash
sudo systemctl restart ztncui
```

## 编译moons节点
按照以下命令执行
```bash
cd /var/lib/zerotier-one && sudo zerotier-idtool initmoon identity.public > moon.json && nano moon.json
```
然后将公网IP`12.34.56.78/9993`填入`stableEndpoints`
```json
"stableEndpoints": ["公网ip1/9993", "公网ip2/9993"]
```
填完后继续执行
```bash
sudo zerotier-idtool genmoon moon.json && sudo mkdir moons.d && sudo mv ./*.moon ./moons.d && sudo systemctl restart zerotier-one
```
你编译好的moon节点放在了`/var/lib/zerotier-one/moons.d/0000xxxxxx.moon`

## 编译planet节点
可以把moon节点塞进planet节点里面
先把之前的moon.json cp到个人目录，这样好操作
```bash
cd && sudo cp /var/lib/zerotier-one/moon.json .
```
需要用[kaaass/ZeroTierOne/mkmoonworld](https://g.in0.re/github.com/kaaass/ZeroTierOne/releases/download/mkmoonworld-1.0/mkmoonworld-x86)
```bash
wget https://g.in0.re/github.com/kaaass/ZeroTierOne/releases/download/mkmoonworld-1.0/mkmoonworld-x86 && sudo chmod +x mkmoonworld-x86
```
编译plant
```bash
./mkmoonworld-x86 ./moon.json && mv world.bin planet
```
复制到本机zerotier
```bash
sudo rm /var/lib/zerotier-one/planet && sudo cp planet /var/lib/zerotier-one/ && sudo chmod 755 /var/lib/zerotier-one/planet && sudo systemctl restart zerotier-one
```

至此，服务端已经安装完成

## 使用
访问https://你的公网ip:3443  
账号: admin 密码：password  
把moon和planet放到你的客户端

如果你是忠实的Docker用户，你可以参考官网的手册使用Docker安装
