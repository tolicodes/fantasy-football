import {
    SET_TEAM,
    SET_PLAYERS_FOR_SALE,
    SET_PLAYER,
    SET_USERS,
    SET_USER,
} from './actions';

const initialState = {
    team: [],
    playersForSale: [],

    // admin stuff
    users: [],
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
            
            return {
                ...state,
                team: [
                    ...state.team,
                ],
            }
        }

        case SET_USERS: {
            return {
                ...state,
                users: data,
            }
        }

        case SET_USER: {
            const user = state.users.find(user => user.id === data.id);
            const index = state.users.indexOf(user);

            state.users[index] = data;
            
            return {
                ...state,
                users: [
                    ...state.users,
                ],
            }
        }

        default: {
            return state;
        }
    }
};
