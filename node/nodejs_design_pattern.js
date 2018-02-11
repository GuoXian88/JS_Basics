
// zeromq?
var zmp = require('zeromq')
var sink = zmq.socket('pull')
sink.bindSync("tcp://127.0.0.1:3000")

sink.on('message', function(buffer) {
    console.log('Message from worker： ', buffer.toString())
})

//small module, DRY, 实现和接口都应该保持simple并且实现>接口
/*reactor pattern
Pattern (reactor): handles I/O by blocking until new events are
available from a set of observed resources, and then reacting by
dispatching each event to an associated handler.
libuv

nodejs:
core js API (node-core)
Bindings
V8
libuv

goods of closure:
Also, closures are an ideal construct for implementing callbacks.
With closures, we can in fact reference the environment in which a function was
created, practically, we can always maintain the context in which the asynchronous
operation was requested, no matter when or where its callback is invoked.
cps:
In fact, it simply indicates that a result is propagated by
passing it to another function (the callback), instead of directly returning it to the caller.

event-loop image.

//sync event demultiplexer/event notification interface


//event loop
*/


//不可预测的函数
 var fs = require('fs');
 var cache = {};
 function inconsistRead(filename, callback) {
     if(cache[filename]) {
         //invoke sync
         callback(cache[filename]);
     } else {
         //async
         fs.readFile(filename, 'utf8', function(err, data) {
            cache[filename] = data;
            callback(data);
         })
     }
 }


 function createFileReader(filename) {
     var listeners = [];
     inconsistRead(filename, function(value) {
        listeners.forEach(function(listener) {
            listener(value);
        });
     });

     return {
         onDataReady: function(listener) {
             listeners.push(listener);
         }
     };
 }

 var reader1 = createFileReader('data.txt');
 reader1.onDataReady(function(data) {
     console.log('First Call Data: ' + data)
 })

 var reader2 = createFileReader('data.txt');
 reader2.onDataReady(function(data) {
     // never be called!!!!!!
     console.log('Second Call Data: ' + data)
 })

 //因为第二次调用是同步的，listeners会立即调用，所以在创建reader2之后注册listener是
 //不会被调用的

 /*The callback behavior of our inconsistentRead() function is really unpredictable,
as it depends on many factors, such as the frequency of its invocation, the filename
passed as argument, and the amount of time taken to load the file.
process.nextTick(),延迟将callback push到event loop里(所有pending I/O前面)，event loop
一运行callback就会执行
setImmediate()是在I/O后面的，所以慢一点
*/

var fs = require('fs');
var cache = {};
function consistReadAsync(filename, callback) {
    if(cache[filename]) {
        //invoke async
        process.nextTick(function(){
            callback(cache[filename]);
        })
    } else {
        //async
        fs.readFile(filename, 'utf8', function(err, data) {
           cache[filename] = data;
           callback(data);
        })
    }
}

//callback放最后, callback里error放最前

process.on('uncaughtException', function(err){
    console.error('catch last error!');
    process.exit(1);
});

//module pattern

var module = (function(){
    var privateFoo = function(){}
    var privateBar = []

    var export = {
        publicFoo: function(){}
        publicBar: function(){}
    }
    
    return export
})()


function loadModule(filename, module, require) {
    var wrappedSrc = 
    '(function(module, exports, require){' +
        fs.readFileSync(filename, 'utf8') +
    '})(module, module.exports, require)'
    eval(wrappedSrc)
}

var require = function(moduleName) {
    console.log('Require invoked for module: ' + moduleName)
    var id = require.resolve(moduleName)
    if(require.cache[id]) {
        return require.cache[id].exports
    }

    //module metadata
    var module = {
        exports: {}, 
        id
    }

    //update cache
    require.cache[id] = module

    //load module
    loadModule(id, module, require)

    //return exported variables
    return module.exports
}

require.cache = {}
require.resolve = function(moduleName) {
    /*resolve a full module id from the moduleName */
}

/*
The essential concept to remember is that everything inside a module is private
unless it's assigned to the module.exports variable.
The variable exports is just a reference to the initial value of module.
exports; we have seen that such a value is essentially a simple object literal created before the module is loaded.
This means that we can only attach new properties to the object referenced by the
exports variable
Reassigning the exports variable doesn't have any effect, because it doesn't
change the contents of module.exports, it will only reassign the variable itself.
require是同步的
resolve算法：
• File modules: If moduleName starts with "/" it's considered already an
absolute path to the module and it's returned as it is. If it starts with "./",
then moduleName is considered a relative path, which is calculated starting
from the requiring module.
• Core modules: If moduleName is not prefixed with "/" or "./", the algorithm
will first try to search within the core Node.js modules.
• Package modules: If no core module is found matching moduleName,
then the search continues by looking for a matching module into the first
node_modules directory that is found navigating up in the directory
structure starting from the requiring module. The algorithm continues
to search for a match by looking into the next node_modules directory
up in the directory tree, until it reaches the root of the filesystem.
每个都有自己单独的依赖，所以没有冲突问题
Caching is crucial
for performances, but it also has some important functional implications:
• It makes it possible to have cycles within module dependencies
• It guarantees, to some extent, that always the same instance is returned
when requiring the same module from within a given package

Pattern (substack): expose the main functionality of a module by
exporting only one function. Use the exported function as namespace
to expose any auxiliary functionality.


Exporting a constructor still provides a single entry point for the module, but
compared to the substack pattern, it exposes a lot more of the module internals;
however on the other side it allows much more power when it comes to extending
its functionality.

consists in exposing the constructor
used to create the instance, in addition to the instance itself.

observer pattern:
reactive nature of node
complement of callback
Pattern (observer): defines an object (called subject), which can notify a
set of observers (or listeners), when a change in its state happens.
EventEmitter:
*/

var EventEmitter = require('events').EventEmitter
var eeInstance = new EventEmitter()


function findPattern(files, regex) {
    var emitter = new EventEmitter()
    files.forEach(function(file){
        fs.readFile(file, 'utf8', function(err, content){
            if(err)
                return emitter.emit('error', err)
            emitter.emit('fileread', file)
            var match = null
            if(match == content.match(regex)) {
                match.forEach(function(elem){
                    emitter.emit('found', file, elem)
                })
            }
        })
    })
    return emitter
}


//js 初始化数组 new Array(arrlen).fill(0)

