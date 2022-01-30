const {dest, jump, comp0, comp1} = require('./Instructions');

class Code {

    constructor(instructionSet) {
        this.instructionSet = instructionSet;
    }

    getHackCode() {
        const hackInstructions = [];
        this.instructionSet.forEach(instruction => {

            if (this.getOpCode(instruction) === '0') {
                const binaryAinstruction = 
                    this.getOpCode(instruction) +
                    this.getBinaryAinstruction(instruction);
                hackInstructions.push(binaryAinstruction);
            }          
            if (this.getOpCode(instruction) === '1') {
                const binaryCinstruction = 
                    this.getOpCode(instruction)      +
                    '11'                             +
                    this.getA(instruction)           +
                    this.getComparation(instruction) +
                    this.getDestination(instruction) +
                    this.getJump(instruction);
                    hackInstructions.push(binaryCinstruction);
            }
        });
        return hackInstructions;
    }

    // TODO: create a way to convert dec number into binary ones for A instruction

    // C instruction Getters
    getOpCode(instruction) {
        return instruction[0] === '@'? '0' : '1';
    }

    getDestination(instruction) {
        let destination = instruction.includes('=')? instruction.split("=")[0] : 'null';
        return dest[destination];
    }

    getJump(instruction) {
     let jumpInstruction = instruction.includes(';')? instruction.split(';')[1] : 'null';
     return jump[jumpInstruction];
    }

    getComparation(instruction) {
        const compInstruction = this.getCompInstruction(instruction);
        const comparison = comp0[compInstruction] !== undefined? comp0[compInstruction] : comp1[compInstruction];

        if (comparison === undefined) {
            console.log(comparison, instruction);
            throw new Error(`Instruction "${instruction}" is invalid`);
        }
        return comparison;
    }

    getA(instruction) {
        return comp0[this.getCompInstruction(instruction)] !== undefined? '0': '1';
    }

    getCompInstruction(instruction) {
        if (instruction.includes(';')) {
            return instruction.split(';')[0];

        } else if (instruction.includes('=')) {
            return instruction.split('=')[1];

        }
    }

    getBinaryAinstruction(instruction) {
        const address = parseInt(instruction.slice(1, instruction.length)).toString(2);
        let zeros = '';

        for (let i = address.length; i < 15; i++) {
            zeros += '0';
        }
        return zeros + address;
    }

}

module.exports = Code;