import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counter/counterSlice';
// import counterReducer from './features/counter/basicCounter';
import userNameReducer from './features/userName/userNameSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userName: userNameReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
