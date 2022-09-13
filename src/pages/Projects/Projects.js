import { useEffect } from 'react';
import { Typography } from '@mui/material';
import './Projects.css';

function Projects(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='background'>
            <div className='container'>
                <Typography variant="h2" color="#FFFFFF"> Projects </Typography>
            </div>
        </div>
    );
};

export default Projects;