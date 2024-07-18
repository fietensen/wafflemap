import { useCallback, useState } from "react"
import Map from "./Map"
//import LocationInput from "./widgets/LocationInput"
//import { Marker } from "react-leaflet/Marker";
import SideMenu from "./components/SideMenu";

function App() {
    // TODO: make this settable in the root environment file
    const [mapLocation] = useState([52.5, 13.5]);

    // TODO: make this set also when user clicks on map while not dragging
    //const [userSelectMarker, setUserSelectMarker] = useState(null);

    const [routeElement, setRouteElement] = useState(null);


    return (
        <div>
            <SideMenu showRoute={useCallback((route) => {
                setRouteElement(route.geometry);
            }, [setRouteElement])} />
            <Map location={mapLocation} route={routeElement}>

            </Map>
        </div>
    )
}

export default App