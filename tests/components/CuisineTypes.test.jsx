import React from 'react';
import {render, screen} from '@testing-library/react';
import CuisineTypes from '../../src/components/CuisineTypes';
import '@testing-library/jest-dom';
import {useGlobalContext} from "../../src/utils/context";

jest.mock('../../src/utils/context', () => ({
    useGlobalContext: jest.fn().mockReturnValue({
        setCuisineType: jest.fn(),
        cuisineType: ''
    }),
}));

describe('CuisineTypes', () => {
    const cuisineIconList =
        ['burgers-icon', 'kebab-icon', 'sushi-icon', 'pizza-icon', 'chinese-icon', 'greek-icon',
            'indian-icon', 'groceries-icon', 'chicken-icon']

    let setCuisineType;

    beforeEach(() => {
        setCuisineType = jest.fn();

        useGlobalContext.mockImplementation(() => ({
            cuisineType: '',
            setCuisineType
        }));
    });

    it('renders without crashing', () => {
        render(
            <CuisineTypes />
        );
        const burgerIcon = screen.getByTestId('burgers-icon');
        expect(burgerIcon).toBeInTheDocument();
    });

    it('cuisineType is correctly set when icon is clicked', () => {
        expect(setCuisineType).not.toHaveBeenCalled();

        render(
            <CuisineTypes />
        );

        for (let i = 0; i< cuisineIconList.length; i++) {
            const icon = cuisineIconList[i];
            const cuisineIcon = screen.getByTestId(icon);
            cuisineIcon.click();
            expect(setCuisineType).toHaveBeenCalled();

            const capitalized = icon.charAt(0).toUpperCase() + icon.slice(1, -5)
            expect(setCuisineType.mock.calls[i][0]).toBe(capitalized);
        }
    });
});
