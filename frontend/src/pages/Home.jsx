import React from 'react';
import Header from '../header/Header'
import { Outlet } from 'react-router-dom';

/**
 * Returns the Home component that contains the Header component and the Outlet component, which is needed to
 * render child routes defined under the Home route (e.g. /restaurants route).
 */
const Home = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    )
}

export default Home