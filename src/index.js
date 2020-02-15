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
var tokenkey = [];
var a = []



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
        params: {
            ID: 12345
        },
        // auth: {
        //     username: 'admin',
        //     password: 'Claa2017'
        // },
        // data: {
        //     username: 'admin',
        //     password: 'Claa2017'
        // },
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
    }
    // 添加请求拦截器
    // axios.interceptors.request.use(function (config) {
    //     config.withCredentials = true
    //     config.headers = {
    //         "TOKEN": "************"
    //     }
    //     return config;
    // }, function (error) {
    //     return Promise.reject(error);
    // })
    // 添加响应拦截器
    // axios.interceptors.response.use(function (response) {
    //     // 对响应数据做点什么
    //     return response.data;
    // }, function (error) {
    //     // 对响应错误做点什么
    //     return Promise.reject(error);
    // });
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
            console.log('Post Token错误 Error=' + RecvToken);
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
            var RecvData = JSON.stringify(response.data, null, ' ');
            console.log('Data = ' + RecvData);
            //更新数据
            axios.patch('http://localhost:3001/Deveuis/1',
                response.data, {
                    timeout: 5000,
                }
            )
        })
        .catch(function (error) {
            RecvToken = JSON.stringify(error, null, ' ');
            console.log('Post Token错误 Error=' + RecvToken);

        });
}