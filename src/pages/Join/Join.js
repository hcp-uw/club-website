import { useEffect } from 'react';
import { Typography } from '@mui/material';
import './Join.css';

function Join(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='join-background'>
            <div className='join-container'>
                <Typography variant="h2" color="primary"> Join </Typography>
            </div>
        </div>
    );
};

export default Join;