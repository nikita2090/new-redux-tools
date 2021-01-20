import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    filterSelector,
    filteredTodosSelector /*filtered*/,
} from './todoSlice';
import * as actions from './todoSlice';

import { Filter } from './todoSlice';

import styles from './Todos.module.scss';

const filters = [
    {
        name: 'All',
        value: 'all',
    },
    {
        name: 'Completed',
        value: 'finished',
    },
    {
        name: 'Incomplete',
        value: 'unfinished',
    },
];

const Todos: React.FC = () => {
    const dispatch = useDispatch();
    // shallow equal skips re-rendering when CONTENT of selected state is same, but state is new
    const todos = useSelector(filteredTodosSelector, shallowEqual);

    //const todos = useSelector(filtered);

    const [todoItemText, setTodoItemText] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoItemText(e.target.value);
    };

    const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (todoItemText === '') {
            return;
        }
        dispatch(actions.add(todoItemText));
        setTodoItemText('');
    };

    const completeItem = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => {
        dispatch(actions.complete(id));
    };

    const removeItem = (e: React.MouseEvent, id: number) => {
        dispatch(actions.remove(id));
    };

    const handleCleanAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.cleanAll());
    };

    const filter = useSelector(filterSelector);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(actions.changeFilter(e.target.value as Filter));
    };

    const handleReturnSameState = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.returnSameList());
    };
    return (
        <>
            <h1>Todos</h1>
            <input value={todoItemText} onChange={handleInputChange} />
            <button onClick={handleAddItemClick}>Add</button>
            <ul className={styles.list}>
                {todos.map(({ name, id, isCompleted }) => (
                    <li key={id} data-name={id} className={styles.item}>
                        <button onClick={(e) => completeItem(e, id)}>+</button>
                        <span
                            className={
                                isCompleted ? styles.completed : undefined
                            }
                        >
                            {name}
                        </span>
                        <button onClick={(e) => removeItem(e, id)}>del</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleCleanAllClick}>Clean all</button>
            <select value={filter} onChange={handleFilterChange}>
                {filters.map(({ name, value }) => (
                    <option key={value} value={value}>
                        {name}
                    </option>
                ))}
            </select>
            <button onClick={handleReturnSameState}>return same list</button>
        </>
    );
};

export default Todos;
