// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Preparing the varaibles
@i
M = 0
@tmp
M = 0

// Do a sumation of R0 + R0  R1 times
(LOOP)
    // Store Sumation of R0 in R2
    @tmp
    D = M
    @R2
    M = D
    // if i >= R2 go to END
    @i
    D = M

    @R1
    D = D-M

    @END
    D;JEQ
    // else R0 + R0
    @R0
    D = M

    @tmp
    M = M + D
    // i++
    @i
    M = M + 1
    
    @LOOP
    0;JMP

(END)
@END
0;JMP
