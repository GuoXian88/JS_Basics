/*
React, Vue, Angular
React是偏重于JS的框架(JSX)，单向数据流,只专注于View
Vue保留了html template
Angular是完整的MV*

React实现MVVM Observable实现

有埋点 无埋点

React 协议处理

qs parse url

ajax domain
host port protocol

es6 Set datastructure remove dunplicates

标准盒模型与非标准盒模型
height和width不同，标准是内容的宽高，非标准是加了padding的?
https对称加密与非对称加密

React router
说一下前端路由实现的简要原理，以 hash 形式（也可以使用 History API 来处理）为例，当 url 的 hash 发生变化时，触发 hashchange 注册的回调，回调中去进行不同的操作，进行不同的内容的展示
Router 在 react component componentWillMount 中使用 this.history.listen 去注册了 url 更新的回调函数。回调函数将在 url 更新时触发，回调中的 setState 起到 render 了新的 component 的作用

*/
Router.prototype.componentWillMount = function componentWillMount() {
    // .. 省略其他
    var createHistory = this.props.history;

    this.history = _useRoutes2['default'](createHistory)({
      routes: _RouteUtils.createRoutes(routes || children),
      parseQueryString: parseQueryString,
      stringifyQuery: stringifyQuery
    });

    this._unlisten = this.history.listen(function (error, state) {
        _this.setState(state, _this.props.onUpdate);
    });
  };
  //上面的 _useRoutes2 对 history 操作便是对其做一层包装，所以调用的 this.history 实际为包装以后的对象，该对象含有 _useRoutes2 中的 listen 方法，如下

  function listen(listener) {
        return history.listen(function (location) {
            // .. 省略其他
            match(location, function (error, redirectLocation, nextState) {
              listener(null, nextState);
            });
        });
  }
  /*可看到，上面代码中，主要分为两部分
  
  使用了 history 模块的 listen 注册了一个含有 setState 的回调函数（这样就能使用 history 模块中的机制）
  回调中的 match 方法为 react-router 所特有，match 函数根据当前 location 以及前面写的 Route 路由表匹配出对应的路由子集得到新的路由状态值 state，具体实现可见 react-router/matchRoutes ，再根据 state 得到对应的 component ，最终执行了 match 中的回调 listener(null, nextState) ，即执行了 Router 中的监听回调（setState），从而更新了展示。
  以上，为起始注册的监听，及回调的作用。
  
  如何触发监听的回调函数的执行？
  这里还得从如何更新 url 说起。一般来说，url 更新主要有两种方式：简单的 hash 更新或使用 history api 进行地址更新。在 react-router 中，其提供了 Link 组件，该组件能在 render 中使用，最终会表现为 a 标签，并将 Link 中的各个参数组合放它的 href 属性中。可以从 react-router/ Link 中看到，对该组件的点击事件进行了阻止了浏览器的默认跳转行为，而改用 history 模块的 pushState 方法去触发 url 更新。
  */
  Link.prototype.render = function render() {
      // .. 省略其他
      props.onClick = function (e) {
        return _this.handleClick(e);
      };
      if (history) {
       // .. 省略其他
        props.href = history.createHref(to, query);
      }
      return _react2['default'].createElement('a', props);
  };
  
  Link.prototype.handleClick = function handleClick(event) {
      // .. 省略其他
      event.preventDefault();
      this.context.history.pushState(this.props.state, this.props.to, this.props.query);
  };
  /*对 history 模块的 pushState 方法对 url 的更新形式，同样分为两种，分别在 history/createBrowserHistory 及 history/createHashHistory 各自的 finishTransition 中，如 history/createBrowserHistory 中使用的是 window.history.replaceState(historyState, null, path); 而 history/createHashHistory 则使用 window.location.hash = url，调用哪个是根据我们一开始创建 history 的方式。
  
  更新 url 的显示是一部分，另一部分是根据 url 去更新展示，也就是触发前面的监听。这是在前面 finishTransition 更新 url 之后实现的，调用的是 history/createHistory 中的 updateLocation 方法，changeListeners 中为 history/createHistory 中的 listen 中所添加的，如下
  */
  function updateLocation(newLocation) {
     // 示意代码
      location = newLocation;
      changeListeners.forEach(function (listener) {
        listener(location);
      });
  }
  function listen(listener) {
       // 示意代码
      changeListeners.push(listener);
  }

  /*可以将以上 react-router 的整个包装闭环总结为

  回调函数：含有能够更新 react UI 的 react setState 方法。
  注册回调：在 Router componentWillMount 中使用 history.listen 注册的回调函数，最终放在 history 模块的 回调函数数组 changeListeners 中。
  触发回调：Link 点击触发 history 中回调函数数组 changeListeners 的执行，从而触发原来 listen 中的 setState 方法，更新了页面
  */
/*
benchmark

301，302 都是HTTP状态的编码，都代表着某个URL发生了转移，不同之处在于： 
301 redirect: 301 代表永久性转移(Permanently Moved)
当网页A用301重定向转到网页B时，搜索引擎可以肯定网页A永久的改变位置，或者说实际上不存在了，搜索引擎就
会把网页B当作唯一有效目标。
301的好处是:
第一， 没有网址规范化问题
第二， 也很重要的，网页A的PR网页级别会传到网页B
302 redirect: 302 代表暂时性转移(Temporarily Moved )
302转向可能会有URL规范化及网址劫持的问题。可能被搜索引擎判为可疑转向，甚至认为是作弊
网址劫持
302重定向和网址劫持（URL hijacking）有什么关系呢？这要从搜索引擎如何处理302转向说起。从定义来说，从
网址A做一个302重定向到网址B时，主机服务器的隐含意思是网址A随时有可能改主意，重新显示本身的内容或转向
其他的地方。大部分的搜索引擎在大部分情况下，当收到302重定向时，一般只要去抓取目标网址就可以了，也就是
说网址B。
实际上如果搜索引擎在遇到302转向时，百分之百的都抓取目标网址B的话，就不用担心网址URL劫持了。问题就在
于，有的时候搜索引擎，尤其是Google，并不能总是抓取目标网址。为什么呢？比如说，有的时候A网址很短，但是
它做了一个302重定向到B网址，而B网址是一个很长的乱七八糟的URL网址，甚至还有可能包含一些问号之类的参
数。很自然的，A网址更加用户友好，而B网址既难看，又不用户友好。这时Google很有可能会仍然显示网址A。
由于搜索引擎排名算法只是程序而不是人，在遇到302重定向的时候，并不能像人一样的去准确判定哪一个网址更适
当，这就造成了网址URL劫持的可能性。也就是说，一个不道德的人在他自己的网址A做一个302重定向到你的网址
B，出于某种原因， Google搜索结果所显示的仍然是网址A，但是所用的网页内容却是你的网址B上的内容，这种情
况就叫做网址URL劫持。你辛辛苦苦所写的内容就这样被别人偷走了
总结一下，DNS劫持有这三种情况：
1.错误域名解析到纠错导航页面，导航页面存在广告。判断方法:访问的域名是错误的，而且跳转的导航页面也是官
方的，如电信的114，联通移网域名纠错导航页面。
2.错误域名解析到非正常页面，对错误的域名解析到导航页的基础上，有一定几率解析到一些恶意站点，这些恶意站
点通过判断你访问的目标HOST、URI、 referrer等来确定是否跳转广告页面，这种情况就有可能导致跳转广告页面
（域名输错）或者访问页面被加广告（页面加载时有些元素的域名错误而触发）这种劫持会对用户访问的目标
HOST、URI、referrer等会进行判定来确定是否解析恶意站点地址，不易被发现。
3.直接将特点站点解析到恶意或者广告页面，这种情况比较恶劣，而且出现这种情况未必就是运营商所为，家里路由
器被黑，或者系统被入侵，甚至运营商的某些节点被第三方恶意控制都有可能。具体情况要具体分析，这里就不展开
了。
DNS劫持常见于使用自动的DNS地址，所以，不管有没有被劫持，尽量不要使用运营商默认的DNS。
运营商经常对用户大规模使用HTTP劫持进行广告推广或者插入其他业务（如北京联通的宽带欠费提醒、天津联通无
线端的流量管家）

从开发者角度来看，运营商具体使用了什么技术以达到一个较好的性能呢？

首先介绍HTTP劫持的原理和检测方法：

1.通用的服务器肯定可以用来做劫持，只要能实现路由器或者七层代理的功能，能够接收和转发数据包就能实现劫
持。当然，处理性能要过得去。

2.使用七层的（HTTP）代理/反向代理可以实现劫持，能够查看和修改任意的HTTP内容，七层代理的性能要求低，劫
持策略非常灵活，但是有一个问题就是楼主提到的，会修改用户的源IP，容易暴露劫持者的位置。

3.所以大部分劫持都是在网络层（IP层）使用类似netfilter机制修改数据包的形式实现的劫持。这个劫持的技术
实现难度大，性能要求高。 也有比较野蛮的方式就是其他答主提到的，提前给用户返回劫持数据包，这样用户返回
的正常流量就被丢弃了。但是这个方式比较粗暴，容易引起用户投诉。

上述就是基本的劫持技术手段，能够修改HTTP，邮件和其他形式的应用内容，往里面插入劫持者的非正常内容。

常见的劫持对象如下：

（1）DNS劫持，又叫DNS重定向攻击，就是将用户导向到非预期网站的行为，主要是通过修改用户的DNS解析结果实
现的。

比如用户访问www.qq.com，正常的DNS 解析IP应该是腾讯网的IP地址（假设是10.1.2.3），但是中间者修改这个
DNS解析结果，返回用户一个非腾讯网的IP（假设是10.2.3.4），那么用户就会和这个非腾讯网的网站建立连接并
产生网络传输。

根据中间者的劫持意图，DNS劫持一般会有如下两种危险后果：

1， 域名欺骗导流(pharming)。将用户的请求导向到第三方网站，一般这种网站都充斥着广告或者黄反暴等内容。
主要是为了广告或者软件捆绑盈利。 2， 钓鱼(phishing)。钓鱼也是将用户导向到第三方网站，但是和导流不同
的是，这类劫持主要是为了获取用户的用户名及密码等非常重要的资料。比如银行帐户、支付宝帐户密码等内容。所
以钓鱼网站常见于金融、购物类网站。

（2）URL劫持，它的劫持手段主要有两类：

1，302跳转劫持，将用户 URL重定向到非目标网站。如果直接劫持用户的目标网站太过明显，因为如果用户无法访
问目标站点的话，会引起大量投诉最终会导致劫持败露。所以这类劫持一般都会针对中间页面劫持，并且会增加一些
过滤条件。比如用户访问目标网站后，如果点击目标网站链接，就有可能被302跳转给劫持。比较典型的就是搜索结
果页面：

2， 修改URL参数，比如在URL里添加流量渠道标识或者页面参数。

（3）网页内容篡改，是最常见的劫持现象。一般会有如下情形：

1，直接在网页插入JS(java script)。

2，在网页嵌入iframe。

这里再补充一个中间者的概念(MITM, man in the middle):

但是随着通信网络的发展，网络拓扑越来越复杂，明文传输过程需要经过很多个中间网络节点。比如路由器、基站、
防火墙、交换机、代理服务器等。不同的网络环境也会有不同的中间节点，比如移动通信网络需要基站接入，WIFI
需要AP(访问接入点，access point)接入，家用PC网络需要小区宽带路由器或者交换机接入。

如下图：



图1- 4只是为了描述方便，将一些常见的中间节点全都罗列了出来。事实上不是每次信息传输都需要经过上述节
点。比如可能没有交换机或者代理服务器。

信息传输经过上述中间节点意味着什么？

1.如果信息没有加密，中间节点能够直接查看信息。就像上节描述得一样，中间者能够直接查看cookie，关键词，
网页内容等内容，用户上网隐私将暴露无遗。

2.如果信息没有经过一致性校验，中间节点能够直接修改明文信息。

归根结底，由于HTTP是明文传输的，同时流量的获利空间巨大，所以流量劫持的现象才会越来越严重。

那怎么彻底有效地解决流量劫持呢？全站HTTPS啊。

cross-domain
Very simply put, when the request is made to the server the server can respond with a 
Access-Control-Allow-Origin header which will either allow or deny the request. The browser 
needs to check this header and if it is allowed then it will continue with the request 
process. If not the browser will cancel the request.
当一个资源从与该资源本身所在的服务器不同的域或端口请求一个资源时，资源会发起一个跨域 HTTP 请求，不同
协议也是
出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求。 例如，XMLHttpRequest和Fetch API遵循同源策略。
 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非使用CORS头文件
这段描述跨域不准确，跨域并非不一定是浏览器限制了发起跨站请求，而也可能是跨站请求可以正常发起，但是返回
结果被浏览器拦截了。最好的例子是 CSRF 跨站攻击原理，请求是发送到了后端服务器无论是否跨域！注意：有些
浏览器不允许从 HTTPS 的域跨域访问 HTTP，比如  Chrome 和 Firefox，这些浏览器在请求还未发出的时候就会
拦截请求，这是一个特例
跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，
对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类
型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服
务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可
以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）
HTTP HEAD 方法 请求资源的首部信息, 并且这些首部与 HTTP GET 方法请求时返回的一致. 该请求方法的一个使
用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源.
跨域解决方案
1、 通过jsonp跨域
2、 document.domain + iframe跨域
3、 location.hash + iframe
4、 window.name + iframe跨域
5、 postMessage跨域
6、 跨域资源共享（CORS）
7、 nginx代理跨域
8、 nodejs中间件代理跨域
9、 WebSocket协议跨域

一、 通过jsonp跨域

通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面
中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，
再请求一个带参网址实现跨域通信。

1.）原生实现：

 <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
 </script>
服务端返回如下（返回时即执行全局函数）：

onBack({"status": true, "user": "admin"})
2.）jquery ajax：

$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onBack",    // 自定义回调函数名
    data: {}
});
3.）vue.js：

this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'onBack'
}).then((res) => {
    console.log(res); 
})
后端node.js代码示例：

var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
jsonp缺点：只能实现get一种请求。

二、 document.domain + iframe跨域

此方案仅限主域相同，子域不同的跨域应用场景。

实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。

1.）父窗口：(http://www.domain.com/a.html)

<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
    document.domain = 'domain.com';
    var user = 'admin';
</script>
2.）子窗口：(http://child.domain.com/b.html)

<script>
    document.domain = 'domain.com';
    // 获取父窗口中变量
    alert('get js data from parent ---> ' + window.parent.user);
</script>

document.domain
document.domain是比较常用的跨域方法。实现最简单但只能用于同一个主域下不同子域之间的跨域请求，比如 foo.com 和 img.foo.com 之间，img1.foo.com 和 img2.foo.com 之间。只要把两个页面的document.domain都指向主域就可以了，比如document.domain='foo.com';。
设置好后父页面和子页面就可以像同一个域下两个页面之间访问了。父页面通过ifr.contentWindow就可以访问子页面的window，子页面通过parent.window或parent访问父页面的window，接下来可以进一步获取dom和js。

<!-- foo.com/a.html -->
<iframe id="ifr" src="http://img.foo.com/b.html"></iframe>
<script>
document.domain = 'foo.com';
function aa(str) {
    console.log(str);
}
window.onload = function () {
    document.querySelector('#ifr').contentWindow.bb('aaa');
}
</script>
<!-- img.foo.com/b.html -->


<script>
document.domain = 'foo.com';
function bb(str) {
    console.log(str);
}

parent.aa('bbb');
</script>

window.name
只要不关闭浏览器，window.name可以在不同页面加载后依然保持。尝试在浏览器打开百度baidu.com，然后在控制台输入window.name='aaa';回车，接着在地址栏输入qq.com转到腾讯首页，打开控制台输入window.name查看它的值，可以看到输出了"aaa"。
例如子页面bar.com/b.html向父页面foo.com/a.html传数据。



三、 location.hash + iframe跨域

实现原理： a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传
值，相同域之间直接js访问来通信。

具体实现：A域：a.html -> B域：b.html -> A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同
域也只能单向通信，但c与a同域，所以c可通过parent.parent访问a页面所有对象。

1.）a.html：(http://www.domain1.com/a.html)

<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>
    var iframe = document.getElementById('iframe');

    // 向b.html传hash值
    setTimeout(function() {
        iframe.src = iframe.src + '#user=admin';
    }, 1000);
    
    // 开放给同域c.html的回调方法
    function onCallback(res) {
        alert('data from c.html ---> ' + res);
    }
</script>
2.）b.html：(http://www.domain2.com/b.html)

<iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"></iframe>
<script>
    var iframe = document.getElementById('iframe');

    // 监听a.html传来的hash值，再传给c.html
    window.onhashchange = function () {
        iframe.src = iframe.src + location.hash;
    };
</script>
3.）c.html：(http://www.domain1.com/c.html)

<script>
    // 监听b.html传来的hash值
    window.onhashchange = function () {
        // 再通过操作同域a.html的js回调，将结果传回
        window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
    };
</script>
四、 window.name + iframe跨域

window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 
name 值（2MB）。

1.）a.html：(http://www.domain1.com/a.html)

var proxy = function(url, callback) {
    var state = 0;
    var iframe = document.createElement('iframe');

    // 加载跨域页面
    iframe.src = url;

    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    iframe.onload = function() {
        if (state === 1) {
            // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
            callback(iframe.contentWindow.name);
            destoryFrame();

        } else if (state === 0) {
            // 第1次onload(跨域页)成功后，切换到同域代理页面
            iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
            state = 1;
        }
    };

    document.body.appendChild(iframe);

    // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
    function destoryFrame() {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
    }
};

// 请求跨域b页面数据
proxy('http://www.domain2.com/b.html', function(data){
    alert(data);
});
2.）proxy.html：(http://www.domain1.com/proxy....
中间代理页，与a.html同域，内容为空即可。

3.）b.html：(http://www.domain2.com/b.html)

<script>
    window.name = 'This is domain2 data!';
</script>
总结：通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个
就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

五、 postMessage跨域

postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可
用于解决以下方面的问题：
a.） 页面和其打开的新窗口的数据传递
b.） 多窗口之间消息传递
c.） 页面与嵌套的iframe消息传递
d.） 上面三个场景的跨域数据传递

用法：postMessage(data,origin)方法接受两个参数
data： html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。
origin： 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

1.）a.html：(http://www.domain1.com/a.html)

<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };

    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---> ' + e.data);
    }, false);
</script>
2.）b.html：(http://www.domain2.com/b.html)

<script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
</script>
六、 跨域资源共享（CORS）

普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

需注意的是：由于同源策略的限制，所读取的cookie为跨域请求接口所在域的cookie，而非当前页。如果想实现当
前页cookie的写入，可参考下文：七、nginx反向代理中设置proxy_cookie_domain 和 八、NodeJs中间件代理中
cookieDomainRewrite参数的设置。

目前，所有浏览器都支持该功能(IE8+：IE8/9需要使用XDomainRequest对象来支持CORS）)，CORS也已经成为主
流的跨域解决方案。

1、 前端设置：

1.）原生ajax

// 前端设置是否带cookie
xhr.withCredentials = true;
示例代码：

var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容

// 前端设置是否带cookie
xhr.withCredentials = true;

xhr.open('post', 'http://www.domain2.com:8080/login', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('user=admin');

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
};
2.）jQuery ajax

$.ajax({
    ...
   xhrFields: {
       withCredentials: true    // 前端设置是否带cookie
   },
   crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
    ...
});
3.）vue框架
在vue-resource封装的ajax组件中加入以下代码：

Vue.http.options.credentials = true
2、 服务端设置：

若后端设置成功，前端浏览器控制台则不会出现跨域报错信息，反之，说明没设成功。

1.）Java后台：

/*
 * 导入包：import javax.servlet.http.HttpServletResponse;
 * 接口参数中定义：HttpServletResponse response
 */
response.setHeader("Access-Control-Allow-Origin", "http://www.domain1.com");  // 若有端口需写全（协议+域名+端口）
response.setHeader("Access-Control-Allow-Credentials", "true");
2.）Nodejs后台示例：

var http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var postData = '';

    // 数据块接收中
    req.addListener('data', function(chunk) {
        postData += chunk;
    });

    // 数据接收完毕
    req.addListener('end', function() {
        postData = qs.parse(postData);

        // 跨域后台设置
        res.writeHead(200, {
            'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
            'Access-Control-Allow-Origin': 'http://www.domain1.com',    // 允许访问的域（协议+域名+端口）
            'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取cookie
        });

        res.write(JSON.stringify(postData));
        res.end();
    });
});

server.listen('8080');
console.log('Server is running at port 8080...');
七、 nginx代理跨域

1、 nginx配置解决iconfont跨域

浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。

location / {
  add_header Access-Control-Allow-Origin *;
}
2、 nginx反向代理接口跨域

跨域原理： 同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。

实现思路：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

nginx具体配置：

#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
1.) 前端代码示例：

var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问nginx中的代理服务器
xhr.open('get', 'http://www.domain1.com:81/?user=admin', true);
xhr.send();
2.) Nodejs后台示例：

var http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));

    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
八、 Nodejs中间件代理跨域

node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。

1、 非vue框架的跨域（2次跨域）

利用node + express + http-proxy-middleware搭建一个proxy服务器。

1.）前端代码示例：

var xhr = new XMLHttpRequest();

// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;

// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true);
xhr.send();
2.）中间件服务器：

var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/', proxy({
    // 代理跨域目标接口
    target: 'http://www.domain2.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
}));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');
3.）Nodejs后台同（六：nginx）

2、 vue框架的跨域（1次跨域）

利用node + webpack + webpack-dev-server代理接口跨域。在开发环境下，由于vue渲染服务和接口代理服务都是webpack-dev-server同一个，所以页面与代理接口之间不再跨域，无须设置headers跨域信息了。

webpack.config.js部分配置：

module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.domain2.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            secure: false,  // 当代理某些https服务报错时用
            cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
        }],
        noInfo: true
    }
}
九、 WebSocket协议跨域

WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。
原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

1.）前端代码：

<div>user input：<input type="text"></div>
<script src="./socket.io.js"></script>
<script>
var socket = io('http://www.domain2.com:8080');

// 连接成功处理
socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
        console.log('data from server: ---> ' + msg); 
    });

    // 监听服务端关闭
    socket.on('disconnect', function() { 
        console.log('Server socket has closed.'); 
    });
});

document.getElementsByTagName('input')[0].onblur = function() {
    socket.send(this.value);
};
</script>
2.）Nodejs socket后台：

var http = require('http');
var socket = require('socket.io');

// 启http服务
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');

// 监听socket连接
socket.listen(server).on('connection', function(client) {
    // 接收信息
    client.on('message', function(msg) {
        client.send('hello：' + msg);
        console.log('data from client: ---> ' + msg);
    });

    // 断开处理
    client.on('disconnect', function() {
        console.log('Client socket has closed.'); 
    });
});


*/