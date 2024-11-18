---
title: 简易socket通信并且引入Express
date: 2023-10-01
collapsable: true
cover: https://up.iin0.cn/2023/64eb2e33377b6.jpg
tags:
 - node
 - socket
 - express
categories: 
 - node
---

# 简易socket通信并且引入Express
没错，这个也是我将来做物联网项目后端（乃至前端）用到的一点点思路

## 补全依赖
socket用内置的net就行，只需要补全Express  
* [Express.js文档](https://www.expressjs.com.cn)
yarn或者npm安装Express
```sh
yarn add -D express # npm用: npm install express --save
```
## socket封装
为了方便使用，我把socket封装了一下
:::details
```js
const net = require('net');
const EventEmitter = require('events');

class socketServer extends EventEmitter {
    /**
     * 创建一个新的数据库实例
     * @param {string} host           - socket服务地址
     * @param {string | number} port  - socket服务端口
     * @param {object} options        - 选项  
     * - { orgData: boolean }   使用原始数据(socket数据不转为String类型)
     */
    constructor(host, port, options) {
        super();
        this.host = host;
        this.port = port;
        this.server = null;
        this.clients = [];
        this.options = options;

        // 创建TCP服务器
        this.server = net.createServer((socket) => {
            this.#handleNewClient(socket);
        });

        // 处理服务器关闭事件
        this.server.on('close', () => {
            console.log('Socket server closed!');
        });
    }

    /**
     * 启动socket服务
     */
    async start() {
        this.server.listen(this.port, this.host, () => {
            console.log(`Socket server started! listening in tcp://${this.host}:${this.port}`);
        });
    }

    /**
     * 发送数据给socket客户端
     * @param {*} message - socket实例
     */
    async broadcastMessage(message) {
        this.clients.forEach((socket) => {
            socket.write(message);
        });
    }

    /**
     * 关闭socket服务
     */
    async close() {
        this.server.close();
    }

    /**
     * socket客户端连接处理(私有类型函数)
     * @param {*} socket - socket实例
     */
    #handleNewClient(socket) {
        console.log('Client connected!');

        // 监听客户端数据
        socket.on('data', (data) => {
          const message = (this.options.orgData)? data:data.toString();
          this.emit('message', message); // 发送消息到事件监听器
        });

        // 处理连接关闭事件
        socket.on('end', () => {
          console.log('Client closed!');
        });

        // 处理错误事件
        socket.on('error', (err) => {
          console.error('An error occurred in the connection to the client: ', err);
        });

        this.clients.push(socket);
    }
}

module.exports = socketServer;
```
我把客户端连接做成了私有型函数，这样外部就调用不了，不至于报错。
:::

## 使用示例

以下是我的示例
```js
const socketServer = require('./socket');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// 创建一个socket实例, orgData表示是否接收客户端原始数据
const server = new socketServer('127.0.0.1', 3300, {OrgData: false})
async function socketTest() {
    // 开启socket监听
    server.start();
    // socket接收到数据时处理
    server.on('message', (msg) => {
        // 回馈到所有客户端
        server.broadcastMessage("Hello!")
        // 将数据写入一个文件方便使用
        const fileName = path.join(__dirname, 'data', 'message.txt');
        fs.writeFile(fileName,`[${new Date().toLocaleString()}]${'\t'}${msg}`, (err) => {
            if (err) {
              console.error('写入文件时发生错误：', err);
            } else {
              console.log('消息已写入文件');
            }
          });
        // 打印接收到的数据
        console.log('server has been sent a message: '+msg);
    })
    // 把data/下的文件加到静态文件
    app.use('/data', express.static(path.join(__dirname, 'data')));
    // get请求/send?content=内容则将内容发送到所有客户端
    // 给后面做请求用的
    app.get('/send', (req, res) => {
        const content = req.query.content
        if (content) {
            try {
                server.broadcastMessage(content)
                res.send(`发送>> ${content} <br>发送成功!`);
            } catch (err) {
                res.send('发送失败>> 请检查socket连接')
            }
        }
        else res.send(`{content: undefined}`);
    });
    // Express应用开启监听
    app.listen(3000, '127.0.0.1', () => {
        console.log('Express服务器已启动，监听 http://127.0.0.1:3000');
    });
}
socketTest()
```
上面是我的能用的一个实例。  

## socket api说明
### start()
开启socket监听，异步函数，无参数，无返回值
### broadcastMessage(message)
给所有socket客户端发送数据，异步函数，参数：message是字符串，或是一个对象。无返回值。
### close()
关闭socket服务，异步函数，无返回值。

