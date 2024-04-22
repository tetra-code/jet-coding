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
    const validSearchTerm1 = "EC4M7RF";
    const validSearchTerm2 = "EC4M 7RF";
    const validSearchTerm3 = "EC 4M 7RF";
    const validSearchTerm4 = "CT1 2EH";
    const validSearchTerm5 = "BS1 4DJ";
    const validSearchTerm6 = "PL4 0DW";
    const validSearchTerm7 = "G3 8AG";
    const validSearchTerm8 = "BN1 1AE";
    const validSearchTerm9 = "M16 ORA";
    const validSearchTerm10 = "L4 0TH";
    const validSearchTerm11 = "EC4M";
    const invalidSearchTerm1 = "SE11";
    const invalidSearchTerm2 = "SE 11";
    const invalidSearchTerm3 = "EC4M7Rf";
    const invalidSearchTerm4 = "EC4M7R";
    const invalidSearchTerm5 = "";
    const invalidSearchTerm6 = "E";
    const invalidSearchTerm7 = "%";
    const invalidSearchTerm8 = "EC4M7R#";
    const invalidSearchTerm9 = "ec4m7rf";
    const invalidSearchTerm10 = "EC4M7RF3";
    const invalidSearchTerm11 = "fds3f4edf";
    const invalidSearchTerm12 = "151DEN U8";
    const invalidSearchTerm13 = "@#f8dNU8";
    const invalidSearchTerm14 = "1df83did djf83j932nfdiow8ff3f";

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
        expect(setSearchTerm).toBe()
    });
});