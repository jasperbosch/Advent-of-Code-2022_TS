import * as fs from 'fs';

const test = false;
let filename = 'input.txt';

if (test) {
    filename = 'test.txt';
}

const content = fs.readFileSync(filename);
const calories = content.toString().split('\r\n');

let mostCalories = 0;
let countCalories = 0;

const elves: number[] = [];

calories.forEach(calorie => {
    if (calorie === '') {
        mostCalories = Math.max(mostCalories, countCalories);
        elves.push(countCalories);
        countCalories = 0;
    } else {
        countCalories += parseInt(calorie);
    }
});

elves.sort((a, b) => {
    if (a > b) {
        return -1;
    } else if (b > a) {
        return 1;
    }
    return 0;
})

console.log(elves[0]+elves[1]+elves[2]);
