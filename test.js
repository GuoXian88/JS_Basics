var reg = /\{(\d)\}/g;

function format() {
	var arg = arguments;
	return '<h1>{0}</h1> <h2>{1}</h2> <h3>{2}</h3>'.replace(reg, function(a, b) {

		console.log('a:', a, 'b: ',b)
		return arg[b] || 'default';
	})
}

console.log(format('aa', 'bb', 'cc'));
