
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
/*callbacks should be used when a result must be returned in
an asynchronous way; events should instead be used when there is a need to
communicate that something has just happened.

Another case where the EventEmitter might be preferable is when the same event
can occur multiple times, or not occur at all. A callback, in fact, is expected to be invoked exactly once, whether the operation is successful or not.

Pattern: create a function that accepts a callback and returns an
EventEmitter, thus providing a simple and clear entry point for
the main functionality, while emitting more fine-grained events
using the EventEmitter.
Closures
and in-place definition of anonymous functions allow a smooth programming
experience that doesn't require the developer to jump to other points in the code
base.但是缺点就是没有模块化，复用性，可维护性会降低
Also, we have to keep in mind that closures come at a small price in terms of
performances and memory consumption. In addition, they can create memory
leaks that are not so easy to identify because we shouldn't forget that any context
referenced by an active closure is retained from garbage collection.
减少不必要的else嵌套
用意义明确的小函数重构


*/

function saveFile(filename, contents, callback) {
    mkdirp(path.dirname(filename), function(err){
        err && callback(err)
        fs.writeFile(filename, contents, callback)
    })
}

//async! when finished invoke next task
function spider(url, nesting, callback) {
    var filename = utilities.urlToFilename(url)
    fs.readFile(filename, 'utf8', function(err, body){
        if(err) {
            if(err.code !== 'ENOENT') {
                return callback(err)
            }

            return download(url, filename, function(err, body) {
                if(err) {
                    return callback(err)
                }
                spiderLinks(url, body, nesting, callback)
            })
        }
        spiderLinks(url, body, nesting, callback)
    })
}


function spiderLinks(currentUrl, body, nesting, callback) {
    if(nesting === 0) {
        return process.nextTick(callback)
    }
    //get all links
    var links = utilities.getPageLinks(currentUrl, body)
    function iterate(index) {
        if(index === links.length) {
            return callback()
        }

        spider(links[index], nesting - 1, function(err){
            if(err) {
                return callback(err)
            }
            iterate(index + 1)
        })
        iterate(0)
    }
}


//缺点 stack size可能溢出

/*Pattern (sequential iterator): execute a list of tasks in sequence
by creating a function named iterator, which invokes the next
available task in the collection and makes sure to invoke the next
step of the iteration when the current task completes.
In fact, the word parallel is used improperly in
this case, as it does not mean that the tasks run simultaneously, but rather that their
execution is carried out by an underlying nonblocking API and interleaved by the
event loop.

Promise.all
用一个done来表示所有完成
*/

function spiderLinks(currentUrl, body, nesting, callback) {
    if(nesting == 0) {
        return process.nextTick(callback)
    }

    var links = utilities.getPageLinks(currentUrl, body)
    if(links.length == 0) {
        return process.nextTick(callback)
    }

    var completed = 0, errored = false

    function done(err) {
        if(err) {
            errored = true
            return callback(err)
        }

        if(++completed == links.length && !errored) {
            return callback()
        }
    }

    links.forEach(function(link){
        spider(link, nesting - 1, done)
    })
}


//queue

function TaskQueue(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
}

TaskQueue.prototype.pushTask = function(task, callback) {
    this.queue.push(task)
    this.next()
}

TaskQueue.prototype.next = function() {
    var self = this
    while(self.running < self.concurrency && self.queue.length) {
        var task = self.queue.shift()
        task(function(err){
            self.running--
            self.next()
        })
        self.running++
    }
}

var TaskQueue = require('./taskQueue')
var downloadQueue = new TaskQueue(2)

function spiderLinks(currentUrl, body, nesting, callback) {
    if(nesting == 0) {
        return process.nextTick(callback)
    }

    var links = utilities.getPageLinks(currentUrl, body)
    if(links.length == 0) {
        return process.nextTick(callback)
    }

    var completed = 0, errored = false


    links.forEach(function(link){
        downloadQueue.pushTask(function(done){
            spider(link, nesting - 1, function(err) {
                if(err) {
                    errored = true
                    return callback(err)
                }
                if(++completed == links.length && !errored) {
                    callback()
                }
                done() // queue continue next
            })
        })
        
    })
}

/*Promise
Now comes the best part. If an exception is thrown (using the throw statement) from
the onFulfilled() or onRejected() handler, the promise returned by the then()
method will automatically reject with the exception as the rejection reason. This is
a tremendous advantage over CPS, as it means that with promises, exceptions will
propagate automatically across the chain, and that the throw statement is not an
enemy anymore.

generator:The callback passed to
each asynchronous function will in turn resume the generator as soon as the
asynchronous operation is complete.
*/

function asyncFlow (generatorFn) {
    function callback(err) {
        if(err) {
            return generator.throw(err)
        }
        var results = [].slice.call(arguments, 1) // remove error
        generator.next(results.length > 1 ? results : results[0])
    }

    var generator = generatorFn(callback)
    generator.next()
}

//clone.js
var fs = require('fs')
var path = require('path')
asyncFlow(function *(callback) {
    var fileName = path.basename(__filename)
    var myself = yield fs.readFile(fileName, 'utf8', callback)
    yield fs.writeFile('clone_of_' + fileName, myself, callback)
    console.log('Clone created')
})

/*A thunk used in generator-based control flow is just a function that
partially applies all the arguments of the original function except
its callback. The return value is another function that accepts only
the callback as an argument.

*/

function readFileThunk(filename, options) {
    return function(callback) {
        fs.readFile(filename, options, callback)
    }
}

//task queue
function TaskQueue(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.taskQueue = []
    this.consumerQueue = []
    this.spawnWorkers(concurrency)

}

TaskQueue.prototype.spawnWorkers = function(concurrency) {
    var self = this
    for(var i = 0; i < concurrency; i++) {
        co(function *() {
            while(true) {
                var task = yield self.nextTask()
                yield task
            }
        })()
    }
}


TaskQueue.prototype.pushTask = function(task) {
    if(this.consumerQueue.length !== 0) {
        this.consumerQueue.shift()(null, task)
    } else {
        this.taskQueue.push(task)
    }
}

TaskQueue.prototype.nextTask = function() {
    var self = this
    return function(callback) {
        if(self.taskQueue.length !== 0) {
            callback(null, self.taskQueue.shift())
        } else {
            self.consumerQueue.push(callback)
        }
    }
}

var TaskQueue = require('./taskQueue')
var downloadQueue = new TaskQueue(2)
