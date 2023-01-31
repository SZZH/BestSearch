import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import Search from './Search';
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/search/:keyword" element={<Search/>} />
        <Route path="/search/" element={<Search/>} />
      </Routes>
    </Router>
  </Provider>
);
