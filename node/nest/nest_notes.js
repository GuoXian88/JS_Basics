/*controller
The controllers layer is responsible for handling incoming requests and returning a response to the client.

interface
An interface is a description of the actions that an object can do... for example when you flip a light switch, the light goes on, you don't care how, just that it does. In Object Oriented Programming, an Interface is a description of all functions that an object must have in order to be an "X". Again, as an example, anything that "ACTS LIKE" a light, should have a turn_on() method and a turn_off() method. The purpose of interfaces is to allow the computer to enforce these properties and to know that an object of TYPE T (whatever the interface is ) must have functions called X,Y,Z, etc.
OOP
An interface is a programming structure/syntax that allows the computer to enforce certain properties on an object (class). For example, say we have a car class and a scooter class and a truck class. Each of these three classes should have a start_engine() action. How the "engine is started" for each vehicle is left to each particular class, but the fact that they must have a start_engine action is the domain of the interface.

Summary

Interfaces fulfill two goals:

They allow the programmer to be more abstract when referencing objects (for example, var vehicle : Vehicle, can reference any car, truck, etc... anything that is a vehicle (and not care what type it is.) This occurs at "program time".

When the vehicle.start_engine() function is invoked, the correct function associated with the real object is actually used. This occurs at "run time".

They require the programmer to create specific functions that are expected in an implementing class when it implements an Interface.

Again, this allows all objects in a "set" of like objects to be treated based on the "high level" type of the set, rather than on the specific type of the individual object.



The middleware is a function, which is called before the route handler. Middleware functions have access to the request and response objects, and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:
Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
