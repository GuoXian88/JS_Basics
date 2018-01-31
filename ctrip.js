/* 

old notes
两舱推荐逻辑
两舱推荐经济舱逻辑调整：
1、非直飞优先排序时，推荐数据展示在第10个航班卡片后面
2、多程有推荐SY数据时，舱等也需要外露
3、推荐模块的排序，按先FC再SY排序,如推荐C直飞+SY直飞，则先显示C直飞数据，再展示SY直飞数据；



1107
如果有筛选的话按照筛选的来走逻辑，如果没有筛选则按照搜索的来走逻辑
现在没有分组的三批数据了
两舱是按航组来分组显示数据的

search cf functionality
后台已经过滤掉既有cf又有ys的航组了，但搜索c和搜索f的时候可能出现cf混合在一个航组的
情况，此时要自己过滤掉不需要的运价

flightList
priceList
cabin
关系

经停不算直飞


search c
search f


突然想到一个问题，AGG针对推荐的数据，是有给到标识的
RecommondePrdType & 512 = 512，表示两舱推荐中的YS舱
具体内容见附件；
所以针对两舱有一个逻辑，
1、若航组A-B同时在FC和SY舱数据都有，需要过滤掉SY的数据；（这个只需要比较批次间的，批次内的AGG已经作 了逻辑）
2、推荐的SY舱数据可以根据标识来取

看老版的逻辑，直飞优先排序的时候，C跟YS直飞放一个模块（C直飞在前，YS直飞在后），中转放一个模块；混合排序的时候CYS全放一块
这个问题我这边调整一下排序的逻辑吧
直飞优先排序，先C直飞再YS直飞，再C中转就可以了
非直飞优先排序，先C直飞+中转，再YS直飞
这里就不用再分区块了

分块用>号，排序前后用+

YS互推
还有一个问题，筛选YS，只有在YS无结果的时候才推荐
如果YS有结果就不推荐，是吧

如果搜F，只推荐C中转跟C直飞，那直飞优先排序的时候，是不是也是C直飞一块，C中转一块， 直飞排序：f直飞 c直飞+YS直飞 cf中转             非直飞排序： f直飞  推荐数据
只推荐了Y舱，就是Y舱
只推荐了S就只能S
最多有我表格里面列出来的这些
不然舱等提示语对不上

两舱先排序再分组

两舱折叠逻辑
分组显示时在每一个组的第一个航班上挂组头信息，在最后一个航班上挂`查看更多航班`，超过门限的每个航班加一个display : none的className，onClick事件用一个store里面的变量来控制className的添加与否

两舱提示语显示问题
如果没有推荐数据则不走两舱逻辑
如果有推荐数据则一定会有舱等提示语
如果只有一个分组也有舱等提示语

C无直飞有中转 直飞优先排序: 无直飞提示 F/S/Y直飞(fold)>CF中转
这个只有cf transfer的情况
算不算推荐呢
搜索 C的时候

算，因为C的中转不是用户查询的

console.log(
  "This is (my) simple text".match(/\(([^)]+)\)/)[1]
);

\( being opening brace, ( — start of subexpression, [^)]+ — anything but closing parenthesis one or more times (you may want to replace + with *), ) — end of subexpression, \) — closing brace. The match() returns an array ["(my)","my"] from which the second element is extracted.


搜索框错误指向问题
搜索框NYC第一个回车问题
搜索框航班数量太少fix的bug

单程有主航段按主航段主舱等没有的话按 下面取最小
C F S Y
往返取主航段主舱等
C|F按下面取最小
C F S Y

航组排序
整体是：直飞-经停-一程中转--两程中转
新排序规则：
1. 按照直飞  〉一次经停〉一次转机  〉两次转机排序
a、直飞里再按照：价格  〉起飞时间  〉行程时长排序
b、一次经停、一次转机里：痛苦指数  〉起飞时间
c、两次转机里：痛苦指数  〉起飞时间
其中“痛苦指数”= 机票价格+行程时长转化的金钱价值（目前online暂按每小时200元人民币来定义，此公式由客户端控制） 
加上：
之前做过一个CR :  http://cp4.mgmt.ctripcorp.com/browse/FLT34GJON-958 直飞优先按起飞时间排序 
把这个逻辑改了：
直飞数量<=5时，“直飞优先”中的直飞航班按照起飞时间排序：起飞时间>价格>飞行时长>到达时间（中转逻辑不变），其他排序条件仍按照目前的排列规则。
直飞数量>5，“直飞优先”的排列顺序仍按照目前的排列规则。


首先按经停和中转次数排序，总次数相同的时候，中转次数少而经停次数多的排在前面
如果中转经停次数都一样，按痛苦指数>起飞时间>到达时间的顺序排序
精选港澳的
如果有，会在中转第一条
然后澳门在香港前面

key = (data.Key || '').trim().replace(/\s{2,}/g, ' ');//去除前后空格和中间连续的空格


7
两种舱等时展示顺序：经济>超经>公务>头等>火车
[2017/12/12 17:50] yzl杨宗良:
@玄超 找你确认个问题：两舱查询高舱推低舱这个逻辑里面，同一批里面的某个航组可能会同时出现 公务舱+推荐的经济舱么？
[2017/12/12 17:51] lxc刘玄超:
不会，同一批次内我们会判断一下，如果这个航组已经有两舱的价格的话，我们会把推荐的经济舱价格删掉

var a = { a:{b: 1, c: 2}}
b = a.a
改变b.b也会改变a.a
在数据源头进行操作比较好
渲染只做渲染的活

https://github.com/maicki/why-did-you-update
why did you updtate
徐丛栎提出按功能来划分目录结构，这样就不用一个组件找component和container难找了
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
本人自入职以来在深圳携程国际Online机票研发部工作已有8个月，在领导和小组同事们的帮助下，从刚入职不了解敏捷开发的小白至今对整个Online小组的敏捷开发工作流程已非常熟悉，也学到很多非专业以外的知识。作为一名前端开发人员，对前端技术栈，前端工程化有较多的学习，且对工程师原则有深刻的认识，如何在践中快速定位并解决问题有较好的理解，能够较好的完成任务。
        作为国际Online前端开发小组的一员，通过前期的学习和实践与产品积极沟通并完成每个sprint分配的任务，了解机票业务逻辑，熟练掌握开发中用到的各种工具如fiddler,grunt,webpack等，发布值班在遇到生产事件的时候能够迅速定位并很好的解决问题。后期引入前端框架React整个生态系统，努力提高代码质量，参与频道首页改版，列表页改版的工作。
        积极参加学习培训，努力学习，不断提高自己的能力。前端近两年更新很快，平时积极关注前端的最新动态，对于能引入到工作中的技术通过分析后也能大胆引入 ，敢于尝试新东西。同时也在小组内分享自己的收获, 如React的分享。
        和同事相处融洽，经常和同事一起打羽毛球。小组的分享学习气氛浓烈，我也积极的参与到小组讨论的过程。整个小组充满着拼劲与活力，很享受与小组共同成长的过程。
      公司作为国际化的旅游网站，前景一片光明，在未来我将更加努力拼搏，贡献自己的绵薄之力。
data.valueSeq()是异步的

12.28
fix searchbox to head of page
这里需要外面包一个div来确保原来的位置为基准
<div ref={input => { this.searchBox = input }}>
<div className={`modify-search-v2 ${fixSearchBox ? 'scroll2fixed' : ''}` + (flightWay === 'MT' ? ' search-multi-trip':'' )}>
<div className="modify-search-box">


那两舱的，非第一程不做任何处理
今天发生了件很神奇的事情，页面的onClick都没用，原因是OutsideClickHandler那里面e.stopPropagation()了一下

空铁组合航班的显示需要在全程的航等。火车的舱等也算（飞机的舱等）符合用户搜索的条件下展示空铁组合，否则过滤掉,这里是看全程的舱等

all: initial;不用父类继承下来的样式

不好用，哈希值有些场景不能满足
给我的感觉就是给dom一个独立的类名，但是这样其实违背了class，感觉变成id了
后续维护的时候，麻烦就来了，迭代，覆盖样式，就乱了


throttle and debounce
Because we are giving ourselves a layer of control between the event and the execution of the function.

// WRONG
$(window).on('scroll',function(){_.debounce(doSomething,300);});
// RIGHT
$(window).on('scroll',_.debounce(doSomething,200));

这里面赋值list不会改变外面的引用，奇怪
     clearMTAroundItem = function(list) {
          return list.filter(i => i.Type !== 7);
     };
export const popNextFormItem = (el,elForm) => {
if (elForm) {
let elFormItem = elForm.getElementsByClassName('form-item-v2')
let i,
len = elFormItem.length,
elInput
for (i = 0; i < len; i++) {
elInput = elFormItem[i].querySelector('input')
if (elInput && (el.name == elInput.name)) break
}
do {
i = i + 1
elInput = elFormItem[i] && elFormItem[i].querySelector('input')
} while (elFormItem[i] && (!elInput || elInput.type !== "text"))
if(elInput && !elInput.value)
elInput.focus()
return false
}
return true
}

First of all, onmouseenter is IE-specific. Doesn't work in other browsers unless you use jQuery which can simulate this event.
Secondly, both onmouseenter and onmouseover fire when the mouse enters the boundary of an element. However, onmouseenter doesn't fire again (does not bubble) if the mouse enters a child element within this first element.


写组件时有个问题当按下上下按键的时候浏览器scroll会动，解决方法：
但是preventDefault() 会阻止后续的行为，如input加上keydown如果加了preventDefault会阻止后面的onChange事件

Simply prevent the default browser action:
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }}, false);




2018/01/29
1.直接读配置导致错误
频道首页想共用列表页的tooltip
因为tooltip的引入关系导致频道首页是读不到列表页配置而报错
配置需要给个保底的默认值为好

2.两舱
新需求是大系统在AGG请求FC时，也会输出混舱的数据，就是刚刚你们提到的FC-FC-SY
因为目前的混舱数据是在SY请求中输出的，很容易被PK掉
但其实这种数据比SY数据，更接近两舱用户的需求
全程SY，和FC-FC-SY，这种数据，有两程是公务舱的，肯定比全程SY舱要贵

3.机票业务的特点
前端日历和城市选择需要极强的可定制性
三批数据
无高并发


4.reg exp
let rRemoveRoundBrackets = /\(([^)]+)\)/g,
    rRemoveTDTags = /(?i)<td[^>]*>/,
    rRemoveHTMLOpenTags = /<[^>]*>/,
    rRemoveHTMLCloseTags = /<\/[^>]*>/
 
*/
//trim leading and trailing spaces:
sed -i 's/^[ \t]*//;s/[ \t]*$//'

/*


5.多程需要很多埋点字段设置成数组的形式

6.fiddler

7. shadowsocks 本地端口被占用时可以修改代理端口

*/