import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AppProvider } from './utils/context';
import { RestaurantList } from "./components/RestaurantList";
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Home />}>
                    <Route path = "restaurants" element = {<RestaurantList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AppProvider>
);
