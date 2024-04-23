import React from 'react';
import { useGlobalContext } from '../utils/context';
import "./Toggle.css";


// TODO: add icons to toggle switch
const Toggle = () => {
    const {isDeliveryMode, setDeliveryMode} = useGlobalContext();

    const searchModeSwitch = () => { setDeliveryMode(!isDeliveryMode) }

    return (
        <div className="container">
            <label className="switch">
                <input
                    type="checkbox"
                    className="toggle"
                    onClick={searchModeSwitch}
                />
                <span className={`slider round ${isDeliveryMode ? 'delivery' : 'pickup'}`} >
                </span>
            </label>
        </div>
    )
}

export default Toggle