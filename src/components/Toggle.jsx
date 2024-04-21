import React from 'react';
import { useGlobalContext } from '../utils/context';
import "./Toggle.css";


const Toggle = () => {
    const {searchMode, setSearchMode} = useGlobalContext();

    const searchModeSwitch = () => {
        if (searchMode === 'delivery') {
            setSearchMode('pickup')
        } else {
            setSearchMode('delivery')
        }
    }

    return (
        <div className="container">
            <label className="switch">
                <input
                    type="checkbox"
                    className="toggle"
                    onClick={searchModeSwitch}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Toggle