const { DataTypes, Model } = require('sequelize');  // 引入所需的库
const Database = require('./sequelize');            // 导入封装好的类

// 创建一个数据库实例
const db = new Database('databaseHost', databasePort, 'mysql', 'databaseName', 'username', 'password');

// 声明/创建一个表
class Device extends Model { }
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
        console.log(init.status ? '初始化成功！' : ('初始化失败', init.error))
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
        console.log(device.status ? `数据查询成功!\n${device.data}` : ('查询失败: \n', device.error))
        // 关闭数据库
        var close = await db.closeConnection();
        console.log(close.status ? '数据库连接关闭成功！' : ('数据库关闭失败', close.error))
    }
    // 连接失败
    else console.log('数据库连接失败：', result.error);
}

main()