import { useEffect, useState } from "react"

const STATUS_MESSAGES = {
    'wait': "Waiting for response.",
    'success': "We were able to connect to the backend!",
    'failure': "We did not reach the backend :("
}

function CheckApi() {
    const [status, setStatus] = useState('wait');

    useEffect(() => {
        fetch('/api/v1/check')
            .then((response) => { response.status == 200 ? setStatus('success') : setStatus('failure') })
            .catch(() => { setStatus('failure'); })
    }, []);

    return (
        <div>
            {
                STATUS_MESSAGES[status]
            }
        </div>
    )
}

export default CheckApi