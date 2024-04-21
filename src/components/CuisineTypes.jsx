import React from 'react';
import { useGlobalContext } from '../utils/context';
import "./CusineTypes.css";
import {useNavigate} from "react-router-dom";

// careful not to set state while AppProvider is still rendering
const CuisineTypes = () => {
    const {setCuisineType} = useGlobalContext();
    // const navigate = useNavigate();
    const filterForCuisine = (cuisineType) => {
        // setCuisineType(cuisineType)
        console.log(cuisineType)
        // navigate("/restaurants");
    }
    return (
        <div className='cuisine-types grid flex-c flex-sb flex-column text-center font-small'>
            <div className='cuisine-type-item'>
                {/*/!* if not pass a lambda to onClick, filterForCuisine will be directly invoked when component renders *!/*/}
                <div className='cuisine-type-icon hamburger-icon' onClick={() => filterForCuisine("Burgers")}/>
                Burgers
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon kebab-icon'/>
                Kebab
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon sushi-icon'/>
                Sushi
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon pizza-icon'/>
                Pizza
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon chinese-icon'/>
                Chinese
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon greek-icon'/>
                Greek
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon grocery-icon'/>
                Groceries
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon chicken-icon'/>
                Chicken
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon indian-icon'/>
                Indian
            </div>
        </div>
    )
}

export default CuisineTypes