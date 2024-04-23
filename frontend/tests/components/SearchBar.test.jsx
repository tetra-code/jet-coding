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
        setCuisineType: jest.fn()
    }),
}));

describe('SearchBar', () => {
    const keys = [
        'Backspace', 'Tab', 'Clear', 'Shift', 'Control', 'Alt', 'Pause', 'CapsLock',
        'Escape', 'Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowLeft', 'ArrowUp',
        'ArrowRight', 'ArrowDown', 'PrintScreen', 'Insert', 'Delete', 'Help', 'Digit0',
        'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8',
        'Digit9', 'KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI',
        'KeyJ', 'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS',
        'KeyT', 'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ', 'MetaLeft', 'MetaRight',
        'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11',
        'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23',
        'F24', 'NumLock', 'ScrollLock', 'AudioVolumeMute', 'AudioVolumeDown', 'AudioVolumeUp',
        'MediaTrackPrevious', 'MediaTrackNext', 'MediaPlayPause', 'MediaStop', 'MediaSelect',
        'LaunchMail', 'LaunchApp1', 'LaunchApp2', 'Semicolon', 'Equal', 'Comma', 'Minus',
        'Period', 'Slash', 'Backquote', 'BracketLeft', 'Backslash', 'BracketRight', 'Quote'
    ];
    const searchBarPlaceholderText = "Type a UK postcode";
    const errorMsg = "Not a valid UK postcode"
    const validSearchTerm1 = "EC4M7RF";
    const invalidSearchTerm1 = "SE11";

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
        expect(screen.getByPlaceholderText(searchBarPlaceholderText)).toBeInTheDocument();
    });

    it('updates searchTerm when valid input entered', () => {
        expect(setSearchTerm).not.toHaveBeenCalled();
        expect(setResultTitle).not.toHaveBeenCalled();
        expect(setCuisineType).not.toHaveBeenCalled();

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(searchBarPlaceholderText);
        fireEvent.change(input, { target: { value: validSearchTerm1 } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(setSearchTerm).toHaveBeenCalled();
        expect(setSearchTerm.mock.calls[0][0]).toBe(validSearchTerm1)
        expect(setResultTitle).not.toHaveBeenCalled();
        expect(setCuisineType).not.toHaveBeenCalled();
    });


    it('not update searchTerm with key other than Enter', () => {
        expect(setSearchTerm).not.toHaveBeenCalled();
        expect(setResultTitle).not.toHaveBeenCalled();
        expect(setCuisineType).not.toHaveBeenCalled();

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(searchBarPlaceholderText);
        fireEvent.change(input, { target: { value: validSearchTerm1 } });

        for (let i = 0; i < keys.length; i++) {
            fireEvent.keyDown(input, { key: keys[i], code: keys[i] });
            expect(setSearchTerm).not.toHaveBeenCalled();
            expect(setResultTitle).not.toHaveBeenCalled();
            expect(setCuisineType).not.toHaveBeenCalled();
        }
    });

    it('updates searchTerm when search icon clicked with valid input', () => {
        expect(setSearchTerm).not.toHaveBeenCalled();
        expect(setResultTitle).not.toHaveBeenCalled();
        expect(setCuisineType).not.toHaveBeenCalled();

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
        expect(setCuisineType).not.toHaveBeenCalled();
    });

    it('invalid input enter results in empty searchTerm and error msg in resultTitle', () => {
        expect(setSearchTerm).not.toHaveBeenCalled();
        expect(setResultTitle).not.toHaveBeenCalled();

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(searchBarPlaceholderText);
        fireEvent.change(input, { target: { value: invalidSearchTerm1 } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(setSearchTerm).toHaveBeenCalled();
        expect(setSearchTerm.mock.calls[0][0]).toBe("")
        expect(setResultTitle).toHaveBeenCalled();
        expect(setResultTitle.mock.calls[0][0]).toBe(errorMsg)
        expect(setCuisineType).not.toHaveBeenCalled();
    });

    it('invalid input click results in empty searchTerm and error msg in resultTitle', () => {
        expect(setSearchTerm).not.toHaveBeenCalled();
        expect(setResultTitle).not.toHaveBeenCalled();
        expect(setCuisineType).not.toHaveBeenCalled();

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(searchBarPlaceholderText);
        fireEvent.change(input, { target: { value: invalidSearchTerm1 } });
        const searchIcon = screen.getByTestId('search-icon');
        fireEvent.click(searchIcon);

        expect(setSearchTerm).toHaveBeenCalled();
        expect(setSearchTerm.mock.calls[0][0]).toBe("")
        expect(setResultTitle).toHaveBeenCalled();
        expect(setResultTitle.mock.calls[0][0]).toBe(errorMsg)
        expect(setCuisineType).not.toHaveBeenCalled();
    });

    it('update non-empty cuisineType to empty when valid input entered again', () => {
        useGlobalContext.mockImplementation(() => ({
            setSearchTerm,
            setResultTitle,
            cuisineType: 'Burger',
            setCuisineType
        }));
        expect(setCuisineType).not.toHaveBeenCalled();

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(searchBarPlaceholderText);
        fireEvent.change(input, { target: { value: validSearchTerm1 } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(setCuisineType).toHaveBeenCalled();
        expect(setCuisineType.mock.calls[0][0]).toBe("")
    });
});