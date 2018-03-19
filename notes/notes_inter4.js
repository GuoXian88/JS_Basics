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
 */