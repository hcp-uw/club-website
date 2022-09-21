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
                <div className='google-form-embed'>
                    <iframe
                        title="club sign up google form"
                        src="https://docs.google.com/forms/d/e/1FAIpQLSc5wyLuacKqZpezaffwB8jZZVz9yBo83tvA-U_vsRMiPbGslA/viewform?embedded=true"
                        width="640" height="1800" 
                        frameborder="0" marginheight="0" marginwidth="0"
                    >
                    Loading…
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Join;