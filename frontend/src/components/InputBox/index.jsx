import { useRef } from 'react';
import { Input } from './styles.module.css';
import PropTypes from 'prop-types';

function InputBox({ onInput, confirmationTime, onStartTyping, onFocus, onBlur }) {
    const typingTimeoutRef = useRef();

    const onInputChange = (e) => {
        let value = e.target.value;

        if (onStartTyping)
            onStartTyping();

        if (onInput && !confirmationTime) {
            onInput(value);
        } else if (onInput) {
            // only call onInput if threshold of confirmationTime
            // milliseconds has passed without any further inputs
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            typingTimeoutRef.current = setTimeout(() => {
                onInput(value);
            }, confirmationTime);
        }
    };

    return (
        <Input onChange={onInputChange} onBlur={onBlur} onFocus={onFocus} />
    )
}

InputBox.propTypes = {
    onInput: PropTypes.func,
    onStartTyping: PropTypes.func,
    confirmationTime: PropTypes.number,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
}

export default InputBox