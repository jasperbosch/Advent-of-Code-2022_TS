import * as fs from 'fs';

const test = false;

const folder = 'day8'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log('Reading:', filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();

const trees: number[][] = [];
content.forEach(row => {
    trees.push(row.split('').map(v => parseInt(v)));
});
let visible = 0;

function isTreeVisible(y: number, x: number) {
    if (y === 0 || y === trees.length - 1 || x === 0 || x === trees[y].length - 1) {
        // around the edge
        visible++;
    } else {
        // TopDown
        let isVisible = true;
        for (let i = 0; i < y && isVisible; i++) {
            if (trees[x][i] >= trees[x][y]) {
                isVisible = false;
            }
        }
        if (!isVisible) {
            isVisible = true;
            // DownTop
            for (let i = y + 1; i < trees.length && isVisible; i++) {
                if (trees[x][i] >= trees[x][y]) {
                    isVisible = false;
                }
            }
        }
        if (!isVisible) {
            isVisible = true;
            // LeftRight
            for (let i = 0; i < x && isVisible; i++) {
                if (trees[i][y] >= trees[x][y]) {
                    isVisible = false;
                }
            }
        }
        if (!isVisible) {
            isVisible = true;
            // RightLeft
            for (let i = x + 1; i < trees[y].length && isVisible; i++) {
                if (trees[i][y] >= trees[x][y]) {
                    isVisible = false
                }
            }
        }
        if (isVisible) {
            visible++;
        }
    }
}

function getScenicScore(x: number, y: number): number {
    if (y === 0 || y === trees.length - 1 || x === 0 || x === trees[y].length - 1) {
        return 0;
    } else {
        let xtr = 0;
        let xtl = 0;
        let ytb = 0;
        let ytt = 0;
        // up
        for (let i = y - 1; i >= 0; i--) {
            ytt++;
            if (trees[x][i] >= trees[x][y] && i !== y) {
                break;
            }
        }
        // down
        for (let i = y + 1; i < trees.length; i++) {
            ytb++;
            if (trees[x][i] >= trees[x][y] && i !== y) {
                break;
            }
        }
        // left
        for (let i = x - 1; i >= 0; i--) {
            xtl++;
            if (trees[i][y] >= trees[x][y] && i !== x) {
                break;
            }
        }
        // right
        for (let i = x + 1; i < trees[y].length; i++) {
            xtr++;
            if (trees[i][y] >= trees[x][y] && i !== x) {
                break;
            }
        }
        console.log(x, y, trees[x][y], ytt, ytb, xtl, xtr, ytt * ytb * xtr * xtl)
        return ytt * ytb * xtr * xtl;
    }
}

let highestScenicScore = 0;

for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
        isTreeVisible(y, x);
        const scenicScore = getScenicScore(x, y);
        highestScenicScore = Math.max(highestScenicScore, scenicScore);
    }
}
console.log(visible);
console.log(highestScenicScore);
