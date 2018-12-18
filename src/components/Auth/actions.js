export const SET_USER = 'SET_USER';
export const SIGN_IN = 'SIGN_IN';
export const REGISTER = 'REGISTER';
export const GET_ME = 'GET_ME';
export const SET_ME = 'SET_ME';

export const setUser = (user) => ({ 
    type: SET_USER, 
    data: user 
});

export const signIn = ({ 
    email, 
    password 
}) => ({ 
    type: SIGN_IN, 
    data: { 
        email, 
        password
    }
});

export const register = ({
    email,
    password,
    name,
    teamName,
    teamCountry,
}) => ({
    type: REGISTER, 
    data: {
        email,
        password,
        name,
        teamName,
        teamCountry,
    }
});

export const getMe = () => ({ type: GET_ME });

export const setMe = user => ({ type: SET_ME, data: user });
