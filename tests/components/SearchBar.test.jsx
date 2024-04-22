import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useGlobalContext } from '../../src/utils/context';
import SearchBar from '../../src/components/SearchBar';
import '@testing-library/jest-dom';

jest.mock('../../src/utils/context', () => ({
    useGlobalContext: jest.fn().mockReturnValue({
        setSearchTerm: jest.fn(),
        setResultTitle: jest.fn(),
        cuisineType: '',
        setCuisineType: jest.fn(),
        handleSearch: jest.fn(),
        handleSubmit: jest.fn(),
    }),
}));

describe('SearchBar', () => {
    const searchBarPlaceholderText = "Type a UK postcode";
    let setSearchTerm, setResultTitle, setCuisineType;
    const validSearchTerm1 = "EC4M7RF";
    const validSearchTerm2 = "ec4m7rf";
    const validSearchTerm3 = "G3 8AG";
    const validSearchTerm4 = "BN1 1AE";

    const invalidSearchTerm1 = "SE11";
    const invalidSearchTerm2 = "E";
    const invalidSearchTerm3 = " ";
    const invalidSearchTerm4 = "\n";
    const emptySearchTerm = "";


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
        expect(screen.getByPlaceholderText(searchBarPlaceholderText)).toBeInTheDocument();
    });

    it('updates searchTerm when valid search term is entered but not resultTitle', () => {
        expect(setSearchTerm).not.toHaveBeenCalled();
        expect(setResultTitle).not.toHaveBeenCalled();

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(searchBarPlaceholderText);
        fireEvent.change(input, { target: { value: validSearchTerm1 } });
        const searchIcon = screen.getByTestId('search-icon');
        fireEvent.click(searchIcon);

        expect(setSearchTerm).toHaveBeenCalled();
        expect(setSearchTerm.mock.calls[0][0]).toBe(validSearchTerm1)
        expect(setResultTitle).not.toHaveBeenCalled();
    });
});