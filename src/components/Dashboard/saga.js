import { all, takeLatest, put } from 'redux-saga/effects';

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
} from './actions';

import {
    getTeam,
    getPlayersForSale,
    buyPlayer,
    sellPlayer,
    updatePlayer,
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

export default function* rootSaga() {
  yield all([
    takeLatest(INIT_DASHBOARD, initDashboardSaga),
    takeLatest(GET_TEAM, getTeamSaga),
    takeLatest(GET_PLAYERS_FOR_SALE, getPlayersForSaleSaga),
    takeLatest(SELL_PLAYER, sellPlayerSaga),
    takeLatest(BUY_PLAYER, buyPlayerSaga),
    takeLatest(UPDATE_PLAYER, updatePlayerSaga)
  ]);
}