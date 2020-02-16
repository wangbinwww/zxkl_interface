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
var TokenID = '1';



setInterval(function () { //定时器
    //GetToken(TokenID);
    for (let i = 0; i < DeveID.length; i++) {
        //  GetData(i);
    }
    GetData(87)
}, 5000);

//async function GetToken() {}

function GetToken(p1) {

    let config = {
        method: 'get',
        timeout: 5000,
        url: 'http://127.0.0.1:3000/token/' + p1,
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
            logger.debug("Post Token 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Post Token 数据返回:' + RecvToken);
            axios.patch('http://127.0.0.1:3001/token/1',
                response.data, {
                    timeout: 5000,
                }).then(function (response) {
                logger.debug("数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvTokenLog = JSON.stringify(response.data, null, ' ');
                console.log('数据存储成功:=' + RecvTokenLog);
            })
        })
        .catch(function (error) {
            // console.log("Post Token错误:" + JSON.stringify(error, null, ' '));
            // logger.debug(JSON.stringify("Post Token错误:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('Post Token错误 Error=' + RecvToken);
        });

}



function GetData(p1) {

    let config = {
        method: 'get',
        timeout: 5000,
        url: 'http://localhost:3000/Deveuis/?deve=' + DeveID[p1],
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
    }
    axios(config).then(function (response) {
            logger.debug("Get Data 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Get Data  数据返回:' + RecvToken);
            axios.patch('http://localhost:3001/Deveuis/' + '88',
                response.data[0], {
                    timeout: 5000,
                }).then(function (response) {
                logger.debug("数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvTokenLog = JSON.stringify(response.data, null, ' ');
                console.log('数据存储成功:=' + RecvTokenLog);
            })
        })
        .catch(function (error) {
            // console.log("Post Token错误:" + JSON.stringify(error, null, ' '));
            // logger.debug(JSON.stringify("Post Token错误:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('Post Token错误 Error=' + RecvToken);
        });
}

var DeveID = [
    '004a77006200031e',
    '004a77006200039b',
    '004a770062000415',
    '004a77006200042a',
    '004a77006200042b',
    '004a77006200042e',
    '004a770073212bda',
    '004a770073212bdb',
    '004a770073212bdc',
    '004a770073212bdd',
    '004a770073212bde',
    '004a770073212be0',
    '004a770073212be1',
    '004a770073212be2',
    '004a770073212bea',
    '004a770073212bef',
    '004a770073212bf0',
    '004a770073212bf1',
    '004a770073212bf2',
    '004a770073212bf3',
    '004a770073212bf4',
    '004a770073212bf5',
    '004a770073212bf6',
    '004a770073212bf7',
    '004a770073227fb3',
    '004a770073227fb4',
    '004a770073227fba',
    '004a770073227fc8',
    '004a770073227fc9',
    '004a770073227fca',
    '004a770073227fcb',
    '004a770073227fcc',
    '004a770073227fcd',
    '004a770073227fce',
    '004a770073227fcf',
    '004a770073227fd0',
    '004a770073227fd1',
    '004a770073227fd2',
    '004a770073227fd3',
    '004a770073227fd4',
    '004a770073227fd5',
    '004a770073227fd6',
    '004a770073227fd7',
    '004a770073227fd8',
    '004a770073227fd9',
    '004a770484000140',
    '004a770484000155',
    '004a770484000161',
    '004a770484000168',
    '004a77048400016d',
    '004a770484000179',
    '004a77048400017a',
    '004a77048400017b',
    '004a77048400017c',
    '004a77048400017d',
    '004a77048400017e',
    '004a77048400017f',
    '004a770484000180',
    '004a770484000181',
    '004a770484000182',
    '004a770484000185',
    '004a770484000186',
    '004a770484000187',
    '004a770484000194',
    '004a770484000196',
    '004a77048400019b',
    '004a77048400019c',
    '004a77048400019d',
    '004a77048400019e',
    '004a77048400019f',
    '004a7704840001a5',
    '004a7704840001a6',
    '004a7704840001a7',
    '004a7704840001a8',
    '004a7704840001a9',
    '004a7704840001ad',
    '004a7704840001b4',
    '004a7704840001b5',
    '004a7704840001b6',
    '004a7704840001b7',
    '004a7704840001b8',
    '004a7704840001b9',
    '004a7704840001ba',
    '004a7704840001bb',
    '004a7704840001bc',
    '004a7704840001bd',
    '004a7704840001be',
    '004a7704840001bf',
    '004a7704840001c0',
    '004a7704840001c1',
    '004a7704840001c2',
    '004a7704840001c3',
    '004a7704840001c4',
    '004a7704840001c5',
    '004a7704840001c6',
    '004a7704840001c7',
    '004a7704840001c8',
    '004a7704840001c9',
    '004a7704840001ca',
    '004a7704840001cb',
    '004a7704840001cc',
    '004a7704840001cd',
    '004a7704840001ce',
    '004a7704840001cf',
    '004a7704840001d0',
    '004a7704840001d1',
    '004a7704840001d7',
    '004a7704840001d8',
    '004a7704840001d9',
    '004a7704840001da',
    '004a7704840001db',
    '004a7704840001dc',
    '004a7704840001dd',
    '004a7704840001de',
    '004a7704840001df',
    '004a7704840001e0',
    '004a7704840001e1',
    '004a7704840001e2',
    '004a7704840001e3',
    '004a7704840001e4',
    '004a7704840001e5',
    '004a7704840001eb',
    '004a7704840001ec',
    '004a7704840001ed',
    '004a7704840001ee',
    '004a7704840001ef',
    '004a7704840001ff',
    '004a770484000200',
    '004a770484000201',
    '004a770484000202',
    '004a770484000203',
    '004a77048400020a',
    '004a77048400020e',
    '004a77048400020f',
    '004a770484000210',
    '004a770484000211',
    '004a770484000212',
    '004a770484000213',
    '004a770484000214',
    '004a770484000215',
    '004a770484000216',
    '004a770484000217',
    '004a770484000218',
    '004a770484000219',
    '004a77048400021a',
    '004a77048400021b',
    '004a77048400021c',
    '004a77048400021d',
    '004a77048400021e',
    '004a77048400021f',
    '004a770484000220',
    '004a770484000221',
]