import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

import { ICounterSlice } from './features/counter/counterSlice';

export interface IStore {
    counter: ICounterSlice;
}

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
