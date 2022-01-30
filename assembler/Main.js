const Parser = require('./Parser');
const Code = require('./Code');
const fs = require('fs');

const main = () => {
    if (process.argv.length === 2)
        throw Error('An asm file should be pass through as argument');
    const fileName = process.argv[2].toString();
    const parser = new Parser(fileName);
    const code = new Code(parser.getPureAssemblerInstructions());
    const hackInstructions = code.getHackCode();
    const file = fs.createWriteStream(fileName.replace('.asm', '')+'.hack');
    file.write(hackInstructions.join('\n'));

//    for (let i = 0; i < hack.length; i++) {
//        console.log(hack[i]);
//    }

}

main();