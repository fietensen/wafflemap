import { useEffect, useState } from 'react';
import SlideInput from '../SlideInput';
import { Wrapper } from './styles.module.css';
import PropTypes from 'prop-types';

function TravelConfigurator({ setTravelConfig }) {
    const [wafflePrice, setWafflePrice] = useState(0.37);
    const [travelCost, setTravelCost] = useState(0.12);

    useEffect(() => {
        setTravelConfig({
            wafflePrice,
            travelCost
        });
    }, [wafflePrice, travelCost, setTravelConfig])

    return (
        <Wrapper>
            <SlideInput name={"Price per Waffle"} min={0} max={2} metric={"EUR"} onChange={setWafflePrice} mul={100} initial={0.37} />
            <SlideInput name={"Travel Cost (per Kilometer)"} min={0} max={3} metric={"EUR"} onChange={setTravelCost} mul={100} initial={0.12} />
        </Wrapper>
    )
}

TravelConfigurator.propTypes = {
    setTravelConfig: PropTypes.func.isRequired,
}

export default TravelConfigurator