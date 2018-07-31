/*

node的标准库TLS/SSL是用C写的
基于event
Write	programs	that	do	one	thing	and	do	it	well.
Write	programs	to	work	together.
Write	programs	to	handle	text	streams,	because	that	is	a	universal	interface.

Node	favors	text	over	binary	formats

这里的mode是可选参数?
c: int mkdir(const char *path, mode_t mode)
node:
|fs.mkdir(path[, mode], callback)
UDP server是EventEmitter的实例 

动态类型的优点：不用声明类型，可以随意改变类型
不能编译，运行速度慢
V8-->机器码而不是bytecode(JIT)
2个阶段
Initially,	a	first-pass	compiler	(the	full	compiler)	converts	your	code	into	a
runnable	state	as	quickly	as	possible.	

 Once	the	program	is	up	and	running,	an	optimizing	compiler	then	begins	its
job	of	watching	how	your	program	runs,	and	attempting	to	determine	its
current	and	future	runtime	characteristics,	optimizing	and	re-optimizing	as
necessary.	For	example,	if	a	certain	function	is	being	called	many	thousands
of	times	with	similar	arguments	of	a	consistent	type,	V8	will	re-compile
that	function	with	code	optimized	on	the	optimistic	assumption	that	future
types	will	be	like	the	past	types.	While	the	first	compile	step	was
conservative	with	as-yet	unknown	and	un-typed	functional	signature,	this
hot	function's	predictable	texture	impels	V8	to	assume	a	certain	optimal
profile	and	re-compile	based	on	that	assumption.

出错了的话：
V8	has
no	choice,	in	that	case:	it	must	de-optimize	the	function.	V8	must	admit	its
mistake	and	roll	back	the	work	it	has	done.	It	will	re-optimize	in	the	future	if	a
new	pattern	is	seen.	However,	if	V8	must	again	de-optimize	at	a	later	time,	and	if
this	optimize/de-optimize	binary	switching		continues,	V8	will	simply	give	up,
and	leave	your	code	in	a	de-optimized	state.

*/

//eg1 program.js
let someFunc = function foo() {};
console.log(%FunctionGetName(someFunc)); //foo

//node --allow-natives-syntax program.js

//eg2

let operand = 3;
function square(){
    return operand * operand;
}
//make firt pass to gather type information
square();

%OptimizeFunctionOnNextCall(square);
square();

%OptimizeFunctionOnNextCall(square);
operand = 3.01;
square();

//node --allow-natives-syntax --trace_opt --trace_deopt index.js

/*Avoid	mixing	types	in	arrays.	It	is	always	better	to	have	a	consistent	data	type,
such	as	all	integers	or	all	strings.

Don't	create	arrays	with	gaps,	such	as	the	following:	let	a	=	[];
a[2]	=	'foo';
a[23]	=	'bar';


Sparse	arrays	are	bad	for	this	reason:	V8	can	either	use	a	very	efficient	linear
storage	strategy	to	store	(and	access)	your	array	data,	or	it	can	use	a	hash	table
(which	is	much	slower).	If	your	array	is	sparse,	V8	must	choose	the	least
efficient	of	the	two.	For	the	same	reason,	always	start	your	arrays	at	the	zero
index.	As	well,	do	not	ever	use	delete	to	remove	elements	from	an	array.	You	are
simply	inserting	an	undefined	value	at	that	position,	which	is	just	another	way	of
creating	a	sparse	array.	Similarly,	be	careful	about	populating	an	array	with
empty	values—ensure	that	the	external	data	you	are	pushing	into	an	array	is	not
incomplete.

Try	not	to	preallocate	large	arrays—grow	as	you	go.	Similarly,	do	not	preallocate
an	array	and	then	exceed	that	size.	You	always	want	to	avoid	spooking	V8	into turning	your	array	into	a	hash	table.	V8	creates	a	new	hidden	class	whenever	a
new	property	is	added	to	an	object	constructor.	Try	to	avoid	adding	properties
after	an	object	is	instantiated.	Initialize	all	members	in	constructor	functions	in
the	same	order.	Same	properties	+	same	order	=	same	object.

动态数组
Remember	that	JavaScript	is	a	dynamic	language	that	allows	object	(and	object
prototype)	modifications	after	instantiation.	Since	the	shape	and	volume	of	an
object	can,	therefore,	be	altered	after	the	fact,	how	does	V8	allocate	memory	for
objects?	It	makes	some	reasonable	assumptions.	After	a	set	number	of	objects
are	instantiated	from	a	given	constructor	(I	believe	8	is	the	trigger	amount),	the
largest	of	these	is	assumed	to	be	of	the	maximum	size,	and	all	further	instances
are	allocated	that	amount	of	memory	(and	the	initial	objects	are	similarly
resized).	A	total	of	32	fast	property	slots,	inclusive,	are	then	allocated	to	each
instance	based	on	this	assumed	maximum	size.	Any	extra	properties	are	slotted
into	a	(slower)	overflow	property	array,	which	can	be	resized	to	accommodate
any	further	new	properties.

Functions	are	typically	called	often,	and	should	be	one	of	your	prime
optimization	focuses.	Functions	containing	try-catch	constructs	are	not
optimizable,	nor	are	functions	containing	other	unpredictable	constructs,	like	with
or	eval.	If,	for	some	reason,	your	function	is	not	optimizable,	keep	its	use	to	a
minimum.

A	very	common	optimization	error	involves	the	use	of	polymorphic	functions.
Functions	that	accept	variable	function	arguments	will	be	de-optimized.	Avoid
polymorphic	functions.

*/
const { promisify } = require('util'); //看看源码


//eg3

const size = ~~process.argv[2];
const n = ~~process.argv[3] || 100;
const buffers = [];
let i;
for(i=0; i<n; i++) {
    buffers.push(Buffer.alloc(size));
    process.stdout.write(process.memoryUsage().heapTotal + "\n");
}

/**
 A	Node	process	begins	by	constructing	a	single	execution	stack,	with	the	global
context	forming	the	base	of	the	stack.	Functions	on	this	stack	execute	within
their	own	local	context	(sometimes	referred	to	as	scope),	which	remains
enclosed	within	the	global	context.	This	way	of	keeping	the	execution	of	a
function	together	with	the	environment	the	function	runs	in	is	called	closure.


The	concomitant	execution	stack	is	introduced	to	Node's	single-process	thread.
This	stack	remains	in	memory	until	libuv	reports	that	fs.readdir	has	completed,	at
which	point	the	registered	anonymous	callback	fires,	resolving	the	sole	pending
execution	context.	As	no	further	events	are	pending,	and	the	maintenance	of
closures	no	longer	necessary,	the	entire	structure	can	be	safely	torn	down	(in
reverse,	beginning	with	anonymous),	and	the	process	can	exit,	freeing	any
allocated	memory.	This	method	of	building	up	and	tearing	down	a	single	stack	is
what	Node's	event	loop	is	ultimately	doing.


异步事件驱动programming

The	event	loop	runs	in	the	same	(single)	thread	your	JavaScript	code	runs
in.	Blocking	the	event	loop	means	blocking	the	entire	thread.
You	don't	start	and/or	stop	the	event	loop.	The	event	loop	starts	as	soon	as	a
process	starts,	and	ends	when	no	further	callbacks	remain	to	be	performed.
The	event	loop	may,	therefore,	run	forever.
The	event	loop	delegates	many	I/O	operations	to	libuv,	which	manages
these	operations	(using	the	power	of	the	OS	itself,	such	as	thread	pools),
notifying	the	event	loop	when	results	are	available.	An	easy-to-reason-
about	single-threaded	programming	model	is	reinforced	with	the	efficiency
of	multithreading.


    The	key	design	choice	made	by	Node's	designers	was	the
    implementation	of	an	event	loop	as	a	concurrency	manager.	For	example,
notifying	your	Node-based	HTTP	server	of	network	connections	to	your	local
hardware	is	handled	by	the	OS	passing	along,	via	libuv,	network	interface	events.

2个阶段：
event selection/detection
event handling
When	data	becomes	available	on	a	socket	or	other	stream	interface,	we	cannot
simply	execute	our	callback	immediately.	JavaScript	is	single-threaded,	so
results	must	be	synchronized.	We	can't	suddenly	change	the	state	in	the	middle
of	an	event	loop	tick	—	this	would	create	some	of	the	classic	multithreaded
application	problems	of	race	conditions,	memory	access	conflicts,	and	so	on.
Upon	entering	an	event	loop,	Node,	in	effect,	makes	a	copy	of	the	current
instruction	queue	(also	known	as	stack),	empties	the	original	queue,	and
executes	its	copy.	The	processing	of	this	instruction	queue	is	referred	to	as	a
tick.	If	libuv,	asynchronously,	receives	results	while	the	chain	of	instructions
copied	at	the	start	of	this	tick	are	being	processed	on	the	single	main	thread	(V8),
these	results	(wrapped	as	callbacks)	are	queued.	Once	the	current	queue	is
emptied	and	its	last	instruction	has	completed,	the	queue	is	again	checked	for
instructions	to	execute	on	the	next	tick.	This	pattern	of	checking	and	executing
the	queue	will	repeat	(loop)	until	the	queue	is	emptied,	and	no	further	data
events	are	expected,	at	which	point	the	Node	process	exits.
 */

//eg4
//ipc.js

setInterval(()=>{}, 1e6);
process.on("SIGUSR1", () => {
    console.log("Got a signal!");
});

//eg5 child process



/*


