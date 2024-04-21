import React from 'react';
import "./RestaurantList.css"


export const Restaurant = (restaurant) => {
    const mapAddressDictToString = (restaurant) => {
        return restaurant.address.firstLine + ", " + restaurant.address.postalCode + ", " + restaurant.address.city;
    }

    return (
        <div className='restaurant-item flex flex-column flex-sb'>
            <div className='restaurant-item-logo'>
                <img src={restaurant.logoUrl} alt="cover"/>
            </div>
            <div className='restaurant-item-info text-center'>
                <div className='restaurant-item-info-item name'>
                    <span>Name: </span>
                    <span>{restaurant.name}</span>
                </div>

                <div className='restaurant-item-info-item address'>
                    <span>Address: </span>
                    <span>{mapAddressDictToString(restaurant)}</span>
                </div>

                <div className='restaurant-item-info-item rating'>
                    <span>Rating: </span>
                    <span>{restaurant.rating.starRating} </span>
                    <span>({restaurant.rating.count})</span>
                </div>

                <div className='restaurant-item-info-item cuisine'>
                    <span>Cuisine: </span>
                    <span>{restaurant.cuisine}</span>
                </div>
            </div>
        </div>
    )
}

export default Restaurant