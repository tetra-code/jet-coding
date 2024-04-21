import React from 'react';
import "./RestaurantList.css"

export const Restaurant = (restaurant) => {
    // TODO: add more details

    return (
        <div className='restaurant-item flex flex-column flex-sb'>
            <div className='restaurant-item-logo'>
                <img src={restaurant.logoUrl} alt="cover"/>
            </div>
        </div>
    )
}

export default Restaurant