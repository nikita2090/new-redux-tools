import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counter/counterSlice';
// import counterReducer from './features/counter/basicCounter';
import userNameReducer from './features/userName/userNameSlice';
import todoReducer from './features/todo/todoSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userName: userNameReducer,
        todo: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
