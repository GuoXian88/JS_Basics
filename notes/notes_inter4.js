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

简单层与复合层
上述中的渲染中止步于绘制，但实际上绘制这一步也没有这么简单，它可以结合复合层和简单层的概念来讲。这里不展开，进简单介绍下：

可以认为默认只有一个复合图层，所有的DOM节点都是在这个复合图层下的

如果开启了硬件加速功能，可以将某个节点变成复合图层

复合图层之间的绘制互不干扰，由GPU直接控制

而简单图层中，就算是absolute等布局，变化时不影响整体的回流，但是由于在同一个图层中，仍然是会影响绘制的，因此做动画时性能仍然很低。而复合层是独立的，所以一般做动画推荐使用硬件加速


React
“合成事件”会以事件委托（event delegation）的方式绑定到组件最上层，并且在组件卸载（unmount）的时候自动销毁绑定的事件。

Units of functionality should be loosely coupled, that is, a unit of functionality should be able to exist on its own, and communication between units should be handled via a messaging system such as custom events or pub/sub. Stay away from direct communication between units of functionality whenever possible.

目前弱项：
nodejs， 移动端 

如果让你来做好这个页面，要怎么做
性能优化，提高转化率
与用户相关的指标， FMP, TTI
前端定义契约接口不会有安全问题吗?数据是明文传输，容易被窃取

所以分为请求参数和响应参数： 
- 请求参数中包含用户隐私的字段参数，如：登陆接口的密码字段，需要进行加密传输，避免被代理捕捉请求后获取明文密码。

响应参数中包含用户隐私的字段数据，需要加*号。如：手机号，身份证，用户邮箱，支付账号，邮寄地址等。
 "phone":"150*****000",
 "idCard":"3500**********0555",  
 "email":"40*****00@qq.com"     
}
1
2
3
4
客户端和服务器通过约定的算法，对传递的参数值进行签名匹配，防止参数在请求过程中被抓取篡改
保护接口的方式最基本的是SSL/TLS，然后呢：

对称加密的方式
非对称加密的方式
动态秘钥

你项目中碰到的最大困难是什么
项目还有优化的空间吗
如果没有框架要怎么办
项目架构


SEO
网上搜索amp标准/原则? ssr是一种解决方法 node做中间层直出
老板问要怎么提高SEO，你要具体从哪几方面入手

凡事多思考优点和缺点
immutablejs的优缺点? 体积大，api学习成本，如果以后出来新的要更换成本大，考虑用immerjs

1000个列表渲染拉到最后面往向滑的时候会卡顿的问题怎么解决
渲染当前屏和前一屏后一屏

前端工程化怎么做?具体从小到大，包括js监控等等
构建、部署及前端运维
前后端后离
工程化设计要合理分层且相互独立，随时应对新需求和技术的变化，任何一层能够低成本被替换、淘汰
Node服务：用于实现前后端分离，核心功能是实现数据代理中转，附带url路由分发和服务端渲染功能。
Web应用开发：纯粹的前端模块，给予前端工程师极大的自由度进行技术选型，专注于Web交互体验的开发。
前端运维：主要指前端项目构建和部署、工程质量（源码质量检查和测试等）及监控服务（日志、性能等）等工作。

数据代理
首先，前端数据从何而来？通过Ajax的形式直接从后端服务中获取数据是传统的方式，但是在应对多后端服务时，还是面临着诸如请求认证、CORS(Cross-origin resource sharing)等困扰。常见的解决方案是通过http-proxy，即在Node端通过HTTP请求得到数据后，Web端再通过Ajax的方式从Node端间接获取后端数据，Node服务起到“桥梁”的作用。
Ajax请求从Node端代理，而非具体后端服务。
鼓励将JavaScript、CSS、HTML视为前端领域的“汇编”。
重视前端页面状态管理，推荐的方案有Redux、vuex及MobX等。
强调组件化，面向组件集开发。
这里重点强调下面向组件集的前端开发。在项目初期我们一般不会马上投入到业务开发，而是针对设计师和产品经理提供的设计稿、产品原型图实现一套组件集或选择合适的开源组件集，积累好基础组件集后再投入到具体业务开发

前端工程的三个阶段
第一阶段：库/框架选型
第二阶段：简单构建优化
第三阶段：JS/CSS模块化开发
很多人觉得模块化开发的工程意义是复用，我不太认可这种看法，在我看来，模块化开发的最大价值应该是分治，是分治，分治！（重说三）不管你将来是否要复用某段代码，你都有充分的理由将其分治为一个模块
前端是一种技术问题较少、工程问题较多的软件开发领域
当我们要开发一款完整的Web应用时，前端将面临更多的工程问题，比如：

大体量：多功能、多页面、多状态、多系统；
大规模：多人甚至多团队合作开发；
高性能：CDN部署、缓存控制、文件指纹、缓存复用、请求合并、按需加载、同步/异步加载、移动端首屏CSS内嵌、HTTP 2.0服务端资源推送。

url的修改与文件内容关联 href="a.css?v=0abc23" 只有当文件内容改变了之后才更新缓存
现代互联网企业，为了进一步提升网站性能，会把静态资源和动态网页分集群部署，静态资源会被部署到CDN节点上，网页中引用的资源也会变成对应的部署路径
用文件的摘要信息来对资源文件进行重命名，把摘要信息放到资源文件发布路径中，这样，内容有修改的资源就变成了一个新的文件发布到线上，不会覆盖已有的资源文件。上线过程中，先全量部署静态资源，再灰度部署页面，整个问题就比较完美的解决了
配置超长时间的本地缓存 —— 节省带宽，提高性能
采用内容摘要作为缓存更新依据 —— 精确的缓存控制
静态资源CDN部署 —— 优化网络请求
更资源发布路径实现非覆盖式发布 —— 平滑升级
前端性能优化绝逼是一个工程问题！
建议前端工程师多多关注前端工程领域，也许有人会觉得自己的产品很小，不用这么变态，但很有可能说不定某天你就需要做出这样的改变了。而且，如果我们能把事情做得更极致，为什么不去做呢？
另外，也不要觉得这些是运维或者后端工程师要解决的问题。如果由其他角色来解决，大家总是把自己不关心的问题丢给别人，那么前端工程师的开发过程将受到极大的限制，这种情况甚至在某些大公司都不少见！
进入第四阶段，我们只需做好两件事就能大幅提升前端开发效率，并且兼顾运行性能，那就是——组件化开发与资源管理

页面上的每个 独立的 可视/可交互区域视为一个组件；
每个组件对应一个工程目录，组件所需的各种资源都在这个目录下就近维护；
由于组件具有独立性，因此组件与组件之间可以 自由组合；
页面只不过是组件的容器，负责组合组件形成功能完整的界面；
当不需要某个组件，或者想要替换组件时，可以整个目录删除/替换。

我本人非常反对某些前端团队将前端开发划分为“JS开发”和“页面重构”两种岗位，更倾向于组件粒度的开发理念，对GUI软件开发的分工规划应该以功能为单位，而不是开发语言；对开发者的技术要求也应该是掌握完整的端内技术

由“增量”原则引申出的前端优化技巧几乎成为了性能优化的核心，有加载相关的按需加载、延迟加载、预加载、请求合并等策略；有缓存相关的浏览器缓存利用，缓存更新、缓存共享、非覆盖式发布等方案；还有复杂的BigRender、BigPipe、Quickling、PageCache等技术。这些优化方案无不围绕着如何将增量原则做到极致而展开

第四阶段前端开发最迫切需要做好的就是在基础架构中贯彻增量原则。


组织架构：前端开发规范和架构设计，包括模块化/组件化开发模型、开发框架、目录规范、组织形式等。
工程部署：有关前端项目的部署方式，比如静态资源部署，CDN缓存接入，模板部署等。
性能优化：网站性能优化的工程化方法，比如按需加载、打包合并、资源缓存等
工具平台：构建工具与开发平台
开发流程：前端开发流程，包括开发、测试、部署等环节的打通
统计监控：用户行为与网站状态监控，比如pv/uv、访问路径、用户信息、网站性能等
前端安全：前端安全防范的工程化方法，比如xss、csrf等
系统测试：前端系统测试的工程化方法


老板发现性能不好，要做性能优化，你具体从哪方面开始?
用户在差的网络状况下怎么能判断你的页面性能是好还是不好呢？这个可以利用ubt埋点来得到页面的性能指标,这些都是真实的数据
埋点这块多看看文章

第一类是代码埋点，即在需要埋点的节点调用接口直接上传埋点数据 命令式编程
第二类是可视化埋点，即通过可视化工具配置采集节点，在前端自动解析配置并上报埋点数据，从而实现所谓的“无痕埋点”， 代表方案是已经开源的Mixpanel
第三类是“无埋点”，它并不是真正的不需要埋点，而是前端自动采集全部事件并上报埋点数据，在后端数据计算时过滤出有用数据，代表方案是国内的GrowingIO
公司原有埋点主要采用手动代码埋点的方案，代码埋点虽然使用起来灵活，但是开发成本较高，并且一旦上线就很难修改。如果发生严重的数据问题，我们只能通过发热修复解决。如果直接改进为可视化埋点，开发成本较高，并且也不能解决所有埋点需求；改进为无埋点的话，带来的流量消耗和数据计算成本也是业务不能接受的。因此，我们在原有代码埋点方案的基础上，演化出了一套轻量的、声明式的前端埋点方案，并且在动态埋点、无痕埋点等方向做了进一步的探索和实践

声明式埋点的思路是将埋点代码和具体的交互和业务逻辑解耦，开发者只用关心需要埋点的控件，并且为这些控件声明需要的埋点数据即可，从而降低埋点的成本 声明式埋点能够替代所有的代码埋点，并且能解决早期遇到的移植成本高等问题。但是其本质上还是一种代码埋点，只是埋点的代码减少了，并且不再侵入业务逻辑了。如果要满足动态部署与修复埋点的需求，就需要彻底消灭写死在前端的埋点代码

我们注意到，之所以声明式埋点还需要写死代码，主要有两个原因：第一是需要声明埋点控件的唯一事件标识，即bid；第二是有的业务字段需要在前端埋点时携带，而这些字段是在运行时才可获知的值。

对于第一点，我们可以尝试在前后端使用一致的规则自动生成事件标识，这样后端就可以配置前端的埋点行为，从而做到自动化埋点。对于第二点，可以尝试通过某种方式将业务数据自动与埋点数据关联，这种关联可以发生在前端，也可以发生在后端

之所以使用图片请求后端controller而不是ajax直接访问，原因在于ajax不能跨域请求，ma.js和后端分析的代码可能不在相同的域内，ajax做不到，而将image对象的src属性指向后端脚本并携带参数，就轻松实现了跨域请求



不需要登录的可供开放性的用户访问的页面，就要考虑seo
一句话：没有太多个性化内容的页面。
填写页是属于个性化比较强的页面，比如订单号

因为搜索引擎在爬数据时，js不一定会执行,所以ssr有助于seo
静态页面直出
动态页面是需要后台解析成html
静态和动态，只是为了降低服务器压力，和seo无关
seo的目的 就是便于url被收录，只要你的url符合爬虫的最佳规范，则就利于收录

uv 3000 per minute

this.setState要取到新的this.state可以用setTimeout
跨域问题CORS的原理， 有两层拦截，一层是浏览器，一层是后台
es5怎么实现es6-promise, promise解决了什么问题，api, 解耦，callback hell, 链式调用(continuous passing style)
https加密算法，公钥私钥证书,即有对称加密也有非对称加密
http请求是有数目限制的，怎么突破，除了域名分区还有其他方式吗
css实现2列布局
浮动和定位的关系
清除浮动
css3 animation
移动端通过获取设备分辨率再用rem来进行响应式布局
行内元素
css游览器兼容问题，js浏览器兼容问题
prototype的优点和缺点
为什么有class
prototype与this.p有啥区别
webpack多页面，多入口怎么让每个页面访问到对应输出的js, js如果经过md5呢
Object.assign可以深拷贝吗
深拷贝的几种方式
ref可以调用子组件的方法
js遍历dom树
构建速度优化
redux的状态是只读的吗
redux是深比较还是浅比较
mobx





 */
(function() {
    console.log(this);
})(); //window

export const mapCopy = (object, callback) => {
    return Object.keys(object).reduce(function(output, key) {
        output[key] = callback.call(this, object[key]);
        return output;
    }, {});
};

//closure
for (var i = 0; i < 3; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i);
        }, 0);
    })(i);
}
