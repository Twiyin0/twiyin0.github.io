---
title: nodejs封装Sequelize库操作mysql数据库实例
date: 2023-09-30
collapsable: true
cover: https://up.iin0.cn/2023/64eb2e763e703.jpg
tags:
 - node
 - sequelize
categories: 
 - node
---

用class封装一下以后可能用得到的数据库操作  
官方文档[Sequelize官方文档(zh-CN)](https://www.sequelize.cn/)

## 安装依赖

安装两个依赖

```sh
yarn add -D sequelize mysql2
```

或者

```sh
npm i sequelize mysql2 --save
```

测试版本: `sequelize@6.33.0 mysql2@3.6.1`

## 封装

:::details 展开查看更多
以下代码全是自己封装的，泛用性不强。

@[code js](./file/sequelize.js)

:::

## 使用示例

@[code js](./file/sequelize2.js)

## api说明

### **initialize()**


初始化，异步函数，返回值为初始化状态和错误信息的对象

```
@return { status: boolean, error?: any }
```

### **checkConnection()**

检查连接，异步函数，返回值为连接状态和错误信息的对象

```
@return { status: boolean, error?: any }
```

### **closeConnection()**

关闭连接，异步函数，返回值为关闭状态和错误信息的对象

```
@return { status: boolean, error?: any }
```

### **insertData(dataTable, insertData)**

插入数据，异步函数，返回一个插入状态和错误信息的对象

```
@param dataTable:模型(表), insertData: 插入的数据对象(与模型内的对象一致)
@return { status: boolean, error?: any }
```

### **updateData(dataTable, condition, newData)**

更新(修改)数据，异步函数，返回一个更新状态和错误信息的对象

```
@param dataTable:模型(表), condition: 主键对象, newData: 修改的数据对象(与模型内的对象一致)
@return { status: boolean, error?: any }
```

### **deleteData(dataTable, condition)**

删除数据，异步函数，返回一个删除状态和错误信息的对象

```
@param dataTable:模型(表), condition: 主键对象
@return { status: boolean, error?: any } 
```

### **getAllData(dataTable)**

获取表内所有数据，异步函数，返回一个查询状态和查询信息的对象数组

```
@param dataTable:模型(表)
@return { status: boolean; data?: any; error?: any; }
```

### **getByCondition(dataTable, condition)**

按条件查询，异步函数，返回一个查询状态和查询信息的对象数组

```
@param dataTable:模型(表), condition: 条件对象
@return { status: boolean; data?: any; error?: any; }
```

## 展望

未来会把这个封装好的玩意儿做在物联网后端项目中，用来做数据存储的接口
