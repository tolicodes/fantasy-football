import {
    SET_TEAM,
    SET_PLAYERS_FOR_SALE,
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

        default: {
            return state;
        }
    }
};
