/*深入浅出nodejs
基于事件驱动的异步架构

*/
fs.readFile('/path', function(err, file){
    //
})

//create server

var http = require('http')
var querystring = require('querystring')

//listen server request
http.createServer(function(req, res){
    var postData = ''
    req.setEncoding('utf8')
    //侦听请求的data事件
    req.on('data', function(trunk){
        postData += trunk
    })
    //侦听请求的end事件
    req.on('end', function(){
        res.end(postData)
    })
}).listen(8080)

/*单线程的缺点
无法利用多核cpu
计算密集型无法调用异步io
错误会导致应用退出，程序健壮性

Node采用了与Web Workers相同的方式解决单线程中计算密集的问题 child_process
Node面向网络，擅长并行io

CH2 模块机制
Node缓存的是编译执行后的对象
文件寻址，类似原型链往上找node_modules,没找到读package.json的main字段
跨平台是通过libuv来实现的　nodejs --> libuv --> windows/linux

http://craftinginterpreters.com/introduction.html
Love this. I think a lot of my success can be attributed to fearlessness when diving into lower levels.







