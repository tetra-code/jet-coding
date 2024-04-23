import React from 'react';
import {render, screen} from '@testing-library/react';
import {RestaurantList} from '../../src/components/RestaurantList';
import '@testing-library/jest-dom';
import {useGlobalContext} from "../../src/utils/context";

jest.mock('react-leaflet');

jest.mock('../../src/utils/context', () => ({
    useGlobalContext: jest.fn().mockReturnValue({
        restaurants: [],
        resultTitle: '',
        searchTerm: 'searchTerm',
        isDeliveryMode: 'delivery',
        postCodeResult: [],
        clickedRestaurant: 0,
        loading: false
    }),
}));

describe('RestaurantList', () => {
    const restaurant1 = {
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

    const restaurant2 = {
        name: 'Some Restaurant2',
        logoUrl: 'someUrl2',
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
        cuisines: ['deals', 'Japanese']
    }

    it('renders on empty searchTerm without crashing', () => {
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
            <RestaurantList/>
        );
        const innerElement = screen.getByTestId("empty-result");
        expect(innerElement).toBeInTheDocument();
    });

    it('renders on non-empty searchTerm without crashing', () => {
        useGlobalContext.mockImplementation(() => ({
            restaurants: [],
            resultTitle: '',
            searchTerm: 'something',
            isDeliveryMode: 'delivery',
            postCodeResult: [],
            clickedRestaurant: 0,
            loading: false

        }));

        render(
            <RestaurantList/>
        );
        const innerElement = screen.getByTestId("non-empty-result");
        expect(innerElement).toBeInTheDocument();
        const restaurantElement = screen.queryByTestId("restaurant");
        expect(restaurantElement).not.toBeInTheDocument();
    });

    it('returns delivery mode result with no restaurants', () => {
        useGlobalContext.mockImplementation(() => ({
            restaurants: [],
            resultTitle: '',
            searchTerm: 'something',
            isDeliveryMode: 'delivery',
            postCodeResult: [],
            clickedRestaurant: 0,
            loading: false
        }));

        render(
            <RestaurantList/>
        );
        const innerElement1 = screen.getByTestId("non-empty-result");
        expect(innerElement1).toBeInTheDocument();
        const innerElement2 = screen.getByTestId("delivery-mode-result");
        expect(innerElement2).toBeInTheDocument();
        const restaurantElement = screen.queryByTestId("restaurant");
        expect(restaurantElement).not.toBeInTheDocument();
    });

    it('returns pickup (non-delivery) mode result', () => {
        useGlobalContext.mockImplementation(() => ({
            restaurants: [],
            resultTitle: '',
            searchTerm: 'something',
            isDeliveryMode: 'delivery',
            postCodeResult: [],
            clickedRestaurant: 0,
            loading: false
        }));

        render(
            <RestaurantList/>
        );
        const innerElement1 = screen.getByTestId("non-empty-result");
        expect(innerElement1).toBeInTheDocument();
        const innerElement2 = screen.getByTestId("pickup-mode-result");
        expect(innerElement2).toBeInTheDocument();
    });

    it('create a restaurant element for delivery mode', () => {
        useGlobalContext.mockImplementation(() => ({
            restaurants: [restaurant1],
            resultTitle: '',
            searchTerm: 'something',
            isDeliveryMode: 'delivery',
            postCodeResult: [],
            clickedRestaurant: 0,
            loading: false
        }));

        render(
            <RestaurantList/>
        );
        const restaurantElements = screen.queryAllByTestId("restaurant");
        expect(restaurantElements.length).toBe(1);

        const restaurantName = screen.getByTestId('restaurant-name');
        expect(restaurantName.textContent).toBe('Some Restaurant');

        const restaurantAddress = screen.getByTestId('restaurant-address');
        expect(restaurantAddress.textContent.replace(/\u00a0/g, ' '))
            .toBe(" 43 Baker St, Y3 8AG, London");

        const restaurantRatingStar = screen.getByTestId('restaurant-rating-star');
        expect(restaurantRatingStar.textContent.replace(/\u00a0/g, ' '))
            .toBe(" 4.5");
        const restaurantRatingCount = screen.getByTestId('restaurant-rating-count');
        expect(restaurantRatingCount.textContent).toBe("(100)");

        const restaurantDeliveryTime = screen.getByTestId('restaurant-delivery-time');
        expect(restaurantDeliveryTime.textContent.replace(/\u00a0/g, ' '))
            .toBe(" 30 ~ 45 min");

        const restaurantCuisines = screen.getByTestId('restaurant-cuisines');
        expect(restaurantCuisines.textContent.replace(/\u00a0/g, ' '))
            .toBe(" Chinese, Japanese");
    });

    it('create restaurant elements for delivery mode', () => {
        useGlobalContext.mockImplementation(() => ({
            restaurants: [restaurant1, restaurant2],
            resultTitle: '',
            searchTerm: 'something',
            searchMode: 'delivery'
        }));

        render(
            <RestaurantList/>
        );
        const restaurantElements = screen.queryAllByTestId("restaurant");
        expect(restaurantElements.length).toBe(2);
    });
});