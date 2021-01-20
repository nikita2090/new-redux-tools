import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counter/counterSlice';
// import counterReducer from './features/counter/basicCounter';
import userNameReducer from './features/userName/userNameSlice';
import todoReducer from './features/todo/todoSlice';
import todoAdapterReducer from './features/todoWithAdapter/todoWithAdapterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userName: userNameReducer,
        todo: todoReducer,
        todoAdapter: todoAdapterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
