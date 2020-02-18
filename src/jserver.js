// json-server --watch --port 18080 ./src/assets/db.json
// pm2 start server.js --name app

//常规启动
// json-server --watch src/db3001.json --port 3001 --static ./src/static

//自定义配置
// json-server --watch -c json-server.json db.json

//自定义路由引用
// json-server db.json --routes routes.json

// 静态资源引入
// json-server db.json --static ./some-other-dir

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

//自定义用户校验
/*
server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
})
server.listen(3000, () => {
    console.log('JSON Server is running')
})
*/

/*
const jsonServer = require('json-server')
const request=require('request')
const base="http://10.100.21.52:8080/Note.do?"
const url1=base+"status=initTop_menu&netAwId=35&wId=18&sort=top"
const url2=base+"1&status=getFoot&wId=18&wsSort=foot&netAwId=35"
const url3=base+"status=slide&wId=18&netAwId=35"
const url4=base+"status=indexlanmu&wId=18&netAwId=35&top=5"
const url5=base+"111&status=linkall&netAwId=35&wId=18"
let obj={}
const server = jsonServer.create()

//多个异步函数串联，完成数据加载
request({url:url1,json:true},(err,resp,data)=>{
    obj.menus=data
    request({url:url2,json:true},(err,resp,data)=>{
        obj.wsNote=data
        request({url:url3,json:true},(err,resp,data)=>{
            obj.wsPicUrl=data
            request({url:url4,json:true},(err,resp,data)=>{
                obj.papers=data;
                request({url:url5,json:true},(err,resp,data)=>{
                    obj.empty=data
                    startServer(3000,obj)
                })
            })
        })

    })
})

//启动 json-server
function startServer(port,db) {
    const router = jsonServer.router(db)
    const middlewares = jsonServer.defaults()
    server.use(middlewares)
    server.use("/api",router)
    server.listen(port, () => {
        console.log('JSON Server is running')
        for (let p in obj){
            console.log("http://localhost:"+port+"/api/"+p)
        }
    })
}
*/