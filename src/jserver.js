// json-server --watch --port 18080 ./src/assets/db.json
// pm2 start server.js --name app
// json-server --watch -c jserver.json db.json

// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path');
const router = jsonServer.router(path.resolve(__dirname, '../src/Datas/dbv1.json'))
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
server.listen(13000, () => {
    console.log('JSON Server is running at http://127.0.0.1:13000')
})