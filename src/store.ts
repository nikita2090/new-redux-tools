import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './features/rootSaga';

import counterReducer from './features/counter/counterSlice';
// import counterReducer from './features/counter/basicCounter';
import userNameReducer from './features/userName/userNameSlice';
import todoReducer from './features/todo/todoSlice';
import todoAdapterReducer from './features/todoWithAdapter/todoWithAdapterSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userName: userNameReducer,
        todo: todoReducer,
        todoAdapter: todoAdapterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
