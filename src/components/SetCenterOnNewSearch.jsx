import { useMap } from 'react-leaflet';

/*
* From the official docs: except for its children, MapContainer props are immutable:
* changing them after they have been set a first time will have no effect on the Map instance or its container.
* This component required to change map center upon updated postcode.
*/
export const SetCenterOnNewSearch = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
}