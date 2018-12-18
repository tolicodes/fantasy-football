const generatePlayer = require('./generatePlayer');

const POSITIONS = {
    goalkeeper: 3,
    defender: 6,
    midfielder: 6,
    attacker: 5
};

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