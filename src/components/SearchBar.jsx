import React, {useCallback, useEffect, useState} from 'react'
import {FaSearch} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./SearchBar.css";


let proxyEndpoint = `http://localhost:8080/api`
const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i;


// TODO: bonus feature to show postcode suggestions as you type along
const SearchBar = () => {
    const navigate = useNavigate();

    // TODO: input validation to check whether valid postcode and no more than certain length
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    const fetchRestaurants = useCallback(async() => {
        setLoading(true);
        try {
            const response = await fetch(`${proxyEndpoint}/${searchTerm}`);
            const data = await response.json();
            const restaurantList = data['restaurants']
            if (restaurantList){
                const restaurants = restaurantList.slice(0, 10).map((singleRestaurant) => {
                    const {id, name, cuisine, rating, address} = singleRestaurant;
                    return {
                        id: id,
                        name: name,
                        cuisine: cuisine,
                        rating: rating,
                        address: address
                    }
                });

                setRestaurants(restaurants);

                if(restaurants.length > 1){
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!")
                }
            } else {
                setRestaurants([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);


    const handleKeyDown = (e) => {
        fetchRestaurants().then()
    };

    const handleIconClick = () => {
        fetchRestaurants().then()
    };

    navigate("/restaurants");

    return (
        <div className="container">
            <div className="search-bar-content">
                <form className="search-bar">
                    <div className='search-form-elem flex flex-sb bg-white'>
                        <FaSearch className="search-icon" size={20} onClick={handleIconClick}/>
                        <input
                            className="search-bar-input"
                            placeholder="Type a valid UK postcode"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar