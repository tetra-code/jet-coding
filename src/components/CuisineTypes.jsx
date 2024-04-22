import React from 'react';
import { useGlobalContext } from '../utils/context';
import "./CusineTypes.css";

const CuisineTypes = () => {
    const {setCuisineType} = useGlobalContext();
    const filterForCuisine = (cuisineType) => { setCuisineType(cuisineType) }
    return (
        <div className='cuisine-types grid flex-c flex-sb flex-column text-center font-small'>
            <div className='cuisine-type-item'>
                {/*/!* if not pass a lambda to onClick, filterForCuisine will be directly invoked when component renders *!/*/}
                <div className='cuisine-type-icon hamburger-icon' onClick={() => filterForCuisine("Burgers")} />
                Burgers
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon kebab-icon' onClick={() => filterForCuisine("Kebab")} />
                Kebab
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon sushi-icon' onClick={() => filterForCuisine("Sushi")} />
                Sushi
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon pizza-icon' onClick={() => filterForCuisine("Pizza")} />
                Pizza
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon chinese-icon' onClick={() => filterForCuisine("Chinese")} />
                Chinese
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon greek-icon' onClick={() => filterForCuisine("Greek")} />
                Greek
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon grocery-icon' onClick={() => filterForCuisine("Groceries")} />
                Groceries
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon chicken-icon' onClick={() => filterForCuisine("Chicken")} />
                Chicken
            </div>
            <div className='cuisine-type-item'>
                <div className='cuisine-type-icon indian-icon' onClick={() => filterForCuisine("Indian")} />
                Indian
            </div>
        </div>
    )
}

export default CuisineTypes