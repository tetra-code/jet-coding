import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useGlobalContext } from '../../src/utils/context';
import SearchBar from '../../src/components/SearchBar';
import '@testing-library/jest-dom';

jest.mock('../../src/utils/context', () => ({
    useGlobalContext: jest.fn(),
}));

describe('SearchBar', () => {
    let setSearchTerm, setResultTitle, setCuisineType;

    beforeEach(() => {
        setSearchTerm = jest.fn();
        setResultTitle = jest.fn();
        setCuisineType = jest.fn();

        useGlobalContext.mockImplementation(() => ({
            setSearchTerm,
            setResultTitle,
            cuisineType: '',
            setCuisineType,
        }));
    });

    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        expect(screen.getByPlaceholderText("Type a UK postcode")).toBeInTheDocument();
    });
});