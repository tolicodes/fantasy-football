export const GET_TEAM = 'GET_TEAM';
export const SET_TEAM = 'SET_TEAM';
export const GET_PLAYERS_FOR_SALE = 'GET_PLAYERS_FOR_SALE';
export const SET_PLAYERS_FOR_SALE = 'SET_PLAYERS_FOR_SALE';
export const INIT_DASHBOARD = 'INIT_DASHBOARD';
export const SELL_PLAYER = 'SELL_PLAYER';
export const BUY_PLAYER = 'BUY_PLAYER';
export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const SET_PLAYER = 'SET_PLAYER';
export const GET_TEAM_FOR_USER = 'GET_TEAM_FOR_USER';
export const SET_TEAM_FOR_USER = 'SET_TEAM_FOR_USER';

export const initDashboard = () => ({ type: INIT_DASHBOARD });

export const getTeam = () => ({ type: GET_TEAM });
export const getPlayersForSale = () => ({ type: GET_PLAYERS_FOR_SALE });
export const setTeam = (team) => ({ type: SET_TEAM, data: team });
export const getTeamForUser = id => ({ type: GET_TEAM_FOR_USER, data: id })
export const setTeamForUser = team => ({ type: SET_TEAM_FOR_USER, data: team })

export const setPlayersForSale = (data) => ({ type: SET_PLAYERS_FOR_SALE, data });
export const sellPlayer = (id) => ({ type: SELL_PLAYER, data: id });
export const buyPlayer = ({id}) => ({ type: BUY_PLAYER, data: id });
export const updatePlayer = player => ({ type: UPDATE_PLAYER, data: player });
export const setPlayer = player => ({ type: SET_PLAYER, data: player });

export const getUsers = () => ({ type: GET_USERS });
export const setUsers = users => ({ type: SET_USERS, data: users });
export const updateUser = user => ({ type: UPDATE_USER, data: user});
export const deleteUser = (id) => ({ type: DELETE_USER, data: id });
export const setUser = user => ({ type: SET_USER, data: user });
