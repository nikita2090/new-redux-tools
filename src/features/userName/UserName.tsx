import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, userNameSelector } from './userNameSlice';

const UserName: React.FC = () => {
    const dispatch = useDispatch();
    const { name, status, error } = useSelector(userNameSelector);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(fetchUserData());
    };

    const renderResult = () => {
        let result;
        if (error) {
            result = <div>Error</div>;
        }

        if (status === 'loading') {
            result = <div>Loading..</div>;
        } else {
            result = <div>My name is {name}</div>;
        }
        return result;
    };

    return (
        <>
            <h1>Fetching username</h1>
            {renderResult()}
            <button disabled={status === 'loading'} onClick={handleBtnClick}>
                fetch name
            </button>
        </>
    );
};

export default UserName;
