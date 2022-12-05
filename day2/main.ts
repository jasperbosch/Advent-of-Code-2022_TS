import * as fs from 'fs';

const test = false;
let filename = 'input.txt';

if (test) {
    filename = 'test.txt';
}

const content = fs.readFileSync(filename);
const scores = content.toString().split('\r\n');
scores.pop();

// A = Rock = 1
// B = Paper = 2
// C = Scissors = 3
// X = Rock => lose
// Y = Paper => draw
// Z = Scissors => win

// lose = 0
// draw = 3
// win = 6

const points = function (score: string) {
    const hands = score.split(' ');
    if (hands[1] === 'X') { // Rock
        if (hands[0] == 'B') { // Paper
            return 1;
        } else if (hands[0] === 'A') { // Rock
            return 4;
        } else { // Scissors
            return 7;
        }
    }
    if (hands[1] === 'Y') { // Paper
        if (hands[0] === 'C') { // Scissors
            return 2;
        } else if (hands[0] === 'B') { // Paper
            return 5;
        } else { // Rock
            return 8;
        }
    }
    if (hands[1] === 'Z') { // Scissors
        if (hands[0] === 'A') { // Rock
            return 3;
        } else if (hands[0] === 'C') { // Scissors
            return 6;
        } else { // Paper
            return 9;
        }
    }
    return 0;
}

const matchFix = function (score: string) {
    const hands = score.split(' ');
    if (hands[1] === 'X') { // lose
        if (hands[0] == 'A') { // Rock
            return 3;
        } else if (hands[0] === 'B') { // Paper
            return 1;
        } else { // Scissors
            return 2;
        }
    }
    if (hands[1] === 'Y') { // draw
        if (hands[0] === 'A') {
            return 1 + 3;
        } else if (hands[0] === 'B') {
            return 2 + 3;
        } else {
            return 3 + 3;
        }
    }
    if (hands[1] === 'Z') { // win
        if (hands[0] === 'A') { // Rock
            return 2 + 6;
        } else if (hands[0] === 'B') { // Paper
            return 3 + 6;
        } else { // Scissors
            return 1 + 6;
        }
    }
    return 0;
}

let logScore = function (score: string) {
    console.log(score, score
        .replace('A', 'Rock')
        .replace('B', 'Paper')
        .replace('C', 'Scissors')
        .replace('X', 'Rock')
        .replace('Y', 'Paper')
        .replace('Z', 'Scissors'));
}

let total = 0;
let totalMatchFix = 0;
scores.forEach(score => {
    logScore(score)

    let pnts = points(score)
    total += pnts;
    console.log(pnts, total)

    let mpnts = matchFix(score);
    totalMatchFix += mpnts;
    console.log(mpnts, totalMatchFix)
});

console.log(total);
console.log(totalMatchFix)
