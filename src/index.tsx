import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    import('workbox-window').then(({Workbox}) => {
      const wb = new Workbox('/sw.js');
      wb.register();
    });
  }
});
