import { all, takeLatest, put, select } from 'redux-saga/effects';

import {
    GET_TEAM,
    GET_PLAYERS_FOR_SALE,
    INIT_DASHBOARD,
    setTeam,
    setPlayersForSale,
    SELL_PLAYER,
    BUY_PLAYER,
    UPDATE_PLAYER,
    setPlayer,
    GET_USERS,
    setUsers,
    UPDATE_USER,
    setUser,
    DELETE_USER,
    GET_TEAM_FOR_USER,
    setTeamForUser,
} from './actions';

import {
    getTeam,
    getPlayersForSale,
    buyPlayer,
    sellPlayer,
    updatePlayer,
    getUsers,
    updateUser,
    deleteUser,
    getTeamForUser,
} from './api';

function handleApi(cb) {
    try {
        return cb();
    } catch (e) {
        alert(e.message);
    }
}

function* getTeamSaga() {
    const team = yield handleApi(function* () {
        return (yield getTeam()).data;
    });
    yield put(setTeam(team));
}

function* getPlayersForSaleSaga() {
    const players = yield handleApi(function* () {
        return (yield getPlayersForSale()).data;
    });

    yield put(setPlayersForSale(players));
}

function* initDashboardSaga() {
    yield getTeamSaga();
    yield getPlayersForSaleSaga();

    const {
        isAdmin,
        isLeagueManager
    } = yield select(({
        auth: {
            me: {
                isAdmin,
                isLeagueManager,
            }
        }
    }) => ({
        isAdmin,
        isLeagueManager
    }));

    if (isAdmin || isLeagueManager) {
        yield getUsersSaga();
    }

    redirectToDashboard();
}

function redirectToDashboard() {
    if(!window.location.href.includes('dashboard')) {
        window.location = '/dashboard'
    }
}

function* sellPlayerSaga({
    data: {
        id,
        amount,
    }
}) {
    if (!amount) alert('You must specify an amount');

    const sale = yield handleApi(function* () {
        return yield sellPlayer({
            id,
            amount
        });
    });

    if (!sale) return;

    alert('Player has been put up for sale');
}

function* buyPlayerSaga({
    data: id
}) {
    const bought = yield handleApi(function* () {
        return yield buyPlayer({
            id
        });
    });

    if (!bought) return;

    alert('Bought Player');

    yield initDashboardSaga();
}

function* updatePlayerSaga({
    data: player,
}) {
    yield put(setPlayer(player));

    yield handleApi(function* () {
        return yield updatePlayer(player);
    });
}

function* updateUserSaga({
    data: user,
}) {
    yield put(setUser(user));

    yield handleApi(function* () {
        return yield updateUser(user);
    });
}

function* deleteUserSaga({
    data: id,
}) {
    const success = yield handleApi(function* () {
        return yield deleteUser({id});
    });

    if (!success) return;

    alert('User Deleted')
}

function* getUsersSaga() {
    const { data: users } = yield handleApi(function* () {
        return yield getUsers();
    });

    if (!users) return;

    yield(put(setUsers(users)));
}

function* getTeamForUserSaga({ data: id }) {
    const { data: team } = yield handleApi(function* () {
        return yield getTeamForUser(id);
    });

    if (!team) return;

    yield put(setTeamForUser({ id, team }))
}

export default function* rootSaga() {
  yield all([
    takeLatest(INIT_DASHBOARD, initDashboardSaga),
    takeLatest(GET_TEAM, getTeamSaga),
    takeLatest(GET_PLAYERS_FOR_SALE, getPlayersForSaleSaga),
    takeLatest(SELL_PLAYER, sellPlayerSaga),
    takeLatest(BUY_PLAYER, buyPlayerSaga),
    takeLatest(UPDATE_PLAYER, updatePlayerSaga),
    takeLatest(GET_USERS, getUsersSaga),
    takeLatest(UPDATE_USER, updateUserSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
    takeLatest(GET_TEAM_FOR_USER, getTeamForUserSaga),
  ]);
}