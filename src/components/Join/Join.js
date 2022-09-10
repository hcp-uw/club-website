import { useEffect } from 'react';
import { Typography } from '@mui/material';
import './Join.css';

function Join(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='background'>
            <div className='container'>
                <Typography variant="h4" color="primary"> Join </Typography>
            </div>
        </div>
    );
};

export default Join;