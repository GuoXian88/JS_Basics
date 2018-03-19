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

ngix 转发
递归转迭代 加个res
cgi
nodejs 与 Appache
运营商怎么劫持
js作用域 函数，局部，块，全局， 作用域原理， 作用域链
闭包
es6 new Set高效去重原理
跨域方式 iframe如何实现，优缺点
nodejs为什么不适合运算密集型任务
同步和异步解释
https原理，加密算法原理
xss防范需要encode哪些标签
http协议
链表和数组区别，优缺点
new Fn()发生了什么
框架比较， ReactJS特点 是JS为核心的框架，如何实现MVVM
diff
immutable数据结构怎么实现
浏览器渲染机制，构建dom树
js垃圾回收
js基本数据类型，内存情况，堆，栈
回文检测
1000！实现
http 301 302 304
前后台如何交互
目录结构按功能划分
如何做code-splitting,动态路由
promise, promiseA+
macro task and micro task
redux and mobx
angular
vue
webpack and gulp
hoc
padding相对于
页面间传值 localstorage, sessionstorage, iframe?
遇到的一些困难
React之于jQuery
有埋点与无埋点
css动画
webpack常用插件,手写


DNS:
域名解析服务器，靠它把你要访问的网址找到然后把信息送到你电脑上。
DNS 是域名系统 (Domain Name System) 的缩写，它是由解析器和域名服务器组成的。域名服务器是指保存有该网络中所有主机的域名和对应IP地址，并具有将域名转换为IP地址功能的服务器。其中域名必须对应一个IP地址，而IP地址不一定有域名。域名系统采用类似目录树的等级结构。域名服务器为客户机/服务器模式中的服务器方，它主要有两种形式：主服务器和转发服务器。将域名映射为IP地址的过程就称为“域名解析”。在Internet上域名与IP地址之间是一对一（或者多对一）的，域名虽然便于人们记忆，但机器之间只能互相认识IP地址，它们之间的转换工作称为域名解析，域名解析需要由专门的域名解析服务器来完成，DNS就是进行域名解析的服务器。 DNS 命名用于 Internet 等 TCP/IP 网络中，通过用户友好的名称查找计算机和服务。当用户在应用程序中输入 DNS 名称时，DNS 服务可以将此名称解析为与之相关的其他信息，如 IP 地址。因为，你在上网时输入的网址，是通过域名解析系统解析找到了相对应的IP地址，这样才能上网。其实，域名的最终指向是IP。

http无状态还是web应用无状态我们通常说的web应用程序的无状态性的含义是什么呢？ 直观的说，“每次的请求都是独立的，它的执行情况和结果与前面的请求和之后的请求是无直接关系的，它不会受前面的请求应答情况直接影响，也不会直接影响后面的请求应答情况” 要明白，这句话的含义是指在说明，http协议作为技术背景的web应用程序请求——应答模式是无状态的，这个事实基本不会发生改变，也不会因为加入cookies、session机制而变成有状态的。要明白，这种前后因果关系：“我们要实现的是一种web应用，实现这种应用的协议我们选择了http这种本质上是无状态的通信协议。但是事实上，我们需要我们的web应用是有状态的。所以我们加入了cookies、session等机制去实现由状态的web应用”。所以我们可以这么理解： Web应用=http协议+session、cookies等状态机制+其他辅助的机制。 其实，应用程序(软件通信)的状态与否是一个非常通用的概念。我们可知，在网络协议中，我们称TCP为一个有状态的传输层通信协议，而UDP则不是；IP是无状态的。要明白这种状态与否的判定，是面向你这一层次所指实现的功能——是否由上下文决定——来判定的（是否受之前的通信过程直接影响、是否直接影响之后的通信过程）IP层以下的我们就不思考了。我们做一个网络应用，需要使用网络协议。其实按照原理上讲，标准的TCP/IP协议提供给我们的网络层协议(FTP, HTTP)不能直接的被称为应用，因为在实现某种可用的、直接面向用户的应用的时候（如web应用，人们可以上网），只有http协议还是不够的。所以我们可以这么理解。网络标准协议分层中提供给我们的应用层协议，它更像是一种分类。自然界的应用可能是无穷尽的种类，但是根据他们的特点、传输的特色，标准的网络协议在传输层（通用网络协议）的基础上封装出若干种面向不同种类网络应用的协议。某种角度上讲，我们想要实现某种可用的网络应用，直接使用网络协议的传输层给我们提供的接口就可以了（也就是socket接口），但是有时候，这种方式是有些麻烦的，所以我们还是根据你要实现的web应用，在已有的标准协议中提供的面向应用分类的协议中进行选择。这样可以免去那些繁琐的、通用的工作。可以看到，我们实际生活中的有关网络的应用程序，与标准的网络通信协议提供给我们的应用层协议是没有绝对的对应关系。所以标准的网络通信协议给我们提供的应用层协议，只是提供给我的一种“建议的”分类。建议你：“如果你要实现这样的应用，你可以直接使用这个封装协议，而不是socket接口”。我们再看看，前面一副图中，所给我们的关于网络应用层次中的各层次的有无状态情况。可以知道，支持协议（下层）的有无状态，消费协议（上层）的有无状态，没有直接的关系。还是那句话，每层协议的有无状态关系到它的本身功能执行的时候的有无状态地特点。（1）IP是无状态的，它只负责将一个IP包发送到指定的IP地址上去。它不会考虑这个包与前面已经发送的包和后面的包的联系。（可能是重发包、可能是不连续包，它不管）。（2） TCP是有状态的，它通过包头中的一些控制字段（序列编码等）来表明各个包之间的关系（前后关系，重包与否等等）。所以，通过这个协议你可以做到一个可靠的传输。那么TCP是面向连接的协议是什么意思呢？其实这里的面向连接其实就是“三次握手”。三次握手，首先可以保证对方的存在，其次握手的所交换的内容是为将来进行有状态的传输做准备。（3） UDP是无状态的，它仅仅是在IP上加了Port，其他的事情什么也不干。这样它不可能做到可靠的传输，同样也不需要连接。（4） HTTP是无状态的，它的底层协议是由状态的TCP，但是HTTP的一次完整协议动作，里面是使用有状态的TCP协议来完成的。而每次协议动作之间没有任何关系。例如：第7次请求HTTP协议包，并不知道，这个包是为了什么？它或许是因为上次没有请求成功而重传，或许是上次的后续请求，或许是其他的，这些HTTP自身都不知道。（5） www应用，但是很多时候，www应用是需要HTTP动作之间是有关联的，那就是使应用有状态。这样才能提供给用户最好的用户体验。于是，问题就来了，为什么当初HTTP会设计成无状态的，既然现在我们所需要的www应用是有状态的，为什么给他提供的这样的底层协议是无状态的。我想这个问题，可以从历史的角度去思考。在www应用还很简单的时候，这个应用只是被用来浏览内容。如果只是浏览内容的话，无状态的协议已经够了，这样实现可以减轻实现的负担，因为有状态的协议实现起来代价相对来说是很高的（要维护状态，根据状态来处理情况，这就是为什么建议你可以不用session的时候就不用，因为服务器要给你负担起很多的东西，例如内存空间啊）。好，现在看来，似乎www应用是大部分需要状态了，那么是否我们就应该改变这个协议来让他变成一个有状态的协议呢？从这个角度上讲，我认为是不应该的。首先，web应用与文件传输是不同的，文件传输，从开始到结束是一个“尽可能做完”的动作，所以这类动作不会在资源占有上，浪费它不该浪费的东西。而web应用中，用户可能访问一个页面后，在那个页面上逗留很久才跳转到另外一个页面，如果你需要我们在这两个页面（两个http请求应答）之间维持状态，是非常代价高的。其次，历史让http无状态，而应用需求对http提出有状态的要求，按照软件领域的通常做法是，保持历史遗留的经验（不再http协议本质上作太大的改动），兼容过去的软件。在http上再加上一层来实现我们的目的（“再加上一层，你能做任何事”）。这一层，就是cookies，就是session等。最后总结，http协议仍然保持无状态，其充分的理由，并且，想要基于http协议的web应用变得有状态，实现起来并不麻烦。web应用都有哪些方法来让应用有状态于是就引出了，在http协议的基础上，web应用引入cookies, session, application。这样的东西来保持web应用之间的状态。可知，cookies, session，application都不是标准协议，但是各种网络应用提供商，实现语言、web容器等，都默认支持它。当然这种支持与对网络标准协议的支持是不同的，标准协议规定的接口，而这种机制，只是规定了思想。就告诉你，大的概念上，jsp和ASP的session机制所要实现的功能和实现的方法不会有太大的出入。有人将web应用中有无状态的情况，比着顾客逛商店的情景。顾客：浏览器访问方；商店：web服务器；一次购买：一次http访问我们知道，上一次顾客购买，并不代表顾客下一个小时一定会买（当然也不能代表不会）。也就是说同一个顾客的不同购买之间的关系是不定的。所以说实在的，这种情况下，让商店保存所有的顾客购买的信息，等到下一次购买可以知道这个顾客以前购买的内容代价非常大的。所以商店为了避免这个代价，索性就认为每次的购买都是一次独立的新的购买。浅台词：商店不区分对待老顾客和新过客。这就是无状态的。但是，商店为了提高收益。她是想鼓励顾客购买的。所以告诉你，只要你在一个月内购买了５瓶以上的啤酒，就送你一个酒杯。我们看看这种情况我们怎么去实现呢？A,给顾客发放一个磁卡，里面放有顾客过去的购买信息。这样商店就可以知道了。这就是cookie.B,给顾客发放一个唯一号码，号码制定的顾客的消费信息，存储在商店的服务器中。这就是session。最后，商店可以全局的决定，是５瓶为送酒杯还是6瓶。这就是application。其实，这些机制都是在无状态的传统购买过程中加入了一点东西，使整个过程变得有状态。Web应用就是这样的。 注意，viewstate其实从我们上面的分析看来，application不应该被视为这种意义上出现的维护状态的机制。它是决定怎么应用程序的“配制文件”。但是如果你从这种状态维持机制所覆盖的范围来推导，你会发现，application好像也算得上。Session所控制的范围是一个session。一个会话，会话从第一次访问服务器开始存在，到服务器调用session.invalidator()（可能是超时，可能是其它原因）。Cookies所控制的范围有它自己的定义(与session没有直接的关系)，可以长可以短。只要服务器放在用户文件系统中的cookies没有被删除，至少服务器还识别它。它的控制范围就是还在的。这个角度上讲，Session和Cookies都可以归为跨页面的状态。但是session跨不出一次会话，Cookies跨不出两端的限制。Application，则是关联这个网络应用程序的。除了这三种状态机制，有些网络应用的特别实现还各自特殊的东西。像ASP.net的viewstate。这个东西，其实就是使用input type=”hyde”的东西来实现的。再加上web服务器那边辅助，就可以实现，一个页面在“回传”的时候还能保持上一次的页面状态。其实，这里要说明的就是“回传”的意思，事实上，无状态的http协议下，是没有所谓的回传的概念的。这里的回传，情景可以这么理解。我在客户端填写一定的数据（在文本框中、密码框中、下拉列表中）。然后触发一个访问服务器的动作，例如：提交。这个时候服务器接受到我的请求然后又返回刚才这个页面给我们。这种情景我们很常见（输入用户名密码，点击“登陆”，服务器端判断密码不对，就返回登陆页面，但是之前我们填写的内容并没有被擦出。）这种情景就好像实现了一种回传（你传给我，我传还给你）。当然，如果你了解web服务的工作模式，这种回传只会是一种假象。前后两个页面根本不是一个页面。其实我们可以实现这种情景（不考虑Ajax）。页面上的数据全部通过request的方式传到服务器，服务器返回页面的时候，将数据由注入到页面中。而viewstate就可以让用户很容易的实现这种功能。但是它有一个问题就是它附属于页面上的hide控件。虽然前后是两个不同的页面，但是来自一个ASPX模板，页面上的状态数据就在这些同模板页面的hide空间之间进行传播（由服务器控制），不可能，也不应该传递到别的ASP.new的页面上去。所以我们称他为页面级的状态维持机制。


React直出
从用户输入 url　到展示最终页面的过程，这种模式可简单的分为以下 5 部分

1. 用户输入 url，开始拉取静态页面
2. 静态页面加载完成后，解析文档标签，并开始拉取 CSS （一般 CSS 放于头部）
3. 接着拉取 JS 文件（一般 JS 文件放于尾部）
4. 当 JS 加载完成，便开始执行 JS 内容，发出请求并拿到数据
5. 将数据与资源渲染到页面上，得到最终展示效果

直出就是不需要等待js加载再请求数据，直接html和data渲染好一起返回(css也可内联减少请求次数)
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
