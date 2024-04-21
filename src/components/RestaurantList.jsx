import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Restaurant from "./Restaurant";
import {useGlobalContext} from "../utils/context.jsx";
import "./RestaurantList.css";


// TODO: Dynamically generate multiple restaurant lists based on number of popular cuisines
// TODO: should only be invoked when search is done
export const RestaurantList = () => {
    const {restaurants, resultTitle, searchTerm, searchMode} = useGlobalContext();

    if (searchTerm === "") return (
        <section className='restaurantList'>
            <div className='container'>
                <div className='section-title'>
                    <h2>{resultTitle}</h2>
                </div>
            </div>
        </section>
    )

    // const getCuisinesFrequency = (restaurantList) => {
    //     const allCuisinesList = restaurantList.map((r) => r.cuisines.map((c) => c.name))
    //     const mergedArray = [].concat(...allCuisinesList);
    //
    //     const cuisineFrequencyMap = new Map();
    //     mergedArray.forEach(cuisine => {
    //         if (cuisineFrequencyMap.has(cuisine)) {
    //             cuisineFrequencyMap.set(cuisine, cuisineFrequencyMap.get(cuisine) + 1);
    //         } else {
    //             cuisineFrequencyMap.set(cuisine, 1);
    //         }
    //     });
    //     return cuisineFrequencyMap;
    // }
    // const cuisineFrequencyMap = getCuisinesFrequency(restaurants);

    const resultContent = searchMode === 'delivery'
        ? <div className='restaurant-list-content grid'>
            {
                restaurants.map((item, index) => {
                    return (
                        <Restaurant key={index} {...item} />
                    )
                })
            }
        </div>
        : <MapContainer center={[51.505, -0.09]} zoom={13} style={{height: "80vh", width: "60vw"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>

    return (
        <section className='restaurant-list'>
            <div className='container'>
                <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
                <div className='section-title'>
                    <h2>{resultTitle}</h2>
                </div>
                {resultContent}
            </div>
        </section>
    )
}
