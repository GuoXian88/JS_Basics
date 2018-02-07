

//Now, this is all conceptual. I'm not literally saying the JS engine uses objects and prototypes. But it's entirely plausible that it could work similarly.

function trackEvent(evt,keypresses = () => []) {
    return function newKeypresses() {
        return [ ...keypresses(), evt ];
    };
}

var keypresses = trackEvent( newEvent1 );

keypresses = trackEvent( newEvent2, keypresses );


//Each time we add a new event to the "list", we create a new closure wrapped around the existing keypresses() function (closure), which captures the current evt. When we call the keypresses() function, it will successively call all the nested functions, building up an intermediate array of all the individually closed-over evt objects. Again, closure is the mechanism that's tracking all the state; the array you see is only an implementation detail of needing a way to return multiple values from a function.


//closure : information hiding. consider abstraction, the module pattern with public and private APIs, etc.

function bind(orinFn,thisObj) {
    return function boundFn(...args) {
        return origFn.apply( thisObj, args );
    };
}

var student = bind( StudentRecord, { name: "Kyle.." } );

//However, the built-in bind(..) utility doesn't really have to create a closure to accomplish the task. It simply creates a function and manually sets its internal this to the specified object. That's potentially a more efficient operation than if we did the closure ourselves.

//The kind of performance savings we're talking about here is miniscule on an individual operation. But if your library's critical path is doing this hundreds or thousands of times or more, that savings can add up quickly. Many libraries -- Bluebird being one such example -- have ended up optimizing by removing closures and going with objects, in exactly this means.


// CH 8 recursive
//there are more complex use cases where mutual recursion can be very helpful. Counting the number of leaves in a tree data structure is one example, and recursive descent parsing (of source code, by a compiler) is another.

function sum(total,...nums) {
    for (let num of nums) {
        total = total + num;
    }

    return total;
}

// vs

function sum(num1,...nums) {
    if (nums.length == 0) return num1;
    return num1 + sum( ...nums );
}



function maxEven(...nums) {
    var maxNum = -Infinity;

    for (let num of nums) {
        if (num % 2 == 0 && num > maxNum) {
            maxNum = num;
        }
    }

    if (maxNum !== -Infinity) {
        return maxNum;
    }
}

function maxEven(num1,...restNums) {
    var maxRest = restNums.length > 0 ?
            maxEven( ...restNums ) :
            undefined;

    return (num1 % 2 != 0 || num1 < maxRest) ?
        maxRest :
        num1;
}

//But I'd say the most obvious improvement is that the distraction of the imperative for-loop is suppressed. All the looping logic is abstracted into the recursive call stack, so that stuff doesn't clutter the code. We're free then to focus on the logic of finding a max-even by comparing two numbers at a time -- the important part anyway!

function depth(node) {
    if (node) {
        let depthLeft = depth( node.left );
        let depthRight = depth( node.right );
        return 1 + max( depthLeft, depthRight );
    }

    return 0;
}

//函数内部调用函数会形成stack
//When the second function call starts, it needs a stack frame as well, bringing the count to 2. If that function calls another, we need a third stack frame. And so on. The word "stack" speaks to the notion that each time a function is called from the previous one, the next frame is stacked on top. When a function call finishes, its frame is popped off the stack.


//The idea is that if a call from function baz() to function bar() happens at the very end of function baz()'s execution -- referred to as a tail call -- the stack frame for baz() isn't needed anymore. That means that either the memory can be reclaimed, or even better, simply reused to handle function bar()'s execution. Visualizing:

//The main problem with recursion is its memory usage, keeping around the stack frames to track the state of a function call while it dispatches to the next recursive call iteration.

//The key recognition point for this refactoring strategy is that we could remove our dependence on the stack by doing the addition now instead of after, and then forward-passing that partial result as an argument to the recursive call. In other words, instead of keeping total in the current function's stack frame, push it into the stack frame of the next recursive call; that frees up the current stack frame to be removed/reused.

"use strict";

function sum(result,num1,...nums) {
    result = result + num1;
    if (nums.length == 0) return result;
    return sum( result, ...nums );
}


"use strict";

function maxEven(num1,num2,...nums) {
    num1 =
        (num1 % 2 == 0 && !(maxEven( num2 ) > num1)) ?
            num1 :
            (num2 % 2 == 0 ? num2 : undefined);

    return nums.length == 0 ?
        num1 :
        maxEven( num1, ...nums )
}


[1,2,3,4,5].reduce(
    (list,v) => (
        list.push( double( v ) ),
        list
    ), []
);
// [2,4,6,8,10]

[1,2,3,4,5].reduce(
    (list,v) => (
        isOdd( v ) ? list.push( v ) : undefined,
        list
    ), []
);
// [1,3,5]


//reduce and map and filter
var unique =
arr =>
    arr.filter(
        (v,idx) =>
            arr.indexOf( v ) == idx
    );


var unique =
arr =>
    arr.reduce(
        (list,v) =>
            list.indexOf( v ) == -1 ?
                ( list.push( v ), list ) : list
    , [] );


//flatten
var flatten =
arr =>
    arr.reduce(
        (list,v) =>
            list.concat( Array.isArray( v ) ? flatten( v ) : v )
    , [] );


var flatten =
(arr,depth = Infinity) =>
    arr.reduce(
        (list,v) =>
            list.concat(
                depth > 0 ?
                    (depth > 1 && Array.isArray( v ) ?
                        flatten( v, depth - 1 ) :
                        v
                    ) :
                    [v]
            )
    , [] );


var flatMap =
(mapperFn,arr) =>
    flatten( arr.map( mapperFn ), 1 );

function zip(arr1,arr2) {
    var zipped = [];
    arr1 = [...arr1];
    arr2 = [...arr2];

    while (arr1.length > 0 && arr2.length > 0) {
        zipped.push( [ arr1.shift(), arr2.shift() ] );
    }

    return zipped;
}

//performance

var removeInvalidChars = str => str.replace( /[^\w]*/g, "" );

var upper = str => str.toUpperCase();

var elide = str =>
    str.length > 10 ?
        str.substr( 0, 7 ) + "..." :
        str;

var words = "Mr. Jones isn't responsible for this disaster!"
    .split( /\s/ );

words;
// ["Mr.","Jones","isn't","responsible","for","this","disaster!"]

words
.map( removeInvalidChars )
.map( upper )
.map( elide );
// ["MR","JONES","ISNT","RESPONS...","FOR","THIS","DISASTER"]

words
.map(
    compose( elide, upper, removeInvalidChars )
);
// ["MR","JONES","ISNT","RESPONS...","FOR","THIS","DISASTER"]

//If it's a BST (ours is!) and we do an in-order traversal -- always visit the left child tree first, then the node itself, then the right child tree -- we'll visit the values in ascending (sorted) order.

// in-order traversal
BinaryTree.forEach = function forEach(visitFn,node){
    if (node) {
        if (node.left) {
            forEach( visitFn, node.left );
        }

        visitFn( node );

        if (node.right) {
            forEach( visitFn, node.right );
        }
    }
};


BinaryTree.map = function map(mapperFn,node){
    if (node) {
        let newNode = mapperFn( node );
        newNode.parent = node.parent;
        newNode.left = node.left ?
            map( mapperFn, node.left ) : undefined;
        newNode.right = node.right ?
            map( mapperFn, node.right ): undefined;

        if (newNode.left) {
            newNode.left.parent = newNode;
        }
        if (newNode.right) {
            newNode.right.parent = newNode;
        }

        return newNode;
    }
};

BinaryTree.reduce = function reduce(reducerFn,initialValue,node){
    if (arguments.length < 3) {
        // shift the parameters since `initialValue` was omitted
        node = initialValue;
    }

    if (node) {
        let result;

        if (arguments.length < 3) {
            if (node.left) {
                result = reduce( reducerFn, node.left );
            }
            else {
                return node.right ?
                    reduce( reducerFn, node, node.right ) :
                    node;
            }
        }
        else {
            result = node.left ?
                reduce( reducerFn, initialValue, node.left ) :
                initialValue;
        }

        result = reducerFn( result, node );
        result = node.right ?
            reduce( reducerFn, result, node.right ) : result;
        return result;
    }

    return initialValue;
};


//Chapter 10: Functional Async
var customerId = 42;
var customer;

lookupCustomer( customerId, function onCustomer(customerRecord){
    var orders = customer ? customer.orders : null;
    customer = customerRecord;
    if (orders) {
        customer.orders = orders;
    }
} );

lookupOrders( customerId, function onOrders(customerOrders){
    if (!customer) {
        customer = {};
    }
    customer.orders = customerOrders;
} );




var customerId = 42;

var customerPromise = lookupCustomer( customerId );
var ordersPromise = lookupOrders( customerId );

customerPromise.then( function onCustomer(customer){
    ordersPromise.then( function onOrders(orders){
        customer.orders = orders;
    } );
} );



//eager vs. lazy
var a = [];

var b = mapLazy( a, v => v * 2 );

a.push( 1 );

a[0];       // 1
b[0];       // 2

a.push( 2 );

a[1];       // 2
b[1];       // 4


//So these arrays don't strictly grow in memory usage over time, an important characteristic of lazy data structures and operations. In fact, it's less like an array and more like a buffer.

//We can think of a as producing values and b as consuming them. So for readability, let's reorganize this snippet to separate the concerns into producer and consumer roles:

// producer:

var a = new LazyArray();

setInterval( function everySecond(){
    a.push( Math.random() );
}, 1000 );


// **************************
// consumer:

var b = a.map( function double(v){
    return v * 2;
} );

b.listen( function onValue(v){
    console.log( v );
} );

//Imagine a could actually be attached to some other event source, like the user's mouse clicks or keystrokes, websocket messages from a server, etc. In that scenario, a doesn't actually have to concern itself with time. It's merely a time-independent conduit for values, whenever they are ready.

//From the perspective of b (the consumer), we do not know or care when/where the values in a come from. As a matter of fact, all the values could already be present. All we care about is that we want those values, whenever they are ready. Again, this is a time-independent (aka lazy) modeling of the map(..) transformation operation.

// producer:

var a = {
    onValue(v){
        b.onValue( v );
    }
};

setInterval( function everySecond(){
    a.onValue( Math.random() );
}, 1000 );


// **************************
// consumer:

var b = {
    map(v){
        return v * 2;
    },
    onValue(v){
        v = this.map( v );
        console.log( v );
    }
};


// producer:

var a = Rx.Observable.create( function onObserve(observer){
    setInterval( function everySecond(){
        observer.next( Math.random() );
    }, 1000 );
} );

