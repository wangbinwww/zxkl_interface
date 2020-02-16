//数据源
//json-server --watch src/db3000.json --port 3000 --static ./src/static
//数据库
//json-server --watch src/db3001.json --port 3001 --static ./src/static

const path = require('path');
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
var TokenID = 1;
var TokenValue = '';

GetToken(TokenID);

setInterval(function () { //定时器
    GetToken(TokenID);
}, 3600 * 1000);

setInterval(function () { //定时器
    // 添加响应拦截器
    // axiosGetToken.interceptors.response.use(function (response) {
    //     // 对响应数据做点什么
    //     return response;
    // }, function (error) {
    //     // 对响应错误做点什么
    //     //return Promise.reject(error);
    //     return error
    // });
    // axiosGetData.interceptors.response.use(function (response) {
    //     // 对响应数据做点什么
    //     return response;
    // }, function (error) {
    //     // 对响应错误做点什么
    //     //return Promise.reject(error);
    //     return error
    // });
    // 添加响应拦截器
    // axios.interceptors.response.use(function (response) {
    //     // 对响应数据做点什么
    //     return response.data;
    // }, function (error) {
    //     // 对响应错误做点什么
    //     return Promise.reject(error);
    // });

    for (let i = 1; i < DeveID.length; i++) {
        GetData(i);
    }
    //GetData(87)
    //console.log("当前 token:" + TokenValue)
}, 5000);

//async function GetToken() {}

function GetToken(p1) {

    let config = {
        method: 'get',
        //method: 'post',
        timeout: 5000,

        url: 'http://127.0.0.1:3000/token/',
        //url: 'http://192.168.55.210:8093/openapi/v2/sm/login',

        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },

        //get 方式释放params
        params: {
            id: p1
        },

        //post方式释放 data
        // data: {
        //     username: 'admin',
        //     password: 'Claa2017'
        // },


    }

    axiosGetToken(config).then(function (response) {
            TokenValue = response.data[0].data.token;
            //TokenValue = response.data.data.token;
            logger.debug("Post GetToken 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Post GetToken 数据返回:' + RecvToken);
            let url = 'http://127.0.0.1:3001/token/1';
            //let url = 'http://192.168.55.210:8093/openapi/v2/sm/login';
            axiosGetToken.patch(url,
                response.data[0], {
                    timeout: 5000,
                }).then(function (response) {
                logger.debug("GetToken Patch数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvTokenLog = JSON.stringify(response.data, null, ' ');
                console.log('GetToken Patch数据存储成功:' + RecvTokenLog);
            })
        })
        .catch(function (error) {
            // console.log("Post Token错误:" + JSON.stringify(error, null, ' '));
            logger.debug(JSON.stringify("Post GetToken 错误 Error:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('Post GetToken 错误 Error:' + RecvToken);
        });

}

function GetData(p1) {

    let config = {
        method: 'get',
        timeout: 5000,
        //url: 'http://localhost:3000/Deveuis/?DevCode=' + DeveID[p1].DevCode,
        url: 'http://192.168.55.210:8093/openapi/v2/data/latestdevdata?token=' + TokenValue + '&deveuis=' + DeveID[p1].DevCode,
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
    }

    axiosGetData(config).then(function (response) {
            logger.debug("Get Data 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Get Data  数据返回:' + RecvToken);
            var DevID = DeveID[p1].id
            let Devurl = 'http://localhost:3001/Deveuis/' + DevID
            axiosGetData.patch(Devurl,
                response.data[0], {
                    timeout: 5000,
                }).then(function (response) {
                logger.debug("GetData Patch数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvTokenLog = JSON.stringify(response.data, null, ' ');
                console.log('GetData Patch数据存储成功:=' + RecvTokenLog);
            })
        })
        .catch(function (error) {
            // console.log("Post Token错误:" + JSON.stringify(error, null, ' '));
            logger.debug(JSON.stringify("GetData错误 Error:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('GetData错误 Error' + RecvToken);
        });
}



var DeveID = [{
        "id": "1",
        "DevCode": "004a77006200031e",
        "DevName": "变配所母排测温PT40",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003",
        "DevState": "开通",
    },
    {
        "id": "2",
        "DevCode": "004a77006200039b",
        "DevName": "泵房水池液位",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "id": "3",
        "DevCode": "004a770062000415",
        "DevName": "泵房转换开关",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003",
        "DevState": "开通",
    },
    {
        "id": "4",
        "DevCode": "004a77006200042a",
        "DevName": "泵房压力表",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "id": "5",
        "DevCode": "004a77006200042b",
        "DevName": "泵房压力表",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "id": "6",
        "DevCode": "004a77006200042e",
        "DevName": "泵房压力表",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
    },
    {
        "id": "7",
        "DevCode": "004a770073212bda",
        "DevName": "DEV004a770073212bda",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "8",
        "DevCode": "004a770073212bdb",
        "DevName": "DEV004a770073212bdb",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "9",
        "DevCode": "004a770073212bdc",
        "DevName": "DEV004a770073212bdc",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "10",
        "DevCode": "004a770073212bdd",
        "DevName": "DEV004a770073212bdd",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "11",
        "DevCode": "004a770073212bde",
        "DevName": "DEV004a770073212bde",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "12",
        "DevCode": "004a770073212be0",
        "DevName": "DEV004a770073212be0",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "13",
        "DevCode": "004a770073212be1",
        "DevName": "DEV004a770073212be1",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "14",
        "DevCode": "004a770073212be2",
        "DevName": "DEV004a770073212be2",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "15",
        "DevCode": "004a770073212bea",
        "DevName": "DEV004a770073212bea",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "16",
        "DevCode": "004a770073212bef",
        "DevName": "DEV004a770073212bef",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "17",
        "DevCode": "004a770073212bf0",
        "DevName": "DEV004a770073212bf0",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "18",
        "DevCode": "004a770073212bf1",
        "DevName": "DEV004a770073212bf1",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "19",
        "DevCode": "004a770073212bf2",
        "DevName": "DEV004a770073212bf2",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "20",
        "DevCode": "004a770073212bf3",
        "DevName": "DEV004a770073212bf3",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "21",
        "DevCode": "004a770073212bf4",
        "DevName": "DEV004a770073212bf4",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "22",
        "DevCode": "004a770073212bf5",
        "DevName": "DEV004a770073212bf5",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "23",
        "DevCode": "004a770073212bf6",
        "DevName": "DEV004a770073212bf6",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "24",
        "DevCode": "004a770073212bf7",
        "DevName": "DEV004a770073212bf7",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "25",
        "DevCode": "004a770073227fb3",
        "DevName": "DEV004a770073227fb3",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "26",
        "DevCode": "004a770073227fb4",
        "DevName": "DEV004a770073227fb4",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "27",
        "DevCode": "004a770073227fba",
        "DevName": "DEV004a770073227fba",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "28",
        "DevCode": "004a770073227fc8",
        "DevName": "DEV004a770073227fc8",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "29",
        "DevCode": "004a770073227fc9",
        "DevName": "DEV004a770073227fc9",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "30",
        "DevCode": "004a770073227fca",
        "DevName": "DEV004a770073227fca",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "31",
        "DevCode": "004a770073227fcb",
        "DevName": "DEV004a770073227fcb",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "32",
        "DevCode": "004a770073227fcc",
        "DevName": "DEV004a770073227fcc",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "33",
        "DevCode": "004a770073227fcd",
        "DevName": "DEV004a770073227fcd",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "34",
        "DevCode": "004a770073227fce",
        "DevName": "DEV004a770073227fce",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "35",
        "DevCode": "004a770073227fcf",
        "DevName": "DEV004a770073227fcf",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "36",
        "DevCode": "004a770073227fd0",
        "DevName": "DEV004a770073227fd0",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "37",
        "DevCode": "004a770073227fd1",
        "DevName": "DEV004a770073227fd1",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "38",
        "DevCode": "004a770073227fd2",
        "DevName": "DEV004a770073227fd2",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "39",
        "DevCode": "004a770073227fd3",
        "DevName": "DEV004a770073227fd3",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "40",
        "DevCode": "004a770073227fd4",
        "DevName": "DEV004a770073227fd4",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "41",
        "DevCode": "004a770073227fd5",
        "DevName": "DEV004a770073227fd5",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "42",
        "DevCode": "004a770073227fd6",
        "DevName": "DEV004a770073227fd6",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "43",
        "DevCode": "004a770073227fd7",
        "DevName": "DEV004a770073227fd7",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "44",
        "DevCode": "004a770073227fd8",
        "DevName": "DEV004a770073227fd8",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "45",
        "DevCode": "004a770073227fd9",
        "DevName": "DEV004a770073227fd9",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004",
        "DevState": "开通",
    },
    {
        "id": "46",
        "DevCode": "004a770484000140",
        "DevName": "DEV004a770484000140",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "47",
        "DevCode": "004a770484000155",
        "DevName": "DEV004a770484000155",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "48",
        "DevCode": "004a770484000161",
        "DevName": "DEV004a770484000161",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "49",
        "DevCode": "004a770484000168",
        "DevName": "DEV004a770484000168",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "50",
        "DevCode": "004a77048400016d",
        "DevName": "DEV004a77048400016d",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "51",
        "DevCode": "004a770484000179",
        "DevName": "DEV004a770484000179",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "52",
        "DevCode": "004a77048400017a",
        "DevName": "DEV004a77048400017a",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "53",
        "DevCode": "004a77048400017b",
        "DevName": "DEV004a77048400017b",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "54",
        "DevCode": "004a77048400017c",
        "DevName": "DEV004a77048400017c",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "55",
        "DevCode": "004a77048400017d",
        "DevName": "DEV004a77048400017d",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "56",
        "DevCode": "004a77048400017e",
        "DevName": "DEV004a77048400017e",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "57",
        "DevCode": "004a77048400017f",
        "DevName": "DEV004a77048400017f",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "58",
        "DevCode": "004a770484000180",
        "DevName": "DEV004a770484000180",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "59",
        "DevCode": "004a770484000181",
        "DevName": "DEV004a770484000181",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "60",
        "DevCode": "004a770484000182",
        "DevName": "DEV004a770484000182",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "61",
        "DevCode": "004a770484000185",
        "DevName": "DEV004a770484000185",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "62",
        "DevCode": "004a770484000186",
        "DevName": "DEV004a770484000186",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "63",
        "DevCode": "004a770484000187",
        "DevName": "DEV004a770484000187",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "64",
        "DevCode": "004a770484000194",
        "DevName": "DEV004a770484000194",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "65",
        "DevCode": "004a770484000196",
        "DevName": "DEV004a770484000196",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "66",
        "DevCode": "004a77048400019b",
        "DevName": "DEV004a77048400019b",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "67",
        "DevCode": "004a77048400019c",
        "DevName": "DEV004a77048400019c",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "68",
        "DevCode": "004a77048400019d",
        "DevName": "DEV004a77048400019d",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "69",
        "DevCode": "004a77048400019e",
        "DevName": "DEV004a77048400019e",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "70",
        "DevCode": "004a77048400019f",
        "DevName": "DEV004a77048400019f",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "71",
        "DevCode": "004a7704840001a5",
        "DevName": "DEV004a7704840001a5",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "72",
        "DevCode": "004a7704840001a6",
        "DevName": "DEV004a7704840001a6",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "73",
        "DevCode": "004a7704840001a7",
        "DevName": "DEV004a7704840001a7",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "74",
        "DevCode": "004a7704840001a8",
        "DevName": "DEV004a7704840001a8",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "75",
        "DevCode": "004a7704840001a9",
        "DevName": "DEV004a7704840001a9",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "76",
        "DevCode": "004a7704840001ad",
        "DevName": "B6二区风机B6库二分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6二区风机B6库二分区"
    },
    {
        "id": "77",
        "DevCode": "004a7704840001b4",
        "DevName": "DEV004a7704840001b4",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "78",
        "DevCode": "004a7704840001b5",
        "DevName": "DEV004a7704840001b5",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "79",
        "DevCode": "004a7704840001b6",
        "DevName": "DEV004a7704840001b6",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "80",
        "DevCode": "004a7704840001b7",
        "DevName": "DEV004a7704840001b7",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "81",
        "DevCode": "004a7704840001b8",
        "DevName": "DEV004a7704840001b8",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "82",
        "DevCode": "004a7704840001b9",
        "DevName": "B7一分区万宁冷库B7库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区万宁冷库B7库一分区"
    },
    {
        "id": "83",
        "DevCode": "004a7704840001ba",
        "DevName": "B7一分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区动力表B7库低压房"
    },
    {
        "id": "84",
        "DevCode": "004a7704840001bb",
        "DevName": "B7二分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7二分区动力表B7库低压房"
    },
    {
        "id": "85",
        "DevCode": "004a7704840001bc",
        "DevName": "B7一分区办公室B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区办公室B7库低压房"
    },
    {
        "id": "86",
        "DevCode": "004a7704840001bd",
        "DevName": "B7四分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7四分区动力表B7库低压房"
    },
    {
        "id": "87",
        "DevCode": "004a7704840001be",
        "DevName": "B5库总表低压房P10",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5库总表低压房P10"
    },
    {
        "id": "88",
        "DevCode": "004a7704840001bf",
        "DevName": "B7库总表低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7库总表低压房P11"
    },
    {
        "id": "89",
        "DevCode": "004a7704840001c0",
        "DevName": "B5库表B5库低压房2D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5库表B5库低压房2D"
    },
    {
        "id": "90",
        "DevCode": "004a7704840001c1",
        "DevName": "充电桩低压房P04",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "充电桩低压房P04"
    },
    {
        "id": "91",
        "DevCode": "004a7704840001c2",
        "DevName": "物业管理用电低压房P12",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "物业管理用电低压房P12"
    },
    {
        "id": "92",
        "DevCode": "004a7704840001c3",
        "DevName": "DEV004a7704840001c3",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "93",
        "DevCode": "004a7704840001c4",
        "DevName": "DEV004a7704840001c4",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "94",
        "DevCode": "004a7704840001c5",
        "DevName": "DEV004a7704840001c5",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "95",
        "DevCode": "004a7704840001c6",
        "DevName": "DEV004a7704840001c6",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "96",
        "DevCode": "004a7704840001c7",
        "DevName": "DEV004a7704840001c7",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "97",
        "DevCode": "004a7704840001c8",
        "DevName": "B5一区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5一区动力表B5库低压房3D"
    },
    {
        "id": "98",
        "DevCode": "004a7704840001c9",
        "DevName": "B5二区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5二区动力表B5库低压房3D"
    },
    {
        "id": "99",
        "DevCode": "004a7704840001ca",
        "DevName": "B5三区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5三区动力表B5库低压房3D"
    },
    {
        "id": "100",
        "DevCode": "004a7704840001cb",
        "DevName": "B6四区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6四区动力表B6库低压房"
    },
    {
        "id": "101",
        "DevCode": "004a7704840001cc",
        "DevName": "B7三分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7三分区动力表B7库低压房"
    },
    {
        "id": "102",
        "DevCode": "004a7704840001cd",
        "DevName": "国药空调机房P04低压房P04",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "国药空调机房P04低压房P04"
    },
    {
        "id": "103",
        "DevCode": "004a7704840001ce",
        "DevName": "B6库总表低压房P03",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6库总表低压房P03"
    },
    {
        "id": "104",
        "DevCode": "004a7704840001cf",
        "DevName": "B6四区风机B6库四分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6四区风机B6库四分区"
    },
    {
        "id": "105",
        "DevCode": "004a7704840001d0",
        "DevName": "B5四区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5四区动力表B5库低压房3D"
    },
    {
        "id": "106",
        "DevCode": "004a7704840001d1",
        "DevName": "A5库动力(1F.2F)A5库外围",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A5库动力(1F.2F)A5库外围"
    },
    {
        "id": "107",
        "DevCode": "004a7704840001d7",
        "DevName": "A4.A5路灯箱变房内4033",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4.A5路灯箱变房内4033"
    },
    {
        "id": "108",
        "DevCode": "004a7704840001d8",
        "DevName": "A5库流水线总表(燕文)箱变房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A5库流水线总表(燕文)箱变房内"
    },
    {
        "id": "109",
        "DevCode": "004a7704840001d9",
        "DevName": "A4库动力总表A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库动力总表A4库平台"
    },
    {
        "id": "110",
        "DevCode": "004a7704840001da",
        "DevName": "A4库2F消防风机备用A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库2F消防风机备用A4库平台"
    },
    {
        "id": "111",
        "DevCode": "004a7704840001db",
        "DevName": "B5四区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5四区风机B5库低压房1D"
    },
    {
        "id": "112",
        "DevCode": "004a7704840001dc",
        "DevName": "DEV004a7704840001dc",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "113",
        "DevCode": "004a7704840001dd",
        "DevName": "DEV004a7704840001dd",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "114",
        "DevCode": "004a7704840001de",
        "DevName": "DEV004a7704840001de",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "115",
        "DevCode": "004a7704840001df",
        "DevName": "DEV004a7704840001df",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "116",
        "DevCode": "004a7704840001e0",
        "DevName": "DEV004a7704840001e0",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "117",
        "DevCode": "004a7704840001e1",
        "DevName": "B8二区风机库区消防柜XF-2",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8二区风机库区消防柜XF-2"
    },
    {
        "id": "118",
        "DevCode": "004a7704840001e2",
        "DevName": "B8三区风机库区消防柜XF-3",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8三区风机库区消防柜XF-3"
    },
    {
        "id": "119",
        "DevCode": "004a7704840001e3",
        "DevName": "B7二分区风机B7库二分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7二分区风机B7库二分区"
    },
    {
        "id": "120",
        "DevCode": "004a7704840001e4",
        "DevName": "B7一分区风机B7库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7一分区风机B7库一分区"
    },
    {
        "id": "121",
        "DevCode": "004a7704840001e5",
        "DevName": "B8一区风机库区消防柜XF-1",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8一区风机库区消防柜XF-1"
    },
    {
        "id": "122",
        "DevCode": "004a7704840001eb",
        "DevName": "B8一区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8一区动力表B8库低压房3D"
    },
    {
        "id": "123",
        "DevCode": "004a7704840001ec",
        "DevName": "B8二区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8二区动力表B8库低压房3D"
    },
    {
        "id": "124",
        "DevCode": "004a7704840001ed",
        "DevName": "B8三区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8三区动力表B8库低压房3D"
    },
    {
        "id": "125",
        "DevCode": "004a7704840001ee",
        "DevName": "A4库2F电梯电梯机房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库2F电梯电梯机房内"
    },
    {
        "id": "126",
        "DevCode": "004a7704840001ef",
        "DevName": "A5库2F电梯电梯机房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A5库2F电梯电梯机房内"
    },
    {
        "id": "127",
        "DevCode": "004a7704840001ff",
        "DevName": "A4.A5总表箱变房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4.A5总表箱变房内"
    },
    {
        "id": "128",
        "DevCode": "004a770484000200",
        "DevName": "B6库配电房B6配电房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6库配电房B6配电房"
    },
    {
        "id": "129",
        "DevCode": "004a770484000201",
        "DevName": "B6二区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6二区动力表B6库低压房"
    },
    {
        "id": "130",
        "DevCode": "004a770484000202",
        "DevName": "B6三区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6三区动力表B6库低压房"
    },
    {
        "id": "131",
        "DevCode": "004a770484000203",
        "DevName": "B6一区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6一区动力表B6库低压房"
    },
    {
        "id": "132",
        "DevCode": "004a77048400020a",
        "DevName": "DEV004a77048400020a",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "133",
        "DevCode": "004a77048400020e",
        "DevName": "DEV004a77048400020e",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "134",
        "DevCode": "004a77048400020f",
        "DevName": "DEV004a77048400020f",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "135",
        "DevCode": "004a770484000210",
        "DevName": "DEV004a770484000210",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "136",
        "DevCode": "004a770484000211",
        "DevName": "B8库总表低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B8库总表低压房P11"
    },
    {
        "id": "137",
        "DevCode": "004a770484000212",
        "DevName": "消防水泵房低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "消防水泵房低压房P11"
    },
    {
        "id": "138",
        "DevCode": "004a770484000213",
        "DevName": "A4库1F消防风机备用A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库1F消防风机备用A4库平台"
    },
    {
        "id": "139",
        "DevCode": "004a770484000214",
        "DevName": "A4库2F消防风机A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库2F消防风机A4库平台"
    },
    {
        "id": "140",
        "DevCode": "004a770484000215",
        "DevName": "A4库1F消防风机A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "A4库1F消防风机A4库平台"
    },
    {
        "id": "141",
        "DevCode": "004a770484000216",
        "DevName": "B7三分区风机B7库三分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7三分区风机B7库三分区"
    },
    {
        "id": "142",
        "DevCode": "004a770484000217",
        "DevName": "B7四分区风机B7库四分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B7四分区风机B7库四分区"
    },
    {
        "id": "143",
        "DevCode": "004a770484000218",
        "DevName": "DEV004a770484000218",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "144",
        "DevCode": "004a770484000219",
        "DevName": "DEV004a770484000219",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "145",
        "DevCode": "004a77048400021a",
        "DevName": "DEV004a77048400021a",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "146",
        "DevCode": "004a77048400021b",
        "DevName": "DEV004a77048400021b",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "147",
        "DevCode": "004a77048400021c",
        "DevName": "DEV004a77048400021c",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
    },
    {
        "id": "148",
        "DevCode": "004a77048400021d",
        "DevName": "B6三区风机B6库三分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6三区风机B6库三分区"
    },
    {
        "id": "149",
        "DevCode": "004a77048400021e",
        "DevName": "B6一区风机B6库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B6一区风机B6库一分区"
    },
    {
        "id": "150",
        "DevCode": "004a77048400021f",
        "DevName": "B5二区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5二区风机B5库低压房1D"
    },
    {
        "id": "151",
        "DevCode": "004a770484000220",
        "DevName": "B5三区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5三区风机B5库低压房1D"
    },
    {
        "id": "152",
        "DevCode": "004a770484000221",
        "DevName": "B5一区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "Devlocation": "B5一区风机B5库低压房1D"
    },
]