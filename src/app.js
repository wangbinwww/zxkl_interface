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

var config = {
    method: 'get',
    url: 'http://localhost:3000/WaterMeter',
    params: {
        //id: 1,
    },
    headers: { //指定响应头
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json"
    }
}
axios(config).then(function (response) {
        console.log(response.data[0].Alarm.LastAlarmState);
        console.log(response.data[0].Alarm);
        console.log(response.data[0].DataCollect);
        console.log(response.data[0]);
        //console.log(response);
        console.log(response.data.length);
        //console.log(JSON.stringify(response.data, null, ' '));
        //logger.debug(JSON.stringify(response.data, null, ' '));
    })
    .catch(function (error) {
        console.log(error.response.status);
    });