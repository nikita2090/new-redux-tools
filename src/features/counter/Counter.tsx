import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCount } from './counterSlice';
import { increment, decrement, incrementByAmount } from './counterSlice';

const Counter: React.FC = () => {
    const dispatch = useDispatch();

    const counter = useSelector(selectCount);

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(increment());
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(decrement());
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
        dispatch(incrementByAmount(increaseAmount));
    };
    return (
        <div>
            <p>{counter}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <input value={increaseAmount} onChange={handleInputChange} />
            <button onClick={handleIncrementByAmount}>+ amount</button>
        </div>
    );
};

export default Counter;
