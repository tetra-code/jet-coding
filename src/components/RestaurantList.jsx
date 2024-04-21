import React from 'react';
import Restaurant from "./Restaurant.jsx";
import "./Restaurant.css";
import {useGlobalContext} from "../utils/context.jsx";


export const RestaurantList = () => {
    const {restaurants, loading, resultTitle} = useGlobalContext();
    return (
        <section className='restaurantList'>
            <div className='container'>
                <div className='section-title'>
                    <h2>Section</h2>
                </div>
            </div>
        </section>
    )
}