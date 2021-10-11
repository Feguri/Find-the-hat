// @ts-check
const prompt = require('prompt-sync')({sigint: true});
const print = require('./print.js').print;
const generateField = require('./field.js').generateField;

const hat = '^';
const hole = 'O';
const pathCharacter = '*';

/**
 * @param {number} min
 * @param {number} max
 */
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Field {
    constructor(field, begin, end){
        this.field = field;

        this.begin = begin;
        this.end = end;

        this.currentRow = 3;
        this.currentColumn = 6;
        this.start = false;
        this.foundHat = false;
        this.playerDied = false;

        // Introduction to the game
        this.intro = `Welcome to "Find Your Hat" console game.\n\nYour task as a player (${pathCharacter}) is to reach the hat (${hat})
while avoiding the holes (${hole}). use "u" (up), "d" (down), "r" (right) and "l" (left) to navigate your character. Then, press the spacebar and add a 
number. This number will be the number of steps you take! Be careful not to overestimate, or you'll die. There are seven levels in the game.
You can come back to this guide at any time by pressing "I".\n\n
Good Luck!\n\n`;

        // Random numbers for the hat location
        this.randomRow = Math.floor(((Math.random() * 11) + 1));
        this.randomColumn = randomIntFromInterval(this.begin, this.end);

        // Renders player in field
        this.field[this.currentRow][this.currentColumn] = pathCharacter;
        // Renders the hat on a random row on the opposite side
        this.field[this.randomRow][this.randomColumn] = hat;

    }

    gameOver(){
        console.log('Game over! You fell through a hole! ... :(');
        this.playerDied = true;
    }

    win(){
        print('Congratulations! You found the hat!', 8);
        this.foundHat = true;
    }


    checkStatus(){
        if (this.field[this.currentRow][this.currentColumn] === hole){
            this.printField();
            this.gameOver();
        } else if (this.field[this.currentRow][this.currentColumn] === hat){
            this.printField();
            this.win();
            
        } else {
            this.printField();
        }
    }

    renderPlayer(){
        this.field[this.currentRow][this.currentColumn] = '*';
    }

    
    moveLeft(){
        this.currentColumn--;
        this.checkStatus();
        this.renderPlayer();

    }

    moveDown(){
        this.currentRow++;
        this.checkStatus();
        this.renderPlayer();
    }

    moveUp(){
        this.currentRow--;
        this.checkStatus();
        this.renderPlayer();
    }

    moveRight(){
        this.currentColumn++;
        this.checkStatus();
        this.renderPlayer();
    }

    printField(){
        console.clear();
        for(let e of this.field){
            e.forEach(element => {
                // @ts-ignore
                process.stdout.write(element);
            });

            // skips the line
            console.log('');
        }
    }

    printFieldMainLoop(){
        const inputHelper = (direction, input) => {
            for(let i = 0; i < Number(input.split(' ')[1]); i++){
                if (this.playerDied || this.foundHat){
                    break;
                }
                if (direction === 'moveDown'){
                    this.moveDown();
                } else if (direction === 'moveUp'){
                    this.moveUp();
                } else if (direction === 'moveRight'){
                    this.moveRight();
                } else if (direction === 'moveLeft'){
                    this.moveLeft();
                }

            }
        }

        if (this.start){
            console.clear();
        } else {
            this.start = true;
        }

        for(let e of this.field){
            e.forEach(element => {
                // @ts-ignore
                process.stdout.write(element);
            });

            // skips the line
            console.log('');
        }
        let input = prompt('Enter your keys here -> ').toLowerCase();
            
        if(input[0] === 'u'){
            inputHelper('moveUp', input);
        } else if (input[0] === 'd'){
            inputHelper('moveDown', input);
        } else if (input[0] === 'r'){
            inputHelper('moveRight', input);
        } else if (input[0] === 'l'){
            inputHelper('moveLeft', input);
        } else if (input[0] === 'i'){
            print(this.intro, 6);
            this.start = false;
        }
         else {
            this.printFieldMainLoop();
        }
    }
}


let died = false;

while (!died){
    // Object that keeps track of player's progress
    let passedLevel = { 
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false
    }

    const wantsToRestart = () => {
        // function that asks player if they'd like to restart the game
        const restart = prompt('Restart game? (Y || N) -> ').toLowerCase();
        if (restart === 'y'){
            return true;
        } else {
            return false;
        }
    }

    // Level 1
    const level1 = new Field(generateField(20, 12, 0), 10, 18);
    print(level1.intro, 4);
    print('level 1\n\n', 15);
    while (!level1.foundHat){
        if (level1.playerDied){
            died = true;
            break;
        }
        level1.printFieldMainLoop();
    }
    passedLevel['1'] = true;
    if (died){
        passedLevel['1'] = false;
        if (wantsToRestart()){
            console.clear();
            print('\n\nRestarting Game\n\n\n', 15);
            console.clear();
        } else {
            break;
        }
    }
    
    // level 2
    if (passedLevel['1']){
        const level2 = new Field(generateField(25, 12, 1), 15, 23);

        print('\n\nlevel 2\n\n', 15);
        while (!level2.foundHat){
            if (level2.playerDied){
                died = true;
                break;
            }
            level2.printFieldMainLoop();
        }
        passedLevel['2'] = true;
        if (died){
            passedLevel['2'] = false;
            if (wantsToRestart()){
                console.clear();
                print('\n\nRestarting Game\n\n\n', 15);
                console.clear();
            } else {
                break;
            }
        }
    }

    
    // level 3
    if (passedLevel['2']){
        // Levels are getting increasingly harder and larger
        const level3 = new Field(generateField(35, 12, 2), 25, 33);

        print('\n\nlevel 3\n\n', 15);
        while (!level3.foundHat){
            if (level3.playerDied){
                died = true;
                break;
            }
            level3.printFieldMainLoop();
        }
        passedLevel['3'] = true;
        if (died){
            passedLevel['3'] = false;
            if (wantsToRestart()){
                console.clear();
                print('\n\nRestarting Game\n\n\n', 15);
                console.clear();
            } else {
                break;
            }
        }
    }
    
    // level 4
    if (passedLevel['3']){
        const level4 = new Field(generateField(45, 12, 3), 25, 43);

        print('\n\nlevel 4\n\n', 15);
        while (!level4.foundHat){
            if (level4.playerDied){
                died = true;
                break;
            }
            level4.printFieldMainLoop();
        }
        passedLevel['4'] = true;
        if (died){
            passedLevel['4'] = false;
            if (wantsToRestart()){
                console.clear();
                print('\n\nRestarting Game\n\n\n', 15);
                console.clear();
            } else {
                break;
            }
        }
    }

    // level 5
    if (passedLevel['4']){
        const level5 = new Field(generateField(50, 12, 4), 35, 48);

        print('\n\nlevel 5\n\n', 15);
        while (!level5.foundHat){
            if (level5.playerDied){
                died = true;
                break;
            }
            level5.printFieldMainLoop();
        }
        passedLevel['5'] = true;
        if (died){
            passedLevel['5'] = false;
            if (wantsToRestart()){
                console.clear();
                print('\n\nRestarting Game\n\n\n', 15);
                console.clear();
            } else {
                break;
            }
        }
    }

    // level 6
    if (passedLevel['5']){
        const level6 = new Field(generateField(50, 12, 5), 35, 47);

        print('\n\nlevel 6\n\n', 15);
        while (!level6.foundHat){
            if (level6.playerDied){
                died = true;
                break;
            }
            level6.printFieldMainLoop();
        }
        passedLevel['6'] = true;
        if (died){
            passedLevel['6'] = false;
            if (wantsToRestart()){
                console.clear();
                print('\n\nRestarting Game\n\n\n', 15);
                console.clear();
            } else {
                break;
            }
        }
    }

    // level 7 final level
    if (passedLevel['6']){
        const level7 = new Field(generateField(70, 15, 8), 50, 69); // nice

        print('\n\nlevel 7 (final level)\n\n', 15);
        while (!level7.foundHat){
            if (level7.playerDied){
                died = true;
                break;
            }
            level7.printFieldMainLoop();
        }
        passedLevel['7'] = true;
        if (died){
            passedLevel['7'] = false;
            if (wantsToRestart()){
                console.clear();
                print('\n\nRestarting Game\n\n\n', 15);
                console.clear();
            } else {
                break;
            }
        }
    }

    if (passedLevel['7']){
        print('\n\nCongratulations, You beat the game!\n\n', 12);

        if (wantsToRestart()){
            console.clear();
            print('\n\nRestarting Game\n\n\n', 15);
            console.clear();
        } else {
            break;
        }
    }
    died = false;
}

