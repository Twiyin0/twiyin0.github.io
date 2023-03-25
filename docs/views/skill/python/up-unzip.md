---
title: python实现upyun存储解压zip文件
date: 2023-03-24
cover: https://up.iin0.cn/2023/6414951e6419f.jpg
tags:
 - python
 - upyun
categories:
 - python
---

# 使用python发送又拍云云存储的解压
upyun内介绍的有点抽象，可能会看不懂啥的，这里我们用它的demo示例代码来对zip文件进行解压。

## 条件
- * [python](https://www.python.org/)
- * [upyun](https://upyun.com)

## 注意
  > upyun目前仅支持解压zip文件，因此云存储内的指定文件必须是zip格式  
  > [upyun原文档](https://help.upyun.com/knowledge-base/unzip/#e8a7a3e58e8be7bca9efbc88depressefbc89)

## 代码
```python
import base64,hashlib,hmac
import datetime,requests,json

bucket = ''         # 存储服务名称
operator = ''       # 操作员
password = hashlib.md5('PASSWORD'.encode()).hexdigest() # PASSWORD是操作员密码
date = datetime.datetime.utcnow().strftime("%a,%d %b %Y %H:%M:%S GMT")
uri = '/pretreatment'   # 这里的uri不用换
method = 'POST'
strings = method + '&' + uri + '&' + date

def make_tasks():
    p = json.dumps([{"sources":"path/to/file.zip", "save_as":"/depress/path"}]) # path/to/file.zip是存储库内的zip文件 /depress/path是解压后保存的路径
    return base64.b64encode(p.encode()).decode()
tasks = make_tasks()

def hmac_sha1(key, msg):
    h = hmac.new(key.encode(), msg.encode(), digestmod = hashlib.sha1).digest()
    return "UPYUN " + operator + ':' + base64.b64encode(h).decode()

auth = hmac_sha1(password, strings)
headers = {"authorization":auth, "date":date}
data = {"service":bucket, "notify_url":"NOTIFY_URL", "tasks":tasks, "app_name":"depress"}   # 又拍云的解压任务通过POST方法回调给notify_url
url = 'http://p0.api.upyun.com' + uri 
r = requests.post(url,headers=headers, data=data)
print(r.text)
print(r.headers)
print(r.status_code)

```

notify_url 可以再参考[upyun的原文档](https://help.upyun.com/knowledge-base/unzip/#e59b9ee8b083e9809ae79fa5)

## last
该文章写于2023年3月24日，仅供参考.