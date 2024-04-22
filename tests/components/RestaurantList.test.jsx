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
        searchMode: 'delivery'
    }),
}));

describe('RestaurantList', () => {
    beforeEach(() => {
        useGlobalContext.mockImplementation(() => ({
            restaurants: [],
            resultTitle: '',
            searchTerm: '',
            searchMode: 'delivery'
        }));
    });

    it('renders on empty searchTerm without crashing', () => {
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
            searchMode: 'delivery'
        }));

        render(
            <RestaurantList/>
        );
        const innerElement = screen.getByTestId("non-empty-result");
        expect(innerElement).toBeInTheDocument();
    });



});