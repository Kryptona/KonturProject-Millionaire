import React from 'react';
import {Routes} from 'react-router-dom';
import styles from './App.scss';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {GamePage} from './components/game/GamePage';
import {MenuPage} from './components/menu/MenuPage';
import {Leaderboard} from './components/leaderboard/Leaderboard';
import {initializeApp} from 'firebase/app';

const App = () => {
  return (
    <div className={styles.root}>
      <Router>
        <Routes>
          <Route index element={<MenuPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/statistics" element={<Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA86RnWdjYsCGLhkNupfrmf6M5bnFup6jg',
  authDomain: 'shpora-millionaire.firebaseapp.com',
  databaseURL: 'https://shpora-millionaire-default-rtdb.firebaseio.com/',
  projectId: 'shpora-millionaire',
  storageBucket: 'shpora-millionaire.appspot.com',
  messagingSenderId: '1096188787032',
  appId: '1:1096188787032:web:c61bbd358772e4eb638d2d',
  measurementId: 'G-Q8BFS1LTTT',
};
const app = initializeApp(firebaseConfig);
