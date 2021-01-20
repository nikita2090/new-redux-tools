import {
    createEntityAdapter,
    createSlice,
    // PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface ITodoItem {
    name: string;
    isCompleted: boolean;
    id: number;
}

export type Filter = 'all' | 'finished' | 'unfinished';

// interface ITodoState {
//     ids: number[];
//     entities: ITodoItem;
//     activeFilter: Filter;
// }

const todoAdapter = createEntityAdapter<ITodoItem>();

// const nextTodoId = 0;

const todoSlice = createSlice({
    name: 'todoAdapter',
    initialState: todoAdapter.getInitialState(),
    reducers: {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        add: todoAdapter.addOne,
    },
});

export const { add } = todoSlice.actions;

export const { selectAll } = todoAdapter.getSelectors(
    (state: RootState) => state.todoAdapter
);
export default todoSlice.reducer;
