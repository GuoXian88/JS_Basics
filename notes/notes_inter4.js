/**
 The ready event occurs after the HTML document has been loaded, while the onload event occurs later, when all content (e.g. images) also has been loaded.
DOMContentLoaded 
 当初始的HTML 文档被完全加载和解析完成之后， DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载
However, jQuery's .ready() method differs in an important and useful way: If the DOM becomes ready and the browser fires DOMContentLoaded before the code calls .ready( handler ), the function handler will still be executed. In contrast, a DOMContentLoaded event listener added after the event fires is never executed.

iframe缺点
缺点：
1.iframe有不好之处：样式/脚本需要额外链入，会增加请求。
另外用js防盗链只防得了小偷，防不了大盗。
2.iframe好在能够把原先的网页全部原封不动显示下来,但是如果用在首页,是搜索引擎最讨厌的.那么你
的网站即使做的在好,也排不到好的名次! 
如果是动态网页，用include还好点！
但是必须要去除他的<html><head><title><body>标签！ 
3.框架结构有时会让人感到迷惑，特别是在多个框架中都出现上下、左右滚动条的时候。这些滚动条除了
会挤占已经特别有限的页面空间外，还会分散访问者的留心力。访问者遇到这种站点往往会立刻转身离开
。他们会想，既然你的主页如此混乱，那么站点的其他部分也许更不值得阅读。
4.链接导航疑问。运用框架结构时，你必须保证正确配置所有的导航链接，如不然，会给访问者带来很大
的麻烦。比如被链接的页面出现在导航框架内，这种情况下访问者便被陷住了，因为此时他没有其他地点
可去。
5.调用外部页面,需要额外调用css,给页面带来额外的请求次数;


业务代码的逻辑处理-》业务缓存-》soa接口响应-》soa缓存-》nosql-》db分布式读写分离-》db查询优化
负载均衡

是有个中间代理层来控制用户访问到哪个服务器嘛
类似ngix代理这种

它再把请求平均分配到指定的服务器。
运维在搞

游戏，CDG，微信
如果做微信支付，广告，应该还不错


大数组怎么处理
预计处理
页面逻辑分割
渲染dom批量的方式，非动态更新

facebook的性能优化怎么做的?
定时器为0的时间
改版进度条动画
闭包怎么实现

/^
  (?=.*\d)          // should contain at least one digit
  (?=.*[a-z])       // should contain at least one lower case
  (?=.*[A-Z])       // should contain at least one upper case
  [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
$/
 x?=y匹配'x'仅仅当'x'后面跟着'y'.这种叫做正向肯定查找。
例如，/Jack(?=Sprat)/会匹配到'Jack'仅仅当它后面跟着'Sprat'。/Jack(?=Sprat|Frost)/匹配‘Jack’仅仅当它后面跟着'Sprat'或者是‘Frost’。但是‘Sprat’和‘Frost’都不是匹配结果的一部分。

typeof [] //object



I think there are far more important skills to learn to become a more in-demand developer:

Learn everything you can about the JavaScript language itself, its bad parts and good parts, and all the modern features it recently gained. Learn how to build and use the various data structures in JavaScript.
Learn the JavaScript runtimes like Node and Browsers and learn how they are single-threaded. Learn their APIs and limitations. Learn about the event loop. Learn about the VM’s call stacks. Get comfortable with browsers’ DevTools.
Learn how to share code between clients and servers and preload initial data. Learn how to minimize JavaScript loading and parsing in browsers. Learn how to load JavaScript on demand.
Learn the merits of functional programming and use its concepts where you can. Learn how to be declarative instead of imperative when you can.
Learn about small JavaScript libraries which do one thing and do it well. Pick libraries with the smallest API and don’t focus on the APIs but rather on what these libraries enable you to do.
Learn how to build scalable data APIs (take a look at GraphQL).
Learn the power of CSS and how to use it to minimize your applications JavaScript code. Learn the new Flexbox and Grid layouts. Learn about UI-responsive design.
Learn how to add static types to JavaScript with TypeScript (or Flow) and learn where you should focus on types vs testing.

发展: 性能 nodejs python cpp
current role: sicp --> python


从输入URL到页面加载的过程？

URL 浏览器开启新线程
browser解析出主机名
DNS lookup分级查询到ip地址
browser获得端口号
应用层http协议 传输层 网络层 链路层
找到web server
tcp三次握手
建立连接请求数据


对浏览器模型有整体概念，知道浏览器是多进程的，浏览器内核是多线程的，清楚进程与线程之间得区别，以及输入url后会开一个新的网络线程

对从开启网络线程到发出一个完整的http请求中间的过程有所了解（如dns查询，tcp/ip链接，五层因特尔协议栈等等，以及一些优化方案，如 dns-prefetch）

对从服务器接收到请求到对应后台接收到请求有一定了解（如负载均衡，安全拦截以及后台代码处理等）

对后台和前台的http交互熟悉（包括http报文结构，场景头部，cookie，跨域，web安全，http缓存，http2.0，https等）

对浏览器接收到http数据包后的解析流程熟悉（包括解析html，词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、里面可能还包括复合图层的合成、GPU绘制、外链处理、加载顺序等）

对JS引擎解析过程熟悉（包括JS的解释，预处理，执行上下文，VO，作用域链，this，回收机制等）

负载均衡
对于大型的项目，由于并发访问量很大，所以往往一台服务器是吃不消的，所以一般会有若干台服务器组成一个集群，然后配合反向代理实现负载均衡。

后台的处理
一般后台都是部署到容器中的，所以一般为：

先是容器接受到请求（如tomcat容器）

然后对应容器中的后台程序接收到请求（如java程序）

然后就是后台会有自己的统一处理，处理完后响应响应结果

概括下：

一般有的后端是有统一的验证的，如安全拦截，跨域验证

如果这一步不符合规则，就直接返回了相应的http报文（如拒绝请求等）

然后当验证通过后，才会进入实际的后台代码，此时是程序接收到请求，然后执行（譬如查询数据库，大量计算等等）

等程序执行完毕后，就会返回一个http响应包（一般这一步也会经过多层封装）

然后就是将这个包从后端发送到前端，完成交互


什么会引起回流？

1.页面渲染初始化2.DOM结构改变，比如删除了某个节点3.render树变化，比如减少了padding4.窗口resize5.最复杂的一种：获取某些属性，引发回流。

很多浏览器会对回流做优化，会等到数量足够时做一次批处理回流，但是除了render树的直接变化，当获取一些属性时，浏览器为了获得正确的值也会触发回流，这样使得浏览器优化无效，包括：

offset(Top/Left/Width/Height)

scroll(Top/Left/Width/Height)

cilent(Top/Left/Width/Height)

width,height

调用了getComputedStyle()或者IE的currentStyle

回流一定伴随着重绘，重绘却可以单独出现。所以一般会有一些优化方案，如：

减少逐项更改样式，最好一次性更改style，或者将样式定义为class并一次性更新

避免循环操作dom，创建一个documentFragment或div，在它上面应用所有DOM操作，最后再把它添加到window.document

避免多次读取offset等属性。无法避免则将它们缓存到变量

将复杂的元素绝对定位或固定定位，使得它脱离文档流，否则回流代价会很高

注意：改变字体大小会引发回流

再来看一个示例：

var
 s 
=
 document
.
body
.
style
;


s
.
padding 
=
 
"2px"
;
 
// 回流+重绘

s
.
border 
=
 
"1px solid red"
;
 
// 再一次 回流+重绘

s
.
color 
=
 
"blue"
;
 
// 再一次重绘

s
.
backgroundColor 
=
 
"#ccc"
;
 
// 再一次 重绘

s
.
fontSize 
=
 
"14px"
;
 
// 再一次 回流+重绘

// 添加node，再一次 回流+重绘

document
.
body
.
appendChild
(
document
.
createTextNode
(
'abc!'
));

简单层与复合层
上述中的渲染中止步于绘制，但实际上绘制这一步也没有这么简单，它可以结合复合层和简单层的概念来讲。这里不展开，进简单介绍下：

可以认为默认只有一个复合图层，所有的DOM节点都是在这个复合图层下的

如果开启了硬件加速功能，可以将某个节点变成复合图层

复合图层之间的绘制互不干扰，由GPU直接控制

而简单图层中，就算是absolute等布局，变化时不影响整体的回流，但是由于在同一个图层中，仍然是会影响绘制的，因此做动画时性能仍然很低。而复合层是独立的，所以一般做动画推荐使用硬件加速


React
“合成事件”会以事件委托（event delegation）的方式绑定到组件最上层，并且在组件卸载（unmount）的时候自动销毁绑定的事件。
 */