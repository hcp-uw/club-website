import { useEffect } from 'react';
import { Typography } from '@mui/material';
import './Home.css';

function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='home-background'>
            <div className='home-container'>
                <Typography variant="h2" color="primary"> Home </Typography>
            </div>
        </div>
    );
};

export default Home;