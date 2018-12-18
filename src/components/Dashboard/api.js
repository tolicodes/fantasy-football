import axios from 'axios';

const { REACT_APP_API_URL: API_URL } = process.env;

export const getTeam = () => 
    axios.get(API_URL + 'players/my');

export const getPlayersForSale = () => 
    axios.get(API_URL + 'players/forSale');

export const sellPlayer = ({ id, amount,}) => 
    axios.post(API_URL + 'players/' + id + '/sell', { amount });

export const buyPlayer = ({ id }) => 
    axios.post(API_URL + 'players/' + id + '/buy');

export const updatePlayer = player => 
    axios.put(API_URL + 'players/' + player.id, player);

export const getUsers = () =>
    axios.get(API_URL + 'users');

export const updateUser = user =>
    axios.put(API_URL + 'users/' + user.id, user);

export const deleteUser = ({id}) =>
    axios.delete(API_URL + 'users/' + id);

export const getTeamForUser = id =>
    axios.get(API_URL + 'users/' + id + '/team');