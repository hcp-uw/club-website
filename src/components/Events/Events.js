import { useEffect } from 'react';
import { Typography } from '@mui/material';
import './Events.css';

function Events(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='events-background'>
            <div className='events-container'>
                <Typography variant="h4" color="primary"> Events </Typography>
            </div>
        </div>
    );
};

export default Events;