import { takeLatest, put, delay } from 'redux-saga/effects';
import {
    incrementWithSaga,
    incrementWithSaga2,
    incrementByAmount,
    changeLoading,
} from './counterSlice';

import { IIncrementWithSaga } from './counterSlice';

export default function* counterWatcher() {
    yield takeLatest(incrementWithSaga.type, handleSagaIncrement);
    yield takeLatest(incrementWithSaga2.type, handleSagaIncrement);
}

interface IIncrementSagaAction {
    payload: IIncrementWithSaga;
    type: string;
}

function* handleSagaIncrement(action: IIncrementSagaAction) {
    const {
        payload: { amount, ms },
    } = action;

    yield put(changeLoading(true));
    yield delay(ms);
    yield put(incrementByAmount(amount));
    yield put(changeLoading(false));
}
