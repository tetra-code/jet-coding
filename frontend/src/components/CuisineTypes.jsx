import React from 'react';
import { useGlobalContext } from '../utils/context';
import "./CuisineTypes.css";

/**
 * Returns a list of cuisine types that can be used to filter restaurants
 */
const CuisineTypes = () => {
    const {setCuisineType} = useGlobalContext();
    const filterForCuisine = (cuisineType) => { setCuisineType(cuisineType) }
    return (
        <div className='cuisine-types grid flex-c flex-sb flex-column text-center font-small'>
            <div className='cuisine-type-item'>
                {/*/!* if not pass a lambda to onClick, filterForCuisine will be directly invoked when component renders *!/*/}
                <div
                    className='cuisine-type-icon burgers-icon'
                    onClick={() => filterForCuisine("Burgers")}
                    data-testid="burgers-icon"
                />
                Burgers
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon kebab-icon'
                    onClick={() => filterForCuisine("Kebab")}
                    data-testid="kebab-icon"
                />
                Kebab
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon sushi-icon'
                    onClick={() => filterForCuisine("Sushi")}
                    data-testid="sushi-icon"
                />
                Sushi
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon pizza-icon'
                    onClick={() => filterForCuisine("Pizza")}
                    data-testid="pizza-icon"
                />
                Pizza
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon chinese-icon'
                    onClick={() => filterForCuisine("Chinese")}
                    data-testid="chinese-icon"
                />
                Chinese
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon greek-icon'
                    onClick={() => filterForCuisine("Greek")}
                    data-testid="greek-icon"
                />
                Greek
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon groceries-icon'
                    onClick={() => filterForCuisine("Groceries")}
                    data-testid="groceries-icon"
                />
                Groceries
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon chicken-icon'
                    onClick={() => filterForCuisine("Chicken")}
                    data-testid="chicken-icon"
                />
                Chicken
            </div>
            <div className='cuisine-type-item'>
                <div
                    className='cuisine-type-icon indian-icon'
                    onClick={() => filterForCuisine("Indian")}
                    data-testid="indian-icon"
                />
                Indian
            </div>
        </div>
    )
}

export default CuisineTypes