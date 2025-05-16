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

# nodejs封装Sequelize库操作mysql数据库实例

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

测试版本: sequelize@6.33.0 mysql2@3.6.1

## 封装

:::details 展开查看更多
以下代码全是自己封装的，泛用性不强。

```js
const { Sequelize } = require('sequelize');

class Database {
    /**
     * 创建一个新的数据库实例
     * @param {string} host           - 数据库地址
     * @param {string | number} port  - 数据库端口
     * @param {string} type           - 数据库类型 {'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'}
     * @param {string} databaseName   - 数据库名称
     * @param {string} username       - 用户名
     * @param {string} password       - 密码
     */
    constructor(host, port, type, databaseName, username, password) {
        this.sequelize = new Sequelize(databaseName, username, password, {
            host: host,
            port: port,
            dialect: type,
        });
    }

    /**
     * 初始化
     * @returns {Promise<{ status: boolean; error?: any;}>} 返回一个初始化状态和错误信息的对象
     */
    async initialize() {
      try {
        await this.sequelize.sync();
        return { status: true }
      } catch (error) {
        return { status: false, error}
      }
    }

    /**
     * 数据库连接状态
     * @returns {Promise<{status: boolean, error?: Error}>} - 返回一个连接状态和错误信息的对象
     * - { status: 连接状态, error?: 错误信息 }
     */
    async checkConnection() {
      try {
        await this.sequelize.authenticate();
        return { status: true };
      } catch (error) {
        return { status: false, error };
      }
    }

    /**
     * 数据库关闭状态
     * @returns {Promise<{status: boolean, error?: Error}>} - 返回一个关闭状态和错误信息的对象
     */
    async closeConnection() {
      try {
        await this.sequelize.close();
        return { status: true };
      } catch (error) {
        return { status: false, error };
      }
    }

    /**
     * 在一个表中插入数据
     * @param {*} dataTable - 数据表类(class)
     * @param {*} insertData   - 写入的数据对象
     * @returns {Promise<{ status: boolean; error?: any; }} - 返回一个插入状态和错误信息的对象
     */
    async insertData(dataTable, insertData) {
      try {
        await dataTable.create(insertData);
        return { status: true }
      } catch (error) {
        return { status: false, error: error}
      }
    }

    /**
     * 在一个表中插入数据
     * @param {*} dataTable  - 数据表类(class)
     * @param {*} condition  - 主键对象
     * @param {*} newData    - 新数据对象
     * @returns {Promise<{ status: boolean; error?: any; }} - 返回一个更新状态和错误信息的对象
     */
    async updateData(dataTable, condition, newData) {
      try {
        await dataTable.update(newData, { where: condition });
        return { status: true }
      } catch (error) {
        return { status: false, error: error }
      }
    }

    /**
     * 在一个表中插入数据
     * @param {*} dataTable  - 数据表类(class)
     * @param {*} condition  - 主键对象
     * @returns {Promise<{ status: boolean; error?: any; }} - 返回一个删除状态和错误信息的对象数组
     */
    async deleteData(dataTable, condition) {
      try {
        await dataTable.destroy({ where: condition });
          return { status: true }
      } catch (error) {
        return { status: false, error: error }
      }
    }

    /**
     * 查询所有数据
     * @param {*} dataTable  - 数据表类(class)
     * @returns {Promise<{ status: boolean; data?: any; error?: any; }} - 返回一个查询状态和查询信息的对象数组
     */
    async getAllData(dataTable) {
      try {
        const data = await dataTable.findAll();
        return { status: true, data: data.map(data => data.toJSON()) };
      } catch (error) {
        return { status: false, error: error }
      }
    }

    /**
     * 根据条件查询数据
     * @param {*} dataTable  - 数据表类(class)
     * @param {*} condition  - 查询条件对象
     * @returns {Promise<{ status: boolean; data?: any; error?: any; }}
     * - 返回查询状态和查询信息
     */
    async getByCondition(dataTable, condition) {
      try {
        const data = await dataTable.findAll({ where: condition });
        return { status: true, data: data.map(data => data.toJSON()) };
      } catch (error) {
        return { status: false, error: error }
      }
    }
}

module.exports = Database;
```

:::

## 使用示例

```js
const { DataTypes, Model } = require('sequelize');  // 引入所需的库
const Database = require('./sequelize');            // 导入封装好的类

// 创建一个数据库实例
const db = new Database('databaseHost', databasePort, 'mysql', 'databaseName', 'username', 'password');

// 声明/创建一个表
class Device extends Model {}
// 初始化模型(表)
Device.init(
    {
        id: {
            type: DataTypes.INTEGER,    // 表示存储类型喂整型数据
            autoIncrement: true,        // 数据库管理系统会自动为每个新插入的行分配一个唯一的整数值，通常是递增的。这个自动递增的值通常用于作为主键，以确保每行都有一个唯一的标识符。
            primaryKey: true,           // 是否作为主键
        },
        name: {
            type: DataTypes.STRING,     // 表示字符串存储类型
            allowNull: false,           // 是否允许为空
        },
        host: {
            type: DataTypes.STRING,     // 表示字符串存储类型
            allowNull: false,           // 是否允许为空
        },
    },
    {
        sequelize: db.sequelize,        // sequelize实例
        modelName: 'Device',            // 模型(表)名称
        timestamps: false,              // 如果不需要 createdAt 和 updatedAt 列，可以设置为 false
    }
);

// 使用异步函数
async function main() {
    // 检查连接
    const result = await db.checkConnection();
    // 连接成功
    if (result.status) {
        console.log('数据库连接成功！');
        // 数据库初始化
        let init = await db.initialize();
        console.log(init.status? '初始化成功！':('初始化失败',init.error))
        // 往表中插入数据
        // let device = await db.insertData(Device, { id: 3, name: "ADAD", host: "172.12.6.1" })
        // console.log(device.status? '数据写入成功!': ('写入失败: \n',device.error))
        // 往表中更新(修改)数据
        // let device = await db.updateData(Device, {"id": 13251}, { name: "ACDADAD主站", host: "114.514" })
        // console.log(device.status? '数据更新成功!': ('更新失败: \n',device.error))
        // 删除表中数据
        // let device = await db.deleteData(Device, {"id": 13251})
        // console.log(device.status? '数据删除成功!': ('删除失败: \n',device.error))
        // 查询表内所有数据
        // let device = await db.getAllData(Device);
        // console.log(device.status? `数据查询成功!\n${device.data}`: ('查询失败: \n',device.error))
        // 按条件查询表中数据
        let device = await db.getByCondition(Device, { "id": 1 });
        console.log(device.status? `数据查询成功!\n${device.data}`: ('查询失败: \n',device.error))
        // 关闭数据库
        var close = await db.closeConnection();
        console.log(close.status? '数据库连接关闭成功！':('数据库关闭失败',close.error))
    }
    // 连接失败
    else console.log('数据库连接失败：',result.error);
}

main()

```

## api说明

### **initialize()**

初始化，异步函数，返回值为初始化状态和错误信息的对象  
@return { status: boolean, error?: any }  

### **checkConnection()**

检查连接，异步函数，返回值为连接状态和错误信息的对象  
@return { status: boolean, error?: any }  

### **closeConnection()**

关闭连接，异步函数，返回值为关闭状态和错误信息的对象  
@return { status: boolean, error?: any }  

### **insertData(dataTable, insertData)**

插入数据，异步函数，返回一个插入状态和错误信息的对象  
@param dataTable:模型(表), insertData: 插入的数据对象(与模型内的对象一致)  
@return { status: boolean, error?: any }  

### **updateData(dataTable, condition, newData)**

更新(修改)数据，异步函数，返回一个更新状态和错误信息的对象  
@param dataTable:模型(表), condition: 主键对象, newData: 修改的数据对象(与模型内的对象一致)  
@return { status: boolean, error?: any }  

### **deleteData(dataTable, condition)**

删除数据，异步函数，返回一个删除状态和错误信息的对象  
@param dataTable:模型(表), condition: 主键对象  
@return { status: boolean, error?: any }  

### **getAllData(dataTable)**

获取表内所有数据，异步函数，返回一个查询状态和查询信息的对象数组  
@param dataTable:模型(表)  
@return { status: boolean; data?: any; error?: any; }  

### **getByCondition(dataTable, condition)**

按条件查询，异步函数，返回一个查询状态和查询信息的对象数组  
@param dataTable:模型(表), condition: 条件对象  
@return { status: boolean; data?: any; error?: any; }  

## 展望

未来会把这个封装好的玩意儿做在物联网后端项目中，用来做数据存储的接口
