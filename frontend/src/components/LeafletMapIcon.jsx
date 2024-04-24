import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import defaultIcon from "../images/default-icon.png"
import highlightedIcon from "../images/highlighted-icon.png"

/**
 * React leaflet for some reason does not include images, including the marker. Therefore, this component is needed to
 * reset default icon images and custom ones.
 */
export const DefaultIcon = L.icon({
    iconUrl: defaultIcon,
    shadowUrl: iconShadow,
    iconSize: [40,40],
    iconAnchor: [10,10]
});

export const HighlightedIcon = L.icon({
    iconUrl: highlightedIcon,
    shadowUrl: iconShadow,
    iconSize: [40,40],
    iconAnchor: [10,10]
});
