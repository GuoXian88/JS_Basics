/*
1.why fp?
readability, declarative paradiam
2.One on one: receive one argument
*/
function unary(fn) {
    return function(arg) {
        return fn(arg)
    }
}

function map(mapperFn, arr) {
    var newList = []
    for (let [idx, v] of arr.entries()) {
        newList.push(
            mapperFn(v, idx, arr)
        )
    }

    return newList
}

["1","2","3"].map( parseInt );
// [1,NaN,NaN]
//因为parseInt(str, radix)传入的第二个index被当成radix了,但unary会忽略后面的参数,所以可行

["1","2","3"].map( unary( parseInt ) );
// [1,2,3]

//像Bacon.js里面都有如下函数，只接收一个参数,这个有啥用?
function identity(v) {
    return v
}

//去除掉空串, split can reveive regular expression
var words = "   Now is the time for all...  ".split(/\s|\b/)
// ["","Now","is","the","time","for","all","...",""]
words.filter(identity)
//Because identity(..) simply returns the value passed to it, JScoerces each value into either true or false, and that determines whether to keep or exclude each value in the final array.

// gather and spread arguments
function apply(fn) {
    return function spreadFn(argsArr) {
        return fn(...argsArr)
    }
}

function unapply(fn) {
    return function gatheredFn(...argsArr) {
        return fn(argsArr)
    }
}


function combineFirstTwo([v1, v2]) {
    return v1 + v2
}

[1,2,3,4,5].reduce(unapply(combineFirstTwo))
// 15

//some now, some later
//argument presetting

function getPerson(data, callback) {
    ajax('http://some.api/person', data, callback)
}

// One practice an FPer gets very used to is looking for patterns where we do the same sorts of things repeatedly, and trying to turn those actions into generic reusable utilities. 


