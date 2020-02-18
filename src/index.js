1
//数据库
//json-server --watch src/db3001.json --port 3001 --static ./src/static
//必备组件
//cnpm install express --save
//cnpm install -g json-server http-server nodemon pkg typescript pm2  log4js axios
// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path');
const router = jsonServer.router(path.resolve(__dirname, '../src/db3001.json'))
const middlewares = jsonServer.defaults()
server.use(middlewares);
server.use(router);
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

    for (let i = 0; i < DeveID.length; i++) {
        GetData(i);
    }
    //GetData(87)
    //console.log("当前 token:" + TokenValue)
}, 60 * 1000);

//async function GetToken() {}

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
        //url: 'http://localhost:3000/Deveuis/?DevCode=' + DeveID[p1].DevCode,
        //url: 'http://192.168.55.210:8093/openapi/v2/data/latestdevdata?token=' + TokenValue + '&deveuis=' + DeveID[p1].DevCode,
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
            // console.log("Post Token错误:" + JSON.stringify(error, null, ' '));
            logger.debug(JSON.stringify("GetData错误 Error:" + error, null, ' '));
            RecvToken = JSON.stringify(error, null, ' ')
            console.log('GetData错误 Error' + RecvToken);
        });
}



var DeveID = [{
        "id": "1",
        "DevCode": "1@004a770062000281",
        "DevName": "泵房稳压灌压力表",
        "DevType": "克拉GSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
        "DevLocation": "泵房压力表"
    },
    {
        "id": "2",
        "DevCode": "1@004a7700620003a2",
        "DevName": "泵房水池液位",
        "DevType": "克拉GSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
        "DevLocation": "泵房液位"
    },
    {
        "id": "3",
        "DevCode": "1@004a7700620003ba",
        "DevName": "泵房喷淋压力表",
        "DevType": "克拉GSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
        "DevLocation": "泵房压力表"
    },
    {
        "id": "4",
        "DevCode": "1@004a770062000416",
        "DevName": "泵房水泵开关状态",
        "DevType": "克拉GSP",
        "DevApp": "2c26c50065001003",
        "DevState": "开通",
        "DevLocation": "泵房压力表"
    },
    {
        "id": "5",
        "DevCode": "1@004a77006200042d",
        "DevName": "泵房消火栓压力表",
        "DevType": "克拉GSP",
        "DevApp": "2c26c50065001002",
        "DevState": "开通",
        "DevLocation": "泵房压力表"
    },
    {
        "id": "6",
        "DevCode": "004a7704840001a0",
        "DevName": "A5-C区 办公室照明",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-C区 办公室照明"
    },
    {
        "id": "7",
        "DevCode": "004a7704840001a1",
        "DevName": "A5-A区 仓库照明柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-A区 仓库照明柜"
    },
    {
        "id": "8",
        "DevCode": "004a7704840001a2",
        "DevName": "A5-C区 消防应急柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-C区 消防应急柜"
    },
    {
        "id": "9",
        "DevCode": "004a7704840001a3",
        "DevName": "A5-A区 消防应急柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-A区 消防应急柜"
    },
    {
        "id": "10",
        "DevCode": "004a7704840001a4",
        "DevName": "A5-C区 仓库照明柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-C区 仓库照明柜"
    },
    {
        "id": "11",
        "DevCode": "004a7704840001aa",
        "DevName": "A5-A区总电房 仓库照明总柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-A区总电房 仓库照明总柜"
    },
    {
        "id": "12",
        "DevCode": "004a7704840001ac",
        "DevName": "A5-A区总电房 办公室照明总柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-A区总电房 办公室照明总柜"
    },
    {
        "id": "13",
        "DevCode": "004a7704840001ae",
        "DevName": "A5-A区总电房 消防1FAPa",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-A区总电房 消防1FAPa"
    },
    {
        "id": "14",
        "DevCode": "004a7704840001af",
        "DevName": "A5-B区 仓库照明柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-B区 仓库照明柜"
    },
    {
        "id": "15",
        "DevCode": "004a7704840001b0",
        "DevName": "A5-A区总电房 消防1FAPb(备用,无电)",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-A区总电房 消防1FAPb"
    },
    {
        "id": "16",
        "DevCode": "004a7704840001b1",
        "DevName": "A5-B区 消防应急柜",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-B区 消防应急柜"
    },
    {
        "id": "17",
        "DevCode": "004a7704840001b2",
        "DevName": "A5-B区 办公室照明",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-B区 办公室照明"
    },
    {
        "id": "18",
        "DevCode": "004a7704840001b3",
        "DevName": "A5-A区 办公室照明",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001",
        "DevState": "开通",
        "DevLocation": "A5-A区 办公室照明"
    },

]