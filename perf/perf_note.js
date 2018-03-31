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
*/