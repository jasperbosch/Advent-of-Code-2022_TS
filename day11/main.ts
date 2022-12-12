import * as fs from 'fs';

const test = true;

const folder='day3'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log("Reading:",filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();
