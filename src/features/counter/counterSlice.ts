import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from '@reduxjs/toolkit';

import { IStore } from '../../store';

export interface ICounterSlice {
    value: number;
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
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
    },
});

export const incrementAsync = (amount: number, ms: number) => (
    dispatch: Dispatch
): void => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, ms);
};

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: IStore): number => state.counter.value;
export default counterSlice.reducer;
