import { TileLayer } from 'react-leaflet/TileLayer';
import { MapContainer } from 'react-leaflet/MapContainer';
import { useLeafletContext } from '@react-leaflet/core'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet'

function UpdateView({ coords }) {
    const map = useMap();
    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [coords, map]);
    return null;
}

function UpdateRoute({ routeGeometry }) {
    const context = useLeafletContext();

    useEffect(() => {
        const geojson = new L.GeoJSON(routeGeometry);
        const container = context.layerContainer || context.map;
        container.addLayer(geojson);

        return () => {
            container.removeLayer(geojson);
        }
    });

    return null;
}

function Map({ location, children, route }) {
    return (
        <MapContainer style={{
            width: '100vw',
            height: '100vh'
        }} center={location} zoom={10}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <UpdateView coords={location} />
            <UpdateRoute routeGeometry={route} />
            {children}
        </MapContainer>
    )
}

Map.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    route: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.arrayOf(PropTypes.number).isRequired
};

UpdateRoute.propTypes = {
    routeGeometry: PropTypes.object,
};

UpdateView.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Map