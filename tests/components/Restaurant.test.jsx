import React from 'react';
import {render, screen} from '@testing-library/react';
import Restaurant from '../../src/components/Restaurant';
import '@testing-library/jest-dom';

describe('Restaurant', () => {
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

    it('renders without crashing', () => {
        render(
            <Restaurant {...restaurant} />
        );
        const searchIcon = screen.getByTestId('food-icon');
        expect(searchIcon).toBeInTheDocument();
    });

    it('restaurant attributes are all correctly inserted', () => {
        render(
            <Restaurant {...restaurant} />
        );
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
});