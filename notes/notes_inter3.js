/*
 There are several kinds of caches: these can be grouped into two main categories: private or shared caches. A shared cache is a cache that stores responses for reuse by more than one user. A private cache is dedicated to a single user. This page will mostly talk about browser and proxy caches, but there are also gateway caches, CDN, reverse proxy caches and load balancers that are deployed on web servers for better reliability, performance and scaling of web sites and web applications.
Cache-Control: max-age=31536000

The freshness lifetime is calculated based on several headers. If a "Cache-control: max-age=N" header is specified, then the freshness lifetime is equal to N. If this header is not present, which is very often the case, it is checked if an Expires header is present. If an Expires header exists, then its value minus the value of the Date header determines the freshness lifetime. Finally, if neither header is present, look for a Last-Modified header. If this header is present, then the cache's freshness lifetime is equal to the value of the Date header minus the value of the Last-modified header divided by 10.
The expiration time is computed as follows:

expirationTime = responseTime + freshnessLifetime - currentAge

The ETag response header is an opaque-to-the-useragent value that can be used as a strong validator. That means that a HTTP user-agent, such as the browser, does not know what this string represents and can't predict what its value would be. If the ETag header was part of the response for a resource, the client can issue an If-None-Match in the header of future requests – in order to validate the cached resource.

The Last-Modified response header can be used as a weak validator. It is considered weak because it only has 1-second resolution. If the Last-Modified header is present in a response, then the client can issue an If-Modified-Since request header to validate the cached document.
When a validation request is made, the server can either ignore the validation request and response with a normal 200 OK, or it can return 304 Not Modified (with an empty body) to instruct the browser to use its cached copy. The latter response can also include headers that update the expiration time of the cached document.


primitive data type memory usage:
Six data types that are primitives:
Boolean
Null
Undefined
Number 8 bytes(64bit float)
String It is a set of "elements" of 16-bit unsigned integer values.
Symbol (new in ECMAScript 6) A Symbol is a unique and immutable primitive value and may be used as the key of an Object property 
and Object

js GC:
相关算法:
Reference-counting garbage collection. Limitation: cycles
Mark-and-sweep algorithm
This algorithm reduces the definition of "an object is not needed anymore" to "an object is unreachable".
This algorithm assumes the knowledge of a set of objects called roots (In JavaScript, the 
    root is the global object). Periodically, the garbage-collector will start from these 
    roots, find all objects that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the garbage collector will thus find all reachable objects and collect all non-reachable objects.

Function calls form a stack of frames
Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory.

event loop:
while (queue.waitForMessage()) {
  queue.processNextMessage();
}

严格模式
Strict mode makes several changes to normal JavaScript semantics:
Eliminates some JavaScript silent errors by changing them to throw errors.
Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
Prohibits some syntax likely to be defined in future versions of ECMAScript.

js错误类型
ReferenceError
RangeError
SyntaxError
TypeError

cgi
CGI(Common Gateway Interface) 是WWW技术中最重要的技术之一，有着不可替代的重要地位。CGI是外部应用
程序（CGI程序）与WEB服务器之间的接口标准，是在CGI程序和Web服务器之间传递信息的过程。CGI规范允许Web
服务器执行外部程序，并将它们的输出发送给Web浏览器，CGI将Web的一组简单的静态超媒体文档变成一个完整的
新的交互式媒体。
Common Gateway Interface，简称CGI。在物理上是一段程序，运行在服务器上，提供同客户端HTML页面的接
口。这样说大概还不好理解。那么我们看一个实际例子：现在的个人主页上大部分都有一个留言本。留言本的工作
是这样的：先由用户在客户端输入一些信息，如评论之类的东西。接着用户按一下“发布或提交”（到目前为止工作
都在客户端），浏览器把这些信息传送到服务器的CGI目录下特定的CGI程序中，于是CGI程序在服务器上按照预定
的方法进行处理。在本例中就是把用户提交的信息存入指定的文件中。然后CGI程序给客户端发送一个信息，表示
请求的任务已经结束。此时用户在浏览器里将看到“留言结束”的字样。整个过程结束。
绝大多数的CGI程序被用来解释处理来自表单的输入信息，并在服务器产生相应的处理，或将相应的信息反馈给浏
览器。CGI程序使网页具有交互功能。



 */

var x = 10;
var a = {
    x: 30,
    foo: function() {
        var x = 20;
        console.log(this.x);
    }
};

console.log(a.foo()) //30
console.log((a.foo = a.foo)()) // 10
console.log((a.foo, a.foo)()) // 10
console.log(a.foo.call(window)) // 10
console.log(a.foo.call(a)) // 30
