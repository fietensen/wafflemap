import { useState } from "react"
import Map from "./Map"
import LocationInput from "./widgets/LocationInput"
import { Marker } from "react-leaflet/Marker";

function App() {
    // TODO: make this settable in the root environment file
    const [mapLocation, setMapLocation] = useState([52.5, 13.5]);

    // TODO: make this set also when user clicks on map while not dragging
    const [userSelectMarker, setUserSelectMarker] = useState(null);

    return (
        <div>
            <LocationInput onLocationChange={(location) => {
                // move map
                setMapLocation([location.lat, location.lon]);

                // set marker to location
                setUserSelectMarker(
                    <Marker position={[location.lat, location.lon]} />
                );
            }} />
            <Map location={mapLocation}>
                {userSelectMarker}
            </Map>
        </div>
    )
}

export default App