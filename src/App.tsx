import React from 'react';
import {Routes} from 'react-router-dom';
import styles from './App.scss';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {GamePage} from './components/game/GamePage';
import {MenuPage} from './components/menu/MenuPage';
import {LeaderboardPage} from './components/leaderboard/LeaderboardPage';
import {initializeApp} from 'firebase/app';
import {apiKey} from './appConstants';

const App = () => {
  return (
    <div className={styles.root}>
      <Router>
        <Routes>
          <Route index element={<MenuPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/statistics" element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'shpora-millionaire.firebaseapp.com',
  databaseURL: 'https://shpora-millionaire-default-rtdb.firebaseio.com/',
  projectId: 'shpora-millionaire',
  storageBucket: 'shpora-millionaire.appspot.com',
  messagingSenderId: '1096188787032',
  appId: '1:1096188787032:web:c61bbd358772e4eb638d2d',
  measurementId: 'G-Q8BFS1LTTT',
};

export const app = initializeApp(firebaseConfig);
