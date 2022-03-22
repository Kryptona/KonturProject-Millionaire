import React from 'react';
import {Routes} from 'react-router-dom';
import styles from './default.scss';
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
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Menu</Link>
                        </li>
                        <li>
                            <Link to="/game">Game</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route index element={<MenuPage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;
