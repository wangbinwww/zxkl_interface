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

GetToken()
let RecvToken = '';
console.log("tok=" + RecvToken)

async function GetToken() {

    let config = {
        method: 'get',
        url: 'http://127.0.0.1:3000/token/1',
        timeout: 5000,
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
        },
    }

    axios(config).then(function (response) {
            // console.log("Post Token 数据返回:" + JSON.stringify(response.data, null, ' '));
            // logger.debug("Post Token 数据返回:" + JSON.stringify(response.data, null, ' '));
            RecvToken = JSON.stringify(response.data.data.token, null, ' ');
            console.log('Token=' + RecvToken);
        })
        .catch(function (error) {
            // console.log("Post Token错误:" + JSON.stringify(error, null, ' '));
            // logger.debug(JSON.stringify("Post Token错误:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('error=' + RecvToken);
        });

}