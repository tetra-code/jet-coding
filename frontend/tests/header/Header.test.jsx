import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../src/header/Header';
import '@testing-library/jest-dom';
import {MemoryRouter} from "react-router-dom";

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


describe('Header', () => {
    it('renders without crashing and the correct title', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const title = screen.getByRole('heading');
        expect(title).toHaveTextContent('Just Eat Takeaway');
    });

    it('renders SearchBar and Toggle components', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const searchBar = screen.getByRole('textbox');
        const toggle = screen.getByRole('checkbox');
        expect(searchBar).toBeInTheDocument();
        expect(toggle).toBeInTheDocument();
    });
});