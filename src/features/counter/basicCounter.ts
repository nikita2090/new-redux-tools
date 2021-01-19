import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const incrementByAmount = createAction<number>('incrementByAmount');

const counterReducer = createReducer(
    { value: 0 },
    {
        [increment.type]: (state) => ({ value: state.value + 1 }),
        [decrement.type]: (state) => ({ value: state.value - 1 }),
        [incrementByAmount.type]: (state, action: PayloadAction<number>) => ({
            value: state.value + action.payload,
        }),
    }
);

export const selectCount = (state: RootState): number => state.counter.value;

export default counterReducer;
