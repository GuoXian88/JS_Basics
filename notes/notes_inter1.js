//closure
for (var i = 1; i <= 3; i++) {
    (function(index) {
        setTimeout(function() { alert(index); }, i * 1000);
    })(i);
}

/*性能优化：
-接口服务调用优化
接口合并，异步调用取最慢的
减少接口交互数据
减少接口调用次数，缓存机制
内部服务调用DNS缓存，DNS应用端cache
计算密集型的用nodejs原生实现
首屏直出:
简化DOM结构,抽离首屏的样式,需要展示的部分如图片和字体优先加载，延迟js加载放底部body之前防止其阻塞渲染,ssr: React 16：streaming ssr allows you send HTML in chunks
in parallel to rendering it.
图片优化
Image optimization: Choose the right format, compress carefully and prioritize critical images over those that can be lazy-loaded.
Common image optimizations include compression, responsively serving them down based on screen size using <picture>/<img srcset>, and resizing them to reduce image decode costs.
工具测试
Lighthouse audits for performance best practices. It includes audits for image optimisation and can make suggestions for images that could be compressed further or point out images that are off-screen and could be lazy-loaded.
npm install -g lighthouse
# or use yarn:# yarn global add lighthouse
You may also be familiar of other performance auditing tools like PageSpeed Insights or Website Speed Test by Cloudinary which includes a detailed image analysis audit.
Baseline JPEGs load images from top to bottom. PJPEGs load from low-resolution (blurry) to high-resolution. Pat Meenan wrote an interactive tool to test out and learn about Progressive JPEG scans too.


The advantages of Progressive JPEGsThe ability for PJPEGs to offer low-resolution ‘previews’ of an image as it loads improves perceived performance – users can feel like the image is loading faster compared to adaptive images.

On slower 3G connections, this allows users to see (roughly) what’s in an image when only part of the file has been received and make a call on whether to wait for it to fully load. This can be more pleasant than the top-to-bottom display of images offered by baseline JPEGs.
Note: Why do PJPEGs compress better? Baseline JPEG blocks are encoded one at a time. With PJPEGs, similar Discrete Cosine Transform coefficients across more than one block can be encoded together leading to better compression.
How do you create Progressive JPEGs?Tools and libraries like ImageMagick, libjpeg, jpegtran, jpeg-recompressand imagemin support exporting Progressive JPEGs. If you have an existing image optimization pipeline, there’s a good likelihood that adding progressive loading support could be straight-forward:
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist'));       
});

缓存优化
设置header的max-age(s)
预加载和懒加载
首屏结束后预加载
DNS预读取配置的DNS解析，可以减少DNS的次数,也可以加速不同域名
的资源的加载:
对特定域名进行预读取
<link rel="dns-prefetch" href="//cdn."
减少站点使用DNS的数量，可去掉部分二级域名
X-DNS-Prefetch-Control: on/off 头控制着浏览器的 DNS 预读取功能
DNS 预读取是一项使浏览器主动去执行域名解析的功能，其范围包括文档的所有链接，无论是图片的，CSS 的，还是 JavaScript 等其他用户能够点击的 URL
配置方式是服务端发送报头或者是meta标签
<meta http-equiv="x-dns-prefetch-control" content="off">
HTML <meta> 元素表示那些不能由其它HTML元相关元素 (<base>, <link>, <script>, <style> 或 <title>) 之一表示的任何元数据信息.
content
基于内容，这个属性为 http-equiv 或 name 属性提供了与其相关的值的定义.
http-equiv
这个枚举属性定义了能改变服务器和用户引擎行为的编译。这个编译值使用content 来定义


css与js优化
多页面css与js
浏览器渲染过程：
处理HTML标记构建DOM树
处理CSS标记构建CSSOM树
两个树合并成一个渲染树
布局layout，计算每个节点的几何信息
paint将各个节点绘制到屏幕上

动画优化
尽量使用css3动画,transform, opacity, will-change, translateZ
js用requestAnimationFrame

TTFB
CSS sprite
使用CDN
通过在现有的Internet中增加一层新的网络架构，将网站的内容发布到最接近用户的cache服务器内，通过DNS负载均衡的技术，判断用户来源就近访问cache服务器取得所需的内容。

缓存利用可包括：添加 Expires 头，配置 ETag，使 Ajax 可缓存等。其实，恰当的缓存设置可以大大的减少 HTTP请求，也可以节省带宽 。

- 配置 ETag：即If-None-Match: 上次 ETag 的内容。浏览器会发出请求询问服务端，资源是否过期；服务端发现,没有过期，直接返回一个状态码为304、正文为空的响应，告知浏览器使用本地缓存；如果资源有更新，服务端返回状态码 200、Etag 和正文。这个过程被称之为 HTTP 的协商缓存，通常也叫做弱缓存。

- 添加 Expires 头：服务端通过响应头告诉浏览器，在什么时间之前（Expires）或在多长时间之内（Cache-Control: Max-age=xxx），不要再请求服务器了。这个机制我们通常称之为 HTTP 的强缓存。一般会对 CSS、JS、图片等资源使用强缓存，而入口文件（HTML）一般使用协商缓存或不缓存。

- AppCache：
AppCache主要利用manifest 文本文件，告知浏览器被缓存的内容以及不缓存的内容
manifest 文件可分为三个部分：
（1） CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存，等价于CACHE
（2） NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
（3） FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面


LocalStorage：用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

- 减少请求数:
小图片合并雪碧图
JS、CSS文件选择性合并,服务端压缩gzip
避免重复的资源请求

一个完整的请求需要经过域名解析以及DNS寻址、与服务器建立连接、发送数据、等待服务器响应、接收数据的过程

- 合理使用静态资源域名
域名的要求是短小且独立。
短小可以减少头部开销，因为域名越短请求头起始行的 URI 就越短。之所以要求独立，因为独立域名不会共享主域的 Cookie，可以有效减小请求头大小，这个策略一般称之为 Cookie-Free Domain；另外一个原因是浏览器对相同域名的并发连接数限制，一般允许同域名并发 6~8 个连接，域名不是越多越好，每个域名的第一个连接都要经历 DNS 查询（DNS Lookup），导致会耗费一定的时间，控制域名使用在2-4个之间。另外注意：同一静态资源在不同页面被散列到不同子域下，会导致无法利用 HTTP 缓存。

html的代码优化，如：
避免空的图片src；
协议自适应，减少html文件大小，将https://和http://都替换成//。
css的代码优化，如：
建议使用类选择器，访问比较快；
不建议使用很长的base64；
避免CSS表达式；
避免使用Filters。
js的代码优化，如：
避免使用eval和width；
减少作用域链查找；
减少DOM访问，尽量缓存DOM；
充分利用事件委托；
减少Repaint（重绘）和Reflow（重排）最好通过批量更新元素减少重排次数，如设置类class统一更新样式，在添加多个li
元素将会触发多次页面重排的情况下使用 DOM fargment 在内存中创建完整的 DOM 节点，然后再一次性添加到 DOM 中。
图片格式的选择：
颜色较为丰富的图片而且文件比较大的（40KB - 200KB）或者有内容的图片优先考虑 jpg；图标等颜色比较简单、文件体积不大、起修饰作用的图片，优先考虑使用 PNG8 格式；图像颜色丰富而且图片文件不太大的（40KB 以下）或有半透明效果的优先考虑 PNG24 格式。
条件允许的，使用新格式WEBP和BPG。
用SVG和ICONFONT代替简单的图标。
用字蛛来代替艺术字体切图，它可剔除没有使用的字符，从而解决中文字体过大的问题，并编码成跨平台兼容的格式。

3.3浏览器安全

3.3.1 同源策略

首先了解一下同源策略：

源指的是有相同的HOST、相同的协议、相同的端口。
同源策略以源为单位，把资源天然分隔，保护了用户的信息安全。
绕过同源策略让javascript访问其他源的资源的方法，如：JSONP、CORS、flash等。
同源策略不是绝对安全的，面对很多攻击是无能为力的，比如XSS，因为此时攻击者就在同源之内。
不建议使用JSONP，因为JSONP通常在脚本中写一个回调函数，然后把回调函数的名字写在请求的URL中，因此如果请求数据的服务器被黑了，那么黑客就能在返回的数据中植入恶意代码，从而窃取用户的隐私信息。

跨域资源共享CORS允许资源提供方在响应头中加入一个特殊的标记，使你能通过XHR来获取、解析并验证数据。这样就能避免恶意代码在你的应用中执行。在响应头中加入的标记如下：

1
Access-Control-Allow-Origin: allowed origins
如果对Access–Control-Allow-Origin设置为*其实是比较危险的，如果没有携带会话认证意味着信息被公开在全网，建议设置具体的域名，而且跨域的时候记得带上session id；严格审查请求信息，比如请求参数，还有http头信息，因为 http头可以伪造。

3.3.2 CSP(Content Security Policy)

CSP指定网站上所有脚本和图片等资源的源站点，也能阻止所有内联（inline）的脚本和样式。即使有人在页面评论或者留言中嵌入了脚本标签，这些脚本代码也不会被执行。可通过两种方式设置，如果 HTTP 头与 Meta 定义同时存在，则优先采用 HTTP 头中的定义：

通过 HTTP 头，比如只允许脚本从本源加载：Content-Security-Policy: script-src ‘self’，其中script-src ‘self’是策略。
通过HTML的Meta标签，比如只允许脚本从本源加载：

1
<meta http-equiv="Content-Security-Policy" content="script-src 'self'">
其他策略：

script-src – 设置可以接受的JavaScript代码的源站点
style-src – 设置可以接受的CSS样式代码的源站点
connect-src – 定义浏览器可以通过XHR、WebSocket或者 EventSource访问哪些站点
font-src – 设置可以接受的字体文件的源站点
frame-src – 定义浏览器可以通过iframe访问哪些站点
img-src – 设置可以接受的图片的源站点
media-src – 设置可以接受的音频和视频文件的源站点
object-src – 设置可以接受的Flash和其它插件的源站点
缺点：
默认情况下，所有的内联JavaScript脚本都不会被执行，因为浏览器无法区分自己的内联脚本和黑客注入的脚本。
CSP还会默认阻止所有eval()风格的代码的执行，包括setInterval/setTimeout中的字符串和类似于new Function(‘return false’)之类的代码。

3.3.3 iframe 沙箱环境

利用iframe进行跨源：HTML5为iframe提供了安全属性 sandbox，iframe的能力将会被限制。

3.3.4 Secure和HttpOnly属性

Secure能确保cookie的内容只能通过SSL连接进行传输。Secure和HttpOnly属性告诉浏览器cookie的内容只能分别通过HTTP(S)协议进行访问，从而避免了被轻易窃取，比如禁止从JavaScript中的document.cookie访问，因此cookie在浏览器document中不可见了。如果单独使用的话，无法全面抵御跨站点脚本攻击，通常和其他技术组合使用。使用方法如下：

1
Set-Cookie: <name>=<value>[; <name>=<value>] [; expires=<date>][; domain=<domain_name>][; path=<some_path>][; secure][; HttpOnly]
3.3.5 其他安全相关的HTTP 头

X-Content-Type-Options 告诉浏览器相信此服务器下发的资源的类型，防止类型嗅探攻击。

HPKP(Public Key Pinning) Public Key Pinning 是一个response 头，用来检测一个证书的公钥是否发生了改变，防止中间人攻击。

HSTS (HTTP Strict-Transport-Security) 强制使用TSL作为数据通道。

3.4 HTML5 对web安全的影响

html5有很多新的特性能力，然而能力越大，被攻破后的危险就越大。
HTML5 对xss的影响主要体现在:

攻击面更大，html5带来更多的标签和更多的属性如<video>,<audio>,<canvas>等；
危害更大，HTML5更多的资源可以被xss利用。黑客可以利用浏览器的一切权限，比如本地存储、GEO、服务器推送机制WebSocket，js多线程执行Webworker等。
比如localstorage只能通过js设置和获取，导致的结果是不能像cookie一样设置httponly等属性，所以localstorage中不能存放敏感信息，最好能够在服务端进行加密，可以配合CORS来获取网站的localstorage的信息。

4 响应式

响应式布局简而言之，就是一个网站能够兼容多个终端，可以为不同终端的用户提供更加舒适的界面和更好的用户体验。

基于栅格布局规划响应式设计，每个模块尽可能严格遵循栅格布局，符合栅格的小模块能很灵活的适应多个分辨率的展示。
拥抱flexbox。
使用动态的字体大小单位+rem单位使用。
使用CSS3 mediaQuery 技术响应用户设备。
利用百分比。
对低版本浏览器使用JS动态响应。
一套“自适应”素材兼容各种分辨率，提升页面性能，比如自适应的图片/视频素材。

6 搜索SEO

6.1 语义化

标签语义化对搜索引擎友好，良好的结构和语义容易被搜索引擎抓取。
善用标题h1，h2，h3，h4，h5，h6，特别是h1和h2；H(x)标签中使用关键字，可提升排名。同时设置 rel=“nofollow”避免权重流失。
使用 HTML5 中的 Microdata 对 Web 页面上已经存在的数据提供附加的语义。Microdata 由名字 / 值（name/value）对组成，每一个词汇表定义一组命名的属性。对 Microdata 的支持可以影响搜索结果的显示，使得显示结果更加丰富，虽然不能影响搜索结果的排名，但是网站的流量可能会有所增加。类似的技术还有资源描述框架RDF、微格式Microformat 。
6.2 衡量站点关键词优化

站点内容以及关键词的选择。
描述标签、关键词标签、代替属性。
长尾关键词：非目标关键词但也可以带来搜索流量的关键词；例如，目标关键词是服装，其长尾关键词可以是男士服装、冬装、户外运动装等。长尾关键词基本属性是：可延伸性，针对性强，范围广。
关键词的分布情况。
关键词密度、看重：合理的关键字密度可获得较高的排名位置，密度过大会起到相反的效果。一般说来，在大多数的搜索引擎中，关键词密度在2%~8%是一个较为适当的范围，有利于网站在搜索引擎中排名。
是否存在作弊行为。
6.3 链接

优化文件目录结构和URL。URL应该有语义性，简短易懂。
通过推广暴露自己的链接，增加信任度。链接分为外向链接和内向（反向）链接，外向链接就是从本站点到其他站点，内向链接就是从其他站点到我的站点，可以尝试使用反向链接生成器。或者通过写软文、发布分类信息、发布博客文章来推广自己的网站。
锚文本 ：把关键词做一个链接，指向别的网页，这种形式的链接就叫作锚文本。搜索引擎可以根据指向某一个网页的链接的锚文本描述来判断该网页的内容属性。

