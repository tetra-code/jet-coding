import React from 'react';
import "./RestaurantList.css"
import { CiCircleChevDown } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";


export const Restaurant = (restaurant) => {
    const mapAddressDictToString = (restaurantAddress) => {
        return restaurantAddress.firstLine + ", " + restaurantAddress.postalCode + ", " + restaurantAddress.city;
    }

    const mapCuisinesArrayToString = (restaurantCuisines) => {
        return restaurantCuisines
            .filter(
                (c) => c.toLowerCase() !== "collect stamps"
                && c.toLowerCase() !== "deals"
                && c.toLowerCase() !== "low delivery fee"
                && c.toLowerCase() !== "freebies"
            )
            .join(", ")
    }

    return (
        <div className='restaurant-item'>
            {/*/!* Conditional rendering for the "deals" offer *!/*/}
            {/*{restaurant.cuisines.includes("Deals") && (*/}
            {/*    <div className='restaurant-item-deal'>*/}
            {/*        <span>Deals Available!</span>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className='restaurant-item-logo'>
                <img className='flex' src={restaurant.logoUrl} alt="cover"/>
            </div>
            <div className='restaurant-item-info'>
                <div className='restaurant-item-info-item name font-medium text-center'>
                    <span>{restaurant.name}</span>
                </div>

                <div>
                    <span><FaLocationDot style={{ color: 'var(--black-color)' }}/>&nbsp;
                        {mapAddressDictToString(restaurant.address)}</span>
                </div>

                <div>
                    <span><FaStar style={{color: 'var(--orange-color)'}}/>&nbsp;
                        <b>{restaurant.rating.starRating}</b></span>&nbsp;
                    <span class="font-small">
                         ({restaurant.rating.count})
                    </span>&nbsp;&nbsp;&nbsp;
                    <span><CiCircleChevDown style={{color: 'var(--black-color)'}}/>&nbsp;
                        {restaurant.availability.delivery.etaMinutes.rangeLower} ~
                        {restaurant.availability.delivery.etaMinutes.rangeUpper} min
                    </span>
                </div>

                <div>
                    <span><MdFastfood style={{color: 'var(--orange-color)'}}/>&nbsp;
                        {mapCuisinesArrayToString(restaurant.cuisines)}</span>
                </div>
            </div>
        </div>
    )
}

export default Restaurant