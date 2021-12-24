// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white_LOOP" in every pixel;
// the screen should remain fully clear as long as no key is pressed.


// Screen memory map 16384 - 24575 = 8191
// Keyboard memory map 24576

// LOOP infinite
// key = read 24576

//if key != 0
//    Put the screen black
// if key == 0
//    Put the screen white_LOOP


@i
M = 0

(MAIN_LOOP)
    // Getting Keyboard value 
    @24576
    D = M
    // if key != 0 go to DARK_LOOP
    @DARK_LOOP
    D;JNE
    // key == 0 go to WHITE_LOOP
    @WHITE_LOOP
    D;JEQ

@MAIN_LOOP
0;JMP

(DARK_LOOP)
    // if i is at the end (i == 8192) break the loop
    @i
    D = M
    @8192
    D = D - A
    @MAIN_LOOP
    D;JEQ

    // Selecting screen register
    @i
    D = M
    @SCREEN
    A = A + D
    // Coloring register
    M = - 1

    @i // i++
    M = M + 1
@DARK_LOOP
0;JMP

(WHITE_LOOP)
    // if i is at the begining (i == 0) break the loop
    @i
    D = M
    @MAIN_LOOP
    D;JLT

    // Selecting screen register
    @i
    D = M
    @SCREEN
    A = A + D
    // Coloring register
    M = 0

    @i // i++
    M = M - 1

@WHITE_LOOP
0;JMP