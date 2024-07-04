import LoadSpinner from "../components/LoadSpinner"

function LoadingView() {
    return (
        <div style={{
            aspectRatio: '1 / 1',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <LoadSpinner />
        </div>
    )
}

export default LoadingView