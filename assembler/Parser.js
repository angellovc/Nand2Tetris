const fs = require('fs');
const SymbolTable = require('./SymbolTable');

// VARIABLE SYMBOLS

// LABEL SYMBOLS

// PRE_defined symbols 

class Parser {
    constructor(fileName) {
        this.data = fs.readFileSync(fileName,
            {encoding:'utf8', flag:'r'});
        this.instructions = this.cleanLines().split('\n');
        this.symbolTable = new SymbolTable();
    }

    cleanLines() {
        return this.data.replace(/(\/\/.*)|(\r)|( )/gm, '').trim();
    }

    getPureAssemblerInstructions() {
        const instructionWithoutSymbols = this.getSymbols(this.instructions);
        const pureAssemblerInstructions = this.getPureAssembler(instructionWithoutSymbols);
        return pureAssemblerInstructions;
    }

    getSymbols(instructions) {
        const instructionsWithoutSymbols = [];
        instructions.forEach(instruction=> {
            if (instruction[0] ==='(' && instruction[1] === ')' || instruction.length === 1)
                throw new Error(`${instruction} is badly formated. Symbols should be present and must be correctly enclosed`)

            if (instruction[0] === '(') {
                const symbol = instruction.slice(1, instruction.length - 1);
                this.symbolTable.add(symbol, instructionsWithoutSymbols.length);
                return;
            }
            instructionsWithoutSymbols.push(instruction);
        });
        return instructionsWithoutSymbols;
    }

    getPureAssembler(instructions) {
        const pureAsm = [...instructions];
        pureAsm.forEach((instruction, index) => {
            const variable = instruction.slice(1, instruction.length);
            if (instruction.length === 1)
                throw new Error(`${instruction} is incomplete it's necessary to put an address after the @ symbol`)

            if (instruction[0] === '@' && /[a-zA-Z]/g.test(variable)) {
                pureAsm[index] = '@'+this.symbolTable.getORadd(variable);
            }
        });
        return pureAsm;
    }
}

module.exports = Parser;