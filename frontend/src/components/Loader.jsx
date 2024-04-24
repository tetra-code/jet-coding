import React from 'react';
import LoaderImg from "../images/loader.svg";
import "./Loader.css";

/**
 * Displays a loader while the page is fetching restaurant results
 */
const Loader = () => {
    return (
        <div className='loader flex flex-c'>
            <img src = {LoaderImg} alt = "loader" />
        </div>
    )
}

export default Loader