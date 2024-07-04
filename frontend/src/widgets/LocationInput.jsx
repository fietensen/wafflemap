import { useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import SearchResultBox from '../components/SearchResultBox';
import PropTypes from 'prop-types';
import SearchResultItem from '../components/SearchResultItem';

function LocationInput({ onLocationChange }) {
    const [userTyping, setUserTyping] = useState(false);
    const [userInput, setUserInput] = useState(null);
    const [resultsVisible, setResultsVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setResultsVisible((userInput || userTyping) ? true : false);
    }, [userInput, userTyping]);

    useEffect(() => {
        if (!userInput) {
            setUserTyping(false);
            return;
        }

        fetch('/api/v1/road/search?' + new URLSearchParams({
            name: userInput
        }).toString(), {
            headers: new Headers({
                'Accept': 'application/json'
            })
        })
            .then((results) => (
                results.json()
            ))
            .then((results) => {
                if (results.length === 0)
                    setSearchResults([]);

                // limit number of results shown to 12
                // TODO: think of a different solution.
                //       perhaps a scrollable window??
                results.splice(12);
                setSearchResults(results.map((value, index) => (
                    <SearchResultItem
                        key={index}
                        location={{
                            name: value[0],
                            lat: value[2],
                            lon: value[1],
                        }}
                        onClick={() => {
                            onLocationChange({
                                lat: value[2],
                                lon: value[1],
                            });
                        }}
                    />
                )));

                // only do this here, because this way the loading menu
                // stays loading as long as the request isn't finished
                setUserTyping(false);
            })
            .catch(() => { alert('Something went wrong.'); })
    }, [onLocationChange, userInput])

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
                            searchResults
                        }

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