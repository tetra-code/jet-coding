import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Home from "../../src/pages/Home";
import {RestaurantList} from "../../src/components/RestaurantList";
import {useGlobalContext} from "../../src/utils/context";

jest.mock('../../src/utils/context', () => ({
    useGlobalContext: jest.fn().mockReturnValue({
        setSearchTerm: jest.fn(),
        setResultTitle: jest.fn(),
        cuisineType: '',
        setCuisineType: jest.fn(),
        isDeliveryMode: true,
        setDeliveryMode: jest.fn()
    }),
}));

describe('Home', () => {
    it('renders Header component only without crashing', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const headerTitle = screen.getByTestId('main-header');
        expect(headerTitle).toBeInTheDocument();
        expect(headerTitle).toHaveTextContent('Just Eat Takeaway');

        const searchBar = screen.getByRole('textbox');
        const toggle = screen.getByRole('checkbox');
        expect(searchBar).toBeInTheDocument();
        expect(toggle).toBeInTheDocument();

        const restaurantElement = screen.queryByTestId("empty-result");
        expect(restaurantElement).not.toBeInTheDocument();
    });

    it('renders Header and Outlet (Restaurant route) component without crashing for empty results', () => {
        useGlobalContext.mockImplementation(() => ({
            restaurants: [],
            resultTitle: '',
            searchTerm: '',
            isDeliveryMode: 'delivery',
            postCodeResult: [],
            clickedRestaurant: 0,
            loading: false
        }));

        render(
            <MemoryRouter initialEntries={["/restaurants"]}>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route path="restaurants" element={<RestaurantList />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );
        const headerTitle = screen.getByTestId('main-header');
        expect(headerTitle).toBeInTheDocument();

        const restaurantElement = screen.getByTestId('empty-result');
        expect(restaurantElement).toBeInTheDocument();
    });


    it('renders Header and Outlet (Restaurant route) component without crashing for non-empty results', () => {
        const restaurant = {
            name: 'Some Restaurant',
            logoUrl: 'someUrl',
            address: {
                firstLine: "43 Baker St",
                postalCode: "Y3 8AG",
                city: "London"
            },
            rating: {
                starRating: 4.5,
                count: 100,
            },
            availability: {
                delivery: {
                    etaMinutes: {
                        rangeLower: 30,
                        rangeUpper: 45,
                    },
                },
            },
            cuisines: ['Chinese', 'Japanese']
        };

        useGlobalContext.mockImplementation(() => ({
            restaurants: [restaurant],
            resultTitle: '',
            searchTerm: 'something',
            isDeliveryMode: 'delivery',
            postCodeResult: [],
            clickedRestaurant: 0,
            loading: false
        }));

        render(
            <MemoryRouter initialEntries={["/restaurants"]}>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route path="restaurants" element={<RestaurantList />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );
        const headerTitle = screen.getByTestId('main-header');
        expect(headerTitle).toBeInTheDocument();

        const restaurantElement = screen.getByTestId('non-empty-result');
        expect(restaurantElement).toBeInTheDocument();
    });
});