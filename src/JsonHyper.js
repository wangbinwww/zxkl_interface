'use strict';

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle - school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
var s = JSON.stringify(xiaoming, null, ' ');
console.log(s);
var s2 = JSON.stringify(xiaoming, ['name', 'skills'], '  ');
console.log(s2);

var qtt = {}; //定义消息（可以为字符串、对象等）
qtt.temp = 25.7 + Math.random() * 5;
qtt.humi = 89.1 + Math.random() * 10;
qtt.count = 0;
qtt.count1 = 10;
setInterval(function () { //定时器
    qtt.count++;
    qtt.temp = (25.7 + Math.random() * 5).toFixed(2);
    qtt.humi = (89.1 + Math.random() * 10).toFixed(2); //2位小数
    console.log(JSON.stringify(qtt, null, ' '));
}, 5000);
setInterval(function () { //定时器
    qtt.count1++;

}, 5000);