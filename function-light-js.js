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
//partial application is strictly a reduction in a function's arity,如下getPerson比ajax少了一元(3 --> 2)
function getPerson(data, callback) {
    ajax('http://some.api/person', data, callback)
}

// One practice an FPer gets very used to is looking for patterns where we do the same sorts of things repeatedly, and trying to turn those actions into generic reusable utilities. 



var getPerson = partial(ajax, 'http://some.api/person');

//version 1
var getCurrentUser = partial(ajax, 'http://some.api/person', {user: CURRENT_USER_ID});


//version 2   reuse getPerson!!
var getCurrentUser = partial(getPerson, {user: CURRENT_USER_ID});

//partial apply
//When the partiallyApplied(..) function is later executed somewhere else in your program, it uses the closed over fn to execute the original function, first providing any of the (closed over) presetArgs partial application arguments, then any further laterArgs arguments.

//closure!! use fn and presetArgs The inner function partiallyApplied(..) closes over both the fn and presetArgs variables so it can keep accessing them later, no matter where the function runs. 
function partial(fn, ...presetArgs) {
    return function partiallyApplied(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

var getPerson = partial(ajax, 'http://some.api/person')

// version 1
var getCurrentUser = partial(
    ajax,
    "http://some.api/person",
    { user: CURRENT_USER_ID }
);


// version 2. reuse getPerson
var getCurrentUser = partial( getPerson, { user: CURRENT_USER_ID } );


// version 1
var getCurrentUser = function partiallyApplied(...laterArgs) {
    return ajax(
        "http://some.api/person",
        { user: CURRENT_USER_ID },
        ...laterArgs
    );
};

// version 2  参数从里到外排序
var getCurrentUser = function outerPartiallyApplied(...outerLaterArgs){
    var getPerson = function innerPartiallyApplied(...innerLaterArgs){
        return ajax( "http://some.api/person", ...innerLaterArgs );
    };

    return getPerson( { user: CURRENT_USER_ID }, ...outerLaterArgs );
}

//partial apply 使用

function add( x,y ) {
    return x + y
}

[1,2,3,4,5].map(partial(add, 3))
// [4,5,6,7,8]


//reversing arguments

function reverseArgs(fn) {
    return function argsReversed(...args) {
        return fn(...args.reverse());
    };
}

var cache = {}
var cacheResult = reverseArgs(
    partial(reverseArgs(ajax), function onResult(obj) {
        cache[obj.id] = obj
    })
)
// later:
cacheResult( "http://some.api/person", { user: CURRENT_USER_ID } );

function argsReversed(...args) {
    return ajax(...args.reverse())
}

function partiallyApplied(...args) {
    return argsReversed(cb, ...args)
}

function reverseAgain(...args) {
    return partiallyApplied(...args.reverse())
}



[1,2,3,4,5].map( partial( add, 3 ) );
// [4,5,6,7,8]

//reverse arguments
function reverseArgs(fn) {
    return function argsReversed(...args){
        return fn( ...args.reverse() );
    };
}


function partialRight(fn,...presetArgs) {
    return reverseArgs(
        partial( reverseArgs( fn ), ...presetArgs.reverse() )
    );
}


function partialRight(fn,...presetArgs) {
    return function partiallyApplied(...laterArgs){
        return fn( ...laterArgs, ...presetArgs );
    };
}

function foo(x,y,z,...rest) {
    console.log( x, y, z, rest );
}

var f = partialRight( foo, "z:last" );

f( 1, 2 );          // 1 2 "z:last" []

f( 1 );             // 1 "z:last" undefined []

f( 1, 2, 3 );       // 1 2 3 ["z:last"]

f( 1, 2, 3, 4 );    // 1 2 3 [4,"z:last"]

// one at a time. currying 本质: So currying unwinds a single higher-arity function into a series of chained unary functions.

curriedAjax( "http://some.api/person" )
    ( { user: CURRENT_USER_ID } )
        ( function foundUser(user){ /* .. */ } );



function curry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){ // prevArgs开始接收一个[]
        return function curried(nextArg){ //然后每次收集一个参数
            var args = [ ...prevArgs, nextArg ];
            //直到收集到所有的参数执行fn
            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}

//The approach here is to start a collection of arguments in prevArgs as an empty [] array, and add each received nextArg to that, calling the concatenation args. While args.length is less than arity (the number of declared/expected parameters of the original fn(..) function), make and return another curried(..) function to collect the next nextArg argument, passing the running args collection along as its prevArgs. Once we have enough args, execute the original fn(..) function with them.

//If you use this implementation of curry(..) with a function that doesn't have an accurate length property, you'll need to pass the arity (the second parameter of curry(..)) to ensure curry(..) works correctly. length will be inaccurate if the function's parameter signature includes default parameter values, parameter destructuring, or is variadic with ...args

var curriedAjax = curry( ajax );

var personFetcher = curriedAjax( "http://some.api/person" );

var getCurrentUser = personFetcher( { user: CURRENT_USER_ID } );

getCurrentUser( function foundUser(user){ /* .. */ } );
//Each call partially applies one more argument to the original ajax(..) call, until all three have been provided and ajax(..) is actually invoked.


[1,2,3,4,5].map( curry( add )( 3 ) );
// [4,5,6,7,8]


//partial 和 curry 的区别
//Why might you choose curry(..) over partial(..)? It might be helpful in the case where you know ahead of time that add(..) is the function to be adapted, but the value 3 isn't known yet:

var adder = curry( add );

// later
[1,2,3,4,5].map( adder( 3 ) );
// [4,5,6,7,8]


function sum(...nums) {
    var total = 0;
    for (let num of nums) {
        total += num;
    }
    return total;
}

sum( 1, 2, 3, 4, 5 );                       // 15

// now with currying:
// (5 to indicate how many we should wait for)
var curriedSum = curry( sum, 5 );

curriedSum( 1 )( 2 )( 3 )( 4 )( 5 );        // 15


//本质，更加明确 产生新的函数
//The advantage of currying here is that each call to pass in an argument produces another function that's more specialized, and we can capture and use that new function later in the program. Partial application specifies all the partially applied arguments up front, producing a function that's waiting for all the rest of the arguments on the next call.

// why currying?
/*
1.
The first and most obvious reason is that both currying and partial application allow you to separate in time/space (throughout your codebase) when and where separate arguments are specified, whereas traditional function calls require all the arguments to be present at the same time. 

2.composition of functions is much easier
*/


var getCurrentUser = partial(
    ajax,
    "http://some.api/person",
    { user: CURRENT_USER_ID }
);

// later
getCurrentUser( function foundUser(user){ /* .. */ } );

//That's what abstraction is all about: separating two sets of details -- in this case, the how of getting a current user and the what we do with that user -- and inserting a semantic boundary between them, which eases the reasoning of each part independently.
//Whether you use currying or partial application, creating specialized functions from generalized ones is a powerful technique for semantic abstraction and improved readability.

function looseCurry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){
        return function curried(...nextArgs){
            var args = [ ...prevArgs, ...nextArgs ];

            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}


function uncurry(fn) {
    return function uncurried(...args){
        var ret = fn;

        for (let arg of args) {
            ret = ret( arg );
        }

        return ret;
    };
}


function partialProps(fn,presetArgsObj) {
    return function partiallyApplied(laterArgsObj){
        return fn( Object.assign( {}, presetArgsObj, laterArgsObj ) );
    };
}

function curryProps(fn,arity = 1) {
    return (function nextCurried(prevArgsObj){
        return function curried(nextArgObj = {}){
            var [key] = Object.keys( nextArgObj );
            var allArgsObj = Object.assign(
                {}, prevArgsObj, { [key]: nextArgObj[key] }
            );

            if (Object.keys( allArgsObj ).length >= arity) {
                return fn( allArgsObj );
            }
            else {
                return nextCurried( allArgsObj );
            }
        };
    })( {} );
}


function spreadArgProps(
    fn,
    propOrder =
        fn.toString()
        .replace( /^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)
            \s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/, "$1$2$3" )
        .split( /\s*,\s*/ )
        .map( v => v.replace( /[=\s].*$/, "" ) )
      ) {
          return function spreadFn(argsObj){
              return fn( ...propOrder.map( k => argsObj[k] ) );
          };
      }
  
  
//No points
//A popular style of coding in the FP world aims to reduce some of the visual clutter by removing unnecessary parameter-argument mapping. This style is formally called tacit programming, or more commonly: point-free style. The term "point" here is referring to a function's parameter input.


["1","2","3"].map( unary( parseInt ) );
// [1,2,3]

function output(txt) {
    console.log( txt );
}

function printIf( predicate, msg ) {
    if (predicate( msg )) {
        output( msg );
    }
}


function isShortEnough(str) {
    return str.length <= 5;
}

function isLongEnough(str) {
    return !isShortEnough( str );
}

function not(predicate) {
    return function negated(...args){
        return !predicate( ...args );
    };
}

var isLongEnough = not( isShortEnough );

printIf( isLongEnough, msg2 );          // Hello World

function when(predicate,fn) {
    return function conditional(...args){
        if (predicate( ...args )) {
            return fn( ...args );
        }
    };
}

var printIf = uncurry( partialRight( when, output ) );

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf( isShortEnough, msg1 );         // Hello
printIf( isShortEnough, msg2 );

printIf( isLongEnough, msg1 );
printIf( isLongEnough, msg2 );          // Hello World


