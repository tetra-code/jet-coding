import { useMap } from 'react-leaflet';

/**
 * Sets the center of the map to the coordinates of the new search. Necessary as MapContainer props are immutable, thus
 * changing them after they have been set a first time will have no effect on the Map instance or its container.
 *
 * @param coords            array with two elements, latitude and longitude
 */
export const SetCenterOnNewSearch = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
}