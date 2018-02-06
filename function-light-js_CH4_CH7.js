
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



//That is, the purity of a function is judged from the outside, regardless of what goes on inside. As long as a function's usage behaves pure, it is pure. Inside a pure function, impure techniques can be used -- in moderation! -- for a variety of reasons, including most commonly, for performance. It's not necessarily, as they say, "turtles all the way down".

function safer_handleInactiveUsers(userList,dateCutoff) {
    // make a copy of both the list and its user objects
    let copiedUserList = userList.map( function mapper(user){
        // copy a `user` object
        return Object.assign( {}, user );
    } );

    // call the original function with the copy
    handleInactiveUsers( copiedUserList, dateCutoff );

    // expose the mutated list as a direct output
    return copiedUserList;
}

//Values of the primitive types (number, string, boolean, null, and undefined) are already immutable;
//js数据类型: 引用类型和非引用类型
var x = 2;

x.length = 4;

x;              // 2
x.length;       // undefined


//string
var s = "hello";

s[1];               // "e"

s[1] = "E";
s.length = 10;

s;                  // "hello"


//Interestingly, even the boxed String object value will act (mostly) immutable as it will throw errors in strict mode if you change existing properties:

"use strict";

var s = new String( "hello" );

s[1] = "E";         // error
s.length = 10;      // error

s[42] = "?";        // OK

s;                  // "hello"


//The precise definition we should use for a constant is: a variable that cannot be reassigned.

var x = Object.freeze( [2] );

//actually! Object.freeze(..) also marks the properties as non-reconfigurable, and it marks the object/array itself as non-extensible (no new properties can be added). In effect, it makes the top level of the object immutable.

var x = Object.freeze( [ 2, 3, [4, 5] ] );

// not allowed:
x[0] = 42;

// oops, still allowed:
x[2][0] = 42;

//对性能有没有影响要看发生的频率
//Then again, if such an operation is going to occur frequently, or specifically happen in a critical path of your application, then performance -- consider both performance and memory! -- is a totally valid concern.

//变化tracking
//Internally, it might be like a linked-list tree of object references where each node in the tree represents a mutation of the original value. Actually, this is conceptually similar to how Git version control works.

//In this conceptual illustration, an original array [3,6,1,0] first has the mutation of value 4 assigned to position 0 (resulting in [4,6,1,0]), then 1 is assigned to position 3 (now [4,6,1,1]), finally 2 is assigned to position 4 (result: [4,6,1,1,2]). The key idea is that at each mutation, only the change from the previous version is recorded, not a duplication of the entire original data structure. This approach is much more efficient in both memory and CPU performance, in general.


var state = specialArray( 4, 6, 1, 1 );

var newState = state.set( 4, 2 );

state === newState;                 // false

state.get( 2 );                     // 1
state.get( 4 );                     // undefined

newState.get( 2 );                  // 1
newState.get( 4 );                  // 2

newState.slice( 2, 5 );             // [1,1,2]
//The specialArray(..) data structure would internally keep track of each mutation operation (like set(..)) as a diff, so it won't have to reallocate memory for the original values (4, 6, 1, and 1) just to add the 2 value to the end of the list. But importantly, state and newState point at different versions (or views) of the array value, so the value immutability semantic is preserved.

//具体情况具体分析
//When changes to a value are few or infrequent and performance is less of a concern, I'd recommend the lighter-weight solution, sticking with built-in Object.freeze(..) as discussed earlier.

//static method不能通过实例来调用, 所以在class clsName{}内需要通过clsName来调用
class StaticMethodCall {
    constructor() {
      console.log(StaticMethodCall.staticMethod()); 
      // 'static method has been called.' 
  
      console.log(this.constructor.staticMethod()); 
      // 'static method has been called.' 
    }
  
    static staticMethod() {
      return 'static method has been called.';
    }
  }
//For performance-sensitive parts of the program, or in cases where changes happen frequently, creating a new array or object (especially if it contains lots of data) is undesirable, for both processing and memory concerns. In these cases, using immutable data structures from a library like Immutable.js is probably the best idea.


//closures protect from external mutation while objects do not. But, it turns out, both forms have identical mutation behavior.

//同构The term "isomorphic" gets thrown around a lot in JavaScript these days, 
//and it's usually used to refer to code that can be used/shared in both the server and the browser.

//The next time you hear someone say "X is isomorphic to Y", what they mean is, "X and Y can be converted from either one to the other in either direction, and not lose information."


//Closure Under the Hood

//So, we can think of objects as an isomorphic representation of closures from the perspective of code we could write. But we can also observe that a closure system could actually be implemented -- and likely is -- with objects!

//Think about it this way: in the following code, how is JS keeping track of the x variable for inner() to keep referencing, well after outer() has already run?

function outer() {
    var x = 1;

    return function inner(){
        return x;
    };
}
//We could imagine that the scope -- the set of all variables defined -- of outer() is implemented as an object with properties. So, conceptually, somewhere in memory, there's something like:

scopeOfOuter = {
    x: 1
};
//And then for the inner() function, when created, it gets an (empty) scope object called scopeOfInner, which is linked via its [[Prototype]] to the scopeOfOuter object, sorta like this:

scopeOfInner = {};
Object.setPrototypeOf( scopeOfInner, scopeOfOuter );
//Then, inside inner(), when it makes reference to the lexical variable x, it's actually more like:

return scopeOfInner.x;
//scopeOfInner doesn't have an x property, but it's [[Prototype]]-linked to scopeOfOuter, which does have an x property. Accessing scopeOfOuter.x via prototype delegation results in the 1 value being returned.

