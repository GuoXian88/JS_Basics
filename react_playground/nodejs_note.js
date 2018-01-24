/*Node 中的文件路径大概有 __dirname, __filename, process.cwd(), ./ 或者 ../，前三个都是绝对路径，为了便于比较，./ 和 ../ 我们通过 path.resolve('./')来转换为绝对路径。
__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
__filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径

关于 ./ 正确的结论是：

在 require() 中使用是跟 __dirname 的效果相同，不会因为启动脚本的目录不一样而改变，在其他情况下跟 process.cwd() 效果相同，是相对于启动脚本所在目录的路径。


1.webpack config
output.publicPath
这个是html引用资源时候的路径
This option specifies the public URL of the output directory when referenced in a browser. A relative URL is resolved relative to the HTML page (or <base> tag). Server-relative URLs, protocol-relative URLs or absolute URLs are also possible and sometimes required, i. e. when hosting assets on a CDN.


*/