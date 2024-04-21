import React from 'react';
import SearchBar from "../components/SearchBar";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>Just Eat Takeaway</h2><br />
                <SearchBar />
            </div>
        </header>
    </div>
  )
}

export default Header