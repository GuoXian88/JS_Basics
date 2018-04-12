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

async io
分布式io昂贵
多线程的代价在于创建
线程和执行线程上下文切换的开销比较大, 还有业务层面的lock,sync问题
在最初的开发中，为了降低Node端的开发和运营成本，我们极力避免在Node服务中“掺合”过多的业务逻辑。经过几个项目的实践，最后“约定”在Node服务中我们仅仅做三件事：数据代理、路由分发和服务端渲染


技术是基础，应对是层面，人际是手段，站对边最重要

事件循环，观察者，请求对象，io线程池
轮询
epoll/kqueue 休眠-->事件通知,执行回调

*/
//eventloop 生产者消费者模型

while(true) {
    //event
    //怎么判断有事件需要处理? Observer --> EventEmmitter
}

/*
请求对象用于保存中间状态
process.nextTick()属于idle观察者, setImmediate()属于check观察者
idle>io>check

后续传递的程序编写将函数的业务重点从返回值转移到了callback中
事件处理方式是通过高阶函数的特性来完成

*/

var isType = function istype(type) {
    return function (obj) {
        return toString.call(obj) == `[object ${type}]`
    }
}

var isString = isType('String')

_.after = function(times, fn) {
    if(times <= 0) {
        return fn()
    }
    //内部函数返回close掉当时传入的参数times和fn
    return function() {
        if(--times < 1) {
            return fn.apply(this, arguments)
        }
    }
}

//try...catch 不能抓异步错

/*web workers可以有效使用多核cpu
发布订阅模式可用于解耦业务逻辑，数据通过message passing
callback可以解耦，高阶函数也可以解耦复用，这都体现了软件工程中的分治思想
要分解目标循序渐进坚持到底

*/

//
//http
var options = {
    host: 'www.example.com',
    port: 80,
    path: '/upload',
    method: 'POST'
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });

    res.on('end', function() {
        //TODO
    })
});

req.on('error', function(e) {
    console.log('error: ' + e.message);
});

//write data to request body

req.write('data\n');
req.write('data\n');
req.end();


//how to use EventEmmitter

var proxy = new events.EventEmitter();
var status = 'ready';

var select = function(callback) {
    proxy.once('selected', callback);
    if(status == 'ready') {
        status = 'pending';
        db.select('SQL', function(results) {
            proxy.emit('selected', results);
            status = 'ready';
        });
    }
}

//
//async co-operate
var count = 0;
var results = {};
var done = function(key, value) {
    results[key] = value;
    count++;
    if(count == 3) { //哨兵变量
        render(results);
    }
}

fs.readFile(template_path, 'utf8', function(err, template) {
    done('template', template);
});

db.query(sql, function(err, data) {
    done('data', data);
});

l10n.get(function(err, resources) {
    done('resources', resources)
});


var done = after(times, render);


var emitter = new events.Emitter();
var done = after(times, render);

emitter.on('done', done);
emitter.on('done', other);

fs.readFile(template_path, 'utf8', function(err, template) {
    emitter.on('done', 'template', template);
});

db.query(sql, function(err, data) {
    emitter.on('done', 'data', data);
});

l10n.get(function(err, resources) {
    emitter.on('done', 'resources', resources);
});



/**
 promise/deferred

 */



 //
 //promise
//promise接收一个函数并执行它(执行异步,并把then的回调传入EventEmitter中保存),当异步完成时调用回调resolve此时会
//deferred会emit一个success调用EventEmitter中的回调，确保then的回调是EE中的回调应该即可
 new Promise((resolve, reject) => {
    fetchJsonp(url, Object.assign({ credentials: 'same-origin' }, extHeader))
        .then(res => {
            resolve && resolve({ data: res.json() })
        }, reason => {
            reject && reject(reason)
        })
})

 var Promise = function() {
     EventEmitter.call(this);
 };

 util.inherits(Promise, EventEmitter);

 //then used to cache callbacks wait until async finished emit corresponding event
 Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    if(typeof fulfilledHandler === 'function') {
        //call success only once
        this.once('success', fulfilledHandler);
    }

    if(typeof errorHandler === 'function') {
        this.once('error', errorHandler);
    }

    if(typeof progressHandler === 'function') {
        this.on('progress', progressHandler);
    }

    return this;
 };

//emit corresponding event on deferred object

var Deferred = function() {
    this.state = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj) {
    this.state = 'fulfilled';
    this.promise.emit('success', obj);
};

Deferred.prototype.reject = function(err) {
    this.state = 'failed';
    this.promise.emit('error', err);
};

Deferred.prototype.progress = function(data) {
    this.promise.emit('progress', data);
};


var promisify = function() {
    var deferred = new Deferred();
    var result = '';
    res.on('data', function(chunk){
        result += chunk;
        deferred.progress(chunk);
    });

    res.on('end', function() {
        deferred.resolve(result);
    });

    res.on('error', function(err){
        deferred.reject(err);
    });

    return deferred.promise;
};




Deferred.prototype.makeNodeResolver = function() {
    var self = this;
    return function(error, value) {
        if(error) {
            self.reject(error);
        } else if(arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    }
}


var readFile = function(file, encoding) {
    var deferred = Q.defer();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
};

readFile('foo.txt', 'utf-8').then(function(data){

});


Deferred.prototype.all = function() {
    var count = promises.length;
    var that = this;
    var results = [];

    promises.forEach(function(promise, i) {
        promise.then(function(data) {
            count--;
            results[i] = data;

            if(count === 0) {
                that.resolve(results);
            }
        }, function(err) {
            that.reject(err);
        })
    })
};


var promise1 = readFile('foo.txt', 'utf-8');
var promise2 = readFile('bar.txt', 'utf-8');

var deferred = new Deferred();

deferred.all([promise1, promise2]).then(function(results){

}, function(err){

})
