// var express = require("express");
// var app = express();
// var port = 3000;

// app.get("/:id", function (req, res) {
//     var responseObject = req.params.id;
//     res.send("附带路由为：" + responseObject);
// });

// app.listen(port);

// console.log("Example app listening on port " + port + "!");

'use strict';

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
var s = JSON.stringify(xiaoming, null, ' ');
console.log(s);
var s2 = JSON.stringify(xiaoming, ['name', 'skills'], '  ');
console.log(s2);