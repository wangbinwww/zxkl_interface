//三山
//必备组件
//cnpm install express --save
//cnpm install -g json-server http-server nodemon pkg typescript pm2  log4js axios

// server.js

const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.resolve(__dirname, '../src/db3001.json'));
const middlewares = jsonServer.defaults({
    watch: true,
    delay: 50,
    static: path.resolve(__dirname, '../src/static/'),
    //quiet: true,
});
server.use(middlewares);
server.use(router);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

server.listen(3001, () => {
    console.log('JSON Server is running at http://127.0.0.1:3001')
})

//const path = require('path');
const log4js = require("log4js");
const axiosGetToken = require("axios");
const axiosGetData = require("axios");
log4js.configure({
    appenders: {
        everything: {
            type: "dateFile",
            filename: path.resolve(__dirname, '../logs/log'),
            //pattern: 'yyyy-MM-dd hh-mm.log'
            pattern: "yyyy-MM-dd hh.log"
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
//0自测,1 部署
var TestCode = 1;
var TokenID = 1;
var TokenValue = '';

if (TestCode == 0) {
    var configMethod = 'get'
    var configUrl = 'http://127.0.0.1:3000/token/'
    var configParams = {
        id: 1
    }
    var configData = {}
    var url3001 = 'http://127.0.0.1:3001/token/1';

} else {
    var configMethod = 'post'
    var configUrl = 'http://192.168.55.210:8093/openapi/v2/sm/login'
    var configParams = {}
    var configData = {
        "username": "admin",
        "pswd": "Claa2017"
    }
    var url3001 = 'http://127.0.0.1:3001/token/1';
}

GetToken(TokenID);

setInterval(function () { //定时器
    GetToken(TokenID);
}, 3600 * 1000);

setInterval(function () { //定时器
    for (let i = 0; i < DeveID.length; i++) {
        GetData(i);
    }
    //GetData(87)
    //console.log("当前 token:" + TokenValue)
}, 60 * 1000);

function GetToken() {

    let config = {
        method: configMethod,
        timeout: 5000,
        url: configUrl,
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        //get 方式释放params
        params: configParams,
        //post方式释放 data
        data: configData,
    }

    axiosGetToken(config).then(function (response) {
            //TokenValue = response.data[0].data.token;
            TokenValue = response.data.data.token;
            logger.debug("Post GetToken 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Post GetToken 数据返回:' + RecvToken);
            axiosGetToken.patch(url3001,
                response.data, {
                    timeout: 5000,
                }).then(function (response) {
                logger.debug("GetToken Patch数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvTokenLog = JSON.stringify(response.data, null, ' ');
                console.log('GetToken Patch数据存储成功:' + RecvTokenLog);
            })
        })
        .catch(function (error) {

            logger.debug(JSON.stringify("Post GetToken 错误 Error:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('Post GetToken 错误 Error:' + RecvToken);
        });
}

function GetData(p1) {
    let config = {
        method: 'get',
        timeout: 5000,
        url: 'http://192.168.55.210:8093/openapi/v2/data/latestdevdata',
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        //get 方式释放params
        params: {
            deveuis: DeveID[p1].DevCode,
            token: TokenValue,
        },
    }

    axiosGetData(config).then(function (response) {
            logger.debug("Get Data 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Get Data  数据返回:' + RecvToken);
            var DevID = DeveID[p1].id
            let Devurl = 'http://localhost:3001/Deveuis/' + DevID
            axiosGetData.patch(Devurl,
                response.data, {
                    timeout: 5000,
                }).then(function (response) {
                logger.debug("GetData Patch数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvTokenLog = JSON.stringify(response.data, null, ' ');
                console.log('GetData Patch数据存储成功:=' + RecvTokenLog);
            })
        })
        .catch(function (error) {
            logger.debug(JSON.stringify("GetData错误 Error:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('GetData错误 Error' + RecvToken);
        });
}



var DeveID = [{
        "ID": "1",
        "DevCode": "004a77006200031e",
        "DevName": "变配所母排测温PT40",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003",
        "DevState": "开通",
    },
    {
        "ID": "2",
        "DevCode": "004a77006200039b",
        "DevName": "泵房水池液位",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "ID": "3",
        "DevCode": "004a770062000415",
        "DevName": "泵房转换开关",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003",
        "DevState": "开通",
    },
    {
        "ID": "4",
        "DevCode": "004a77006200042a",
        "DevName": "泵房压力表",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "ID": "5",
        "DevCode": "004a77006200042b",
        "DevName": "泵房压力表",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "ID": "6",
        "DevCode": "004a77006200042e",
        "DevName": "泵房压力表",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "ID": "7",
        "DevCode": "004a770073212bda",
        "DevName": "DEV004a770073212bda",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "8",
        "DevCode": "004a770073212bdb",
        "DevName": "DEV004a770073212bdb",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "9",
        "DevCode": "004a770073212bdc",
        "DevName": "DEV004a770073212bdc",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "10",
        "DevCode": "004a770073212bdd",
        "DevName": "DEV004a770073212bdd",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "11",
        "DevCode": "004a770073212bde",
        "DevName": "DEV004a770073212bde",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "12",
        "DevCode": "004a770073212be0",
        "DevName": "DEV004a770073212be0",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "13",
        "DevCode": "004a770073212be1",
        "DevName": "DEV004a770073212be1",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "14",
        "DevCode": "004a770073212be2",
        "DevName": "DEV004a770073212be2",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "15",
        "DevCode": "004a770073212bea",
        "DevName": "DEV004a770073212bea",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "16",
        "DevCode": "004a770073212bef",
        "DevName": "DEV004a770073212bef",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "17",
        "DevCode": "004a770073212bf0",
        "DevName": "DEV004a770073212bf0",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "18",
        "DevCode": "004a770073212bf1",
        "DevName": "DEV004a770073212bf1",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "19",
        "DevCode": "004a770073212bf2",
        "DevName": "DEV004a770073212bf2",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "20",
        "DevCode": "004a770073212bf3",
        "DevName": "DEV004a770073212bf3",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "21",
        "DevCode": "004a770073212bf4",
        "DevName": "DEV004a770073212bf4",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "22",
        "DevCode": "004a770073212bf5",
        "DevName": "DEV004a770073212bf5",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "23",
        "DevCode": "004a770073212bf6",
        "DevName": "DEV004a770073212bf6",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "24",
        "DevCode": "004a770073212bf7",
        "DevName": "DEV004a770073212bf7",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "25",
        "DevCode": "004a770073227fb3",
        "DevName": "DEV004a770073227fb3",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "26",
        "DevCode": "004a770073227fb4",
        "DevName": "DEV004a770073227fb4",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "27",
        "DevCode": "004a770073227fba",
        "DevName": "DEV004a770073227fba",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "28",
        "DevCode": "004a770073227fc8",
        "DevName": "DEV004a770073227fc8",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "29",
        "DevCode": "004a770073227fc9",
        "DevName": "DEV004a770073227fc9",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "30",
        "DevCode": "004a770073227fca",
        "DevName": "DEV004a770073227fca",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "31",
        "DevCode": "004a770073227fcb",
        "DevName": "DEV004a770073227fcb",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "32",
        "DevCode": "004a770073227fcc",
        "DevName": "DEV004a770073227fcc",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "33",
        "DevCode": "004a770073227fcd",
        "DevName": "DEV004a770073227fcd",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "34",
        "DevCode": "004a770073227fce",
        "DevName": "DEV004a770073227fce",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "35",
        "DevCode": "004a770073227fcf",
        "DevName": "DEV004a770073227fcf",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "36",
        "DevCode": "004a770073227fd0",
        "DevName": "DEV004a770073227fd0",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "37",
        "DevCode": "004a770073227fd1",
        "DevName": "DEV004a770073227fd1",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "38",
        "DevCode": "004a770073227fd2",
        "DevName": "DEV004a770073227fd2",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "39",
        "DevCode": "004a770073227fd3",
        "DevName": "DEV004a770073227fd3",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "40",
        "DevCode": "004a770073227fd4",
        "DevName": "DEV004a770073227fd4",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "41",
        "DevCode": "004a770073227fd5",
        "DevName": "DEV004a770073227fd5",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "42",
        "DevCode": "004a770073227fd6",
        "DevName": "DEV004a770073227fd6",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "43",
        "DevCode": "004a770073227fd7",
        "DevName": "DEV004a770073227fd7",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "44",
        "DevCode": "004a770073227fd8",
        "DevName": "DEV004a770073227fd8",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "45",
        "DevCode": "004a770073227fd9",
        "DevName": "DEV004a770073227fd9",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "ID": "46",
        "DevCode": "004a770484000140",
        "DevName": "DEV004a770484000140",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "47",
        "DevCode": "004a770484000155",
        "DevName": "DEV004a770484000155",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "48",
        "DevCode": "004a770484000161",
        "DevName": "DEV004a770484000161",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "49",
        "DevCode": "004a770484000168",
        "DevName": "DEV004a770484000168",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "50",
        "DevCode": "004a77048400016d",
        "DevName": "DEV004a77048400016d",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "51",
        "DevCode": "004a770484000179",
        "DevName": "DEV004a770484000179",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "52",
        "DevCode": "004a77048400017a",
        "DevName": "DEV004a77048400017a",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "53",
        "DevCode": "004a77048400017b",
        "DevName": "DEV004a77048400017b",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "54",
        "DevCode": "004a77048400017c",
        "DevName": "DEV004a77048400017c",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "55",
        "DevCode": "004a77048400017d",
        "DevName": "DEV004a77048400017d",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "56",
        "DevCode": "004a77048400017e",
        "DevName": "DEV004a77048400017e",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "57",
        "DevCode": "004a77048400017f",
        "DevName": "DEV004a77048400017f",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "58",
        "DevCode": "004a770484000180",
        "DevName": "DEV004a770484000180",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "59",
        "DevCode": "004a770484000181",
        "DevName": "DEV004a770484000181",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "60",
        "DevCode": "004a770484000182",
        "DevName": "DEV004a770484000182",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "61",
        "DevCode": "004a770484000185",
        "DevName": "DEV004a770484000185",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "62",
        "DevCode": "004a770484000186",
        "DevName": "DEV004a770484000186",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "63",
        "DevCode": "004a770484000187",
        "DevName": "DEV004a770484000187",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "64",
        "DevCode": "004a770484000194",
        "DevName": "DEV004a770484000194",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "65",
        "DevCode": "004a770484000196",
        "DevName": "DEV004a770484000196",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "66",
        "DevCode": "004a77048400019b",
        "DevName": "DEV004a77048400019b",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "67",
        "DevCode": "004a77048400019c",
        "DevName": "DEV004a77048400019c",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "68",
        "DevCode": "004a77048400019d",
        "DevName": "DEV004a77048400019d",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "69",
        "DevCode": "004a77048400019e",
        "DevName": "DEV004a77048400019e",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "70",
        "DevCode": "004a77048400019f",
        "DevName": "DEV004a77048400019f",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "71",
        "DevCode": "004a7704840001a5",
        "DevName": "DEV004a7704840001a5",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "72",
        "DevCode": "004a7704840001a6",
        "DevName": "DEV004a7704840001a6",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "73",
        "DevCode": "004a7704840001a7",
        "DevName": "DEV004a7704840001a7",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "74",
        "DevCode": "004a7704840001a8",
        "DevName": "DEV004a7704840001a8",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "75",
        "DevCode": "004a7704840001a9",
        "DevName": "DEV004a7704840001a9",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "76",
        "DevCode": "004a7704840001ad",
        "DevName": "B6二区风机B6库二分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6二区风机B6库二分区"
    },
    {
        "ID": "77",
        "DevCode": "004a7704840001b4",
        "DevName": "DEV004a7704840001b4",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "78",
        "DevCode": "004a7704840001b5",
        "DevName": "DEV004a7704840001b5",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "79",
        "DevCode": "004a7704840001b6",
        "DevName": "DEV004a7704840001b6",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "80",
        "DevCode": "004a7704840001b7",
        "DevName": "DEV004a7704840001b7",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "81",
        "DevCode": "004a7704840001b8",
        "DevName": "DEV004a7704840001b8",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "82",
        "DevCode": "004a7704840001b9",
        "DevName": "B7一分区万宁冷库B7库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区万宁冷库B7库一分区"
    },
    {
        "ID": "83",
        "DevCode": "004a7704840001ba",
        "DevName": "B7一分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区动力表B7库低压房"
    },
    {
        "ID": "84",
        "DevCode": "004a7704840001bb",
        "DevName": "B7二分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7二分区动力表B7库低压房"
    },
    {
        "ID": "85",
        "DevCode": "004a7704840001bc",
        "DevName": "B7一分区办公室B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区办公室B7库低压房"
    },
    {
        "ID": "86",
        "DevCode": "004a7704840001bd",
        "DevName": "B7四分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7四分区动力表B7库低压房"
    },
    {
        "ID": "87",
        "DevCode": "004a7704840001be",
        "DevName": "B5库总表低压房P10",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5库总表低压房P10"
    },
    {
        "ID": "88",
        "DevCode": "004a7704840001bf",
        "DevName": "B7库总表低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7库总表低压房P11"
    },
    {
        "ID": "89",
        "DevCode": "004a7704840001c0",
        "DevName": "B5库表B5库低压房2D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5库表B5库低压房2D"
    },
    {
        "ID": "90",
        "DevCode": "004a7704840001c1",
        "DevName": "充电桩低压房P04",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "充电桩低压房P04"
    },
    {
        "ID": "91",
        "DevCode": "004a7704840001c2",
        "DevName": "物业管理用电低压房P12",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "物业管理用电低压房P12"
    },
    {
        "ID": "92",
        "DevCode": "004a7704840001c3",
        "DevName": "DEV004a7704840001c3",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "93",
        "DevCode": "004a7704840001c4",
        "DevName": "DEV004a7704840001c4",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "94",
        "DevCode": "004a7704840001c5",
        "DevName": "DEV004a7704840001c5",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "95",
        "DevCode": "004a7704840001c6",
        "DevName": "DEV004a7704840001c6",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "96",
        "DevCode": "004a7704840001c7",
        "DevName": "DEV004a7704840001c7",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "97",
        "DevCode": "004a7704840001c8",
        "DevName": "B5一区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5一区动力表B5库低压房3D"
    },
    {
        "ID": "98",
        "DevCode": "004a7704840001c9",
        "DevName": "B5二区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5二区动力表B5库低压房3D"
    },
    {
        "ID": "99",
        "DevCode": "004a7704840001ca",
        "DevName": "B5三区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5三区动力表B5库低压房3D"
    },
    {
        "ID": "100",
        "DevCode": "004a7704840001cb",
        "DevName": "B6四区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6四区动力表B6库低压房"
    },
    {
        "ID": "101",
        "DevCode": "004a7704840001cc",
        "DevName": "B7三分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7三分区动力表B7库低压房"
    },
    {
        "ID": "102",
        "DevCode": "004a7704840001cd",
        "DevName": "国药空调机房P04低压房P04",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "国药空调机房P04低压房P04"
    },
    {
        "ID": "103",
        "DevCode": "004a7704840001ce",
        "DevName": "B6库总表低压房P03",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6库总表低压房P03"
    },
    {
        "ID": "104",
        "DevCode": "004a7704840001cf",
        "DevName": "B6四区风机B6库四分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6四区风机B6库四分区"
    },
    {
        "ID": "105",
        "DevCode": "004a7704840001d0",
        "DevName": "B5四区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5四区动力表B5库低压房3D"
    },
    {
        "ID": "106",
        "DevCode": "004a7704840001d1",
        "DevName": "A5库动力(1F.2F)A5库外围",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A5库动力(1F.2F)A5库外围"
    },
    {
        "ID": "107",
        "DevCode": "004a7704840001d7",
        "DevName": "A4.A5路灯箱变房内4033",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4.A5路灯箱变房内4033"
    },
    {
        "ID": "108",
        "DevCode": "004a7704840001d8",
        "DevName": "A5库流水线总表(燕文)箱变房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A5库流水线总表(燕文)箱变房内"
    },
    {
        "ID": "109",
        "DevCode": "004a7704840001d9",
        "DevName": "A4库动力总表A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库动力总表A4库平台"
    },
    {
        "ID": "110",
        "DevCode": "004a7704840001da",
        "DevName": "A4库2F消防风机备用A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库2F消防风机备用A4库平台"
    },
    {
        "ID": "111",
        "DevCode": "004a7704840001db",
        "DevName": "B5四区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5四区风机B5库低压房1D"
    },
    {
        "ID": "112",
        "DevCode": "004a7704840001dc",
        "DevName": "DEV004a7704840001dc",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "113",
        "DevCode": "004a7704840001dd",
        "DevName": "DEV004a7704840001dd",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "114",
        "DevCode": "004a7704840001de",
        "DevName": "DEV004a7704840001de",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "115",
        "DevCode": "004a7704840001df",
        "DevName": "DEV004a7704840001df",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "116",
        "DevCode": "004a7704840001e0",
        "DevName": "DEV004a7704840001e0",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "117",
        "DevCode": "004a7704840001e1",
        "DevName": "B8二区风机库区消防柜XF-2",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8二区风机库区消防柜XF-2"
    },
    {
        "ID": "118",
        "DevCode": "004a7704840001e2",
        "DevName": "B8三区风机库区消防柜XF-3",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8三区风机库区消防柜XF-3"
    },
    {
        "ID": "119",
        "DevCode": "004a7704840001e3",
        "DevName": "B7二分区风机B7库二分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7二分区风机B7库二分区"
    },
    {
        "ID": "120",
        "DevCode": "004a7704840001e4",
        "DevName": "B7一分区风机B7库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区风机B7库一分区"
    },
    {
        "ID": "121",
        "DevCode": "004a7704840001e5",
        "DevName": "B8一区风机库区消防柜XF-1",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8一区风机库区消防柜XF-1"
    },
    {
        "ID": "122",
        "DevCode": "004a7704840001eb",
        "DevName": "B8一区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8一区动力表B8库低压房3D"
    },
    {
        "ID": "123",
        "DevCode": "004a7704840001ec",
        "DevName": "B8二区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8二区动力表B8库低压房3D"
    },
    {
        "ID": "124",
        "DevCode": "004a7704840001ed",
        "DevName": "B8三区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8三区动力表B8库低压房3D"
    },
    {
        "ID": "125",
        "DevCode": "004a7704840001ee",
        "DevName": "A4库2F电梯电梯机房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库2F电梯电梯机房内"
    },
    {
        "ID": "126",
        "DevCode": "004a7704840001ef",
        "DevName": "A5库2F电梯电梯机房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A5库2F电梯电梯机房内"
    },
    {
        "ID": "127",
        "DevCode": "004a7704840001ff",
        "DevName": "A4.A5总表箱变房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4.A5总表箱变房内"
    },
    {
        "ID": "128",
        "DevCode": "004a770484000200",
        "DevName": "B6库配电房B6配电房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6库配电房B6配电房"
    },
    {
        "ID": "129",
        "DevCode": "004a770484000201",
        "DevName": "B6二区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6二区动力表B6库低压房"
    },
    {
        "ID": "130",
        "DevCode": "004a770484000202",
        "DevName": "B6三区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6三区动力表B6库低压房"
    },
    {
        "ID": "131",
        "DevCode": "004a770484000203",
        "DevName": "B6一区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6一区动力表B6库低压房"
    },
    {
        "ID": "132",
        "DevCode": "004a77048400020a",
        "DevName": "DEV004a77048400020a",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "133",
        "DevCode": "004a77048400020e",
        "DevName": "DEV004a77048400020e",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "134",
        "DevCode": "004a77048400020f",
        "DevName": "DEV004a77048400020f",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "135",
        "DevCode": "004a770484000210",
        "DevName": "DEV004a770484000210",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "136",
        "DevCode": "004a770484000211",
        "DevName": "B8库总表低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8库总表低压房P11"
    },
    {
        "ID": "137",
        "DevCode": "004a770484000212",
        "DevName": "消防水泵房低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "消防水泵房低压房P11"
    },
    {
        "ID": "138",
        "DevCode": "004a770484000213",
        "DevName": "A4库1F消防风机备用A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库1F消防风机备用A4库平台"
    },
    {
        "ID": "139",
        "DevCode": "004a770484000214",
        "DevName": "A4库2F消防风机A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库2F消防风机A4库平台"
    },
    {
        "ID": "140",
        "DevCode": "004a770484000215",
        "DevName": "A4库1F消防风机A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库1F消防风机A4库平台"
    },
    {
        "ID": "141",
        "DevCode": "004a770484000216",
        "DevName": "B7三分区风机B7库三分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7三分区风机B7库三分区"
    },
    {
        "ID": "142",
        "DevCode": "004a770484000217",
        "DevName": "B7四分区风机B7库四分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7四分区风机B7库四分区"
    },
    {
        "ID": "143",
        "DevCode": "004a770484000218",
        "DevName": "DEV004a770484000218",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "144",
        "DevCode": "004a770484000219",
        "DevName": "DEV004a770484000219",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "145",
        "DevCode": "004a77048400021a",
        "DevName": "DEV004a77048400021a",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "146",
        "DevCode": "004a77048400021b",
        "DevName": "DEV004a77048400021b",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "147",
        "DevCode": "004a77048400021c",
        "DevName": "DEV004a77048400021c",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "ID": "148",
        "DevCode": "004a77048400021d",
        "DevName": "B6三区风机B6库三分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6三区风机B6库三分区"
    },
    {
        "ID": "149",
        "DevCode": "004a77048400021e",
        "DevName": "B6一区风机B6库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6一区风机B6库一分区"
    },
    {
        "ID": "150",
        "DevCode": "004a77048400021f",
        "DevName": "B5二区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5二区风机B5库低压房1D"
    },
    {
        "ID": "151",
        "DevCode": "004a770484000220",
        "DevName": "B5三区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5三区风机B5库低压房1D"
    },
    {
        "ID": "152",
        "DevCode": "004a770484000221",
        "DevName": "B5一区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5一区风机B5库低压房1D"
    },
]