import React from 'react';
import "./RestaurantList.css"


export const Restaurant = (restaurant) => {
    const mapAddressDictToString = (restaurantAddress) => {
        return restaurantAddress.firstLine + ", " + restaurantAddress.postalCode + ", " + restaurantAddress.city;
    }

    const mapCuisinesArrayToString = (restaurantCuisines) => {
        return restaurantCuisines.map((dict) => dict.name).join(', ');
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
                    <span>{mapAddressDictToString(restaurant.address)}</span>
                </div>

                <div className='restaurant-item-info-item rating'>
                    <span>Rating: </span>
                    <span>{restaurant.rating.starRating} </span>
                    <span>({restaurant.rating.count})</span>
                </div>

                <div className='restaurant-item-info-item cuisine'>
                    <span>Cuisines: </span>
                    <span>{mapCuisinesArrayToString(restaurant.cuisines)}</span>
                </div>

                <div className='restaurant-item-info-item eta'>
                    <span>Delivery time: </span>
                    <span>{restaurant.availability.delivery.etaMinutes.rangeLower} ~
                        {restaurant.availability.delivery.etaMinutes.rangeUpper} minutes
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Restaurant