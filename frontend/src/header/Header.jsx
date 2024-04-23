import React from 'react';
import SearchBar from "../components/SearchBar";
import Toggle from "../components/Toggle";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <div className='header-content flex flex-c text-center text-white'>
                <h2 data-testid='main-header' className='header-title'>Just Eat Takeaway</h2><br />
                <SearchBar />
                <Toggle />
            </div>
        </header>
    </div>
  )
}

export default Header