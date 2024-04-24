import React from 'react';
import {render, screen} from '@testing-library/react';
import Restaurant from '../../src/components/Restaurant';
import {useGlobalContext} from "../../src/utils/context";
import '@testing-library/jest-dom';

jest.mock('../../src/utils/context', () => ({
    useGlobalContext: jest.fn().mockReturnValue({
        isDeliveryMode: true,
        clickedRestaurant: -1,
        setClickedRestaurant: jest.fn()
    }),
}));

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
        cuisines: ['Chinese', 'Japanese', 'Low Delivery Fee']
    };

    let setClickedRestaurant

    beforeEach(() => {
        setClickedRestaurant = jest.fn()

        useGlobalContext.mockImplementation(() => ({
            isDeliveryMode: true,
            clickedRestaurant: -1,
            setClickedRestaurant
        }));
    });

    it('renders without crashing', () => {
        render(
            <Restaurant
                key={0}
                index={0}
                restaurant={restaurant}
            />
        );
        const foodIcon = screen.getByTestId('food-icon');
        expect(foodIcon).toBeInTheDocument();
    });

    it('restaurant attributes are all correctly inserted for delivery mode', () => {
        render(
            <Restaurant
                key={0}
                index={0}
                restaurant={restaurant}
            />
        );
        const restaurantName = screen.getByTestId('restaurant-name');
        expect(restaurantName.textContent).toBe('Some Restaurant');

        const lowDeliveryFeeTag = screen.getByTestId('low-delivery-fee');
        expect(lowDeliveryFeeTag).toBeInTheDocument()

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

    it('restaurant attributes are all correctly inserted for pickup mode', () => {
        const setClickedRestaurant = jest.fn()
        useGlobalContext.mockImplementation(() => ({
            isDeliveryMode: false,
            clickedRestaurant: -1,
            setClickedRestaurant
        }));

        render(
            <Restaurant
                key={0}
                index={0}
                restaurant={restaurant}
            />
        );
        const restaurantName = screen.getByTestId('restaurant-name');
        expect(restaurantName.textContent).toBe('Some Restaurant');

        const lowDeliveryFeeTag = screen.queryByTestId('low-delivery-fee');
        expect(lowDeliveryFeeTag).not.toBeInTheDocument()

        const restaurantAddress = screen.queryByTestId('restaurant-address');
        expect(restaurantAddress).not.toBeInTheDocument()

        const restaurantRatingStar = screen.getByTestId('restaurant-rating-star');
        expect(restaurantRatingStar.textContent.replace(/\u00a0/g, ' '))
            .toBe(" 4.5");

        const restaurantRatingCount = screen.getByTestId('restaurant-rating-count');
        expect(restaurantRatingCount.textContent).toBe("(100)");

        const restaurantDeliveryTime = screen.queryByTestId('restaurant-delivery-time');
        expect(restaurantDeliveryTime).not.toBeInTheDocument();

        const restaurantCuisines = screen.getByTestId('restaurant-cuisines');
        expect(restaurantCuisines.textContent.replace(/\u00a0/g, ' '))
            .toBe(" Chinese, Japanese");
    });

    it('setClickedRestaurant invoked in pickup mode', () => {
        const setClickedRestaurant = jest.fn()
        useGlobalContext.mockImplementation(() => ({
            isDeliveryMode: false,
            clickedRestaurant: -1,
            setClickedRestaurant
        }));

        render(
            <Restaurant
                key={0}
                index={0}
                restaurant={restaurant}
            />
        );
        const restaurantElement = screen.getByTestId('restaurant');
        restaurantElement.click();
        expect(setClickedRestaurant).toHaveBeenCalled();
        expect(setClickedRestaurant.mock.calls[0][0]).toBe(0)
    });
});