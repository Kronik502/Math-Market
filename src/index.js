import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/store.js';  // Assuming you have a store file
import App from './App.js';      // Assuming you have an App component

// Render the app to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
