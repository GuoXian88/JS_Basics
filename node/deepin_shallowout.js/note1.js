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
文件寻址，类似原型链往上找node_modules,没找到JSON.parse package.json的main字段
跨平台是通过libuv/V8来实现的　nodejs --> libuv --> windows/linux

http://craftinginterpreters.com/introduction.html
Love this. I think a lot of my success can be attributed to fearlessness when diving into lower levels.


module --> package

CommonJS规范
package.json package描述
bin 二进制可执行文件
lib js
doc 文档
test 测试用例


npm install -g 是安装在一个统一的目录下,这个目录如下：
*/
const path = require('path')
path.resolve(process.execPath, '..', '..', 'lib', 'node_modules')
//C:\Program Files\lib\node_modules

// npm config set registry http://registry.url

/*
CommonJS --> AMD:
声明的时候指定所有依赖
define(id?, dependencies?, factory)

define(['dep1', 'dep2'], function(dep1, dep2) {
    return function() {}
})


CommonJS --> CMD:
动态引入模块

define(function(require, exports, module) {
    调用require引入
})


*/







