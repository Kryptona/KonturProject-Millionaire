import React from 'react';
import {Routes} from 'react-router-dom';
import styles from './App.scss';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import {GamePage} from "./components/game/GamePage";
import {MenuPage} from "./components/menu/MenuPage";

const App = () => {
    return (
        <div className={styles.root}>
            <Router>
                <Routes>
                    <Route index element={<MenuPage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;
