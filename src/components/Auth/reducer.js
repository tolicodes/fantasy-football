import {
    SET_ME,
} from './actions';

const initialState = {
    me: {}
};

export default (state = initialState, { type, data }) => {
    switch(type) {
        case SET_ME: {
            return {
                ...state,
                me: data,
            }
        }

        default: {
            return state;
        }
    }
};
