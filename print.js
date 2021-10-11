// A function I created earlier to print intros in a nice video-game fashion
/**
 * @param {string} phrase
 * @param {number} setting
 */
module.exports.print = function(phrase, setting) {
    // 1 is the fastest, 20 is the slowest
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
        10: 10000000,
        11: 11000000,
        12: 12000000,
        13: 13000000,
        14: 14000000,
        15: 15000000,
        16: 16000000,
        17: 17000000,
        18: 18000000,
        19: 19000000,
        20: 20000000
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
            //  @ts-ignore
            process.stdout.write(phrase[index]);
            index++;
        }
        if (lastLetter === phrase[index]){
            break;
        }
    };
}