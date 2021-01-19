import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface ITodoItem {
    name: string;
    id: number;
    isCompleted: boolean;
}

export type Filter = 'all' | 'finished' | 'unfinished';

interface ITodoState {
    list: ITodoItem[];
    activeFilter: Filter;
}

const initialState: ITodoState = {
    list: [],
    activeFilter: 'all',
};

let nextTodoId = 0;

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        add: {
            reducer: (state: ITodoState, action: PayloadAction<ITodoItem>) => {
                console.log(action.payload);
                state.list.push(action.payload);
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
            const currentItem = state.list.find(
                (item) => item.id === action.payload
            );
            if (currentItem) {
                currentItem.isCompleted = !currentItem.isCompleted;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(
                (item) => item.id !== action.payload
            );
            if (!state.list.length) {
                nextTodoId = 0;
            }
        },
        cleanAll: (state) => {
            state.list = [];
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

export const todoListSelector = (state: RootState): ITodoItem[] =>
    state.todo.list;
export const filterSelector = (state: RootState): Filter =>
    state.todo.activeFilter;

export const filteredTodosSelector = createSelector(
    [todoListSelector, filterSelector],
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
