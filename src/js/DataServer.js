// json-server --watch --port 18080 ./src/assets/db.json
// pm2 start server.js --name app
// json-server --watch -c jserver.json db.json

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('../assets/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(18080, () => {
    console.log('ICONICS data  Server is running')
})