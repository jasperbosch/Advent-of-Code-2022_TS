import * as fs from 'fs';

const test = true;

const folder = 'day9'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log('Reading:', filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();

function push(trail: { x: number, y: number }[], position: { x: number, y: number }): void {
    for (let i = 0; i < trail.length; i++) {
        if (trail[i].x === position.x && trail[i].y === position.y) {
            return;
        }
    }
    trail.push(position);
}

function mustTailMove(head, tail): boolean {
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            const check = {x: head.x + x, y: head.y + y};
            if (check.x === tail.x && check.y === tail.y) {
                return false;
            }
        }
    }

    return true;
}

function showField(trail: { x: number, y: number }[], head: { x: number, y: number }, tail: { x: number, y: number }) {
    if (test) {
        for (let y = 4; y >= 0; y--) {
            let line = '';
            for (let x = 0; x < 7; x++) {
                if (x == 0 && y == 0) {
                    line = line + 's';
                } else if (head.x === x && head.y === y) {
                    line = line + 'H';
                } else if (tail.x === x && tail.y === y) {
                    line = line + 'T';
                } else {
                    line = line + '.';
                }
            }
            console.log(line);
        }
        console.log('')
    }
}

let head: { x: number, y: number } = {x: 0, y: 0};
let tail: { x: number, y: number } = {x: 0, y: 0};
let trail: { x: number, y: number }[] = [{x: 0, y: 0}];

content.forEach(row => {

    console.log(row);
    console.log('')
    const parts = row.split(' ');
    const direction = parts[0];
    const steps = parseInt(parts[1]);

    switch (direction) {
        case 'R':
            for (let i = 0; i < steps; i++) {
                head.x++;
                if (mustTailMove(head, tail)) {
                    tail = {x: head.x - 1, y: head.y};
                    push(trail, tail);
                }
                showField(trail, head, tail);
            }
            break;
        case 'L':
            for (let i = 0; i < steps; i++) {
                head.x--;
                if (mustTailMove(head, tail)) {
                    tail = {x: head.x + 1, y: head.y};
                    push(trail, tail);
                }
                showField(trail, head, tail);
            }
            break;
        case 'U':
            for (let i = 0; i < steps; i++) {
                head.y++;
                if (mustTailMove(head, tail)) {
                    tail = {x: head.x, y: head.y - 1};
                    push(trail, tail);
                }
                showField(trail, head, tail);
            }
            break;
        case 'D':
            for (let i = 0; i < steps; i++) {
                head.y--;
                if (mustTailMove(head, tail)) {
                    tail = {x: head.x, y: head.y + 1};
                    push(trail, tail);
                }
                showField(trail, head, tail);
            }
            break;
        default:
            console.error('Unexpected direction')
    }
});


console.log(trail);
console.log(trail.length);
