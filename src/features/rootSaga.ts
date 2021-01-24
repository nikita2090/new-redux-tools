import { all } from 'redux-saga/effects';
import counterWatcher from './counter/counterSaga';

export default function* rootSaga() {
    yield all([counterWatcher()]);
}
