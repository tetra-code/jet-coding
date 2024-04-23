import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import defaultIcon from "../images/default-icon.png"
import highlightedIcon from "../images/highlighted-icon.png"
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

/*
React leaflet for some reason do not include images, including the marker one. Need to reset default icons image.
*/
export const DefaultIcon = L.icon({
    iconUrl: defaultIcon,
    shadowUrl: iconShadow,
    iconSize: [40,40],
    iconAnchor: [20,41]
});

export const HighlightedIcon = L.icon({
    iconUrl: highlightedIcon,
    shadowUrl: iconShadow,
    iconSize: [40,40],
    iconAnchor: [20,41]
});
