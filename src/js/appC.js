//app.js

//第一步 建立与数据库链接
//*链接池参数
const Sequelize = require('sequelize');
const mssqlConfig = {
    host: 'localhost', //  接数据库的主机
    port: '1433', //  接数据库的端口
    protocol: 'tcp', //  连接数据库使用的协议
    dialect: 'mssql', //  使用mssql
    pool: {
        max: 5, //  最大连接数量
        min: 0, //  最小连接数量
        acquire: 30000,
        idle: 10000 //  连接空置时间（毫秒），超时后将释放连接
    },
    retry: { //  设置自动查询时的重试标志
        max: 3 //  设置重试次数
    },
    omitNull: false, //  null 是否通过SQL语句查询
    timezone: '+08:00' //  解决时差 - 默认存储时间存在8小时误差
};
//创建链接池
const sequelize = new Sequelize('TestDB', 'sa', 'Icon2019', mssqlConfig);


//第二步 建立模型与表产生映射
//----------------------
//定义project3模型结构
const TableStructure = {
    ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true, //主键
    },
    Name: Sequelize.STRING,
    PassWord: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}
//创建模型(表)
const UserTest = sequelize.define('User', TableStructure, {
    timestamps: false,
    freezeTableName: true, //禁止修改表名字
    ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true, //主键
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PassWord: {
        type: Sequelize.STRING,
        allowNull: false
    },
    freezeTableName: true, //禁止修改表名字
    createdAt: {
        type: Sequelize.DATE,
        createdAt: new Date()
    },
    updatedAt: {
        type: Sequelize.DATE,
        updatedAt: new Date()
    }
});

// 创建新数据(增加新行)
UserTest.create({
        ID: null,
        Name: '李健楠',
        PassWord: '12345678',
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(function (result) {
        // success
        //console.log(result);
        console.log(" UserTest Name:", result.Name);
        //sequelize.close()
    })
    .catch(function (error) {
        // error
        console.log(error);
        //sequelize.close()
    });