export const SET_USER = 'SET_USER';
export const SIGN_IN = 'SIGN_IN';
export const REGISTER = 'REGISTER';

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
