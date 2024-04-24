import React, {useRef, useEffect} from 'react';
import PostcodesIO from "postcodesio-client";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import { isValidUKPostcode} from "../utils/util";
import "./SearchBar.css";

/**
 * Returns a search bar that allows users to search for restaurants based on a UK postcode. If given a valid postcode,
 * makes an API call to get the coordinates of the postcode and sets the search term to the postcode. Then navigates
 * to the /restaurants page that displays the RestaurantList component.
 */
const SearchBar = () => {
    const {setSearchTerm, setResultTitle, cuisineType, setCuisineType, setPostCodeResult} = useGlobalContext();
    const searchTerm = useRef('');
    const navigate = useNavigate();

    const postcodes = new PostcodesIO();

    // search input field automatically focused when SearchBar component first displayed for easier typing
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
            const trimmedPostCode = searchTerm.current.value.replaceAll(' ', '');
            setSearchTerm(trimmedPostCode);

            // makes API call to get coordinates of the valid post code
            postcodes.lookup(trimmedPostCode).then(postcode => {
                setPostCodeResult(postcode);
            });

            // goes back to original search display, without cuisine type filters
            if (cuisineType !== "") setCuisineType("")
        } else {
            // invoke fetchRestaurant to show empty result
            setSearchTerm("");
            setResultTitle("Not a valid UK postcode");
        }
        // go to /restaurants page
        navigate("/restaurants");
    };

    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-elem flex flex-c bg-white'>
                    <input
                        className="form-control"
                        placeholder="Type a UK postcode"
                        ref = {searchTerm}
                        onKeyDown={handleKeyDown}
                    />
                    <FaSearch className="icon" size={32} onClick={handleSearch} data-testid="search-icon"/>
                </div>
            </div>
        </div>
    )
}

export default SearchBar