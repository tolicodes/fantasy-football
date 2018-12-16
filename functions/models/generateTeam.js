const faker = require('faker');

const POSITIONS = {
    goalkeeper: 3,
    defender: 6,
    midfielder: 6,
    attacker: 5
};

const INITIAL_PLAYER_VALUE = 1000000;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generatePlayer = ({
    position,
    country,
}) => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        image: faker.image.avatar(),
        age: getRandomInt(18, 40),
        value: INITIAL_PLAYER_VALUE,
        position,
        country,
    }
}

module.exports = ({
    country,
}) => {
    return Object.entries(POSITIONS).reduce((team, [position, number]) => {
        for (let i = 0; i < number; i++) {
            team.push(generatePlayer({
                position: position,
                country,
            }));
        }
        return team;
    }, [])
}