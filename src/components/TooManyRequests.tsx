import { Fragment } from 'react';

import '../styles/TooManyRequests.css';


export default function TooManyRequests() {

    return (<Fragment>
        <div className='too-many-requests'>
            <a>The New York Times is not this quick. Slow down and try again in about 1 minute.</a>
        </div>
    </Fragment>)
}