import React from 'react';

import Counter from './features/counter/Counter';
import UserName from './features/userName/UserName';
import Todos from './features/todo/Todos';

import styles from './App.module.scss';

const App: React.FC = () => (
    <div className={styles.app}>
        <Counter />
        <UserName />
        <Todos />
    </div>
);

export default App;
