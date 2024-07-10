import { useEffect, useState } from 'react';
import RoadLocationInput from '../RoadLocationInput';
import { Wrapper, BoxWrapper } from './styles.module.css';
import PropTypes from 'prop-types';

function SideMenu({ showRoute }) {
    const [currentRoadInputElement, setCurrentRoadInputElement] = useState('');
    const [startRoadSelected, setStartRoadSelected] = useState(null);
    const [destRoadSelected, setDestRoadSelected] = useState(null);

    useEffect(() => {
        if (!(startRoadSelected && destRoadSelected))
            return;

        fetch(`/api/v1/road/route/${startRoadSelected.id}/${destRoadSelected.id}`)
            .then((result) => (result.json()))
            .then((result) => {
                showRoute(result);
            })
            .catch((err) => {
                console.error(err);
                alert("An error occoured!");
            })
    }, [startRoadSelected, destRoadSelected]);

    return (
        <Wrapper>
            <BoxWrapper>
                <RoadLocationInput
                    setCurrentRoadInputElement={setCurrentRoadInputElement}
                    onRoadSelect={(road) => { setStartRoadSelected(road); }}
                    label={'Start'}
                />
                <RoadLocationInput
                    setCurrentRoadInputElement={setCurrentRoadInputElement}
                    onRoadSelect={(road) => { setDestRoadSelected(road); }}
                    label={'Destination'}
                />
            </BoxWrapper>
            {
                currentRoadInputElement
            }

        </Wrapper>
    )
}

SideMenu.propTypes = {
    showRoute: PropTypes.func.isRequired,
}

export default SideMenu