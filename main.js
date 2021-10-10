// @ts-check
const term = require( 'terminal-kit' ).terminal ;
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Field {
    constructor(field){
        this.field = field;
        this.currentRow = 3;
        this.currentColumn = 6;
        this.start = false;

        // Random numbers for the hat location
        this.randomRow = Math.floor(((Math.random() * 11) + 1));
        this.randomColumn = randomIntFromInterval(42, 49);

        // Renders player in field
        this.field[this.currentRow][this.currentColumn] = pathCharacter;
        // Renders the hat on a random row on the opposite side
        this.field[this.randomRow][this.randomColumn] = hat;

    }

    gameOver(){
        console.log('Game over! You fell through a hole! ... :(');
        playerDied = true;
    }

    win(){
        print('Congratulations! You found the hat!', 8);
        foundHat = true;
    }


    checkStatus(){
        if (this.field[this.currentRow][this.currentColumn] === hole){
            this.gameOver();
        } else if (this.field[this.currentRow][this.currentColumn] === hat){
            this.win();
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

    print(){
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
        let input = prompt('Enter your key here -> ').toLowerCase();
            
        if(input === 'a'){
            this.moveLeft();
        } else if (input === 's'){
            console.log(input);

            this.moveDown();
        } else if (input === 'w'){
            this.moveUp();
        } else if (input === 'd'){
            this.moveRight();
        } else if (input === 'i'){
            print(intro, 6);
            this.start = false;
        }
         else {
            this.print();
        }
    }
}

// A function I created earlier to print intros in a nice video-game fashion
/**
 * @param {string} phrase
 * @param {number} setting
 */
function print(phrase, setting) {
    // 1 is the fastest, 9 is the slowest
    let settings = {
        1: 1000000,
        2: 2000000,
        3: 3000000,
        4: 4000000,
        5: 5000000,
        6: 6000000,
        7: 7000000,
        8: 8000000,
        9: 9000000,
    }


    const lastLetter = phrase[-1];
    const runtime = 1000000000000;
    let breaks = [];
    let currentTimeBreak = 10000;
    for (let letter of phrase) {
        breaks.push(currentTimeBreak)
        currentTimeBreak += settings[setting];
    }
    let index = 0;
    for (let i = 0; i < runtime; i++) {
        if (i === breaks[index]) {
            process.stdout.write(phrase[index]);
            index++;
        }
        if (lastLetter === phrase[index]){
            break;
        }
    };
}


function generateField(){
    const numOfColumns = 50;
    const numOfRows = 12;
    // returns a randomly generated field 
    const generateTopBottom = () => {
        let array = [];
        for (let i = 0; i < numOfColumns; i++){
            array.push(hole);
        }
        return array;
    }
    const generateMiddle = () => {
        let array = [];
        const randomNum1 = Math.floor(Math.random() * numOfColumns);
        const randomNum2 = Math.floor(Math.random() * numOfColumns);
        for (let i = 0; i < numOfColumns; i++){
            if (i === 0 || i === numOfColumns - 1) {
                array.push(hole);
            } else if (randomNum1 === i){
                array.push(hole);
            } else if (randomNum2 === i){
                array.push(hole);
            }
             else {
                array.push(fieldCharacter);
            }
        }
        return array;

    }
    let field = [generateTopBottom()];
    for (let i = 0; i < numOfRows; i++){
        if (i === numOfRows - 1){
            field.push(generateTopBottom());
        } else {
            field.push(generateMiddle());
        }
        
    }
    return field;
}

const level = new Field(generateField());

let foundHat = false;
let playerDied = false;
const intro = `Welcome to "Find Your Hat" console game.\n\nYour task as a player (${pathCharacter}) is to reach the hat (${hat})
while avoiding the holes (${hole}). use W, A, S D to navigate your character. This is a console game, so you'll
have to manually enter the keys and press enter. You can come back to this guide at any time by pressing "I".\n\n
Good Luck!\n\n`;

print(intro, 8);
while (!foundHat){
    if (playerDied){
        level.renderPlayer();
        break;
    }
    level.print();
}
