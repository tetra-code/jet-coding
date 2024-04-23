import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useGlobalContext } from '../../src/utils/context';
import '@testing-library/jest-dom';
import Toggle from '../../src/components/Toggle';

jest.mock('../../src/utils/context', () => ({
    useGlobalContext: jest.fn().mockReturnValue({
        isDeliveryMode: true,
        setDeliveryMode: jest.fn()
    }),
}));

describe('Toggle', () => {
    let setDeliveryMode, isDeliveryMode;
    beforeEach(() => {
        isDeliveryMode = true;
        setDeliveryMode = jest.fn();

        useGlobalContext.mockImplementation(() => ({
            isDeliveryMode: true,
            setDeliveryMode
        }));
    });

    it('renders correctly and calls setDeliveryMode on click', () => {
        render(
            <Toggle />
        );

        const toggle = screen.getByRole('checkbox');
        expect(toggle).toBeInTheDocument();
        fireEvent.click(toggle);
        expect(setDeliveryMode).toHaveBeenCalled();
    });

    it('set delivery mode correctly toggles based on click', () => {
        render(
            <Toggle />
        );
        const toggle = screen.getByRole('checkbox');
        expect(isDeliveryMode).toBe(true);
        fireEvent.click(toggle);
        expect(setDeliveryMode).toHaveBeenCalled();
        expect(setDeliveryMode.mock.calls[0][0]).toBe(false);
    });
});