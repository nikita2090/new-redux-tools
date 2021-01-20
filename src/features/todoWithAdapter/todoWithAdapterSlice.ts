import {
    createEntityAdapter,
    createSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ITodoItem {
    name: string;
    isCompleted: boolean;
    id: number;
}

export type Filter = 'all' | 'finished' | 'unfinished';

const todoAdapter = createEntityAdapter<ITodoItem>();

let nextTodoId = 0;

const todoSlice = createSlice({
    name: 'todoAdapter',
    initialState: todoAdapter.getInitialState({
        activeFilter: 'all' as Filter,
    }),
    reducers: {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        add: {
            reducer: (state, action: PayloadAction<ITodoItem>) => {
                todoAdapter.addOne(state, action.payload);
            },
            prepare: (name: string) => ({
                payload: {
                    name,
                    id: nextTodoId++,
                    isCompleted: false,
                },
            }),
        },
        complete: (state, action: PayloadAction<number>) => {
            const currentItem = state.entities[action.payload];
            if (currentItem) {
                currentItem.isCompleted = !currentItem.isCompleted;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            todoAdapter.removeOne(state, action.payload);
        },
        cleanAll: (state) => {
            todoAdapter.removeAll(state);
            nextTodoId = 0;
        },
        changeFilter: (state, action: PayloadAction<Filter>) => {
            state.activeFilter = action.payload;
        },
    },
});

export const {
    add,
    complete,
    remove,
    cleanAll,
    changeFilter,
} = todoSlice.actions;

export const { selectAll: allTodos } = todoAdapter.getSelectors(
    (state: RootState) => state.todoAdapter
);

export const filterSelector = (state: RootState): Filter =>
    state.todoAdapter.activeFilter;

export const filteredTodosSelector = createSelector(
    [allTodos, filterSelector],
    (list, filter) => {
        switch (filter) {
            case 'all':
                return list;
            case 'finished':
                return list.filter((item) => item.isCompleted);
            case 'unfinished':
                return list.filter((item) => !item.isCompleted);
            default:
                throw new Error('Unknown filter');
        }
    }
);

export default todoSlice.reducer;
