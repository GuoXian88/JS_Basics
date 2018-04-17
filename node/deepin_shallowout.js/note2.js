/**
 尾触发
 next
 Connect的中间件


 但是人们也发现，在分散代码的同时，也增加了代码的重复性。什么意思呢？比如说，我们在两个类中，可能都需要在每个方法中做日志。按面向对象的设计方法，我们就必须在两个类的方法中都加入日志的内容。也许他们是完全相同的，但就是因为面向对象的设计让类与类之间无法联系，而不能将这些重复的代码统一起来。    也许有人会说，那好办啊，我们可以将这段代码写在一个独立的类独立的方法里，然后再在这两个类中调用。但是，这样一来，这两个类跟我们上面提到的独立的类就有耦合了，它的改变会影响这两个类。那么，有没有什么办法，能让我们在需要的时候，随意地加入代码呢？这种在运行时，动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面的编程
这样看来，AOP其实只是OOP的补充而已。OOP从横向上区分出一个个的类来，而AOP则从纵向上向对象中加入特定的代码。有了AOP，OOP变得立体了。如果加上时间维度，AOP使OOP由原来的二维变为三维了，由平面变成立体了。从技术上来说，AOP基本上是通过代理机制实现的


 */

 var app = connect();
 //Middleware

 app.use(connect.staticCache());
 app.use(connect.static(__dirname+'/public'));
 app.use(connect.cookieParser());
 app.use(connect.session());
 app.use(connect.query());
 app.use(connect.bodyParser());
 app.use(connect.csrf());
 app.listen(3001);


 //easy middleware, stream
//面向切面编程
 function(req, res, next) {

 }


 function createServer() {
     function app(req, res) { app.handle(req,res); }
     utils.merge(app, proto);
     utils.merge(app, EventEmitter.prototype);
     app.route = '/';
     app.stack = []; //middleware queue
     for(var i=0;i<arguments.length;i++){
         app.use(arguments[i]);
     }
     return app;
 }


 app.use = function(route, fn) {
    this.stack.push({ route, handle: fn });
    return this;
 };


 app.listen = function() {
     var server = http.createServer(this);
     return server.listen.apply(server, arguments);
 };

 /*v8中所有js obj都分配在堆上

 新生代对象， 老生代对象

 新生代对象用下面的算法
 新生代对象生命周期短
 Scavenge alg:
 只复制活的对象，生命周期短活的占少数，所以适用这个算法
 缺点是只能利用一半的堆内存
 分From（使用）和To（闲置）两部分
 回收时检查From里面的存活对象，复制到To中，然后非存活的释放，再互换From和To

 老生代对象
 Mark-Sweep & Mark-Compact
 因为老生代死的少，Mark-sweep清除死的，Compact用于处理内存不连续问题


Incremental Marking
降低停顿

作用域：函数作用域， 块， 全局
解引用比delete更好
闭包的产生的中间函数如果被赋值需要手动解引用释放内存

堆外内存Buffer
JavaScript中的key value缓存缺点没有完善的过期策略，严格意义上的缓存有



*/

_.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
        var key = hasher.apply(this, arguments);
        return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
};

var read = fs.createReadStream('in.txt');
var write = fs.createWriteStream('out.txt');
read.pipe(write);

/**
 file 网络io 

 Buffer arraylike object.主要用于操作字节. 0xff(0-255) 8-bit 1-byte

 */


 //
 //tcp

 var net = require('net');
 var server = net.createServer(function(socket) {
    socket.on('data', function(data){
        socket.write('hello');
    });

    socket.on('end', function() {
        console.log('break');
    });

    socket.write('welcome \n');
 });

 server.listen(8124, function() {
     console.log('server bound');
 });

 /**
  UDP 无连接，适用于偶尔丢一两数据包也不产生重大影响的场景
  如音频，视频等，dns是基于它实现的 

  browser是http代理

  HTTP服务与TCP服务区别的地方在于，在开启keepalive后，一个TCP会话可以用于多次请求和响应

  setHeader
  writeHeader

  connection tcp keep-alive
  request
  close
  websocket: 握手和数据传输
  TLS/SSL:
  公钥加密，私钥解密
  传输前互换公钥，client用服务端公钥，server用客户端公钥
  中间人攻击
  数字证书解决CA
  服务端通过私钥给自己颁发签名证书
  client证书预装在浏览器



  */



function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end();
}

//dispatch
function (req, res) {
    switch (req.method) {
        case 'POST':
            update(req, res);
            break;
        //...
        default:
            break;
    }
}


var parseCookie = function(cookie) {
    var cookies = {};
    if(!cookie) {
        return cookies;
    }
    var list = cookie.split(';');
    for(var i=0;i<list.length;i++) {
        var pair = list[i].split('=');
        cookies[pair[0].trim()] = pair[1];
    }
    return cookies;
}



//session
// 1. 基于cookie来实现用户和数据的映射
// 2. 通过查询字符串来实现数据对应
var sessions = {};
var key = 'session_id';
var EXPIRES = 20*60*1000; // 20 minutes

var generate = function() {
    var session = {};

    session.id = (+new Date() + Math.random());
    session.cookie = {
        expire: (+new Date()) + EXPIRES
    };
    sessions[session.id] = session;
    return session;
};

//session不能跨进程共享(node进程间不共享),采用第三方缓存redis, memcache etc.


//XSS
$('#box').html(location.hash.replace('#', ''));

//http://a.com/pathname#<script src="b.com/c.js"></script>
//条件请求If-Modified-Since: Last-Modified. ETag: If-None-Match


function(req, res) {
    if(hasBody(req)) {
        req.on('data', function(chunk) {
            buffers.push(chunk);
        });

        req.on('end', function() {
            req.rawBody = Buffer.concat(buffers).toString();
            handle(req, res);
        });
    } else {
        handle(req, res);
    }
}


/*MVC
C:路由解析，根据url寻找对应控制器的行为
M:行为调用相关的模型，进行数据操作
V:数据操作结束后，调用视图和相关数据进行页面渲染，输出到Client

RESTful：通过url设计资源、请求方法定义资源的操作，通过Accept决定资源的表现形式


middleware:简化和隔离基础设施与业务逻辑之间的细节，让开发者关注业务的开发

*/


app.use('/user/:username', querystring, cookie, session, function(req, res){
    
});

var querystring = function(req, res, next) {
    req.query = url.parse(req.url, true).query;
    next();
};


var cookie = function(req, res, next) {
    var cookie = req.headers.cookie;
    var cookies = {};
    if(cookie) {
        //set cookies
    }

    req.cookies = cookies;
    next();
}

app.use = function(path) {
    var handle = {
        path: pathRegexp(path),

        stack:[].slice.call(arguments, 1)
    };
    routes.all.push(handle);
}

//MIME值, json为application/json ,xml为application/xml


var redirect = function(url) {
    res.setHeader('Location', url);
    res.writeHead(302);
    res.end('Redirect to ' + url);
}

//模板要考虑xss问题


  
/**
 工程化 ： 项目的组织能力
 Makefile
 */

