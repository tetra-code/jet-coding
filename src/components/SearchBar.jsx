import React, {useRef, useEffect} from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import "./SearchBar.css";


const regexString =
    "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})";
const postCodeRegex = new RegExp(regexString);


// TODO: bonus feature to show postcode suggestions as you type along
const SearchBar = () => {
    const {setSearchTerm, setResultTitle} = useGlobalContext();
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

        // remove white spaces
        const trimmedSearchTerm = searchTerm.current.value.replaceAll(' ', '')
        if (trimmedSearchTerm.length <= 7 && postCodeRegex.test(trimmedSearchTerm)){
            setSearchTerm(trimmedSearchTerm);
        } else {
            // setResultTitle("Not a valid UK postcode");
            setSearchTerm("");
        }
        navigate("/restaurants");
    };

    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-elem flex flex-c bg-white'>
                    <FaSearch className="icon" size={32} onClick={handleSearch}/>
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