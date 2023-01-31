import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './index.css';
import App from './App';
import Search from './Search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/search/:keyword" element={<Search/>} />
        <Route path="/search/" element={<Search/>} />
      </Routes>
    </Router>
);
