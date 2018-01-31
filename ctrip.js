/* 
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

7.

*/