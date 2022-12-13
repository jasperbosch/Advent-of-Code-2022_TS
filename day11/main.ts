import * as fs from 'fs';

// const bigInt = require('big-integer');
import * as bigInt from 'big-integer';

class Monkey {
    id?: number;
    items?: bigInt.BigInteger[];
    operation?: string;
    test?: {
        divisible?: number;
        trueThrowTo?: number;
        falseThrowTo?: number
    }
}

const test = true;

const folder = 'day11'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log('Reading:', filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');

// content.pop();

function getWorryLevel(old: bigInt.BigInteger, operation: string): bigInt.BigInteger {
    const parts = operation.split(' ');
    let x: bigInt.BigInteger;
    let newValue:bigInt.BigInteger = bigInt(0);
    if (parts[4] === 'old') {
        x = old;
    } else {
        x = bigInt(parts[4]);
    }
    switch (parts[3]) {
        case '+':
            newValue = old.add(x);
            break;
        case '*':
            newValue = old.multiply(x);
            break;
        default:
            console.error('Wrong operator', operation);
    }
    return newValue;
}

function modulo (n, p, m){
    var result = 1;
    while(p--) {
        result = (result * n) % m;
    }

    return result;
}

let monkey: Monkey = {};
const monkeys: Monkey[] = [];

content.forEach(row => {
    const parts = row.trim().split(' ');
    switch (parts[0]) {
        case 'Monkey':
            monkey.id = parseInt(row.substring(7, 8));
            break;
        case 'Starting':
            monkey.items = row.substring(18).split(', ').map(value => bigInt(value));
            break;
        case 'Operation:':
            monkey.operation = row.substring(13);
            break;
        case 'Test:':
            monkey.test = {divisible: parseInt(row.substring(21))};
            break;
        case 'If':
            switch (parts[1]) {
                case 'true:':
                    monkey.test.trueThrowTo = parseInt(row.substring(row.length - 1));
                    break;
                case 'false:':
                    monkey.test.falseThrowTo = parseInt(row.substring(row.length - 1));
                    break;
                default:
                    console.error('Wrong test', row);
            }
            break;
        case '':
            monkeys.push(monkey);
            monkey = {};
            break;
        default:
            console.error('Wrong line', row)
    }
});
// console.log('Initial', monkeys);

const inspections:number[]=[0,0,0,0,0,0,0,0];

// for (let round = 0; round < 10000; round++) {
for (let round = 0; round < 20; round++) {
    monkeys.forEach(monkey => {
        // console.log('Round ', round, monkey.id, monkey.items);
        console.log('Monkey ', monkey.id)
        const numberOfItems = monkey.items.length;
        for (let x = 0; x < numberOfItems; x++) {
            inspections[monkey.id]++;
            const item = monkey.items[0];
            console.log('  Monkey inspects an item with a worry level of ', item);
            let worryLevel:bigInt.BigInteger = getWorryLevel(item, monkey.operation);
            console.log(`    Worry level is multipied by ? to ${worryLevel}`);
            // worryLevel = Math.floor(worryLevel / 3);
            // console.log(`    Monkey gets bored with item. Worry level is diveded by 3 to ${worryLevel}`);
            if (worryLevel.mod(monkey.test.divisible) === bigInt(0)) {
                console.log(`    Current worry level is divisible by ${monkey.test.divisible}`);
                console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.test.trueThrowTo}`);
                monkeys[monkey.test.trueThrowTo].items.push(worryLevel);
            } else {
                console.log(`    Current worry level is not divisible by ${monkey.test.divisible}`);
                console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.test.falseThrowTo}`);
                monkeys[monkey.test.falseThrowTo].items.push(worryLevel);
            }
            monkey.items.shift();
        }
    })
    console.log(round, inspections);
}

// console.log(inspections)
const sortedInspections=inspections.sort((a,b)=>(a>b)?-1:(b>a)?1:0);
console.log(sortedInspections[0]*sortedInspections[1]);
