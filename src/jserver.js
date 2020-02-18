// json-server --watch --port 18080 ./src/assets/db.json
// pm2 start server.js --name app

//常规启动
// json-server --watch db.json --port 18080 

//自定义路由引用
// json-server db.json --routes routes.json

// 静态资源引入
// json-server db.json --static ./some-other-dir



// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path');
const router = jsonServer.router(path.resolve(__dirname, '../src/db3001.json'))
const middlewares = jsonServer.defaults()
server.use(middlewares);

server.use(router);
//自定义用户校验
/*
server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
})
*/
server.listen(3001, () => {
    console.log('JSON Server is running at http://127.0.0.1:3001')
})