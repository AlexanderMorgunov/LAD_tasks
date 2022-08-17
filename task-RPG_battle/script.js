const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0,     // ходов на восстановление
            "counter":0
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "counter":0
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2,
            "counter":0
        },
    ]
}

const Mage = {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0,
            "counter":0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4,
            "counter":0
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "counter":0
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4,
            "counter":0
        },
    ]
}

let getRndNum = (min, max) => {
    return Math.floor(Math.random()*(max - min)) + min;
    }

function counterFix(move, moves) {
    moves.map(item => {
        if(item.name == move.name) {
            item.counter = item.counter - item.cooldown;
            return item;
        } else if(item.counter < 0) {
            item.counter++;
            return item;
        }
        return item;
    })
}

function getAvailableArrayAtack(moves) {
    let availableMove = moves.filter((item, i) => {
        return item.counter == 0});
        return availableMove;
}

function randomChoiceAtack({moves}) {

let availableMove = getAvailableArrayAtack(moves);

let index = getRndNum(0,availableMove.length);

counterFix(availableMove[index], moves);

return availableMove[index];
}

const readlineSync = require('readline-sync');

function choseDifficult() {
    console.log(' \n Select game difficulty: \n');
    const userDiff = readlineSync.question(`Enter '1' for easy, '2' for normal, '3' for hard  `);
    
    switch (userDiff) {
            case '1' : 
            Mage.maxHealth = 12;
            break;
        case '2' :
            Mage.maxHealth = 10;
            break;
        case '3' :
            Mage.maxHealth = 9;
            break;
    }

    console.log(Mage.maxHealth);
}

function logAvailablePlayerAttack(moves) {
let message = moves.map((item, i) => {
    return `
    № ${i+1} 
    ${logAtack(item)}`;
}).join('\n')
console.log(
    `\nВыберите доступную атаку:
    ${message}
    `
)
}

function logAtack(atack) {
    let message = `
    ${atack.name}:
    физический урон - ${atack.physicalDmg}, 
    магический урон - ${atack.magicDmg}, 
    физ защитa - ${atack.physicArmorPercents}% 
    магическая защитa - ${atack.magicArmorPercents}%
    перезардка - ${atack.cooldown} хода
    ` 
    return message;
}

function logInfoEnemyAttack(atack) {
    
    const message = `Противник атакует:
    ${logAtack(atack)}

    `
    return message;
} 

function calcDamage(playerAtc, enemyAtc) {

    function getHit(atc, res) {
        let damage;
        if(res == 0) {
            damage = atc;
        } else {
            damage = (atc - (atc * res / 100));
        }
        return damage;
    }
    let playerPhysicDamage = getHit(enemyAtc.physicalDmg, playerAtc.physicArmorPercents);
    let playerMagicDamage = getHit(enemyAtc.magicDmg, playerAtc.magicArmorPercents);
    let playerDamage = playerPhysicDamage + playerMagicDamage;

    let enemyPhysicDamage = getHit(playerAtc.physicalDmg, enemyAtc.physicArmorPercents);
    let enemyMagicDamage = getHit(playerAtc.magicDmg, enemyAtc.magicArmorPercents);
    let enemyDamage = enemyPhysicDamage + enemyMagicDamage;
 
            return { 
                playerDamage: playerDamage,
                enemyDamage: enemyDamage
               }
}

function logDamageAndHelth({playerDamage, enemyDamage}) {
    let message = `    Вы получаете урон ${playerDamage}, у вас остается ${Mage.maxHealth} очков здоровья
    Ваш противник получает урон ${enemyDamage}, у него остается ${monster.maxHealth} очков здоровья
    `
    return message;
}

function game() {
    choseDifficult();

    while(Mage.maxHealth > 0 && monster.maxHealth > 0 ) {
    
        let atackEnemy = randomChoiceAtack(monster);

    console.log(logInfoEnemyAttack(atackEnemy));

    readlineSync.question('For continue pres any key... ');
    let AvailablePlayerAtacks = getAvailableArrayAtack(Mage.moves);
    logAvailablePlayerAttack(AvailablePlayerAtacks);

    let indexPlayerAtack = readlineSync.question('Enter your choice number ');

    while(indexPlayerAtack > AvailablePlayerAtacks.length || indexPlayerAtack <= 0 || indexPlayerAtack.match(/[a-z]/)) {
        console.log(`Некоректный ввод, атаки с номером ${indexPlayerAtack} не существует, введите правильное значение: `)
        indexPlayerAtack = readlineSync.question('Enter your choice number ');
    }

    let playerAtack = AvailablePlayerAtacks[indexPlayerAtack-1];1
    counterFix(playerAtack, Mage.moves);

    Mage.maxHealth < calcDamage(playerAtack, atackEnemy).playerDamage ? Mage.maxHealth = 0 : 
    Mage.maxHealth = (Mage.maxHealth - calcDamage(playerAtack, atackEnemy).playerDamage).toFixed(2);

    monster.maxHealth < calcDamage(playerAtack, atackEnemy).enemyDamage ? monster.maxHealth = 0 :
    monster.maxHealth = (monster.maxHealth - calcDamage(playerAtack, atackEnemy).enemyDamage).toFixed(2);

    console.log(logDamageAndHelth(calcDamage(playerAtack, atackEnemy)));
    readlineSync.question('press any key to continue');

    }
    
    Mage.maxHealth > 0 ? console.log(`Поздравляю с победой!`) : console.log('Вы погибли :(');
    
}

game();    
    