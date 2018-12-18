const faker = require('faker');

const INITIAL_PLAYER_VALUE = 1000000;

const POSITIONS = [
    'goalkeeper',
    'defender',
    'midfielder',
    'attacker',
];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generatePlayer = ({
    position,
    country,
}) => {
    position = position || POSITIONS(getRandomInt(0, 3));
    country = country || 'US';

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