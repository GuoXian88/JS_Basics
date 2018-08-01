function* range(start = 1, end = 2) {
    do {
        yield start;
    } while (++start < end);
}

for (let num of range(1, 3)) {
    console.log(num);
}

/*The	run/halt	(not	run/stop)	design	of	Generators	means	that	we	can	think	of
iteration	not	as	running	through	a	list,	but	of	capturing	a	set	of	transition	events
over	time.	This	idea	is	central	to	the	idea	of	Reactive	Programming	(https://en.wikipedia.org/wiki/Reactive_programming)

	Generators	are	to	a	sequence	of	future	values
as	Promises	are	to	a	single	future	value.	Both	Promises	and	Generators	can	be
passed	around	the	instant	they	are	generated	(even	if	some	eventual	values	are
still	resolving,	or	haven't	yet	been	queued	for	resolution),	with	one	getting	values
via	the	next()	interface,	and	the	other	via	the	then()	interface.

Consider	using	finite	state	machines	for	managing	your	events.	State
machines	are	surprisingly	under-represented	in	JavaScript	codebases.	When
a	callback	re-enters	program	flow,	it	has	likely	changed	the	state	of	your
application,	and	the	issuing	of	the	asynchronous	call	itself	is	a	likely
indicator	that	state	is	about	to	change


streams
Streams	are	required	because	files	are	big.


*/

//copy file

const fs = require('fs');

console.log('Copying...');
let block = fs.readFileSync('source.bin');
console.log('Size: ' + block.length);
fs.writeFileSync('destination.bin', block);
console.log('Done.');
