let getRndNum = (min, max) => {
return Math.floor(Math.random()*(max - min)) + min;
    
}


function getNumOnRightPlace (compNum, userNum) {
    let sum = 0;
    let nums = '';
    let mCompNum = compNum.toString().split('');
    let mUserNum = userNum.toString().split('');

    mCompNum.forEach((item, i) => {
        if(mUserNum.length > i) {
            
            if(item == userNum[i]) {
                sum++;
                nums.length > 0 ? nums+=(' , '+ item) : nums+=item;
                mCompNum[i] = '#';
                mUserNum[i] = '*'
            }
        }
    }) 

    if(sum == compNum.toString().length) {
        return win();
    }

    return [sum, nums, mCompNum, mUserNum];
}


function getMatchNum(compNum, userNum) {
    let sum = 0;
    let nums = '';
    let mUserNum = userNum;
    let mCompNum = compNum;

    mUserNum.forEach((item, i) => {
        mCompNum.forEach((item2, j) => {
            if(item == item2) {
                sum++;
                nums.length > 0 ? nums+=(' , '+ item) : nums+=item;
                mUserNum[i] = '*';
                mCompNum[j] = '#';
            }
        })
    })

    return [sum, nums];
}


function compareNum(compNum, userNum) {
    let cowSum = getMatchNum(getNumOnRightPlace(compNum, userNum)[2], getNumOnRightPlace(compNum, userNum)[3])[0];
    let cow = getMatchNum(getNumOnRightPlace(compNum, userNum)[2], getNumOnRightPlace(compNum, userNum)[3])[1];
    let bullSum = getNumOnRightPlace(compNum, userNum)[0];
    let bull = getNumOnRightPlace(compNum, userNum)[1];

    let result = `[${userNum}] ; совпавших цифр не на своих местах - ${cowSum} (${cow||'нет'}), цифр на своих местах - ${bullSum} (${bull||'нет'})` 
    return result;
    
}



let gameStatus = document.querySelector('.gameStatus');
let input = document.querySelector('input');
let gameInfo = document.querySelector('.gameInfo');
const EnterBtn = document.querySelector('.EnterBtn');
let newGameBtn = document.querySelector('.newGameBtn');
let NUM;
let counter = document.querySelector('#counter');


newGameBtn.addEventListener('click', e => {
    newGame();
    // console.log(NUM);
})


window.addEventListener('keyup', e => {
    if(e.target.tagName == 'INPUT') {
        e.preventDefault();
        if (e.target.value.match(/[^0-9]/g)) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    }
})

function gameOver() {
    const quantityGuessedNum = message.match(/\d/);
    if(quantityGuessedNum > 4) {
        gameStatus.textContent = `Игра окончена, ты был очень близок... число - ${NUM}`;
    } else if(quantityGuessedNum > 2) {
        gameStatus.textContent = `Неплохо, попробуй еще разок... число - ${NUM}`;
    } else {
        gameStatus.textContent = `Эм.. главное ведь не победа, ведь так. Число - ${NUM}`;
    }

    EnterBtn.classList.add('disabled');
}

function newGame() {
    NUM = getRndNum(100,999999);
    gameStatus.textContent = 'Я загадал число длинною от 3-х до 6-ти символов. Введите число:'
    input.style.border = 'solid 2px red';
    EnterBtn.classList.remove('disabled');
    counter.textContent = 20;
    input.value = '';
    gameInfo.textContent = '';
}

function win () {
    let message;
    
    if(+counter.textContent == 20){
        message = `Признавайся, ты подсматривал? Ты угадал с 1-й попытки. В слудующий раз забаню.`
    } else if(+counter.textContent > 15) {
        message = `Поздравляю!!! Ты большой везунчик - отгадал за ${21-+counter.textContent} ходов. Может пора сходить в казино?`
    } else {
        message = `Победа!!! Тебе потребовалось всего ${21-+counter.textContent} ходов`
    }  
    gameStatus.textContent = message;
    EnterBtn.classList.add('disabled');
}

let message;
EnterBtn.addEventListener('click', e => {
    if(input.value.length >= 3) {
        message= compareNum(NUM, input.value);
        gameInfo.innerHTML +=`<p>${message}</p>`;
        console.log(compareNum(NUM, input.value));
    
        counter.textContent = +counter.textContent - 1;
        if(+counter.textContent == 0) {
            gameOver();
        }
        input.style.border = 'solid 2px black';
    } 
})

