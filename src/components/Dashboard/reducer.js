import {
    SET_TEAM,
    SET_PLAYERS_FOR_SALE,
    SET_PLAYER,
} from './actions';

const initialState = {
    team: [],
    playersForSale: [],
};

export default (state = initialState, { type, data }) => {
    switch (type) {
        case SET_TEAM: {
            return {
                ...state,
                team: data,
            };
        }

        case SET_PLAYERS_FOR_SALE: {
            return {
                ...state,
                playersForSale: data,
            };
        }

        case SET_PLAYER: {
            const player = state.team.find(player => player.id === data.id);
            const index = state.team.indexOf(player);

            state.team[index] = data;

            console.log(data);
            
            return {
                ...state,
                team: [
                    ...state.team,
                ],
            }
        }

        default: {
            return state;
        }
    }
};
