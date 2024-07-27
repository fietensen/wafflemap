import PropTypes from 'prop-types';
import { Wrapper } from './styles.module.css';

// The secret formula
function calculateWaffleCount(distance, wafflePrice, travelCost) {
    return (distance / 1000 * travelCost) / wafflePrice;
}

function WaffleResult({ distance, wafflePrice, travelCost }) {
    return (
        <Wrapper>You have to eat {Math.ceil(calculateWaffleCount(distance, wafflePrice, travelCost))} Waffles</Wrapper>
    )
}

WaffleResult.propTypes = {
    distance: PropTypes.number.isRequired,
    wafflePrice: PropTypes.number.isRequired,
    travelCost: PropTypes.number.isRequired,
}

export default WaffleResult