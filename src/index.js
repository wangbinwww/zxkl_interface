'use strict'
//三山
//必备组件
//cnpm install express --save
//cnpm install -g json-server http-server nodemon pkg typescript pm2  log4js axios

// server.js


var DeveID = [{
        "id": "1",
        "DevCode": "004a770073212bda",
        "DevName": "B8三区库区DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "2",
        "DevCode": "004a770073212bdc",
        "DevName": "B5三分区库区DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "3",
        "DevCode": "004a770073212bdd",
        "DevName": "B8一区库区DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "4",
        "DevCode": "004a770073212bde",
        "DevName": "B8二区库区DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "5",
        "DevCode": "004a770073212be0",
        "DevName": "B7维修区水表DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "6",
        "DevCode": "004a770073212be1",
        "DevName": "B5一分区库区DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "7",
        "DevCode": "004a770073212bea",
        "DevName": "B6四分区库区DN15",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "8",
        "DevCode": "004a770073212bf0",
        "DevName": "A4库2F办公室水表二楼洗手盆下DN25",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "9",
        "DevCode": "004a770073212bf4",
        "DevName": "A5库1F库内水表一层库内DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "10",
        "DevCode": "004a770073212bf6",
        "DevName": "A4库1F库内水表一层库内DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "11",
        "DevCode": "004a770073212bf7",
        "DevName": "A4库2F夹层水表洗手盆下DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "12",
        "DevCode": "004a770073227fb2",
        "DevName": "A5库2F库内水表一层电梯旁DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "13",
        "DevCode": "004a770073227fb3",
        "DevName": "A4库2F库内水表一层电梯旁DN20",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "14",
        "DevCode": "004a770073227fb4",
        "DevName": "小卖部DN15",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "15",
        "DevCode": "004a770073227fcb",
        "DevName": "B8二区办公区DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "16",
        "DevCode": "004a770073227fcc",
        "DevName": "B5四分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "17",
        "DevCode": "004a770073227fcd",
        "DevName": "A5库大水表(1F2F卫生间及夹层)一楼中梯DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "18",
        "DevCode": "004a770073227fcf",
        "DevName": "B5三分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "19",
        "DevCode": "004a770073227fd1",
        "DevName": "B6二分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "20",
        "DevCode": "004a770073227fd2",
        "DevName": "B5二分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "21",
        "DevCode": "004a770073227fd3",
        "DevName": "B8一区办公区DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "22",
        "DevCode": "004a770073227fd4",
        "DevName": "B6三分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "23",
        "DevCode": "004a770073227fd5",
        "DevName": "A4库大水表(1F2F卫生间及夹层)一楼中梯DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "24",
        "DevCode": "004a770073227fd6",
        "DevName": "B5一分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "25",
        "DevCode": "004a770073227fd7",
        "DevName": "B6四分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "26",
        "DevCode": "004a770073227fd8",
        "DevName": "B6一分区办公室DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "27",
        "DevCode": "004a770073227fd9",
        "DevName": "B8三区办公区DN40",
        "DevType": "智能水表.S.K.V2",
        "DevApp": "2c26c50065001004"
    },
    {
        "id": "28",
        "DevCode": "004a7704840001ad",
        "DevName": "B6二区风机B6库二分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "29",
        "DevCode": "004a7704840001b9",
        "DevName": "B7一分区万宁冷库B7库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "30",
        "DevCode": "004a7704840001ba",
        "DevName": "B7一分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "31",
        "DevCode": "004a7704840001bb",
        "DevName": "B7二分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "32",
        "DevCode": "004a7704840001bc",
        "DevName": "B7一分区办公室B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "33",
        "DevCode": "004a7704840001bd",
        "DevName": "B7四分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "34",
        "DevCode": "004a7704840001be",
        "DevName": "B5库总表低压房P10",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "35",
        "DevCode": "004a7704840001bf",
        "DevName": "B7库总表低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "36",
        "DevCode": "004a7704840001c0",
        "DevName": "B5库表B5库低压房2D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "37",
        "DevCode": "004a7704840001c1",
        "DevName": "充电桩低压房P04",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "38",
        "DevCode": "004a7704840001c2",
        "DevName": "物业管理用电低压房P12",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "39",
        "DevCode": "004a7704840001c8",
        "DevName": "B5一区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "40",
        "DevCode": "004a7704840001c9",
        "DevName": "B5二区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "41",
        "DevCode": "004a7704840001ca",
        "DevName": "B5三区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "42",
        "DevCode": "004a7704840001cb",
        "DevName": "B6四区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "43",
        "DevCode": "004a7704840001cc",
        "DevName": "B7三分区动力表B7库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "44",
        "DevCode": "004a7704840001cd",
        "DevName": "国药空调机房P04低压房P04",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "45",
        "DevCode": "004a7704840001ce",
        "DevName": "B6库总表低压房P03",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "46",
        "DevCode": "004a7704840001cf",
        "DevName": "B6四区风机B6库四分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "47",
        "DevCode": "004a7704840001d0",
        "DevName": "B5四区动力表B5库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "48",
        "DevCode": "004a7704840001d1",
        "DevName": "A5库动力(1F.2F)A5库外围",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "49",
        "DevCode": "004a7704840001d7",
        "DevName": "A4.A5路灯箱变房内4033",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "50",
        "DevCode": "004a7704840001d8",
        "DevName": "A5库流水线总表(燕文)箱变房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "51",
        "DevCode": "004a7704840001d9",
        "DevName": "A4库动力总表A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "52",
        "DevCode": "004a7704840001da",
        "DevName": "A4库2F消防风机备用A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "53",
        "DevCode": "004a7704840001db",
        "DevName": "B5四区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "54",
        "DevCode": "004a7704840001e1",
        "DevName": "B8二区风机库区消防柜XF-2",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "55",
        "DevCode": "004a7704840001e2",
        "DevName": "B8三区风机库区消防柜XF-3",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "56",
        "DevCode": "004a7704840001e3",
        "DevName": "B7二分区风机B7库二分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "57",
        "DevCode": "004a7704840001e4",
        "DevName": "B7一分区风机B7库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "58",
        "DevCode": "004a7704840001e5",
        "DevName": "B8一区风机库区消防柜XF-1",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "59",
        "DevCode": "004a7704840001eb",
        "DevName": "B8一区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "60",
        "DevCode": "004a7704840001ec",
        "DevName": "B8二区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "61",
        "DevCode": "004a7704840001ed",
        "DevName": "B8三区动力表B8库低压房3D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "62",
        "DevCode": "004a7704840001ee",
        "DevName": "A4库2F电梯电梯机房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "63",
        "DevCode": "004a7704840001ef",
        "DevName": "A5库2F电梯电梯机房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "64",
        "DevCode": "004a7704840001ff",
        "DevName": "A4.A5总表箱变房内",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "65",
        "DevCode": "004a770484000201",
        "DevName": "B6二区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "66",
        "DevCode": "004a770484000202",
        "DevName": "B6三区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "67",
        "DevCode": "004a770484000203",
        "DevName": "B6一区动力表B6库低压房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "68",
        "DevCode": "004a77048400020e",
        "DevName": "B6库配电房B6配电房",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "69",
        "DevCode": "004a770484000211",
        "DevName": "B8库总表低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "70",
        "DevCode": "004a770484000212",
        "DevName": "消防水泵房低压房P11",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "71",
        "DevCode": "004a770484000213",
        "DevName": "A4库1F消防风机备用A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "72",
        "DevCode": "004a770484000214",
        "DevName": "A4库2F消防风机A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "73",
        "DevCode": "004a770484000215",
        "DevName": "A4库1F消防风机A4库平台",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "74",
        "DevCode": "004a770484000216",
        "DevName": "B7三分区风机B7库三分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "75",
        "DevCode": "004a770484000217",
        "DevName": "B7四分区风机B7库四分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "76",
        "DevCode": "004a77048400021d",
        "DevName": "B6三区风机B6库三分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "77",
        "DevCode": "004a77048400021e",
        "DevName": "B6一区风机B6库一分区",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "78",
        "DevCode": "004a77048400021f",
        "DevName": "B5二区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "79",
        "DevCode": "004a770484000220",
        "DevName": "B5三区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "80",
        "DevCode": "004a770484000221",
        "DevName": "B5一区风机B5库低压房1D",
        "DevType": "智能电表.C.N",
        "DevApp": "2c26c50065001001"
    },
    {
        "id": "81",
        "DevCode": "0@004a77006200031e",
        "DevName": "GSP小无线测温(PT40 无白名单)",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003"
    },
    {
        "id": "82",
        "DevCode": "0@004a770062000415",
        "DevName": "三山喷淋泵转换开关",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003"
    },
    {
        "id": "83",
        "DevCode": "1@004a77006200024f",
        "DevName": "GSP三相电流不平衡.H.A.H.D",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003"
    },
    {
        "id": "84",
        "DevCode": "1@004a77006200039b",
        "DevName": "GSP液位监测传感器V2（PR10）",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002"
    },
    {
        "id": "85",
        "DevCode": "1@004a770062000415",
        "DevName": "三山消防栓转换开关",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003"
    },
    {
        "id": "86",
        "DevCode": "1@004a77006200042a",
        "DevName": "消火栓",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002"
    },
    {
        "id": "87",
        "DevCode": "1@004a77006200042b",
        "DevName": "喷淋",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002"
    },
    {
        "id": "88",
        "DevCode": "1@004a77006200042e",
        "DevName": "稳压泵",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001002"
    },
    {
        "id": "89",
        "DevCode": "2@004a77006200024f",
        "DevName": "GSP干式变压器温度控制仪（BWDK-S）",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003"
    },
    {
        "id": "90",
        "DevCode": "2@004a770062000415",
        "DevName": "三山稳压泵转换开关",
        "DevType": "克拉GSP/SSP",
        "DevApp": "2c26c50065001003"
    }

]
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
//console.log(DeveID[p1].DevCode)
//const path = require('path');
const log4js = require("log4js");
const axiosGetToken = require("axios");
const axiosGetData = require("axios");
const axiosGetStateData = require("axios");

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
const GetTokentime = 6 * 3600 * 1000 //小时
const GetDatatime = 10 * 60 * 1000//分钟
setInterval(function () { //定时器
    GetToken(TokenID);
}, GetTokentime);


setInterval(function () { //定时器
    for (let i = 0; i < DeveID.length; i++) {
        GetData(i);
    }
    //console.log("当前 token:" + TokenValue)
}, GetDatatime);

function GetToken() {

    let config = {
        method: configMethod,
        timeout: 30 * 1000,
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
            let RecvTokenData = JSON.stringify(response.data, null, ' ');
            console.log('Post GetToken 数据返回:' + RecvTokenData);
            axiosGetToken.patch(url3001,
                response.data, {
                    timeout: 60 * 1000,
                }).then(function (response) {
                logger.debug("GetToken Patch数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvTokenLog = JSON.stringify(response.data, null, ' ');
                console.log('GetToken Patch数据存储成功:' + RecvTokenLog);
            })
        })
        .catch(function (error) {

            logger.debug(JSON.stringify("Post GetToken 错误 Error:" + error, null, ' '));
            let RecvTokenErrorLog = JSON.stringify(error, null, ' ')
            console.log('Post GetToken 错误 Error:' + RecvTokenErrorLog);
        });
}

function GetData(p1) {


    let configState = {
        method: 'get',
        timeout: 30 * 1000,
        url: 'http://192.168.55.210:8093/openapi/v2/data/devstatedata',
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
    axiosGetStateData(configState).then(function (response) {
            logger.debug("Get State Data 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvData = JSON.stringify(response.data, null, ' ');
            console.log('Get State Data  数据返回:' + RecvData);
            var DevID = DeveID[p1].id
            let Devurl = 'http://localhost:3001/Deveuis/' + DevID
            let PatchState = {};
            PatchState = response.data.data[0]
            console.log(PatchState)
            axiosGetStateData.patch(Devurl,
                PatchState, {
                    timeout: 60 * 1000,
                }).then(function (response) {
                logger.debug("Get State Data Patch数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvGetDataDataLog = JSON.stringify(response.data, null, ' ');
                console.log('Get State Data Patch数据存储成功:=' + RecvGetDataDataLog);
            })
        })
        .catch(function (error) {
            logger.debug(JSON.stringify("Get State Data错误 Error:" + error, null, ' '));
            let RecvGetDataErrorLog = JSON.stringify(error, null, ' ')
            console.log('Get State Data错误 Error' + RecvGetDataErrorLog);
        });

    let config = {
        method: 'get',
        timeout: 30 * 1000,
        url: 'http://192.168.55.210:8093/openapi/v2/data/latestdevdata',
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        //get 方式释放params
        params: {
            token: TokenValue,
            deveuis: DeveID[p1].DevCode,

        },
    }

    axiosGetData(config).then(function (response) {
            logger.debug("Get Data 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvData = JSON.stringify(response.data, null, ' ');
            console.log('Get Data  数据返回:' + RecvData);
            var DevID = DeveID[p1].id
            let Devurl = 'http://localhost:3001/Deveuis/' + DevID
            axiosGetData.patch(Devurl,
                response.data, {
                    timeout: 60 * 1000,
                }).then(function (response) {
                logger.debug("GetData Patch数据存储成功:" + JSON.stringify(response.data, null, ' '));
                let RecvGetDataDataLog = JSON.stringify(response.data, null, ' ');
                console.log('GetData Patch数据存储成功:=' + RecvGetDataDataLog);
            })
        })
        .catch(function (error) {
            logger.debug(JSON.stringify("GetData错误 Error:" + error, null, ' '));
            let RecvGetDataErrorLog = JSON.stringify(error, null, ' ')
            console.log('GetData错误 Error' + RecvGetDataErrorLog);
        });


}

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
}