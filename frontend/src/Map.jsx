import { TileLayer } from 'react-leaflet/TileLayer';
import { MapContainer } from 'react-leaflet/MapContainer';
import PropTypes from 'prop-types';

function Map({ children }) {
    return (
        <MapContainer style={{
            width: '100vw',
            height: '100vw'
        }} center={[51.505, -0.09]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
}

Map.propTypes = {
    children: PropTypes.node,
};

export default Map