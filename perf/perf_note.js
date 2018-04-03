/*
ETag
这正是验证令牌（在 ETag 标头中指定）旨在解决的问题。服务器生成并返回的随机令牌通常是文件内容的哈希值或某个其他指纹。客户端不需要了解指纹是如何生成的，只需在下一次请求时将其发送至服务器。如果指纹仍然相同，则表示资源未发生变化，您就可以跳过下载 304 Not Modified
eg:客户端自动在“If-None-Match” HTTP 请求标头内提供 ETag 令牌。服务器根据当前资源核对令牌
HTTP 规范允许服务器返回 Cache-Control 指令，这些指令控制浏览器和其他中间缓存如何缓存各个响应以及缓存多久
“no-cache”表示必须先与服务器确认返回的响应是否发生了变化，然后才能使用该响应来满足后续对同一网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，但如果资源未发生变化，则可避免下载。

相比之下，“no-store”则要简单得多。它直接禁止浏览器以及所有中间缓存存储任何版本的返回响应，例如，包含个人隐私数据或银行业务数据的响应。每次用户请求该资产时，都会向服务器发送请求，并下载完整的响应

max-age
server 配置gzip压缩,gzip对文本类的有较好的压缩效果


third-party script
If a third-party script is slowing down your page load, you have several options to improve performance:

Load the script using the async or defer attribute to avoid blocking document parsing.
Consider self-hosting the script if the third-party server is slow.
Consider removing the script if it doesn't add clear value to your site.
Consider Resource Hints like <link rel=preconnect> or <link rel=dns-prefetch> to perform a DNS lookup for domains hosting third-party scripts.

CSP is particularly powerful as it includes directives such as script-src that specifies what are valid, allowed sources for JavaScript. Below is an example of how this can be used in practice:


// Given this CSP header

Content-Security-Policy: script-src https://example.com/

// The following third-party script will not be loaded or executed

<script src="https://not-example.com/js/library.js"></script>


//benchmark:
console.time('someFunction');

someFunction(); // run whatever needs to be timed in between the statements

console.timeEnd('someFunction');

setTimeout实际时间差不多是2ms(Chrome browser)
(Note: this means the delay in a setTimeout call is not a sure thing; it is the minimum delay before the callback is executed. The actual time taken depends on how long it takes to process any messages ahead of it in the queue.)
So what happens if the delay is set to 0? A new message is added to the queue immediately, and will be processed when the currently executing code is finished and any previously-added messages have been processed.

perf kpi:
Load Time	First Byte	Start Render	Visually Complete	Speed Index	Result (error code)  Document Complete 
Fully Loaded

connection view:
DNS Lookup
Initial Connection
SSL Negotiation
Start Render
DOM Content Loaded
On Load
Document Complete

loading:
Request Start
DNS Lookup
Initial Connection
SSL Negotiation
Time to First Byte
Content Download
Bytes Downloaded
Certificates

First Byte Time
Keep-alive Enabled
Compress Transfer
Compress Images
Cache static content
Effective use of CDN

后端性能定义
DNS时间：用户在浏览器输入网址名称（网址）后，浏览器通过查询DNS服务器所需要的时间。
建立连接时间：根据TCP协议要求，请求方（浏览器等）与接受方（服务器）经过一系列协商所需要的时间。
服务器处理时间：接收方（服务器）处理请求所需时间。
数据传输时间：从请求方（浏览器等）到接收方（服务器）以及从接收方（服务器）到请求方的时间。
前端性能定义：
白屏时间：用户浏览器输入网址后至浏览器出现至少1px图片为止。
首屏时间：用户浏览器首屏内所有的元素呈现所花费时间。
用户可操作时间(dom ready) ：网站某些功能可以使用的时间。
页面总下载时间(onload):网站中所有资源加载完成并且可用时间。
影响核心性能因素：
DNS时间：与DNS设置的TTL时间以及DNS服务器有关。
建立连接时间：与用户、服务器的网速、带宽有关。
服务器起处理时间：与程序复杂度、服务器性能相关。
数据传输时间：资源大小、用户、服务器的网速、带宽有关。
白屏时间：与后端性能指标、前端headtime以及页面结构设计。
首屏时间：与白屏时间以及页面首屏程序设计有关。
用户可操作时间：与页面结构设计相关。
页面总下载时间: 与页面资源多少相关。

持久连接
所谓持久连接，就是重用 TCP连接，多个HTTP请求公用一个TCP连接。

HTTP 1.1 改变了 HTTP 协议的语义,默认使用持久连接。换句话说,除非明确告知(通过 Connection: close 首部),否则服务器默认会保持TCP连接打开。如果你使用的是 HTTP 1.1,从技术上说不需要 Connection: Keep-Alive 首部,但很多客户端还是选择加上它，比如我们的浏览器在发起请求的时候，一般会默认帮我们带上 Connection: Keep-Alive 首部


域名分区
前面说到，浏览器和服务器之间只能并发4到8个TCP连接，也就是同时下载4到8个资源，够吗？

看看我们现在的大部分网站，动不动就几十个JS、CSS，一次六个，会造成后面大量的资源排队等待；另外，只下载6个资源，对带宽的利用率也是很低的。

打个比喻，一个工厂装了100根水管，每次却只能用其中6根接水，既慢，又浪费水管！

所以，我们前端性能优化中有一个最佳实践：使用域名分区！

对啊，何必把自己只限制在一个主机上呢？我们可以手工将所有资源分散到多个子域名，由于主机名称不一样了，就可以突破浏览器的连接限制，实现更高的并行能力。

通过这种方式“欺骗”浏览器，这样浏览器和服务器之间的并行传输数量就变多了。

域名分区使用得越多，并行能力就越强！

但是，域名分区也是有代价的！

实践中，域名分区经常会被滥用。

例如，假设你的应用面向的是2G网络的手机用户，你分配了好几个域名，同时加载十几二十多个CSS、JS，这里的问题在于：

每一个域名都会多出来的DNS查询开销，这是额外的机器资源开销和额外的网络延时代价。2G网络的DNS查询可不像你公司的电脑一样，相反可能是好几秒的延迟
同时加载多个资源，以2G网络那种小得可怜的带宽来看，后果往往就是带宽被占满，每一个资源都下载得很慢
手机的耗电加快
所以在一些低带宽高延时的场景，例如2G手机网络，域名分区做过了的话，不光不会带来前端性能的提升，反而会变成性能杀手。

域名分区是一种合理但又不完美的优化手段，最合适的办法就是，从最小分区数目（不分区）开始，然后逐个增加分区并度量分区后对应用的影响，从而得到一个最优的域名数。

能够被“安全”呈现的最大整数是2^53 - 1，即 9007199254740991，在 ES6 中被定义为Number.MAX_SAFE_INTEGER。最小整数是 -9007199254740991，在 ES6 中被定义为Number.MIN_SAFE_INTEGER。

这里重要要说两个概念，一个是Reflow，另一个是Repaint。这两个不是一回事。

Repaint ——屏幕的一部分要重画，比如某个CSS的背景色变了。但是元素的几何尺寸没有变。
Reflow ——意味着元件的几何尺寸变了，我们需要重新验证并计算Render Tree。是Render Tree的一部分或全部发生了变化。这就是Reflow，或是Layout。（HTML使用的是flow based layout，也就是流式布局，所以，如果某元件的几何尺寸发生了变化，需要重新布局，也就叫reflow）reflow 会从这个root frame开始递归往下，依次计算所有的结点几何尺寸和位置，在reflow过程中，可能会增加一些frame，比如一个文本字符串必需被包装起来。
Reflow的成本比Repaint的成本高得多的多。DOM Tree里的每个结点都会有reflow方法，一个结点的reflow很有可能导致子结点，甚至父点以及同级结点的reflow。在一些高性能的电脑上也许还没什么，但是如果reflow发生在手机上，那么这个过程是非常痛苦和耗电的。
所以，下面这些动作有很大可能会是成本比较高的。

当你增加、删除、修改DOM结点时，会导致Reflow或Repaint
当你移动DOM的位置，或是搞个动画的时候。
当你修改CSS样式的时候。
当你Resize窗口的时候（移动端没有这个问题），或是滚动的时候。
当你修改网页的默认字体时。
注：display:none会触发reflow，而visibility:hidden只会触发repaint，因为没有发现位置变化。
多说两句关于滚屏的事，通常来说，如果在滚屏的时候，我们的页面上的所有的像素都会跟着滚动，那么性能上没什么问题，因为我们的显卡对于这种把全屏像素往上往下移的算法是很快。但是如果你有一个fixed的背景图，或是有些Element不跟着滚动，有些Elment是动画，那么这个滚动的动作对于浏览器来说会是相当相当痛苦的一个过程。你可以看到很多这样的网页在滚动的时候性能有多差。因为滚屏也有可能会造成reflow。

基本上来说，reflow有如下的几个原因：

Initial。网页初始化的时候。
Incremental。一些Javascript在操作DOM Tree时。
Resize。其些元件的尺寸变了。
StyleChange。如果CSS的属性发生变化了。
Dirty。几个Incremental的reflow发生在同一个frame的子树上。
好了，我们来看一个示例吧：

var bstyle = document.body.style; // cache

bstyle.padding = "20px"; // reflow, repaint
bstyle.border = "10px solid red"; //  再一次的 reflow 和 repaint

bstyle.color = "blue"; // repaint
bstyle.backgroundColor = "#fad"; // repaint

bstyle.fontSize = "2em"; // reflow, repaint

// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
当然，我们的浏览器是聪明的，它不会像上面那样，你每改一次样式，它就reflow或repaint一次。一般来说，浏览器会把这样的操作积攒一批，然后做一次reflow，这又叫异步reflow或增量异步reflow。但是有些情况浏览器是不会这么做的，比如：resize窗口，改变了页面默认的字体，等。对于这些操作，浏览器会马上进行reflow。

但是有些时候，我们的脚本会阻止浏览器这么干，比如：如果我们请求下面的一些DOM值：

offsetTop, offsetLeft, offsetWidth, offsetHeight
scrollTop/Left/Width/Height
clientTop/Left/Width/Height
IE中的 getComputedStyle(), 或 currentStyle
因为，如果我们的程序需要这些值，那么浏览器需要返回最新的值，而这样一样会flush出去一些样式的改变，从而造成频繁的reflow/repaint。

减少reflow/repaint
下面是一些Best Practices：

1）不要一条一条地修改DOM的样式。与其这样，还不如预先定义好css的class，然后修改DOM的className。

// bad
var left = 10,
top = 10;
el.style.left = left + "px";
el.style.top  = top  + "px";

// Good
el.className += " theclassname";

// Good
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
2）把DOM离线后修改。如：

使用documentFragment 对象在内存里操作DOM
先把DOM给display:none(有一次reflow)，然后你想怎么改就怎么改。比如修改100次，然后再把他显示出来。
clone一个DOM结点到内存里，然后想怎么改就怎么改，改完后，和在线的那个的交换一下。

3）不要把DOM结点的属性值放在一个循环里当成循环里的变量。不然这会导致大量地读写这个结点的属性。

4）尽可能的修改层级比较低的DOM。当然，改变层级比较底的DOM有可能会造成大面积的reflow，但是也可能影响范围很小。

5）为动画的HTML元件使用fixed或absoult的position，那么修改他们的CSS是不会reflow的。

6）千万不要使用table布局。因为可能很小的一个小改动会造成整个table的重新布局。

setState异步?
batch updates
For example, if we’re inside a browser click handler, and both Child and Parent call setState, we don’t want to re-render the Child twice, and instead prefer to mark them as dirty, and re-render them together before exiting the browser event.

Guaranteeing Internal Consistency
Even if state is updated synchronously, props are not. (You can’t know props until you re-render the parent component, and if you do this synchronously, batching goes out of the window.)

Enabling Concurrent Updates
One way we’ve been explaining “async rendering” is that React could assign different priorities to setState() calls depending on where they’re coming from: an event handler, a network response, an animation, etc.

For example, if you are typing a message, setState() calls in the TextBox component need to be flushed immediately. However, if you receive a new message while you’re typing, it is probably better to delay rendering of the new MessageBubble up to a certain threshold (e.g. a second) than to let the typing stutter due to blocking the thread.

However, if the navigation is fast enough (within a second or so), flashing and immediately hiding a spinner causes a degraded user experience. Worse, if you have multiple levels of components with different async dependencies (data, code, images), you end up with a cascade of spinners that briefly flash one by one. This is both visually unpleasant and makes your app slower in practice because of all the DOM reflows. It is also the source of much boilerplate code.

Wouldn’t it be nice if when you do a simple setState() that renders a different view, we could “start” rendering the updated view “in background”? Imagine that without any writing any coordination code yourself, you could choose to show a spinner if the update took more than a certain threshold (e.g. a second), and otherwise let React perform a seamless transition when the async dependencies of the whole new subtree are satisfied. Moreover, while we’re “waiting”, the “old screen” stays interactive (e.g. so you can choose a different item to transition to), and React enforces that if it takes too long, you have to show a spinner.

It turns out that, with current React model and some adjustments to lifecycles, we actually can implement this! @acdlite has been working on this feature for the past few weeks, and will post an RFC for it soon.

Note that this is only possible because this.state is not flushed immediately. If it were flushed immediately, we’d have no way to start rendering a “new version” of the view in background while the “old version” is still visible and interactive. Their independent state updates would clash.

I don’t want to steal the thunder from @acdlite with regards to announcing all of this but I hope this does sound at least a bit exciting. I understand this still might sound like vaporware, or like we don’t really know what we’re doing. I hope we can convince you otherwise in the coming months, and that you’ll appreciate the flexibility of the React model. And as far as I understand, at least in part this flexibility is possible thanks to not flushing state updates immediately.


GC:
nodejs进程内存的垃圾回收和内存泄漏
V8的GC原理
nodejs进程使用的内存主要在堆（heap）中， 垃圾回收采用分代式，分为新生代和老生代。 新生代中保存存活时间较短的对象，老生代中保存存活时间较长或常驻内存的对象。
新生代通过Parallel Scavenge算法进行垃圾回收，即并行的多线程，复制算法垃圾收集器。
原理是：将堆内存一分为二，每一部分空间称为semispace。在两个semispace空间中，只有一个处于使用状态，另一个处于闲置状态。处于使用状态的semispace空间称为from，处于限制状态的空间称为to空间。

当我们分配对象时，先是在from空间中进行分配。当from空间不够用时就处罚一次新生代的垃圾回收，此时会检查from中的存活对象，并复制到to空间中，非存活的对象会被释放。完成该复制操作后，from空间和to空间互换。此时完成新生代堆内存的一次垃圾回收。
当一个对象经过多次复制依然存活，那么它将被放到老生代内存中。

老生代内存垃圾回收采用 Mark-sweep(标记清除)和Mark-Compact(标记整理), 并进行增量式垃圾回收。 和分代时垃圾回收相比，前者的空间利用率高，但效率低，由于老生代堆内存较大，一次垃圾回收会导致进程暂停时间很长，所以不会经常进行老生代垃圾回收。

实际编码中由于对变量作用域或闭包等使用不当，很可能造成内存的泄漏。在浏览器中由于页面一般情况下只加载一次，或只停留较短的时间，就算有内存泄漏也不会造成很大影响。但在服务端，就算只有一个字节的泄漏，在大量请求和高并发的请求下，泄漏会被放大，随着服务的运行时间越来越长，进程的内存占满，导致内存不足进程退出，就会会对服务器造成很大的影响。

When the browser encounters a <script> tag, it must pause rendering and execute the script immediately. Find scripts that aren't needed for page load and mark them asynchronous or defer their execution to speed up load time.

图片太大可转成svg

loading perf
rendering perf

Performance is about retaining users
提高转化率

Migrate to HTTP/2. HTTP/2 addresses many performance problems inherent in HTTP/1.1, such as concurrent request limits and the lack of header compression.
使用加载提示:
Preload
<link rel="preload"> informs the browser that a resource is needed as part of the current navigation, and that it should start getting fetched as soon as possible. Here’s how you use it:
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css">
Preconnect
Eliminating Roundtrips with Preconnect
The "simple" act of initiating an HTTP request can incur many roundtrips before the actual request bytes are routed to the server: the browser may have to resolve the DNS name, perform the TCP handshake, and negotiate the TLS tunnel if a secure socket is required. 
<link href='https://fonts.gstatic.com' rel='preconnect' crossorigin>
<link href='https://fonts.googleapis.com/css?family=Roboto+Slab:700|Open+Sans' rel='stylesheet'>
In the second trace, we add the preconnect hint in our markup indicating that the application will fetch resources from fonts.gstatic.com. As a result, the browser begins the socket setup in parallel with the CSS request, completes it ahead of time, and allows the font requests to be sent immediately! In this particular scenario, preconnect removes three RTTs from the critical path and eliminates over half of second of latency.
In addition to declaring the preconnect hints via HTML markup, we can also deliver them via an HTTP Link header. 

http2配合webpack codesplitting
Modern sites ship a lot of JavaScript and CSS on average. It was common to bundle styles and scripts into large bundles in HTTP/1 environments. This was done because a large amount of requests was detrimental to performance. This is no longer the case now that HTTP/2 is on the scene, as multiple, simultaneous requests are cheaper. Consider using code splitting in webpack to limit the amount of scripts downloaded to only what is needed by the current page or view. Separate your CSS into smaller template or component-specific files, and only include those resources where they're likely to be used.

uglify js, svg是基于文本的图像格式，可以用svgo优化
服务端开启gzip压缩（ Brotli compression 更好）content-encoding: br
优化图片 ImageOptim, Progressive JPEG, 使用webP(有损压缩)
Common image optimizations include compression, responsively serving them down based on screen size using <picture>/<img srcset>, and resizing them to reduce image decode costs.
使用media属性
<picture>
 <source srcset="mdn-logo-wide.png" media="(min-width: 600px)">
 <img src="mdn-logo-narrow.png" alt="MDN">
</picture>

off-screen and could be lazy-loaded

<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>

gif转webm

加载优先级
渐进增强
define the basic core experience (fully accessible core content for legacy browsers), the enhanced experience (an enriched, full experience for capable browsers) and the extras (assets that aren’t absolutely required and that can be lazy-loaded, such as fonts, carousel scripts, video players, social media buttons)

SPA
Parsing JavaScript is expensive, so keep it small.With SPAs, you might need some time to initialize the app before you can render the page. Look for modules and techniques to speed up the initial rendering time (it can easily be 2–5x times higher on low-end mobile devices). Thoroughly examine every single JavaScript dependency to see where you are losing initial booting time.

异步加载js async or defer（defer支持ie低版本，async是html5的，尽量用async）
If you don’t have to worry much about IE 9 and below, then prefer defer to async; otherwise, use async
<script async src="script.js"></script>

有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

<script defer src="myscript.js"></script>

有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成

限制第三方脚本的影响
Content Security Policy (CSP) to restrict the impact of third-party scripts, e.g. disallowing the download of audio or video. Embed scripts via iframe, so scripts don't have access to the DOM. Sandbox them, too. 
内容安全策略 (CSP, Content Security Policy) 是一个附加的安全层，用于帮助检测和缓解某些类型的攻击，包括跨站脚本 (XSS) 和数据注入等攻击
content-security-policy: script-src https://connect.facebook.net https://cm.g.doubleclick.net https://ssl.google-analytics.com https://graph.facebook.com 

由于服务器指定Cookie后，浏览器的每次请求都会携带Cookie数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器API已经允许开发者直接将数据存储到本地，如使用 Web storage API （本地存储和会话存储）或 IndexedDB

当服务器收到HTTP请求时，服务器可以在响应头里面添加一个Set-Cookie选项。浏览器收到响应后通常会保存下Cookie，之后对该服务器每一次请求中都通过Cookie请求头部将Cookie信息发送给服务器。另外，Cookie的过期时间、域、路径、有效期、适用站点都可以根据需要来指定
Cookie的Secure 和HttpOnly 标记

pv 30000多 per 10min 1 day 300多w
8w 多crawler 1 day 判断为爬虫跳错误页

traditional performance metrics like load time or DOMContentLoaded time are extremely unreliable since when they occur may or may not correspond to when the user thinks the app is loaded.

 If your website is running over HTTPS, then cache static assets in a service worker cache, and store offline fallbacks (or even offline pages) and retrieve them from the user’s machine, rather than going to the network.

 动画10ms(16.66)
 响应100ms以内

 FP
 Developers often talk about measurable concepts like Time To Interactivity (TTI) or First Meaningful Paint (FMP) 以用户能看到的时间为准
 即能用户能最快看到页面内容，最快地交互
 First meaningful paint (FMP) 用户最关心的内容
 task < 100ms
 The TTI metric identifies the point at which the page's initial JavaScript is loaded and the main thread is idle

 (function detectLongFrame() {
  var lastFrameTime = Date.now();
  requestAnimationFrame(function() {
    var currentFrameTime = Date.now();

    if (currentFrameTime - lastFrameTime > 50) {
      // Report long frame here...
    }

    detectLongFrame(currentFrameTime);
  });
}());

TTFB:
Consider hosting your content on a CDN or changing hosting providers.
Send fewer bytes by optimizing your requests.

webpack:
webpack.optimize.UglifyJsPlugin()
{ loader: 'css-loader', options: { minimize: true } },
When you use ES modules, webpack becomes able to do tree-shaking.
 Tree-shaking is when a bundler traverses the whole dependency tree, checks what dependencies are used, and removes unused ones. 
 CommonsChunkPlugin

*/