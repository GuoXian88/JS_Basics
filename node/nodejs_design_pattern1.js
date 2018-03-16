/*coding with streams
buffer:For an input operation, the buffer mode causes all the data coming
from a resource to be collected into a buffer; it is then passed to a callback as soon as the entire resource is read.

composability

*/

var zlib = require('zlib')
var file  = process.argv[2]

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', function(){
        console.log('File successfully compressed')
    })

var server = http.createServer(function(req, res) {
    var filename = req.headers.filename
    console.log('File request received: ' + filename)
    req
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(filename))
        .on('finish', function() {
            res.writeHead(201, { 'Content-Type' : 'text/plain' })
            res.send('That\'s it\n')
            console.log('File saved: ' + filename)
        })
})

server.listen(3000, function(){
    console.log('Listening')
})


/*When instead we are using
streams, the assembly line is kicked off as soon as we receive the first chunk of data,
without waiting for the entire file to be read. But more amazingly, when the next
chunk of data is available, there is no need to wait for the previous set of tasks to be
completed; instead, another assembly line is launched in parallel. This works perfectly
because each task that we execute is asynchronous, so it can be parallelized by Node.
js; the only constraint is that the order in which the chunks arrive in each stage must
be preserved (and Node.js streams take care of this for us).
Each stream class is also an instance of EventEmitter.

Binary mode
Object mode

These two operating modes allow us to use streams not only for I/O, but also as a tool to elegantly compose processing units in a functional fashion

readStdin.js
*/
//non-flowing
process.stdin
    .on('readable', function() {
        var chunk
        console.log('New data available')
        while((chunk = process.stdin.read()) !== null) {
            console.log('Chunk read: (' + chunk.length + ') "' + chunk.toString() + '"')
        }
    })
    .on('end', function() {
        process.stdout.write('End of stream')
    })

//flowing
process.stdin
    .on('data', function(chunk) {
        console.log('New data available')

        console.log('Chunk read: (' + chunk.length + ') "' + chunk.toString() + '"')
        
    })
    .on('end', function() {
        process.stdout.write('End of stream')
    })


var stream = require('stream')
var chance = require('chance').Chance


function RandomStream(options) {
    stream.Readable.call(this, options)
}

util.inherits(RandomStream, stream.Readable)

RandomStream.prototype._read = function(size) {
    var chunk = chance.string()
    console.log('Pushing chunk of size: ' + chunk.length)
    this.push(chunk, 'utf8')
    if(chance.bool({likelihood:5})) {
        this.push(null)
    }
}

module.exports = RandomStream



//transform streams

//replaceStream.js

function ReplaceStream(searchString, replaceString) {
    //receive strings instead of buffers
    stream.Transform.call(this, { decodeStrings: false })
    this.searchString = searchString
    this.replaceString = replaceString
    this.tailPiece = ''
}

util.inherits(ReplaceStream, stream.Transform)

ReplaceStream.prototype._transform = function(chunk, encoding, callback) {
    var pieces = (this.tailPiece + chunk).split(this.searchString)
    var lastPiece = pieces[pieces.length - 1]
    var tailLen = this.searchString.length - 1
    this.tailPiece = lastPiece.slice(-tailLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)
    this.push(pieces.join(this.replaceString))
    callback()
}

ReplaceStream.prototype._flush = function() {
    this.push(this.tailPiece)
    callback()
}

module.exports = ReplaceStream


//vscode选中所有： C-F Alt-Enter
/*control flow patterns
Pattern: Use a stream, or combination of streams, to easily iterate
over a set of asynchronous tasks in sequence.

Factory: a generic interface for creating objects
解耦：把创建对象和具体实现对象分开, information hiding(加强封装)

*/

function createImage(name) {
    //添加switch case 条件生成实例如果有必要的话
    //也可以防止创建对象的class被扩展
    return new Image(name)
}


function createPerson(name) {
    var privateProps = {}
    var person = {
        //public interface to access private members
        setName: function(name) {
            //如果name只是person对象的一个属性的话，是不能这么加强的(确保name一定不为空)
            if(!name) throw new Error('A person must have a name')
            privateProps.name = name
        },
        getName: function() {
            return privateProps.name
        }
    }
    person.setName(name)
    return person
}


function Container(param) {
    //private member可通过private method来访问
    //不能通过public method
    function dec() {
        if (secret > 0) {
            secret -= 1;
            return true;
        } else {
            return false;
        }
    }

    this.member = param;
    var secret = 3;
    var that = this;
    //特权方法也能访问private member
    this.service = function () {
        return dec() ? that.member : null;
    };
}



function Profiler(label) {
    this.label = label
    this.lastTime = null

}

Profiler.prototype.start = function() {
    this.lastTime = process.hrtime()
}

Profiler.prototype.end = function() {
    var diff = process.hrtime(this.lastTime)
    console.log('Timer "' + this.label + '" took ' + diff[0] + ' s and'
    + diff[1] + ' ns')
}

module.exports = function(label) {
    if(process.env.NODE_ENV === 'development') {
        return new Profiler(label)
    } else if(process.env.NODE_ENV === 'production') {
        //DUCK TYPING
        return {
            start: function() {},
            end: function() {}
        }
    } else {
        throw new Error('Must set NODE_ENV')
    }
}

/*设计模式
a factory allows us to separate the object creation from its 
implementation
提供了更大的灵活性，其实就是外面再包了一层,如果Image重构成
各种形式的Image,只需要改createImage里面的代码就可以了

function createImage(name) {
  if(name.match(/\.jpeg$/)) {
    return new JpegImage(name);
  } else if(name.match(/\.gif$/)) {
    return new GifImage(name);
  } else if(name.match(/\.png$/)) {
    return new PngImage(name);
  } else {
    throw new Exception('Unsupported format');
  }
}

Our factory also allows us to not expose the constructors of the objects it creates,  
and prevents them from being extended or modified (remember the principle of 
small surface area?). In Node.js, this can be achieved by exporting only the factory, 
while keeping each constructor private.

Proxy
A proxy is an object that controls the access to another object called subject.  
The proxy and the subject have an identical interface and this allows us to 
transparently swap one for the other; in fact, the alternative name for this  
pattern is surrogate. A proxy intercepts all or some of the operations that are  
meant to be executed on the subject, augmenting or complementing their  
behavior.
Proxy和Subject有相同的interface
•    Data validation: The proxy validates the input before forwarding it  
to the subject
•    Security: The proxy verifies that the client is authorized to perform the 
operation and it passes the request to the subject only if the outcome of  
the check is positive
•    Caching: The proxy keeps an internal cache so that the operations are 
executed on the subject only if the data is not yet present in the cache
•    Lazy initialization: If the creation of the subject is expensive, the proxy  
can delay it to when it's really necessary
•    Logging: The proxy intercepts the method invocations and the relative 
parameters, recoding them as they happen
•    Remote objects: A proxy can take an object that is located remotely,  
and make it appear local



*/
function createProxy(subject) {
    var proto = Object.getPrototypeOf(subject);

    function Proxy(subject) {
        this.subject = subject; //subject是被代理对象
    }
    Proxy.prototype = Object.create(proto); // prototype link

    //proxied method
    Proxy.prototype.hello = function () {
        return this.subject.hello() + ' world!';
    }

    //delegated method
    Proxy.prototype.goodbye = function () {
        return this.subject.goodbye
            .apply(this.subject, arguments);
    }

    return new Proxy(subject);
}




