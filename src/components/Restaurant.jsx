import React from 'react';
import { getRestaurantAddrAsString, getActualCuisinesAsString } from "../utils/util";
import { CiCircleChevDown } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import "./RestaurantList.css"
import {useGlobalContext} from "../utils/context";

export const Restaurant = ({index, restaurant}) => {
    const {isDeliveryMode, setClickedRestaurant} = useGlobalContext();

    const offersElements =
        <div>
            {/* Conditional rendering for the "deals" offer */}
            {restaurant.cuisines.includes("Deals") && (
                <div className='restaurant-item-deal'>
                    <FaStar style={{color: 'var(--black-color)'}}/>
                    <span>Deals Available!</span>
                </div>
            )}
            {restaurant.cuisines.includes("Collect stamps") && (
                <div className='restaurant-item-deal'>
                    <span>Collect stamps</span>
                </div>
            )}
        </div>

    return isDeliveryMode
    ? <div data-testid="restaurant" className='restaurant-item'>
            {/*/!* Conditional rendering for the "deals" offer *!/*/}
            {/*{restaurant.cuisines.includes("Deals") && (*/}
            {/*    <div className='restaurant-item-deal'>*/}
            {/*        <span>Deals Available!</span>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className='restaurant-item-logo'>
                <img className='flex' src={restaurant.logoUrl} alt="cover" data-testid="restaurant-logo"/>
            </div>
            <div className='restaurant-item-info'>
                <div className='restaurant-item-info-item font-medium text-center'>
                    <span data-testid="restaurant-name">{restaurant.name}</span>
                </div>
                <div>
                <span data-testid="restaurant-address">
                    <FaLocationDot style={{ color: 'var(--black-color)' }}/>
                    &nbsp;{getRestaurantAddrAsString(restaurant.address)}
                </span>
                </div>
                <div>
                <span data-testid="restaurant-rating-star">
                    <FaStar style={{color: 'var(--orange-color)'}}/>
                    &nbsp;<b>{restaurant.rating.starRating}</b>
                </span>&nbsp;
                    <span className="font-small" data-testid="restaurant-rating-count">
                     ({restaurant.rating.count})
                </span>&nbsp;&nbsp;&nbsp;
                    <span data-testid="restaurant-delivery-time">
                    <CiCircleChevDown style={{color: 'var(--black-color)'}}/>
                        &nbsp;{restaurant.availability.delivery.etaMinutes.rangeLower} ~&nbsp;
                        {restaurant.availability.delivery.etaMinutes.rangeUpper} min
                </span>
                </div>
                <div>
                <span data-testid="restaurant-cuisines">
                    <MdFastfood style={{color: 'var(--orange-color)'}} data-testid="food-icon"/>
                    &nbsp;{getActualCuisinesAsString(restaurant.cuisines)}
                </span>
                </div>
            </div>
        </div>
    : <div
            className='restaurant-item pickup-mode'
            onClick={() => {
                setClickedRestaurant(index)
            }}
            // onMouseLeave={() => setHoveredRestaurant(null)}
            data-testid="restaurant"
        >
            <div className='restaurant-item-logo pickup-element'>
                <img className='flex' src={restaurant.logoUrl} alt="cover" data-testid="restaurant-logo"/>
            </div>
            <div className='restaurant-item-info pickup-element'>
                <div className='restaurant-item-info-item font-medium'>
                    <span data-testid="restaurant-name">{restaurant.name}</span>
                </div>
                <div>
                    <span data-testid="restaurant-rating-star">
                        <FaStar style={{color: 'var(--orange-color)'}}/>
                        &nbsp;<b>{restaurant.rating.starRating}</b>
                    </span>&nbsp;
                    <span className="font-small" data-testid="restaurant-rating-count">
                         ({restaurant.rating.count})
                    </span>&nbsp;&nbsp;&nbsp;
                </div>
                <div>
                    <span data-testid="restaurant-cuisines">
                        <MdFastfood style={{color: 'var(--orange-color)'}} data-testid="food-icon"/>
                        &nbsp;{getActualCuisinesAsString(restaurant.cuisines)}
                    </span>
                </div>
            </div>
        </div>
}

export default Restaurant