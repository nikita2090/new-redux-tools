import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import userNameReducer, {
    IUserNameSlice,
} from './features/userName/userNameSlice';

import { ICounterSlice } from './features/counter/counterSlice';

export interface IStore {
    counter: ICounterSlice;
    userName: IUserNameSlice;
}

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userName: userNameReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
