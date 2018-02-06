

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