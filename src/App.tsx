import React from 'react';
import styles from './App.module.scss';
import Counter from './features/counter/Counter';

const App: React.FC = () => (
    <div className={styles.App}>
        <Counter />
    </div>
);

export default App;
