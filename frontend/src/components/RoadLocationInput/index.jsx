import PropTypes from 'prop-types';
import { TopWrapper, Wrapper, Label, NodeWrapper, SelectedNode } from './styles.module.css'
import { useEffect, useState } from 'react';
import InputBox from '../InputBox';
import SearchResultBox from '../SearchResultBox';
import SearchResultItem from '../SearchResultItem';

/*
TODO: rather general, but refactor this
*/

function RoadLocationInput({ label, setCurrentRoadInputElement, onRoadSelect }) {
    const [userTyping, setUserTyping] = useState(false);
    const [userInput, setUserInput] = useState(null);
    const [fieldOpen, setFieldOpen] = useState(false);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [roadsFound, setRoadsFound] = useState(null);
    const [inputFieldSelected, setInputFieldSelected] = useState(false);
    const [currentlySelectedNode, setCurrentlySelectedNode] = useState(null);

    useEffect(() => {
        setCurrentRoadInputElement(resultsLoading || roadsFound ?
            <SearchResultBox showLoadingView={resultsLoading}>
                {
                    roadsFound
                }
            </SearchResultBox>
            : ''
        );
    }, [userInput, setCurrentRoadInputElement, resultsLoading, roadsFound]);

    useEffect(() => {
        setResultsLoading(userTyping);
    }, [userInput, userTyping]);

    useEffect(() => {
        if (!userInput) {
            setUserTyping(false);
            return;
        }

        fetch('/api/v1/road/search?' + new URLSearchParams({
            name: userInput,
            limit: 5,
        }).toString(), {
            headers: new Headers({
                'Accept': 'application/json'
            })
        })
            .then((result) => (
                result.json()
            ))
            .then((result) => {
                console.log(result.results);
                setRoadsFound(result.results.map((result, index) => (
                    <SearchResultItem
                        key={index}
                        location={result}
                        onClick={() => {
                            setRoadsFound(null);
                            setCurrentlySelectedNode(result);
                            onRoadSelect(result);
                        }}
                    />
                )));
                setUserTyping(false);
            })
            .catch((e) => { alert("error: " + e); })
    }, [userInput]);

    return (
        <TopWrapper>
            {currentlySelectedNode ?
                <NodeWrapper onClick={() => {
                    setCurrentlySelectedNode(null);
                    setFieldOpen(false);
                }}>
                    <Label select>{label}</Label>
                    <SelectedNode value={currentlySelectedNode.name} disabled />
                </NodeWrapper>
                :
                <Wrapper>
                    <Label select={fieldOpen} highlighted={inputFieldSelected}>{label}</Label>
                    <InputBox
                        onInput={(value) => {
                            if (userInput == value)
                                setUserTyping(false);
                            else
                                setUserInput(value);
                        }}
                        confirmationTime={800}
                        onStartTyping={() => {
                            setUserTyping(true);
                        }}
                        onFocus={() => {
                            setInputFieldSelected(true);
                            setFieldOpen(true);
                        }}
                        onBlur={(e) => {
                            setInputFieldSelected(false);
                            if (e.target.value === "") setFieldOpen(false);
                        }}
                    />
                </Wrapper>
            }
        </TopWrapper >
    )
}

RoadLocationInput.propTypes = {
    label: PropTypes.string.isRequired,
    setCurrentRoadInputElement: PropTypes.func.isRequired,
    onRoadSelect: PropTypes.func.isRequired,
}

export default RoadLocationInput