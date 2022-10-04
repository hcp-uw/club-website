import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import './Join.css';
import Button from '@mui/material/Button';

function Join(props) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 800;

    const displayJoinPage = () => {
        return (
            <div className='google-form-embed'>
                <iframe
                    className='iframe'
                    title="club sign up google form"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSc5wyLuacKqZpezaffwB8jZZVz9yBo83tvA-U_vsRMiPbGslA/viewform?embedded=true"
                >
                    Loading…
                </iframe>
            </div>
        );
    };

    const displayJoinPageMobile = () => {
        return (
            <Button color="secondary" variant="contained" href={"https://forms.gle/JpJaoznG4FBvS1paA"} target="_blank"> Link to Google Form </Button>
        );
    };

    const renderJoinPage = () => {
        if (isMobile) {
            return (
                <div id='join-container-mobile'>
                    <Typography variant="h2" color="primary" paddingBottom={2}> Join </Typography>
                    {displayJoinPageMobile()}
                </div>
            );
        } else {
            return (
                <div id='join-container'>
                    <Typography variant="h2" color="primary" paddingBottom={2}> Join </Typography>
                    {displayJoinPage()}
                </div>
            );
        }
    }

    return (
        <div id={isMobile ? 'join-background-mobile' : 'join-background'}>
            {renderJoinPage()}
        </div>
    );
};

export default Join;