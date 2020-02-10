const path = require('path');
const log4js = require("log4js");
const axios = require("axios");
log4js.configure({
    appenders: {
        everything: {
            type: "dateFile",
            filename: path.resolve(__dirname, '../logs/log'),
            //pattern: 'yyyy-MM-dd hh-mm.log'
            pattern: "yyyy-MM-dd.log"
        }
    },
    categories: {
        default: {
            appenders: ["everything"],
            level: "debug"
        }
    }
});
const logger = log4js.getLogger("everything");
logger.debug("设备上线 ON Line!");
console.log("设备上线 ON Line!");
var qtt = {}; //定义消息（可以为字符串、对象等）

//一般用法--------------------------------------------------
axios.get('http://localhost:3000/WaterMeter', {
        params: {
            id: 1,
            token: ""
        }
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error.response.status);
    });
axios.post('http://localhost:3000/WaterMeter', {
        name: "post",
        token: "abc"
    })
    .then(function (response) {
        console.log(response.data)
        //logger.debug("接收到数据:" + response.data);
    })
    .catch(function (error) {
        console.log(error);
    });


//并发请求--------------------------------------------------
function firstResquest() {
    return axios.get('http://localhost:3000/WaterMeter', {
            params: {
                id: 1,
                token: ""
            }
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response.status);
        });
}

function secondResquest() {
    return axios.get('http://localhost:3000/WaterMeter', {
            params: {
                id: 2,
                token: ""
            }
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response.status);
        });
}
axios.all([firstResquest(), secondResquest()])
    .then(axios.spread(function (first, second) {
        console.log('两个请求都执行完成')
    }));

//参数方式请求--------------------------------------------------
var config = {
    method: 'get',
    url: 'http://localhost:3000/WaterMeter',
    params: {
        id: 1,
    },
    headers: { //指定响应头
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json"
    }
}
axios(config).then(function (response) {

        console.log(JSON.stringify(response.data, null, ' '));
        logger.debug(JSON.stringify(response.data, null, ' '));
    })
    .catch(function (error) {
        console.log(error.response.status);
    });

var config = {
    method: 'get',
    url: 'http://localhost:3000/WaterMeter',
    params: {
        id: 2
    },
    timeout: 5000,
    headers: { //指定响应头
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json"
    },
    auth: {
        username: 'janedoe',
        password: 's00pers3cret'
    },
    responseType: 'json',
    responseEncoding: 'utf8',
}
axios(config).then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error.response.status);
    });


var config = {
    method: 'post',
    url: 'http://localhost:3000/WaterMeter',
    data: { //传递的参数
        name: "kill",
        token: "7788aabb"
    },
    timeout: 5000,
    headers: { //指定响应头
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json"
    },
    auth: {
        username: 'janedoe',
        password: 's00pers3cret'
    },
    responseType: 'json',
}
axios(config).then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error.response.status);
    });;

var config = {
    method: 'get',
    url: 'http://localhost:3000/WaterMeter',
    params: {
        //id: 1,
    },
    headers: { //指定响应头
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json"
    }
}
axios(config).then(function (response) {
        console.log(response.data[0].Alarm.LastAlarmState);
        console.log(response.data[0].Alarm);
        console.log(response.data[0].DataCollect);
        console.log(response.data[0]);
        console.log(response.data);
        console.log(response);
        console.log(response.data.length);
        //console.log(JSON.stringify(response.data, null, ' '));
        //logger.debug(JSON.stringify(response.data, null, ' '));
    })
    .catch(function (error) {
        console.log(error.response.status);
    });
/*
qtt.temp = 25.7 + Math.random() * 5;
qtt.humi = 89.1 + Math.random() * 10;
qtt.count = 0;
setInterval(function () { //定时器
    qtt.count++;
    qtt.temp = (25.7 + Math.random() * 5).toFixed(2);
    qtt.humi = (89.1 + Math.random() * 10).toFixed(2); //2位小数
    console.log(JSON.stringify(qtt, null, ' '));
}, 5000);
*/