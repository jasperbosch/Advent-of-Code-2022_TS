import * as fs from 'fs';

const test = false;

const folder = 'day6'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log('Reading:', filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();

const checkDoubles = function (sequence: string[]): boolean {
    for (let i = 0; i < sequence.length - 1; i++) {
        for (let j = i+1; j < sequence.length; j++) {
            if (sequence[i] === sequence[j]) {
                return true;
            }
        }
    }
    return false;
}

content.forEach(row => {
    console.log(row)
    const seqence: string[] = [];
    const chars = row.split('');
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (seqence.length >= 14) {
            // check for doubles
            if (!checkDoubles(seqence)) {
                console.log('Marker is', char, i);
                break;
            }
            seqence.shift();
        }
        seqence.push(char)
    }
})
