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
 */