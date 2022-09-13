import {useEffect} from 'react';
import { Typography } from '@mui/material';
import './About.css';

function About(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='about-background'>
            <div className='about-container'>
            <Typography variant="h2" color="primary"> About </Typography>
            </div>
        </div>
    );
};

export default About;