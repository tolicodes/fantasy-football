export const GET_TEAM = 'GET_TEAM';
export const SET_TEAM = 'SET_TEAM';
export const GET_PLAYERS_FOR_SALE = 'GET_PLAYERS_FOR_SALE';
export const SET_PLAYERS_FOR_SALE = 'SET_PLAYERS_FOR_SALE';
export const INIT_DASHBOARD = 'INIT_DASHBOARD';
export const SELL_PLAYER = 'SELL_PLAYER';
export const BUY_PLAYER = 'BUY_PLAYER';

export const getTeam = () => ({ type: GET_TEAM });
export const getPlayersForSale = () => ({ type: GET_PLAYERS_FOR_SALE });
export const setTeam = (team) => ({ type: SET_TEAM, data: team });
export const setPlayersForSale = (data) => ({ type: SET_PLAYERS_FOR_SALE, data });
export const initDashboard = () => ({ type: INIT_DASHBOARD });
export const sellPlayer = (id) => ({ type: SELL_PLAYER, data: id });
export const buyPlayer = ({id}) => ({ type: BUY_PLAYER, data: id });
