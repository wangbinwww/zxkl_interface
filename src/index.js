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
console.log("Post Token");

GetToken();



function GetToken() {
    var config = {
        method: 'get',
        url: 'http://127.0.0.1:3000/token/1',
        //url: 'http://192.168.55.210:8093/openapi/v2/sm/login',
        // params: {
        //     "username": "admin",
        //     "pswd": "Claa2017"
        // },
        auth: {
            username: 'admin',
            password: 'Claa2017'
        },
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        }
    }

    axios(config).then(function (response) {
            console.log("Post Token 数据返回:" + JSON.stringify(response.data, null, ' '));
            logger.debug("Post Token 数据返回:" + JSON.stringify(response.data, null, ' '));
            return response.data.data

        })
        .catch(function (error) {
            console.log("Post Token错误:" + error);
            logger.debug(JSON.stringify("Post Token错误:" + error, null, ' '));
            return error
        });
}