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
            return { status: false, error }
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
            return { status: false, error: error }
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