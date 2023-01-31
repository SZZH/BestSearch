import React, { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import SearchInput from './SearchInput'

function App() {
  return (
    <div className="search-page-container">
      <div className='search-page-title'><b>Best</b>Search</div>
      <div className='search-page-content'>
        <div className="search-title">Search Trends</div>
        <SearchInput />
      </div>
    </div>
  );
}

export default App;
