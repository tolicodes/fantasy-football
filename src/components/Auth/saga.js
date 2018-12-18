import axios from 'axios';
import firebase from 'firebase';
import { all, put, takeLatest } from 'redux-saga/effects';

import {
    SIGN_IN,
    REGISTER,
    setMe,
} from './actions';

import { initDashboard } from '../Dashboard/actions';
import {
    register,
    createUser,
    signIn,
    setPersistance,
    getMe,
} from './api';

function* handleApi(cb) {
    try {
        return yield cb();
    } catch (e) {
        alert(e.message);
    }
}

function* signInSaga({
    data: {
        email,
        password,
    }
}) {
    yield setPersistance();
    
    const success = yield handleApi(function* () { 
        return yield signIn({
            email,
            password
        })
    });

    if (!success) return;

    yield setToken();

    yield put(initDashboard());
    yield getMeSaga();
}

function* registerSaga({
    data: {
        email,
        password,
        name,
        teamName,
        teamCountry,
    }
}) {
    yield setPersistance();

    const createdUser = yield handleApi(function* () {
        return yield register({
            email,
            password,
        })
    });

    if (!createdUser) return;
    
    yield setToken();

    const { data: user } = yield handleApi(function* () {
        return yield createUser({
            name,
            teamName,
            teamCountry,
        })
    });

    if (!user) return;

    yield put(initDashboard());
    yield getMeSaga();
}

function* setToken() {
    if (!firebase.auth().currentUser) return;
    const token = yield firebase.auth().currentUser.getIdToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return token;
}

function* initApp() {
    const user = yield new Promise(res => firebase.auth().onAuthStateChanged(res));

    if (!user) return;
    const token = yield setToken();
    if (!token) return;

    yield put(initDashboard());
    yield getMeSaga();
}

function* getMeSaga() {
    console.log('me')
    const { data: me } = yield handleApi(function* () { 
        return yield getMe()
    });

    console.log(me)

    if (!me) return;

    yield(put(setMe(me)));
}

export default function* rootSaga() {
    yield all([
        takeLatest(SIGN_IN, signInSaga),
        takeLatest(REGISTER, registerSaga),
        initApp(),
    ]);
  }