import React from 'react';
import Button from '@material-ui/core/Button';
import { useInterval } from 'react-interval-hook';

export default function Stopwatch(props) {
    const { start, stop, isActive } = useInterval(
        () => {
            props.handleTimer( props.sectionId)
        },
        1000,
        {
            autoStart: false,
            immediate: true,
            onFinish: () => {
                console.log('Callback when timer is stopped');
            },
        }
    );

    return (
        <div >            
            <Button onClick={start}>Start</Button>
            <Button onClick={stop}>Stop</Button>
        </div>
    );
}
