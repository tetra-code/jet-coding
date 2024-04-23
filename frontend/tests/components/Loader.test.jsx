import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../../src/components/Loader';


describe('Loader', () => {
    it('renders without crashing', () => {
        render(<Loader />);
        const loaderImage = screen.getByRole('img');
        expect(loaderImage).toBeInTheDocument();
    });
});


