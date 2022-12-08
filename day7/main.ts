import * as fs from 'fs';

const test = false;

const folder='day7'
let filename = `${folder}/input.txt`;

if (test) {
    filename = `${folder}/test.txt`;
}

console.log("Reading:",filename);
const contentBuffer = fs.readFileSync(filename);
const content = contentBuffer.toString().split('\r\n');
content.pop();

let folders:string[]=[];
let folderSizes = new Map<string,number>();

content.forEach(row=>{

    const parts = row.split(' ');
    if (parts[0]==='$'){
        // command
        if (parts[1]==='cd'){
            if (parts[2]==='..'){
                // go back
                folders.pop();
            } else {
                folders.push(parts[2]);
            }
        }
    } else {
        if (parts[0] !== "dir") {
            let folderName='';
            folders.forEach(folder => {
                folderName += `/${folder}`
                if (folderSizes.has(folderName)) {
                    folderSizes.set(folderName, folderSizes.get(folderName) + parseInt(parts[0]));
                } else {
                    folderSizes.set(folderName, parseInt(parts[0]));
                }
            })
        }
    }
})

console.log(folderSizes);

let totalLess=0;
folderSizes.forEach((value,key)=>{
    if (value < 100000){
        totalLess += value;
    }
})
console.log("total < 100000", totalLess);
const totalUsed = folderSizes.get('//');
console.log("total used", totalUsed);
console.log("Free", 70000000 - totalUsed);
const inNeedOf = 30000000 - (70000000 - totalUsed);
console.log("To be freed", inNeedOf);

let smallestFolderSize = 30000000;
folderSizes.forEach((value,key)=>{
    if (value > inNeedOf){
        if (value < smallestFolderSize){
            smallestFolderSize = value;
        }
    }
})

console.log(smallestFolderSize)
