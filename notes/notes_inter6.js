/*
1，如何应对阿里巴巴全球业务形态的高速增长与变化，让我们的产品在不限于电商、金融、云、文娱、新零售等各种场景下都能保障业务平稳运行
2，如何通过产品驱动上百个技术团队、数万名研发人员共同高效协作，完成稳定性业务目标
3，如何发现、汇集、加工海量的运维数据，并实时流转到需要的人员手中，让他们有能力在第一时间预防、发现、解决各种复杂场景下的业务问题

职位要求：

1.熟悉 W3C 标准、精通 Web 技术, 包括Javascript、HTML/HTML5、CSS/CSS3等；

2.熟悉 HTTP 协议以及缓存技术，了解基本的浏览器渲染原理以及网络传输过程；

3.熟悉 Angular、Vue、React 类框架。有ant.design的开发经验者尤佳；

4.熟悉前端自动化构建工具，熟悉 Grunt、Gulp、Webpack、FIS；

5.对前端模块化开发有一定了解（如AMD,CommondJS等)，并有实践经验；

6.对Web性能优化有深入了解;

7.持续关注业界的新话题和新技术，了解ES6, 了解Promise协议;


前端工程化
页面多语言，用一个字典
react-redux connect原理
promise原理
redux架构数据流

如何保证代码不出现错误，尽可能减少线上问题
线上问题处理

前端安全问题
cookie敏感信息加密?


SEO
Tkd 就是网站中三个英文单词（title、keywords、description）的缩写
<title>这里是标题内容</title>
<meta name="keywords" content="这里是关键词内容"/>
<meta name="description" content="这里是描述内容"/>
标题是可以给用户和访客直接看到的，而网站关键词却是给搜索引擎看的

全站 TKD 部署、URL 规范、robots.txt 文件的检查、H 标签的合理使用，内链与外链的布局方面来做全面的 SEO 诊断并发现其中的问题所在
页面不要有结构或者逻辑上的混乱


技术激情，拥抱变化，有视野，有广度
相同数据的不同展现可以用HOC
框架区别
复杂场景，有挑战的事
ssr缺点
ssr优点：
Difficult to make Multi-page web apps: Sometimes you need to make websites with multiple pages and you want to route to different pages. Yes its possible to do it using Client Side Rendering but you will have to make different configurations, set up React-Router etc. Best thing if you are at all doing Multi-page web-apps with React, go for Server Side Rendering.
Multiple network requests to the server: This will make your app more slow. Sometimes already loading the data with the page itself makes your web-page load only once and not request multiple times for data using fetch or other alternatives.
Let the server do the rendering for you: In server side rendering your website will already be rendered in the server and then served. In Client Side rendering, your code will load and then be rendered completely in the browser.

Here are three topics to consider when looking at server-side rendering:

SEO: Rendering server-side helps search engine crawlers find your content, but sometimes Google can find your content without SSR.
Performance: SSR will usually increase performance for your app, but not always.
Complexity: Using SSR will increase the complexity of your application, which means less time working on other features and improvements.


null instanceof Object // false 所以才有Object.create(null)
3==true //false
null == undefined // true


Ayke van Laëthem has found a more elegant solution in html { margin-left: calc(100vw - 100%); } which works because vw accounts for the scrollbar and % doesn't, and... just read it as there are a few more things you'll need to be aware of anyway.


jsonp跨域固定callback名字有什么不好?多个跨域请求时怎么执行
技术深度，框架，工具，亮点，组件

async function可以在constructor里面绑定this  

如何把一件事情做到极致 
深入去挖，考虑各种场景 
