import * as fs from 'fs';

const test = false;

const folder='day3'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

const content = fs.readFileSync(filename);
const rucksacs = content.toString().split('\r\n');
rucksacs.pop();

const priority = function (similar: string): number {
    let charcode = similar.charCodeAt(0);

    return charcode;
}

let sum = 0;
rucksacs.forEach(rucksac => {
    let rContentB = rucksac.split('');
    const rSize = rContentB.length;
    let rContentA = rContentB.splice(0, rSize / 2);

    // find in both
    let similar;
    for (let i = 0; i < rContentA.length && !similar; i++) {
        for (let y = 0; y < rContentB.length && !similar; y++) {
            if (rContentA[i] === rContentB[y]) {
                similar = rContentA[i];
            }
        }
    }

    // console.log(similar, similar && priority(similar));
    if (similar) {
        sum += priority(similar);
    }
});

console.log(sum);

let sum2=0;
for (let i=0;i<rucksacs.length;i=i+3){

    let badge;
    for (let x=0;x<rucksacs[i].length && !badge;x++){
        for (let y=0;y<rucksacs[i+1].length && !badge;y++){
            if (rucksacs[i][x] === rucksacs[i+1][y]) {
                for (let z = 0; z < rucksacs[i + 2].length && !badge; z++) {
                    if (rucksacs[i][x] === rucksacs[i+2][z]){
                        badge = rucksacs[i][x];
                    }
                }
            }
        }
    }
    console.log(badge, badge && priority(badge))
    if (badge){
        sum2 += priority(badge);
    }
}

console.log(sum2)
