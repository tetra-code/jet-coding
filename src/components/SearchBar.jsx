import React, {useRef, useEffect} from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import { isValidUKPostcode} from "../utils/util";
import "./SearchBar.css";


// TODO: bonus feature to show postcode suggestions as you type along
const SearchBar = () => {
    const {setSearchTerm, setResultTitle, cuisineType, setCuisineType} = useGlobalContext();
    const searchTerm = useRef('');
    const navigate = useNavigate();

    useEffect(() => searchTerm.current.focus(), []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSubmit(e)
    };

    const handleSearch = (e) => {
        handleSubmit(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValidUKPostcode(searchTerm.current.value)) {
            // remove white spaces
            setSearchTerm(searchTerm.current.value.replaceAll(' ', ''));
            // goes back to original search display, without cuisine type filters
            if (cuisineType !== "") setCuisineType("")
        } else {
            setResultTitle("Not a valid UK postcode");

            // invoke fetchRestaurant to show empty result
            setSearchTerm("");
        }
        navigate("/restaurants");
    };

    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-elem flex flex-c bg-white'>
                    <FaSearch className="icon" size={32} onClick={handleSearch} data-testid="search-icon"/>
                    <input
                        className="form-control"
                        placeholder="Type a UK postcode"
                        ref = {searchTerm}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBar