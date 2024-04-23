import React from 'react';
import Header from '../header/Header'
import { Outlet } from 'react-router-dom';

// outlet component necessary to render child routes defined under Home route (e.g. restaurant route)
const Home = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    )
}

export default Home