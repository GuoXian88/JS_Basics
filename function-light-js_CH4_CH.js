
// CHAPTER 4 compose function
function skipShortWords(words) {
    var filteredWords = [];

    for (let word of words) {
        if (word.length > 4) {
            filteredWords.push( word );
        }
    }

    return filteredWords;
}

var biggerWords = compose(skipShortWords, unique, words);

// Note: uses a `<= 4` check instead of the `> 4` check
// that `skipShortWords(..)` uses
function skipLongWords(list) { /* .. */ }

var filterWords = partialRight( compose, unique, words );

var biggerWords = filterWords( skipShortWords );
var shorterWords = filterWords( skipLongWords );

biggerWords( text );
// ["compose","functions","together","output","first",
// "function","input","second"]

shorterWords( text );
// ["to","two","pass","the","of","call","as"]

// reduce!!
function compose(...fns) {
    return function composed(result){
        return [...fns].reverse().reduce( function reducer(result,fn){
            return fn( result );
        }, result ); // initialize result
    };
}

// CONS : However, this implementation is limited in that the outer composed function (aka, the first function in the composition) can only receive a single argument.  solution:


function compose(...fns) {
    return fns.reverse().reduce( function reducer(fn1,fn2){
        return function composed(...args){
            return fn2( fn1( ...args ) );
        };
    } );
}

//The performance characteristics will potentially be different than in the previous reduce(..)-based implementation. Here, reduce(..) only runs once to produce a big composed function, and then this composed function call simply executes all its nested functions each call. In the former version, reduce(..) would be run for every call.

//递归版本的compose
function compose(...fns) {
    // pull off the last two arguments
    var [ fn1, fn2, ...rest ] = fns.reverse();

    var composedFn = function composed(...args){
        return fn2( fn1( ...args ) );
    };

    if (rest.length == 0) return composedFn;

    return compose( ...rest.reverse(), composedFn );
}

//The reverse ordering, composing from left-to-right, has a common name: pipe(..). This name is said to come from Unix/Linux land, where multiple programs are strung together by "pipe"ing (| operator) the output of the first one in as the input of the second, and so on (i.e., ls -la | grep "foo" | less).

function pipe(...fns) {
    return function piped(result){
        var list = [...fns];

        while (list.length > 0) {
            // take the first function from the list
            // and execute it
            result = list.shift()( result );
        }

        return result;
    };
}

// imperative
function shorterWords(text) {
    return skipLongWords( unique( words( text ) ) );
}

// declarative
var shorterWords = compose( skipLongWords, unique, words );

// CHAPTER 5 Reducing side-effects

console.log(y, typeof y)
//undefined "undefined"
function foo(x) {
    y = x * 2;
}

var y;

foo( 3 );

console.log(y, typeof y)
//6 "number"

[] == []
// false


//In other words, the final console.log(x) is impossible to analyze or predict unless you've mentally executed the whole program up to that point.


//I/O Effects

//The most common (and essentially unavoidable) form of side cause/effect is input/output (I/O). A program with no I/O is totally pointless, because its work cannot be observed in any way. Useful programs must at a minimum have output, and many also need input. Input is a side cause and output is a side effect.

//If you work more in Node.js, you may more likely receive input from, and send output to, the file system, network connections, and/or the stdin/stdout streams.


//幂等
// If you must make side effect changes to state, one class of operations that's useful for limiting the potential trouble is idempotence. If your update of a value is idempotent, then data will be resilient to the case where you might have multiple such updates from different side effect sources.

function updateCounter(obj) {
    if (obj.count < 10) {
        obj.count++;
        return true;
    }

    return false;
}

//From the mathematical point of view, idempotence means an operation whose output won't ever change after the first call, if you feed that output back into the operation over and over again. In other words, foo(x) would produce the same output as foo(foo(x)) and foo(foo(foo(x))).

var x = 42, y = "hello";

String( x ) === String( String( x ) );              // true

Boolean( y ) === Boolean( Boolean( y ) );           // true

identity( 3 ) === identity( identity( 3 ) );    // true

function currency(val) {
    var num = parseFloat(
        String( val ).replace( /[^\d.-]+/g, "" )
    );
    var sign = (num < 0) ? "-" : "";
    return `${sign}$${Math.abs( num ).toFixed( 2 )}`;
}

currency( -3.1 );                                   // "-$3.10"

currency( -3.1 ) == currency( currency( -3.1 ) );   // true

//程序幂等
//the result of calling f(x) subsequent times after the first call doesn't change anything.

//This idempotence-style is often cited for HTTP operations (verbs) such as GET or PUT. 
//If an HTTP REST API is properly following the specification guidance for idempotence, PUT is defined as an update operation that fully replaces a resource.
// As such, a client could either send a PUT request once or multiple times (with the same data), and the server would have the same resultant state regardless.


var hist = document.getElementById( "orderHistory" );

// idempotent:
hist.innerHTML = order.historyText;

// non-idempotent:
var update = document.createTextNode( order.latestUpdate );
hist.appendChild( update );
//The key difference illustrated here is that the idempotent update replaces the DOM element's content. The current state of the DOM element is irrelevant, because it's unconditionally overwritten. The non-idempotent operation adds content to the element; implicitly, the current state of the DOM element is part of computing the next state.

function unary(fn) {
    return function onlyOneArg(arg){
        return fn( arg );
    };
}
/*unary(..) itself is clearly pure -- its only input is fn and its only output is the returned function -- but what about the inner function onlyOneArg(..), which closes over the free variable fn?

It's still pure because fn never changes. In fact, we have full confidence in that fact because lexically speaking, those few lines are the only ones that could possibly reassign fn.

Note: fn is a reference to a function object, which is by default a mutable value. Somewhere else in the program could, for example, add a property to this function object, which technically "changes" the value (mutation, not reassignment). However, because we're not relying on anything about fn other than our ability to call it, and it's not possible to affect the callability of a function value, fn is still effectively unchanging for our reasoning purposes; it cannot be a side cause.


JavaScript's dynamic value nature makes it all too easy to have non-obvious side causes/effects.

*/


function rememberNumbers(nums) {
    // make a copy of the array
    nums = [...nums];

    return function caller(fn){
        return fn( nums );
    };
}


var list = [1,2,3,4,5];

// make `list[0]` be a getter with a side effect
Object.defineProperty(
    list,
    0,
    {
        get: function(){
            console.log( "[0] was accessed!" );
            return 1;
        }
    }
);

var simpleList = rememberNumbers( list );
// [0] was accessed!


//In practice (in JavaScript) the question of function purity is not about being absolutely pure or not, but about a range of confidence in its purity.


//Referential transparency is the assertion that a function call could be replaced by its output value, and the overall program behavior wouldn't change. In other words, it would be impossible to tell from the program's execution whether the function call was made or its return value was inlined in place of the function call.
 
//That result becomes kinda like a mental const declaration, which as you're reading you can transparently swap in and not spend any more mental energy working out.


function safer_fetchUserData(userId,users) {
    // simple, naive ES6+ shallow object copy, could also
    // be done w/ various libs or frameworks
    users = Object.assign( {}, users );

    fetchUserData( userId );

    // return the copied state
    return users;


    // ***********************

    // original untouched impure function:
    function fetchUserData(userId) {
        ajax(
            `http://some.api/user/${userId}`,
            function onUserData(user){
                users[userId] = user;
            }
        );
    }
}

//safer_fetchUserData(..) is more pure, but is not strictly pure in that it still relies on the I/O of making an Ajax call. There's no getting around the fact that an Ajax call is an impure side effect, so we'll just leave that detail unaddressed.


