import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCount } from './counterSlice';
import * as actions from './counterSlice';

// import { selectCount } from './basicCounter';
// import * as actions from './basicCounter';

const Counter: React.FC = () => {
    const dispatch = useDispatch();

    const counter = useSelector(selectCount);

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.increment());
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.decrement());
    };

    const [increaseAmount, setIncreaseAmount] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        if (isNaN(value)) {
            return;
        }
        setIncreaseAmount(value);
    };

    const handleIncrementByAmount = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        dispatch(actions.incrementByAmount(increaseAmount));
    };

    const handleAsyncIncrementByAmount = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        dispatch(actions.incrementAsync(increaseAmount, 1000));
    };
    return (
        <>
            <h1>Counter</h1>
            <p>Count: {counter}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <input value={increaseAmount} onChange={handleInputChange} />
            <button onClick={handleIncrementByAmount}>+ amount</button>
            <button onClick={handleAsyncIncrementByAmount}>
                + async amount
            </button>
        </>
    );
};

export default Counter;
