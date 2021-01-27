import { takeLatest, put, delay } from 'redux-saga/effects';
import {
    incrementWithSaga,
    incrementByAmount,
    changeLoading,
} from './counterSlice';

import { IIncrementWithSaga } from './counterSlice';

export default function* counterWatcher(): Generator {
    yield takeLatest(incrementWithSaga.type, handleSagaIncrement);
}

interface IIncrementSagaAction {
    payload: IIncrementWithSaga;
    type: string;
}

function* handleSagaIncrement(action: IIncrementSagaAction): Generator {
    const {
        payload: { amount, ms },
    } = action;

    yield put(changeLoading(true));
    yield delay(ms);
    yield put(incrementByAmount(amount));
    yield put(changeLoading(false));
}
