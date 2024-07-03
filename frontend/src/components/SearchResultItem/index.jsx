import PropTypes from 'prop-types';
import { Wrapper, LocationName, LocationCoordinates } from './styles.module.css';

function SearchResultItem({ location, onClick }) {
    return (
        <Wrapper onClick={onClick}>
            <LocationName>
                {location.name}
            </LocationName>
            <LocationCoordinates>
                {'@(' + location.lat + ', ' + location.lon + ')'}
            </LocationCoordinates>
        </Wrapper>
    )
}

SearchResultItem.propTypes = {
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func,
}

export default SearchResultItem