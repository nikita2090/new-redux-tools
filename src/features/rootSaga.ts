import { all } from 'redux-saga/effects';
import counterWatcher from './counter/counterSaga';

export default function* rootSaga(): Generator {
    yield all([counterWatcher()]);
}
