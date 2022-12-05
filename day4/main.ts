import * as fs from 'fs';

const test = false;

const folder = 'day4'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log('Reading:', filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();
// console.log("Red", content);

const fullyContains = function (assignmentA: string, assignmentB: string): boolean {
    const nrsA = assignmentA.split('-');
    const nrsB = assignmentB.split('-');
    const fromA = parseInt(nrsA[0]);
    const toA = parseInt(nrsA[1]);
    const fromB = parseInt(nrsB[0]);
    const toB = parseInt(nrsB[1]);
    return fromA <= fromB && toA >= toB;
}

const overlap = function (assignmentA: string, assignmentB: string): boolean {
    const nrsA = assignmentA.split('-');
    const nrsB = assignmentB.split('-');
    const fromA = parseInt(nrsA[0]);
    const toA = parseInt(nrsA[1]);
    const fromB = parseInt(nrsB[0]);
    const toB = parseInt(nrsB[1]);
    return toA >= fromB && toA <= toB;
}


let pairs = 0;
let overlapPairs = 0;

content.forEach(row => {
    const assignments = row.split(',');
    if (fullyContains(assignments[0], assignments[1])) {
        pairs++;
        // console.log(row);
    } else if (fullyContains(assignments[1], assignments[0])) {
        pairs++;
        // console.log(row);
    }

    if (overlap(assignments[0], assignments[1])) {
        overlapPairs++;
        console.log(row);
    } else if (overlap(assignments[1], assignments[0])) {
        overlapPairs++;
        console.log(row);
    }

});

console.log(pairs);
console.log(overlapPairs);
