import { useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import SearchResultBox from '../components/SearchResultBox';
import PropTypes from 'prop-types';
import SearchResultItem from '../components/SearchResultItem';

function LocationInput({ onLocationChange }) {
    const [userTyping, setUserTyping] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [resultsVisible, setResultsVisible] = useState(false);

    useEffect(() => {
        setResultsVisible((userInput || userTyping) ? true : false);
    }, [userInput, userTyping]);

    return (
        <div style={{
            position: 'absolute',
            zIndex: 9999,
            top: 0,
            right: 0,
            margin: '1em',
            backgroundColor: '#ffffff',

            display: 'flex',
            flexDirection: 'column',
            width: '18em',
            borderRadius: '4px'
        }}>
            <InputBox
                onInput={(text) => {
                    setUserTyping(false);
                    setUserInput(text);
                }}
                onStartTyping={() => {
                    setUserTyping(true);
                }}
                confirmationTime={800}
                openBottom={resultsVisible}
                placeholder={"Enter Street Name"}
            />
            <br />
            {
                (userInput || userTyping) ?
                    <SearchResultBox showLoadingView={userTyping}>
                        {
                            // The clickable search results
                            // for now this is just two demo locations in berlin
                        }

                        <SearchResultItem location={{
                            lat: 52.5183226,
                            lon: 13.4908384,
                            name: "Gotlindestraße",
                        }} onClick={() => {
                            onLocationChange({
                                lat: 52.5183226,
                                lon: 13.4908384,
                            });
                        }} />

                        <SearchResultItem location={{
                            lat: 52.4889952,
                            lon: 13.3449074,
                            name: "Grunewaldstraße",
                        }} onClick={() => {
                            onLocationChange({
                                lat: 52.4889952,
                                lon: 13.3449074,
                            });
                        }} />

                    </SearchResultBox>
                    :
                    '' // User is not typing and has not typed anything
            }
        </div >
    )
}

LocationInput.propTypes = {
    onLocationChange: PropTypes.func
}

export default LocationInput