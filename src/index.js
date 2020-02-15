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
var tokenkey = '';

setInterval(function () { //定时器

    GetToken();
    GetData();
}, 5000);



//async function GetToken() {}

function GetToken() {

    let config = {
        method: 'get',
        timeout: 5000,
        url: 'http://127.0.0.1:3000/token/1',
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
            console.log("Post Token 数据返回:" + JSON.stringify(response.data, null, ' '));
            logger.debug("Post Token 数据返回:" + JSON.stringify(response.data, null, ' '));
            var RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Token=' + RecvToken);
            axios.patch('http://127.0.0.1:3001/token/1',
                response.data, {
                    timeout: 5000,
                })

        })
        .catch(function (error) {
            // console.log("Post Token错误:" + JSON.stringify(error, null, ' '));
            // logger.debug(JSON.stringify("Post Token错误:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('error=' + RecvToken);
        });

}



function GetData() {

    let config = {
        method: 'get',
        timeout: 5000,
        url: 'http://localhost:3000/Deveuis/1',
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
    }

    axios(config).then(function (response) {
            var RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Data = ' + RecvToken);
            //更新数据
            axios.patch('http://localhost:3001/Deveuis/1',
                response.data, {
                    timeout: 5000,
                }
            )
        })
        .catch(function (error) {
            RecvToken = JSON.stringify(error, null, ' ');
            console.log('Error=' + RecvToken);
            console.log(error.response.status);
        });
}