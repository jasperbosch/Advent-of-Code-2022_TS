import * as fs from 'fs';

const test = true;

const folder = 'day9'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test2.txt`;
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

function mustTailMove(knots, index): boolean {
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            // console.log(index, knots);
            const check = {x: knots[index - 1].x + x, y: knots[index - 1].y + y};
            if (check.x === knots[index].x && check.y === knots[index].y) {
                return false;
            }
        }
    }

    return true;
}

function showField(trail: { x: number, y: number }[], knots: { x: number, y: number }[]) {
    if (test) {
        for (let y = 21; y >= -10; y--) {
            let line = '';
            for (let x = -15; x < 25; x++) {
                if (x == 0 && y == 0) {
                    line = line + 's';
                } else {
                    let added = false;
                    for (let index = 0; index < 10; index++) {
                        if (knots[index].x === x && knots[index].y === y) {
                            line = line + index;
                            added = true;
                            break;
                        }
                    }
                    if (!added) {
                        line = line + '.';
                    }
                }
            }
            console.log(line);
        }
        console.log('')
    }
}

const knots: { x: number, y: number }[] = [];
let trail: { x: number, y: number }[] = [{x: 0, y: 0}];

for (let x = 0; x < 10; x++) {
    knots[x] = {x: 0, y: 0};
}
content.forEach(row => {

    console.log(row);
    console.log('')


    const parts = row.split(' ');
    const direction = parts[0];
    const steps = parseInt(parts[1]);

    switch (direction) {
        case 'R':
            for (let i = 0; i < steps; i++) {
                knots[0].x++;

                if (mustTailMove(knots, 1)) {
                    for (let index = 9; index < 0; index--) {
                        knots[index].x = knots[index - 1].x;
                        knots[index].y = knots[index - 1].y;
                        if (index === 9) {
                            push(trail, knots[9]);
                        }
                    }
                }
                showField(trail, knots);
            }
            break;
        case 'L':
            for (let i = 0; i < steps; i++) {
                knots[0].x--;
                for (let index = 1; index < 10; index++) {
                    if (mustTailMove(knots, index)) {
                        knots[index] = {x: knots[index - 1].x + 1, y: knots[index - 1].y};
                        if (index === 9) {
                            push(trail, knots[9]);
                        }
                    }
                }
                showField(trail, knots);
            }
            break;
        case 'U':
            for (let i = 0; i < steps; i++) {
                knots[0].y++;
                for (let index = 1; index < 10; index++) {
                    if (mustTailMove(knots, index)) {
                        knots[index] = {x: knots[index - 1].x, y: knots[index - 1].y - 1};
                        if (index === 9) {
                            push(trail, knots[9]);
                        }
                    }
                }
                showField(trail, knots);
            }
            break;
        case 'D':
            for (let i = 0; i < steps; i++) {
                knots[0].y--;
                for (let index = 1; index < 10; index++) {
                    if (mustTailMove(knots, index)) {
                        knots[index] = {x: knots[index - 1].x, y: knots[index - 1].y + 1};
                        if (index === 9) {
                            push(trail, knots[9]);
                        }
                    }
                }
                showField(trail, knots);
            }
            break;
        default:
            console.error('Unexpected direction')
    }
});


console.log(trail);
console.log(trail.length);
