import { useState } from "react"
import Map from "./Map"
//import LocationInput from "./widgets/LocationInput"
//import { Marker } from "react-leaflet/Marker";
import SideMenu from "./components/SideMenu";
import { GeoJSON } from 'react-leaflet';

function App() {
    // TODO: make this settable in the root environment file
    const [mapLocation] = useState([52.5, 13.5]);

    // TODO: make this set also when user clicks on map while not dragging
    //const [userSelectMarker, setUserSelectMarker] = useState(null);

    const [routeObjects, setRouteObjects] = useState([]);

    // TODO: implement some feature to get a joined GeoJSON
    // from a list of edge-IDs
    const fetchAddRouteObjects = (ids) => {
        if (!ids.length)
            return;

        fetch(`/api/v1/road/${ids[0]}`, {
            headers: new Headers({
                'Accept': 'application/json',
            })
        })
            .then((result) => (result.json()))
            .then((result) => {
                setRouteObjects(oldRouteObjects => ([...oldRouteObjects, <GeoJSON key={oldRouteObjects.length} data={result.geometry} />]));
                fetchAddRouteObjects(ids.slice(1));
            })
            .catch((e) => {
                console.error("an error occoured: ");
                console.error(e);
                alert("an error occoured");
            })
    };

    const showRoute = (route) => {
        setRouteObjects([]);
        fetchAddRouteObjects(route.ids);
    };

    return (
        <div>
            { /*<LocationInput onLocationChange={(location) => {
                // move map
                setMapLocation([location.lat, location.lon]);

                // set marker to location
                setUserSelectMarker(
                    <Marker position={[location.lat, location.lon]} />
                );
            }} /> */ }
            <SideMenu showRoute={showRoute} />
            <Map location={mapLocation}>
                {
                    routeObjects
                }
                {/*userSelectMarker*/}
            </Map>
        </div>
    )
}

export default App