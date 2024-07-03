import PropTypes from 'prop-types';
import { Wrapper } from './styles.module.css';
import LoadingView from '../../widgets/LoadingView';

function SearchResultBox({ showLoadingView, children }) {
    return (
        <Wrapper>
            {
                showLoadingView ?
                    <LoadingView />
                    :
                    children
            }
        </Wrapper>
    )
}

SearchResultBox.propTypes = {
    showLoadingView: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ])
}

export default SearchResultBox