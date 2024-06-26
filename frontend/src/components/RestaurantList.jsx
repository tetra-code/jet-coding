import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import CuisineTypes from './CuisineTypes'
import {Restaurant} from './Restaurant'
import {useGlobalContext} from "../utils/context";
import {SetCenterOnNewSearch} from "./SetCenterOnNewSearch";
import {getRestaurantAddrAsString} from "../utils/util"
import { DefaultIcon, HighlightedIcon } from "./LeafletMapIcon";
import Loader from './Loader'
import "./RestaurantList.css";

/**
 * Displays a list of restaurants based on the search term and delivery mode. Depending on whether it is in delivery
 * or pickup mode, the returned component will have different styling and information displayed. If delivery mode, jus
 * a list of Restaurant components. Else, additional map view that pinpoints the restaurant's location.
 */
export const RestaurantList = () => {
    // re-rendered every time one of these changes
    const {
        restaurants,
        resultTitle,
        searchTerm,
        isDeliveryMode,
        postCodeResult,
        clickedRestaurant,
        loading
    } = useGlobalContext();

    if (loading) return <Loader/>;

    // changes center of the map to the valid postcode search or defaults to London if search term is invalid
    const newCenter = restaurants.length > 0
        ? [postCodeResult.latitude, postCodeResult.longitude]
        : [51.505, -0.09];

    if (searchTerm === "") return (
        <section className='restaurantList'>
            <div className='container'>
                <div className='section-title'>
                    <h2 data-testid='empty-result'>{resultTitle}</h2>
                </div>
            </div>
        </section>
    )

    const resultContent = isDeliveryMode
        ? <div data-testid='delivery-mode-result' className='restaurant-list-content grid'>
            {
                restaurants.map((restaurant, index) => {
                    return (
                        <Restaurant
                            data-testid='restaurant'
                            key={index}
                            restaurant={restaurant}
                        />
                    )
                })
            }
        </div>
        : <div data-testid='pickup-mode-result' className='pickup-mode-container'>
            <div className='restaurant-list-content nav'>
                {
                    restaurants.map((restaurant, index) => {
                        return (
                            <Restaurant
                                key={index}
                                index={index}
                                restaurant={restaurant}
                                data-testid='restaurant'
                            />
                        )
                    })
                }
            </div>
            <MapContainer
                class='map-container'
                center={[51.505, -0.09]}
                zoom={13}
                style={{height: "95vh", width: "55vw"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <SetCenterOnNewSearch coords={newCenter}/>
                {
                    restaurants.map((restaurant, index) => {
                        const coordinates = restaurant.address.location.coordinates
                        return (
                            <Marker
                                key={index}
                                position={[coordinates[1], coordinates[0]]}
                                icon={index === clickedRestaurant ? HighlightedIcon  : DefaultIcon}
                            >
                                <Popup>
                                    <strong>{restaurant.name}</strong><br/>
                                    {getRestaurantAddrAsString(restaurant.address)}
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </MapContainer>
        </div>

    return (
        <section className='restaurant-list'>
            <div className='container'>
                <CuisineTypes/>
                <div className='section-title' data-testid='non-empty-result'>
                    <h2>{resultTitle}</h2>
                </div>
                {resultContent}
            </div>
        </section>
    )
}
