import { useCallback, useEffect, useState } from 'react';
import RoadLocationInput from '../RoadLocationInput';
import { Wrapper, BoxWrapper, Title, TitleWrapper } from './styles.module.css';
import PropTypes from 'prop-types';
import TravelConfigurator from '../TravelConfigurator';
import WaffleResult from '../WaffleResult';

function SideMenu({ showRoute }) {
    const [currentRoadInputElement, setCurrentRoadInputElement] = useState('');
    const [startRoadSelected, setStartRoadSelected] = useState(null);
    const [destRoadSelected, setDestRoadSelected] = useState(null);
    const [travelConfig, setTravelConfig] = useState(null);
    const [routeResult, setRouteResult] = useState(null);

    useEffect(() => {
        if (!(startRoadSelected && destRoadSelected))
            return;

        fetch(`/api/v1/road/route/${startRoadSelected.id}/${destRoadSelected.id}`)
            .then((result) => (result.json()))
            .then((result) => {
                showRoute(result);
                setRouteResult(result);
            })
            .catch((err) => {
                console.error(err);
                alert("An error occoured!");
            })
    }, [startRoadSelected, destRoadSelected, showRoute]);

    return (
        <Wrapper>
            <BoxWrapper>
                <TitleWrapper>
                    <Title>Configuration</Title>
                </TitleWrapper>
                <TravelConfigurator setTravelConfig={setTravelConfig} />
            </BoxWrapper>
            <BoxWrapper>
                <RoadLocationInput
                    setCurrentRoadInputElement={setCurrentRoadInputElement}
                    onRoadSelect={useCallback((road) => { setStartRoadSelected(road); }, [])}
                    label={'Start'}
                />
                <RoadLocationInput
                    setCurrentRoadInputElement={setCurrentRoadInputElement}
                    onRoadSelect={useCallback((road) => { setDestRoadSelected(road); }, [])}
                    label={'Destination'}
                />
            </BoxWrapper>
            {
                currentRoadInputElement
            }
            {
                (routeResult && travelConfig) ?
                    <BoxWrapper>
                        <WaffleResult distance={routeResult.distance} wafflePrice={travelConfig.wafflePrice} travelCost={travelConfig.travelCost} />
                    </BoxWrapper>
                    : ''
            }

        </Wrapper>
    )
}

SideMenu.propTypes = {
    showRoute: PropTypes.func.isRequired,
}

export default SideMenu