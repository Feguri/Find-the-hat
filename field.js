const hole = 'O';
const fieldCharacter = '░';

module.exports.generateField = function(col, row,  difficulty){
    const numOfColumns = col; // Default 50
    const numOfRows = row; // Default 12
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

        let randomNumbers = [];
        for(let i = 0; i < difficulty; i++){
            randomNumbers.push(Math.floor(Math.random() * numOfColumns));
        }


        for (let i = 0; i < numOfColumns; i++){
            if (i === 0 || i === numOfColumns - 1) {
                array.push(hole);
            } else if (randomNumbers.includes(i)){
                if (i === numOfColumns - 2){
                    array.push(fieldCharacter);
                } else {
                    array.push(hole);
                }

            } else {
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