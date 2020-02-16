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
        url: 'http://localhost:3000/Deveuis/?deve=' + DeveID[p1].DevCode,
        headers: { //指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
    }
    axios(config).then(function (response) {
            logger.debug("Get Data 数据返回:" + JSON.stringify(response.data, null, ' '));
            let RecvToken = JSON.stringify(response.data, null, ' ');
            console.log('Get Data  数据返回:' + RecvToken);
            var DevId = DeveID[p1].ID
            let Devurl = 'http://localhost:3001/Deveuis/' + DevId
            axios.patch(Devurl,
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

var DeveID = [{
        "ID": "1",
        "DevCode": "004a77006200031e"
    },
    {
        "ID": "2",
        "DevCode": "004a77006200039b"
    },
    {
        "ID": "3",
        "DevCode": "004a770062000415"
    },
    {
        "ID": "4",
        "DevCode": "004a77006200042a"
    },
    {
        "ID": "5",
        "DevCode": "004a77006200042b"
    },
    {
        "ID": "6",
        "DevCode": "004a77006200042e"
    },
    {
        "ID": "7",
        "DevCode": "004a770073212bda"
    },
    {
        "ID": "8",
        "DevCode": "004a770073212bdb"
    },
    {
        "ID": "9",
        "DevCode": "004a770073212bdc"
    },
    {
        "ID": "10",
        "DevCode": "004a770073212bdd"
    },
    {
        "ID": "11",
        "DevCode": "004a770073212bde"
    },
    {
        "ID": "12",
        "DevCode": "004a770073212be0"
    },
    {
        "ID": "13",
        "DevCode": "004a770073212be1"
    },
    {
        "ID": "14",
        "DevCode": "004a770073212be2"
    },
    {
        "ID": "15",
        "DevCode": "004a770073212bea"
    },
    {
        "ID": "16",
        "DevCode": "004a770073212bef"
    },
    {
        "ID": "17",
        "DevCode": "004a770073212bf0"
    },
    {
        "ID": "18",
        "DevCode": "004a770073212bf1"
    },
    {
        "ID": "19",
        "DevCode": "004a770073212bf2"
    },
    {
        "ID": "20",
        "DevCode": "004a770073212bf3"
    },
    {
        "ID": "21",
        "DevCode": "004a770073212bf4"
    },
    {
        "ID": "22",
        "DevCode": "004a770073212bf5"
    },
    {
        "ID": "23",
        "DevCode": "004a770073212bf6"
    },
    {
        "ID": "24",
        "DevCode": "004a770073212bf7"
    },
    {
        "ID": "25",
        "DevCode": "004a770073227fb3"
    },
    {
        "ID": "26",
        "DevCode": "004a770073227fb4"
    },
    {
        "ID": "27",
        "DevCode": "004a770073227fba"
    },
    {
        "ID": "28",
        "DevCode": "004a770073227fc8"
    },
    {
        "ID": "29",
        "DevCode": "004a770073227fc9"
    },
    {
        "ID": "30",
        "DevCode": "004a770073227fca"
    },
    {
        "ID": "31",
        "DevCode": "004a770073227fcb"
    },
    {
        "ID": "32",
        "DevCode": "004a770073227fcc"
    },
    {
        "ID": "33",
        "DevCode": "004a770073227fcd"
    },
    {
        "ID": "34",
        "DevCode": "004a770073227fce"
    },
    {
        "ID": "35",
        "DevCode": "004a770073227fcf"
    },
    {
        "ID": "36",
        "DevCode": "004a770073227fd0"
    },
    {
        "ID": "37",
        "DevCode": "004a770073227fd1"
    },
    {
        "ID": "38",
        "DevCode": "004a770073227fd2"
    },
    {
        "ID": "39",
        "DevCode": "004a770073227fd3"
    },
    {
        "ID": "40",
        "DevCode": "004a770073227fd4"
    },
    {
        "ID": "41",
        "DevCode": "004a770073227fd5"
    },
    {
        "ID": "42",
        "DevCode": "004a770073227fd6"
    },
    {
        "ID": "43",
        "DevCode": "004a770073227fd7"
    },
    {
        "ID": "44",
        "DevCode": "004a770073227fd8"
    },
    {
        "ID": "45",
        "DevCode": "004a770073227fd9"
    },
    {
        "ID": "46",
        "DevCode": "004a770484000140"
    },
    {
        "ID": "47",
        "DevCode": "004a770484000155"
    },
    {
        "ID": "48",
        "DevCode": "004a770484000161"
    },
    {
        "ID": "49",
        "DevCode": "004a770484000168"
    },
    {
        "ID": "50",
        "DevCode": "004a77048400016d"
    },
    {
        "ID": "51",
        "DevCode": "004a770484000179"
    },
    {
        "ID": "52",
        "DevCode": "004a77048400017a"
    },
    {
        "ID": "53",
        "DevCode": "004a77048400017b"
    },
    {
        "ID": "54",
        "DevCode": "004a77048400017c"
    },
    {
        "ID": "55",
        "DevCode": "004a77048400017d"
    },
    {
        "ID": "56",
        "DevCode": "004a77048400017e"
    },
    {
        "ID": "57",
        "DevCode": "004a77048400017f"
    },
    {
        "ID": "58",
        "DevCode": "004a770484000180"
    },
    {
        "ID": "59",
        "DevCode": "004a770484000181"
    },
    {
        "ID": "60",
        "DevCode": "004a770484000182"
    },
    {
        "ID": "61",
        "DevCode": "004a770484000185"
    },
    {
        "ID": "62",
        "DevCode": "004a770484000186"
    },
    {
        "ID": "63",
        "DevCode": "004a770484000187"
    },
    {
        "ID": "64",
        "DevCode": "004a770484000194"
    },
    {
        "ID": "65",
        "DevCode": "004a770484000196"
    },
    {
        "ID": "66",
        "DevCode": "004a77048400019b"
    },
    {
        "ID": "67",
        "DevCode": "004a77048400019c"
    },
    {
        "ID": "68",
        "DevCode": "004a77048400019d"
    },
    {
        "ID": "69",
        "DevCode": "004a77048400019e"
    },
    {
        "ID": "70",
        "DevCode": "004a77048400019f"
    },
    {
        "ID": "71",
        "DevCode": "004a7704840001a5"
    },
    {
        "ID": "72",
        "DevCode": "004a7704840001a6"
    },
    {
        "ID": "73",
        "DevCode": "004a7704840001a7"
    },
    {
        "ID": "74",
        "DevCode": "004a7704840001a8"
    },
    {
        "ID": "75",
        "DevCode": "004a7704840001a9"
    },
    {
        "ID": "76",
        "DevCode": "004a7704840001ad"
    },
    {
        "ID": "77",
        "DevCode": "004a7704840001b4"
    },
    {
        "ID": "78",
        "DevCode": "004a7704840001b5"
    },
    {
        "ID": "79",
        "DevCode": "004a7704840001b6"
    },
    {
        "ID": "80",
        "DevCode": "004a7704840001b7"
    },
    {
        "ID": "81",
        "DevCode": "004a7704840001b8"
    },
    {
        "ID": "82",
        "DevCode": "004a7704840001b9"
    },
    {
        "ID": "83",
        "DevCode": "004a7704840001ba"
    },
    {
        "ID": "84",
        "DevCode": "004a7704840001bb"
    },
    {
        "ID": "85",
        "DevCode": "004a7704840001bc"
    },
    {
        "ID": "86",
        "DevCode": "004a7704840001bd"
    },
    {
        "ID": "87",
        "DevCode": "004a7704840001be"
    },
    {
        "ID": "88",
        "DevCode": "004a7704840001bf"
    },
    {
        "ID": "89",
        "DevCode": "004a7704840001c0"
    },
    {
        "ID": "90",
        "DevCode": "004a7704840001c1"
    },
    {
        "ID": "91",
        "DevCode": "004a7704840001c2"
    },
    {
        "ID": "92",
        "DevCode": "004a7704840001c3"
    },
    {
        "ID": "93",
        "DevCode": "004a7704840001c4"
    },
    {
        "ID": "94",
        "DevCode": "004a7704840001c5"
    },
    {
        "ID": "95",
        "DevCode": "004a7704840001c6"
    },
    {
        "ID": "96",
        "DevCode": "004a7704840001c7"
    },
    {
        "ID": "97",
        "DevCode": "004a7704840001c8"
    },
    {
        "ID": "98",
        "DevCode": "004a7704840001c9"
    },
    {
        "ID": "99",
        "DevCode": "004a7704840001ca"
    },
    {
        "ID": "100",
        "DevCode": "004a7704840001cb"
    },
    {
        "ID": "101",
        "DevCode": "004a7704840001cc"
    },
    {
        "ID": "102",
        "DevCode": "004a7704840001cd"
    },
    {
        "ID": "103",
        "DevCode": "004a7704840001ce"
    },
    {
        "ID": "104",
        "DevCode": "004a7704840001cf"
    },
    {
        "ID": "105",
        "DevCode": "004a7704840001d0"
    },
    {
        "ID": "106",
        "DevCode": "004a7704840001d1"
    },
    {
        "ID": "107",
        "DevCode": "004a7704840001d7"
    },
    {
        "ID": "108",
        "DevCode": "004a7704840001d8"
    },
    {
        "ID": "109",
        "DevCode": "004a7704840001d9"
    },
    {
        "ID": "110",
        "DevCode": "004a7704840001da"
    },
    {
        "ID": "111",
        "DevCode": "004a7704840001db"
    },
    {
        "ID": "112",
        "DevCode": "004a7704840001dc"
    },
    {
        "ID": "113",
        "DevCode": "004a7704840001dd"
    },
    {
        "ID": "114",
        "DevCode": "004a7704840001de"
    },
    {
        "ID": "115",
        "DevCode": "004a7704840001df"
    },
    {
        "ID": "116",
        "DevCode": "004a7704840001e0"
    },
    {
        "ID": "117",
        "DevCode": "004a7704840001e1"
    },
    {
        "ID": "118",
        "DevCode": "004a7704840001e2"
    },
    {
        "ID": "119",
        "DevCode": "004a7704840001e3"
    },
    {
        "ID": "120",
        "DevCode": "004a7704840001e4"
    },
    {
        "ID": "121",
        "DevCode": "004a7704840001e5"
    },
    {
        "ID": "122",
        "DevCode": "004a7704840001eb"
    },
    {
        "ID": "123",
        "DevCode": "004a7704840001ec"
    },
    {
        "ID": "124",
        "DevCode": "004a7704840001ed"
    },
    {
        "ID": "125",
        "DevCode": "004a7704840001ee"
    },
    {
        "ID": "126",
        "DevCode": "004a7704840001ef"
    },
    {
        "ID": "127",
        "DevCode": "004a7704840001ff"
    },
    {
        "ID": "128",
        "DevCode": "004a770484000200"
    },
    {
        "ID": "129",
        "DevCode": "004a770484000201"
    },
    {
        "ID": "130",
        "DevCode": "004a770484000202"
    },
    {
        "ID": "131",
        "DevCode": "004a770484000203"
    },
    {
        "ID": "132",
        "DevCode": "004a77048400020a"
    },
    {
        "ID": "133",
        "DevCode": "004a77048400020e"
    },
    {
        "ID": "134",
        "DevCode": "004a77048400020f"
    },
    {
        "ID": "135",
        "DevCode": "004a770484000210"
    },
    {
        "ID": "136",
        "DevCode": "004a770484000211"
    },
    {
        "ID": "137",
        "DevCode": "004a770484000212"
    },
    {
        "ID": "138",
        "DevCode": "004a770484000213"
    },
    {
        "ID": "139",
        "DevCode": "004a770484000214"
    },
    {
        "ID": "140",
        "DevCode": "004a770484000215"
    },
    {
        "ID": "141",
        "DevCode": "004a770484000216"
    },
    {
        "ID": "142",
        "DevCode": "004a770484000217"
    },
    {
        "ID": "143",
        "DevCode": "004a770484000218"
    },
    {
        "ID": "144",
        "DevCode": "004a770484000219"
    },
    {
        "ID": "145",
        "DevCode": "004a77048400021a"
    },
    {
        "ID": "146",
        "DevCode": "004a77048400021b"
    },
    {
        "ID": "147",
        "DevCode": "004a77048400021c"
    },
    {
        "ID": "148",
        "DevCode": "004a77048400021d"
    },
    {
        "ID": "149",
        "DevCode": "004a77048400021e"
    },
    {
        "ID": "150",
        "DevCode": "004a77048400021f"
    },
    {
        "ID": "151",
        "DevCode": "004a770484000220"
    },
    {
        "ID": "152",
        "DevCode": "004a770484000221"
    },
]