
//1.class static props 可以被extend,即可以通过原型链找到

class A { static getname() { return 'A'}}

class B extends A { }

b = new B()

B.getname() //'A'
b.getname() // not work

/*2.fetch api

这种功能以前是使用XMLHttpRequest实现的
Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers
Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如 CORS和HTTP的扩展。

fetch 规范与 jQuery.ajax() 主要有两种方式的不同，牢记：
当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的ok 属性设置为 false ），  仅当网络故障时或请求被阻止时，才会标记为 reject。
默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项
返回promise,无回调地狱
fetch 中的 response/request 都是 stream 对象
因为，req/res 都是以流的形式存在的，即，req/res 的 body 只能被使用一次。相当于就是一个文件从缓存读到硬盘里面，那么原来文件就已经消失了。我们可以通过 bodyUsed 去检查，该对象是否已经被使用
cors
fetch('https://www.villainhr.com/cors-enabled/some.json', {mode: 'cors'})  
  .then(function(response) {  
    return response.text();  
  })

same-origin: 表示只请求同域. 如果你在该 mode 下进行的是跨域的请求的话, 那么就会报错.
no-cors: 正常的网络请求, 主要应对于没有后台没有设置 Access-Control-Allow-Origin. 话句话说, 就是用来处理 script, image 等的请求的. 他是 mode 的默认值.
cors: 用来发送跨域的请求. 在发送请求时, 需要带上.
cors-with-forced-preflight: 这是专门针对 xhr2 支持出来的 preflight，会事先多发一次请求给 server，检查该次请求的合法性。

credentials 常用取值为：

omit: 发送请求时,不带上 cookie. 默认值.
same-origin: 发送同域请求时,会带上 cookie.
include: 只要发送请求,都会带上 cookie.

GET and POST:
GET用来请求资源，参数在url上,有限制
GET is less secure compared to POST because data sent is part of the URL
GET应该是幂等的,能被缓存
Note that GET should not be used for operations that cause side-effects, such as using it for taking actions in web applications. One reason for this is that GET
may be used arbitrarily by robots or crawlers, which should not need to consider the side effects that a request should cause.

Finally, an important consideration when using GET for AJAX requests is that some browsers - IE in particular - will cache the results of a GET request. So if you, for example,poll using the same GET request you will always get back the same results, even if the data you are querying is being updated server-side. One way to alleviate this problem is to make the URL unique for each request by appending a timestamp.

Authors of services which use the HTTP protocol SHOULD NOT use GET based forms for the submission of sensitive data, because this will cause this data to be encoded in the Request-URI. Many existing servers, proxies, and user agents will log the request URI in some place where it might be visible to third parties. Servers can use POST-based form submission instead

POST用来更新/插入资源,POST更安全，不能被缓存
POST submits data to be processed (e.g., from an HTML form) to the identified resource. The data is included in the body of the request. This may result in the creation of a new resource or the updates of existing resources or both.
*/

/*3.web api service worker
A service worker, written in JavaScript, is like a client-side proxy and puts you in control of the cache and how to respond to resource requests.
/*Web Worker 规范中定义了两类工作线程，
分别是专用线程Dedicated Worker和共享线程 Shared Worker，其中
Dedicated Worker只能为一个页面所使用，而Shared Worker则可以被多个页面所共享
主线程代码不会阻塞在这里等待worker线程去加载、执行指定的脚本文件，而是会立即向下继续执行后面代码

workers和主线程间的数据传递通过这样的消息机制进行——双方都使用postMessage()方法发送各自的消息，使用onmessage事件处理函数来响应消息（消息被包含在Message事件的data属性中）。这个过程中数据并不是被共享而是被复制
*/

var worker = new Worker("task.js");
worker.postMessage(
        {
            id:1,
            msg:'Hello World'
        }
);
worker.onmessage=function(message){
    var data = message.data;
    console.log(JSON.stringify(data));
	worker.terminate();
};
worker.onerror=function(error){
    console.log(error.filename,error.lineno,error.message);
}

/* 4.PWA
Technologically speaking, PWAs are web apps, progressively enhanced with modern web technologies (Service Worker, Fetch networking, Cache API, Push notifications, Web App Manifest) to provide a more app-like experience.
*/

/* 5.nodejs koa, express. middleware? 查看进程
function emptyMiddleware (req, res, next) {
    req.somedata = 42
    next()
}

var exec = require('child_process').exec;
exec('tasklist', function(err, stdout, stderr) {
  // stdout is a string containing the output of the command.
  // parse it and look for the apache and mysql processes.
});
或者用ps-node lib
*/

/* 6.监控js性能，报错
使用window.onerror = function() {}来搜集错误 但当执行的js代码和我们的站点在不同域即跨域时，由于浏览器的安全限制，onerror()方法只能捕获到一个固定的错误代码Script error.
使用try{...}catch(e){...}包裹需要执行的代码，获取error对象的属性定位错误并上报

access-control-allow-orgin 配置问题：
由于值不能设置多值，而且设置 * , 允许任何域名使用是一个很不安全的设置，所以一般会根据 浏览器请求头 refer 或则 orgin ，判断是不是白名单内的域名，是的就响应回对应的域名或则* （响应头不支持返回 *.qq.com），。当然如果cdn只对一个业务服务也可以写死域名
Access-Control-Allow-Origin: https://www.google.com,https://www.baidu.com 

script 标签上面的 crossorigin 配置问题
1.anonymous（默认）
不能带cookie

副作用，当 AC 的设置不是 * 或者不等于origin时，js直接不加载

2.use-credentials
能带上cookie

副作用，当AC的设置不等于origin时，js直接不加载（不支持 *通配符了）

目前只有高级浏览器支持，如果闲麻烦可以使用自带的 try-catch 功能
切面包裹入口函数， try-catch
对于基于AMD和jQuery的网站，几乎所有业务函数都是通过回调异步触发的，所以我们只需要将所有异步函数包裹起来就可以捕获到大部分错误：

setTimeout ,setInterval
$.event.add 和 $.event.remove
AJAX
模块入口 define 或则 require
setTimeout ,setInterval
只针对 w3c 现代的浏览器的进行包裹，ie 不进行包裹 #2

$.event.add 和 $.event.remove
没有个dom 都有这两个方法，我们没有办法对全部重写。但是我们发现目前基本都会使用 jquery 或 zepto ，所以我们对 $.event.add 和 $.event.remove 进行了切面处理。

AJAX
跟上面的类似，我们不能重写 ajax ，但是前端开发都使用 jquery ，所以我们重写了 $.ajax

模块入口 define 或则 require
目前前端开发基本都使用了模块化管理，所以模块化的入口是非常好的入口。我们也进行了包裹


*/
window.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = "script error";
  if (string.indexOf(substring) > -1){
      alert('Script Error: See Browser Console for Detail');
  } else {
      var message = [
          'Message: ' + msg,
          'URL: ' + url,
          'Line: ' + lineNo,
          'Column: ' + columnNo,
          'Error object: ' + JSON.stringify(error)
      ].join(' - ');

      alert(message);
  }
  return false;
};

// 7.共享组件
// React Portal. Popover. Modal Dialog.
/*问题是，我们写一个Dialog组件，就这么渲染的话，Dialog最终渲染产生的HTML就存在于上面JSX产生的HTML一起了，类似下面这样
<div class="foo">
   <div> ... </div>
   <div class="dialog">Dialog Content</div>
</div>
可是问题来了，对于对话框，从用户感知角度，应该是一个独立的组件，通常应该显示在屏幕的最中间，现在
Dialog被包在其他组件中，要用CSS的position属性控制Dialog位置，就要求从Dialog往上一直到body没有
其他postion是relative的元素干扰，这……有点难为作为通用组件的Dialog，毕竟，谁管得住所有组件不用
position呢。
还有一点，Dialog的样式，因为包在其他元素中，各种样式纠缠，CSS样式太容易搞成一坨浆糊了

*/

// 8.通用的逻辑封装

/* HOC 复用逻辑(某个相同的pattern，如某类组件都需要监听数据的变化)
You can imagine that in a large app, this same pattern of subscribing to DataSource and
calling setState will occur over and over again. We want an abstraction that allows us to
define this logic in a single place and share them across many components. This is where
higher-order components excel.

Note that a HOC doesn’t modify the input component, nor does it use inheritance to copy its
behavior. Rather, a HOC composes the original component by wrapping it in a container 
component. A HOC is a pure function with zero side-effects.

When you apply a HOC to a component, though, the original component is wrapped with a 
container component. That means the new component does not have any of the static methods of 
the original component.

*/
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

function logProps(WrappedComponent) {
    return class extends React.Component {
      componentWillReceiveProps(nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
      }
      render() {
        // Wraps the input component in a container, without mutating it. Good!
        return <WrappedComponent {...this.props} />;
      }
    }
  }

  /*However, this requires you to know exactly which methods need to be copied. You can use 
  hoist-non-react-statics to automatically copy all non-React static methods:
  */
  import hoistNonReactStatic from 'hoist-non-react-statics';
  function enhance(WrappedComponent) {
    class Enhance extends React.Component {/*...*/}
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
  }

// 9.React Portal
  render() {
    // React does *not* create a new div. It renders the children into `domNode`.
    // `domNode` is any valid DOM node, regardless of its location in the DOM.
    return ReactDOM.createPortal(
      this.props.children,
      domNode,
    );
  }
  /*A typical use case for portals is when a parent component has an overflow: hidden or 
  z-index style, but you need the child to visually “break out” of its container. For 
  example, dialogs, hovercards, and tooltips.
*/

/**
 * For example, instead of exposing open() and close() methods on a Dialog component, pass
 *  an isOpen prop to it.
 * You should convert the component to a class if you need a ref to it, just like you do 
 * when you need lifecycle methods or state.
 * 
 * 
 * React perf
 * React uses several clever techniques to minimize the number of costly DOM operations 
 * required to update the UI. 
 * 使用生产模式
 * 
 */
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}),
new webpack.optimize.UglifyJsPlugin()


/* 10. http 2:
HTTP/2 允许在单个连接上_复用_下载，所以能够更高效地下载多个小文件
多路复用：多路复用很好地解决如何让重要资源尽快加载这个问题。同域名下或者不同域但是同时满足同一个IP以
及使用同一个证书的这两个条件中的所有通信都在单个连接上完成，此连接上同时打开任意数量的双向数据流（ 
HTTP 1.1 有连接数限制）。使用多域名加上相同的 IP 和证书部署 Web 服务有特殊的意义：让支持 HTTP/2 的
终端只建立一个连接，用上 HTTP/2 协议带来的各种好处；而只支持 HTTP/1.1 的终端则会建立多个连接，达到同
时更多并发请求的目的
HEAD 压缩：HTTP/2 将请求和响应数据分割为更小的帧，并对它们采用二进制编码（ Binary Framing ）。在 
HTTP/1 中，HTTP 请求和响应都是由「状态行、请求 / 响应头部、消息主体」三部分组成，状态行和头部却没有
经过任何压缩，直接以纯文本传输
在 HTTP/2 中，每个数据流都以消息的形式发送，而消息又由一个或多个帧组成。多个帧之间可以乱序发送，因为
根据帧首部的流标识可以重新组装
请求优先级：服务器可以根据流的优先级，控制资源分配(CPU、内存、带宽)，而在响应数据准备好之后，优先将最
高优先级的帧发送给客户端
服务器推送：启动Server Push，意味着服务端可以在发送页面HTML时主动推送其它资源，有自己独立的URL，可以
被浏览器缓存；如果服务端推送的资源已经被浏览器缓存过，浏览器可以通过发送 RST_STREAM 帧来拒收
需要小心使用 HTTP/2 推送，因为即使文件已经位于浏览器的本地缓存中或带宽已饱和，它都会对浏览器强制推送数据。如果操作错误，性能将降低。<link rel="preload"> 能够有效地使浏览器对设置这些请求的优先级做出明智的决定

features:
HTTP and TCP
Server push
Priorities and dependecies
HPACK

Binary Protocol
A single, long lasting connection
更好的阻塞管理
TLS/ALPN
Connection reuse across domains

Streams
-Virtual communication channels
-Stream IDs

Protocol flow
Multiplexing & Interleaving
 -多路复用允许同时通过单一的HTTP/2连接发起多重请求-响应消息
  PWA的service-worker要求协议是https的
Performance

PLR
BBR: bottleneck bandwidth and round-trip propagation time.高吞吐，高网络利用率

Coalescing(合流)
connection reuse
避免dns lookups for listed domains

Server push
push a resource to client before it's requested.
only servers can push
hop by hop
triggered by PUSH_PROMISE frame


Prioritization basics
-address possible contention because of all the
concurrency
-stream weights
-HEADERS and PRIORITY frames
-it's only a 'suggestion'

HPACK(压缩头部)
-address the header bloat problem
-Two primary mechanisms
 -All headers(name=value) are Huffman encoded
 -Indexed tables at each peer
Default size is 4K


11. https:HTTP over SSL/TSL or HTTP Secure
防止中间人攻击及内容劫持，加密数据,解密数据
HTTPS 相比 HTTP 多了一层 SSL/TLS


React:
Even though React only updates the changed DOM nodes, re-rendering still takes some time. In
many cases it’s not a problem, but if the slowdown is noticeable, you can speed all of this
up by overriding the lifecycle function shouldComponentUpdate, which is triggered before 
the re-rendering process starts. The default implementation of this function returns true, 
leaving React to perform the update:

Most of the time, you can use React.PureComponent instead of writing your own 
shouldComponentUpdate. It only does a shallow comparison, so you can’t use it if the props 
or state may have been mutated in a way that a shallow comparison would miss.

Diff:
Whenever the root elements have different types, React will tear down the old tree and build 
the new tree from scratch. Going from <a> to <img>, or from <Article> to <Comment>, or from 
<Button> to <div> - any of those will lead to a full rebuild.
When tearing down a tree, old DOM nodes are destroyed. Component instances receive 
componentWillUnmount(). When building up a new tree, new DOM nodes are inserted into the 
DOM. Component instances receive componentWillMount() and then componentDidMount(). Any 
state associated with the old tree is lost.

When comparing two React DOM elements of the same type, React looks at the attributes of 
both, keeps the same underlying DOM node, and only updates the changed attributes.

When a component updates, the instance stays the same, so that state is maintained across 
renders. React updates the props of the underlying component instance to match the new 
element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying
instance.

key
In order to solve this issue, React supports a key attribute. When children have keys, React 
uses the key to match children in the original tree with children in the subsequent tree. 
For example, adding a key to our inefficient example above can make the tree conversion 
efficient
*/

//render props
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
        </div>
      );
    }
  }
  
  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <Mouse render={mouse => (
            <Cat mouse={mouse} />
          )}/>
        </div>
      );
    }
  }

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}

/*Redux pros:
使状态改变可预测
管理复杂状态，单向数据流
方便测试，debug，action追根溯源
single source of truth: 服务端store可以直接拿到客户端使用
多个store通信问题不存在
time travel容易实现
纯函数
为什么单一store？
用组合reducer的方式来实现模块化
Why do we stress this in the docs? Because most people coming from Flux background will 
assume multiple stores is the solution to making update code modular. However Redux has a 
different solution for this: reducer composition.

Using reducer composition makes it easy to implement "dependent updates" a la waitFor in 
Flux by writing a reducer manually calling other reducers with additional information and in 
a specific order.
With a single store, it's very easy to persist, hydrate, and read the state. Server 
rendering and data prefetching is trivial because there is just one data storage that needs
 to be filled and rehydrated on the client, and JSON can describe its contents without 
 worrying about store's ID or name.
A single store makes Redux DevTools time travel features possible. It also makes community 
extensions like redux-undo or redux-optimist easy because they operate on the reducer level.
 Such "reducer enhancers" can't be written for stores.
A single store guarantees that the subscriptions are called only after the dispatch has been 
processed. That is, by the time listeners are notified, the state has been fully updated. 
With many stores, there are no such guarantees. This is one of the reasons Flux needs the 
waitFor crutch. With a single store, this is not a problem you see in the first place.
Above all, multiple stores are unnecessary in Redux (except for performance edge cases which
   you are supposed to profile first anyway). We make it an important point in the docs so 
   you are encouraged to learn reducer composition and other Redux patterns instead of using 
   Redux as if it was Flux, and losing its benefits.

In particular, the common suggested pattern is to have a separate sub-reducer function that
 is responsible for managing updates to a particular slice of state at a specific key. 

It's also highly suggested to keep your store state as flat and as normalized as possible.


Notice that the structure of the data is a bit complex, and some of the data is repeated. This is a concern for several reasons:

When a piece of data is duplicated in several places, it becomes harder to make sure that it
 is updated appropriately.
Nested data means that the corresponding reducer logic has to be more nested and therefore 
more complex. In particular, trying to update a deeply nested field can become very ugly 
very fast.
Since immutable data updates require all ancestors in the state tree to be copied and 
updated as well, and new object references will cause connected UI components to re-render,
 an update to a deeply nested data object could force totally unrelated UI components to 
 re-render even if the data they're displaying hasn't actually changed.


Immutably updating state generally means making shallow copies, not deep copies. Shallow 
copies are much faster than deep copies, because fewer objects and fields have to be copied,
 and it effectively comes down to moving some pointers around.

单一store内存问题
First, in terms of raw memory usage, Redux is no different than any other JavaScript 
library. The only difference is that all the various object references are nested together
 into one tree, instead of maybe saved in various independent model instances such as in 
 Backbone. Second, a typical Redux app would probably have somewhat less memory usage than 
 an equivalent Backbone app because Redux encourages use of plain JavaScript objects and 
 arrays rather than creating instances of Models and Collections. Finally, Redux only holds 
 onto a single state tree reference at a time. Objects that are no longer referenced in that
  tree will be garbage collected, as usual.

前端工程化
工具众多，我们就有一种想法，能不能有一种工具能帮我们自动生成雪碧图、 css压缩、图片压缩等等，然后就出现了前端工程化。前端工程化一般可分为五个步骤：
（1） 初始，生成基础目录结构和样式库。
（2） 开发，实时预览、预编译。
（3） 构建，预编译、合并、压缩。
（4） 发布，将构建后静态文件发布上线
（5） 打包，资源路径转换，源码打包


那四次分手呢？
当客户端和服务器通过三次握手建立了TCP连接以后，当数据传送完毕，肯定是要断开TCP连接的啊。那对于TCP的断开连接，这里就有了神秘的“四次分手”。

第一次分手：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；
第二次分手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我“同意”你的关闭请求；
第三次分手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；
第四次分手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。
