import * as fs from 'fs';

const test = false;

const folder = 'day10'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log('Reading:', filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();

let x = 1;
let cycle = 0;
let sum = 0;
// const lineFill = '........................................';
const lineFill = '';
let line = lineFill;

function getSignalStrength(c: number, y: number): number {
    if ((c - 20) % 40 === 0) {
        return c * y;
    }
    return 0;
}

function drawLine(c: number, l: string): string {
    const len = l.length;
    if (len === x - 1 || len === x || len === x + 1) {
        l = l + '#';
    } else {
        l = l + '.';
    }
    if (c % 40 === 0) {
        console.log(l);
        l = '';
    }
    return l;
}

content.forEach((row, index: number) => {
    let parts = row.split(' ');
    switch (parts[0]) {
        case 'addx':
            sum += getSignalStrength(cycle + 1, x);
            sum += getSignalStrength(cycle + 2, x);
            line = drawLine(cycle + 1, line);
            line = drawLine(cycle + 2, line);
            cycle = cycle + 2;
            x = x + parseInt(parts[1]);
            break;
        case 'noop':
            sum += getSignalStrength(cycle + 1, x);
            line = drawLine(cycle + 1, line);
            cycle = cycle + 1;
            break;
        default:
            console.error('wrong instruction');
    }

});

console.log(sum)
