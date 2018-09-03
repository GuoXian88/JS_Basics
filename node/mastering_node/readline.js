const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface({
    input: fs.createReadStream('dictionary.txt'),
    terminal: false
});

let arr = [];
//async operation
rl.on('line', ln => {
    // console.log(ln);
    arr.push(ln.trim());
});

setTimeout(() => {
    console.log(arr);
}, 100);
