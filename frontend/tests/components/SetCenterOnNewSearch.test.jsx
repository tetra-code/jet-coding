import React from 'react';
import { render } from '@testing-library/react';
import { useMap } from 'react-leaflet';
import { SetCenterOnNewSearch } from '../../src/components/SetCenterOnNewSearch';
import '@testing-library/jest-dom';

jest.mock('react-leaflet', () => ({
    useMap: jest.fn().mockReturnValue({
        setView: jest.fn(),
        getZoom: jest.fn()
    })
}));

describe('SetCenterOnNewSearch', () => {
    let setView, getZoom;

    beforeEach(() => {
        setView = jest.fn();
        getZoom = jest.fn().mockReturnValue(13);

        useMap.mockReturnValue({
            setView: setView,
            getZoom: getZoom,
        });
    });

    it('correctly sets map view to coordinates and zoom value', () => {
        const coords1 = [51.505, -0.09];
        render(
            <SetCenterOnNewSearch coords={coords1} />
        );
        expect(setView).toHaveBeenCalledWith(coords1, 13);

        const coords2 = [51.504, -0.09];
        render(
            <SetCenterOnNewSearch coords={coords2} />
        );
        expect(setView).toHaveBeenCalledWith(coords2, 13);
    });
});