import { useRef } from 'react';
import { InputName, InputWrapper, InputTextWrapper, MetricLabel } from './styles.module.css';
import PropTypes from 'prop-types';

function SlideInput({ name, onChange, metric, min, max, mul, initial }) {
    const sliderRef = useRef(null);
    const numberRef = useRef(null);

    return (
        <div>
            <InputName>{name}:</InputName>
            <InputWrapper>
                <input ref={sliderRef} type="range" min={min * mul} max={max * mul} onChange={(e) => {
                    let val = e.target.value;
                    if (val < min * mul) {
                        e.target.value = min * mul;
                        return;
                    }
                    if (val > max * mul) {
                        e.target.value = max * mul;
                        return;
                    }

                    onChange(val / mul);
                    if (numberRef.current)
                        numberRef.current.value = val / mul;
                }} defaultValue={initial * mul} />

                <InputTextWrapper>
                    <input style={{
                        width: '2em'
                    }} ref={numberRef} type="number" min={min} max={max} onChange={(e) => {
                        let val = Math.round(e.target.value * 100) / 100;
                        e.target.value = val;

                        if (val < min) {
                            e.target.value = min;
                            return;
                        }

                        if (val > max) {
                            e.target.value = max;
                            return;
                        }

                        onChange(val);
                        if (sliderRef.current)
                            sliderRef.current.value = val * mul;


                    }} defaultValue={initial} />

                    <MetricLabel>{metric}</MetricLabel>
                </InputTextWrapper>
            </InputWrapper>
        </div >
    )
}

SlideInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    metric: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    mul: PropTypes.number.isRequired,
    initial: PropTypes.number.isRequired,
}

export default SlideInput