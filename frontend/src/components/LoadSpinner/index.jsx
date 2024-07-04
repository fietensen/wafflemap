import { Wrapper, Circ, Spinner } from './styles.module.css';

function LoadSpinner() {
    return (
        <Wrapper>
            <Circ borderWidth={'0.1em'}>
                <Spinner width={'2.5em'} />
            </Circ>
        </Wrapper>
    )
}

export default LoadSpinner