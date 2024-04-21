import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Restaurant from "./Restaurant";
import {useGlobalContext} from "../utils/context.jsx";
import "./RestaurantList.css";


export const RestaurantList = () => {
    const {restaurants, resultTitle, searchTerm, searchMode} = useGlobalContext();

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
        <section className='restaurantList'>
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
