import { all } from 'redux-saga/effects';

import app from './components/Dashboard/saga';
import auth from './components/Auth/saga';

export default function* rootSaga() {
  yield all([
    app(),
    auth(),
  ]);
}