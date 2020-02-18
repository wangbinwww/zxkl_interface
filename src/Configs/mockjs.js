//动态生成模拟数据
//例如启动json-server的命令：json-server --watch app.js 是把一个js文件返回的数据//托管成web服务。
//app.js配合mockjs库可以很方便的进行生成模拟数据。

// 用mockjs模拟生成数据
var Mock = require('mockjs');

module.exports = () => {
    // 使用 Mock
    var data = Mock.mock({
        'course|227': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1000,
            course_name: '@ctitle(5,10)',
            autor: '@cname',
            college: '@ctitle(6)',
            'category_Id|1-6': 1
        }],
        'course_category|6': [{
            "id|+1": 1,
            "pid": -1,
            cName: '@ctitle(4)'
        }]
    });
    // 返回的data会作为json-server的数据
    return data;
};