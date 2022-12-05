const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('New Day: ', name => {
    if (fs.existsSync(name)){
        console.error('Deze dag is al aangemaakt.')
    } else {
        fs.mkdirSync(name);
        fs.copyFileSync('template/test.txt',`${name}/test.txt`);
        fs.copyFileSync('template/input.txt',`${name}/input.txt`);
        fs.copyFileSync('template/main.ts',`${name}/main.ts`);
    }
    readline.close();
});
