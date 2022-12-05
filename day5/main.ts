import * as fs from 'fs';

const test = false;

const folder='day5'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log("Reading:",filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();

const stacks=new Map<number, string[] >();

let readingStacks =  true;
let readingMoves = false;

content.forEach(row=>{
    if (readingStacks){
        if (row.startsWith(' 1   2 ')){
            readingStacks = false;
            for(let stack of stacks.entries()){
                const reverse = stack[1].reverse();
                stacks.set(stack[0],reverse);
            }
        } else {
            for (let p=0;p<row.length;p++){
                if (row[p]!==' ' && row[p]!=='[' && row[p]!==']') {
                    const position = ((p - 1) / 4) + 1;
                    if (stacks.has(position)) {
                        const stack = stacks.get(position);
                        stack!.push(row[p]);
                        stacks.set(position, stack!);
                    } else {
                        stacks.set(position,[row[p]]);
                    }
                }
            }
        }
    }
    else if(row === ""){
        readingMoves = true;
    } else {
        const instructions = row.split(' ');
        const amount = parseInt(instructions[1]);
        const from = parseInt(instructions[3]);
        const to = parseInt(instructions[5]);

        // for (let i=0;i<amount;i++){
        //     const crate = stacks.get(from).pop();
        //     stacks.get(to).push(crate);
        //     // console.log(from,to,amount,crate);
        // }
        const start = stacks.get(from).length - amount;
        const crates = stacks.get(from).splice(start, amount);
        stacks.set(to,stacks.get(to).concat(crates));
    }

});

console.log(stacks)

let lastCrates='';
for (let c=1;c<=stacks.size;c++){
    const last = stacks.get(c).pop();
    lastCrates += last;
}
console.log(lastCrates)
