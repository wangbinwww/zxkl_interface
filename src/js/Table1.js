// module.exports = function (sequelize, DataTypes) {
//     return sequelize.define("project9999", {
//         name: DataTypes.STRING,
//         description: DataTypes.TEXT
//     })
// }

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

const TableSequelize = {
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
        createdAt: new Date()
    },
    updatedAt: {
        type: Sequelize.DATE,
        updatedAt: new Date()
    }
}

//创建project9999表
module.exports = function (sequelize, DataTypes) {

    return UserTest = sequelize.define('project9999', TableStructure, TableSequelize);
}