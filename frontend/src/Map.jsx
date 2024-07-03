import { TileLayer } from 'react-leaflet/TileLayer';
import { MapContainer } from 'react-leaflet/MapContainer';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

function Map({ location, children }) {
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setZoom(16);
            mapRef.current.panTo(location);
        }
    }, [location]);

    return (
        <MapContainer ref={mapRef} style={{
            width: '100vw',
            height: '100vh'
        }} center={location} zoom={10}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
}

Map.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    location: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Map