//app2.js

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
        idle: 3000 //  连接空置时间（毫秒），超时后将释放连接
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
//定义模型结构
//属性
const TableStructure = {
    //Sequelize 在数据库中期望一个名为 user 的表,其中包含 ID 和 Name 字段. 默认情况下,表名自动复数(在当下使用inflection 库来执行此操作).
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
//参数
const TableSequelize = {
    //Sequelize 还默认为每个模型定义了字段id(主键),createdAt和updatedAt. 当然也可以更改此行为timestamps: false,
    //通过使用 freezeTableName:true 参数可以为特定模型停止此行为
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
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}
//sequelize.define
//方法接收三个参数，第一个参数为表名称，第二个为所需要创建的数据库字段，第三个参数是相关表配置。
const UserTest = sequelize.define('User', TableStructure, TableSequelize)

//测试链接
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//条件查询数据库
UserTest.findAndCountAll({
        where: {
            // Name: "王彬"
        },
        limit: 10,
        offset: 0,
        raw: true,
        attributes: ["ID", "Name", 'PassWord', 'createdAt', 'updatedAt'] //  需要查询出的字段
    })
    .then(function (result) {
        // success
        console.log(result);
        //sequelize.close()
    })
    .catch(function (error) {
        // error
        console.log(error);
        //sequelize.close()
    });
//查询单条数据
UserTest.findOne({
    where: {
        ID: 8
    },
    raw: true,
    attributes: ["id", "Name"]
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})


//将模型与数据库同步
//如果你希望 Sequelize 根据你的模型定义自动创建表(或根据需要进行修改),你可以使用sync方法,如下所示:
// 注意:如果表已经存在,使用`force:true`将删除该表
//1
UserTest.sync()
//2 注意:如果表已经存在,使用`force:true`将删除该表
UserTest.sync({
    force: true
})
//3 一次同步所有模型
sequelize.sync()
//4 注意:如果表已经存在,使用`force:true`将删除该表
UserTest.sync({
    force: true
}).then(() => {
    // 现在数据库中的 `users` 表对应于模型定义
    return UserTest.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});

//更新数据

UserTest.update({
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        where: {
            ID: 1
        }
    }).then(function (result) {
        // success
        console.log(result);
        //sequelize.close()
    })
    .catch(function (error) {
        // error
        console.log(error);
        //sequelize.close()
    });

// 删除 ID = 7 的行
UserTest.destroy({
        where: {
            ID: '7'
        }
    }).then(function (result) {
        // success
        //console.log(result);
        console.log(" UserTest ID:", result.ID);
        //sequelize.close()
    })
    .catch(function (error) {
        // error
        console.log(error);
        //sequelize.close()
    });