export const GET_TEAM = 'GET_TEAM';
export const SET_TEAM = 'SET_TEAM';
export const GET_PLAYERS_FOR_SALE = 'GET_PLAYERS_FOR_SALE';
export const SET_PLAYERS_FOR_SALE = 'SET_PLAYERS_FOR_SALE';
export const INIT_DASHBOARD = 'INIT_DASHBOARD';
export const SELL_PLAYER = 'SELL_PLAYER';
export const BUY_PLAYER = 'BUY_PLAYER';
export const GET_USERS = 'GET_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const SET_PLAYER = 'SET_PLAYER';

export const getTeam = () => ({ type: GET_TEAM });
export const getPlayersForSale = () => ({ type: GET_PLAYERS_FOR_SALE });
export const setTeam = (team) => ({ type: SET_TEAM, data: team });
export const setPlayersForSale = (data) => ({ type: SET_PLAYERS_FOR_SALE, data });
export const initDashboard = () => ({ type: INIT_DASHBOARD });
export const sellPlayer = (id) => ({ type: SELL_PLAYER, data: id });
export const buyPlayer = ({id}) => ({ type: BUY_PLAYER, data: id });
export const getUsers = () => ({ type: GET_USERS });
export const updateUser = ({
    id,
    isAdmin,
    isLeagueManager,
    balance,
}) => ({
    type: GET_USERS,
    data: {
        id,
        isAdmin,
        isLeagueManager,
        balance,
    }
});

export const deleteUser = ({id}) => ({ type: DELETE_USER, data: id });
export const updatePlayer = player => ({ type: UPDATE_PLAYER, data: player });
export const setPlayer = player => ({ type: SET_PLAYER, data: player });
