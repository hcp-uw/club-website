import { useState, useEffect } from 'react';
import {
    Typography,
    CircularProgress
} from '@mui/material';
import { getFeaturedEvents } from '../../api/api';
import './Events.css';

function Events(props) {
    const [width, setWidth] = useState(window.innerWidth);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        const getData = async (data) => {
            setEvents(data);
            setLoading(false);
        }
        getFeaturedEvents(getData);
    });

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const isMobile = width <= 800;

    const renderEvent = () => {
        return <></>
    }

    const displayEvents = () => {
        if (loading) {
            return <CircularProgress color='secondary' style={{alignSelf: "center"}}/>;
        }
        if (events.length === 0) {
            return <Typography component="h2" variant="subtitle1" color="primary">
            Sadly there are no events at this time, check again later!
        </Typography>;
        }
        return (
            <div id={isMobile ? 'home-events-mobile' : 'home-events'}>
                { events.map((obj) => renderEvent(obj)) }
            </div>
        );
    };

    const renderEvents = () => {
        return (
            <div id={isMobile ? 'events-body-mobile' : 'events-body'}>
                <Typography variant="h2" color="primary"> Events </Typography>
                <br />
                { displayEvents() }
            </div>
        );
    }

    return (
        <div className='events-background'>
            { renderEvents() }
        </div>
    );
};

export default Events;