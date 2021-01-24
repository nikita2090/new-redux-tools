import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        loading: false,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const incrementAsync = (amount: number, ms: number) => (
    dispatch: Dispatch
): void => {
    dispatch(changeLoading(true));
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
        dispatch(changeLoading(false));
    }, ms);
};

export interface IIncrementWithSaga {
    amount: number;
    ms: number;
}

export const incrementWithSaga = createAction<IIncrementWithSaga>(
    'counter/incrementWithSaga'
);

export const incrementWithSaga2 = createAction<IIncrementWithSaga>(
    'counter/incrementWithSaga'
);

export const {
    increment,
    decrement,
    incrementByAmount,
    changeLoading,
} = counterSlice.actions;

export const selectCount = (state: RootState): number => state.counter.value;
export const selectLoading = (state: RootState): boolean =>
    state.counter.loading;

export default counterSlice.reducer;
