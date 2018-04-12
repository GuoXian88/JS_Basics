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