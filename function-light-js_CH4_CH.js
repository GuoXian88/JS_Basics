
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
