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
    let setSearchTerm, setResultTitle, setCuisineType, handleSearch, handleSubmit;
    const searchBarPlaceholderText = "Type a UK postcode";
    const validSearchTerm1 = "EC4M74F";
    const validSearchTerm2 = "EC4M 74F";
    const validSearchTerm3 = "PL4 0DW";
    const validSearchTerm4 = "L4 0TH";
    const invalidSearchTerm1 = "S E 1 1";
    const invalidSearchTerm2 = "fds3f4edf";
    const invalidSearchTerm3 = "151DEN U8";
    const invalidSearchTerm4 = "@#f8dNU8";
    const invalidSearchTerm5 = "1df83did djf83j932nfdiow8ff3f";
    const emptySearchTerm = "";

    beforeEach(() => {
        setSearchTerm = jest.fn();
        setResultTitle = jest.fn();
        setCuisineType = jest.fn();
        handleSearch = jest.fn();
        handleSubmit = jest.fn();

        useGlobalContext.mockImplementation(() => ({
            setSearchTerm,
            setResultTitle,
            cuisineType: '',
            setCuisineType,
            handleSearch,
            handleSubmit
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

    it('updates search term when valid search term is entered', () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(searchBarPlaceholderText);
        fireEvent.change(input, { target: { value: validSearchTerm2 } });
        const searchIcon = screen.getByTestId('search-icon');
        fireEvent.click(searchIcon);
        // expect(handleSubmit).toHaveBeenCalled();
        expect(setSearchTerm).toHaveBeenCalledWith(validSearchTerm1);
    });
});