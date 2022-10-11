import { useState, useEffect } from 'react';
import {
    Typography,
    CircularProgress
} from '@mui/material';
import { getAllEvents } from '../../api/api';
import Logo2 from '../../assets/HCPLogo.jpg';
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
        getAllEvents(getData, true);
    }, []);

    const isMobile = width <= 800;

    const renderEvent = (data) => {
        return (
            <div key={data.name} className={isMobile ? "events-container-mobile" : "events-container"}>
                <div className={isMobile ? "events-image-mobile" : "events-image"}>
                    <img
                        src={ data.image !== null ? data.image : Logo2 }
                        alt={data.name + " image"}
                    />
                </div>
                <div className={isMobile ? "events-text-mobile" : "events-text"}>
                    <Typography gutterBottom variant="subtitle1" fontWeight={500} component="div" color="primary">
                        {data.name}
                    </Typography>
                    <Typography align="left" variant="subtitle2" component="div" color="primary" sx={{wordWrap: 'break-word'}}>
                        { data.description }
                    </Typography>
                    <br />
                    <Typography align="left" variant="subtitle2" component="div" color="primary" sx={{wordWrap: 'break-word'}}>
                        <Typography component="span" variant="subtitle2" style={{ fontWeight: 600 }}>
                            {"Location: "}
                        </Typography>
                        { data.location }
                    </Typography>
                    <Typography align="left" variant="subtitle2" component="div" color="primary" sx={{wordWrap: 'break-word'}}>
                        <Typography component="span" variant="subtitle2" style={{ fontWeight: 600 }}>
                            {"Date: "}
                        </Typography>
                        { data.date.toDateString() }
                    </Typography>
                    <Typography align="left" variant="subtitle2" component="div" color="primary" sx={{wordWrap: 'break-word'}}>
                        <Typography component="span" variant="subtitle2" style={{ fontWeight: 600 }}>
                            {"Time: "}
                        </Typography>
                        { data.date.toTimeString() }
                    </Typography>
                </div>
            </div>
        );
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
            events.map((obj) => renderEvent(obj))
        );
    };

    const renderEvents = () => {
        return (
            <div id={isMobile ? 'events-body-mobile' : 'events-body'}>
                <Typography variant="h2" color="primary"> Upcoming Events </Typography>
                <br />
                { displayEvents() }
            </div>
        );
    }

    return (
        <div className={events.length === 0 ? 'events-background-none' : 'events-background'}>
            { renderEvents() }
        </div>
    );
};

export default Events;